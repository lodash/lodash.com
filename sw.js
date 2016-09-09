---
regenerate: true
---

'use strict';

var CACHE_KEY = 'cache-v{{ site.time | replace:" ","" | replace:":","" | replace:"-","" | replace:"+","" }}';

var prefetch = [
{% for file in site.static_files %}
  '{{ file.path }}',
{% endfor %}
{% for page in site.html_pages %}
  '{{ page.url | replace:".html","" }}',
  '/{{ page.path }}',
{% endfor %}
{% for release in site.releases %}
  'https://cdn.jsdelivr.net/lodash/{{ release }}/lodash.min.js',
{% endfor %}
{% for vendor in site.vendor %}
  {% for href in vendor[1] %}
  '{{ href }}',
  {% endfor %}
{% endfor %}
  '/assets/css/main.css',
  'https://embed.tonicdev.com/'
];

/**
 * Appends a cache-bust query to same-origin URIs and requests.
 *
 * @private
 * @param {*} resource The resource to cache bust.
 * @returns {*} Returns the cache busted resource.
 */
function cacheBust(resource) {
  const isReq = resource instanceof Request;
  const isStr = typeof resource == 'string';
  const url = new URL(isReq ? resource.url : resource, location.href);

  // Use cache-bust query until cache modes are supported in Chrome.
  // Only add to same-origin requests to avoid potential 403 responses.
  // See https://github.com/mjackson/npm-http-server/issues/44.
  if (url.origin == location.origin) {
    url.search += `${ url.search ? '&' : '?' }${ CACHE_KEY }`;
    if (isReq) {
      return  new Request(url, resource);
    }
    return isStr ? url.href : url;
  }
  return resource;
}

/*----------------------------------------------------------------------------*/

addEventListener('install', event =>
  event.waitUntil(Promise.all([
    skipWaiting(),
    caches.open(CACHE_KEY).then(cache =>
      Promise.all(prefetch.map(uri => {
        const input = cacheBust(uri);
        // Attempt to prefetch and cache with 'cors'.
        return fetch(input)
          .then(response => response.ok && cache.put(uri, response))
          .catch(() =>
            // Fallback to prefetch and cache with 'no-cors'.
            fetch(input, { 'mode': 'no-cors' })
              .then(response => {
                if (response.status && !response.ok) {
                  throw new TypeError('Response status is !ok');
                }
                cache.put(uri, response);
              })
              // Prefetch failed.
              .catch(error => console.log(`prefetch failed: ${ uri }`, error))
          );
      }))
    )
  ]))
);

addEventListener('activate', event =>
  event.waitUntil(Promise.all([
    clients.claim(),
    // Delete old caches.
    caches.keys().then(keys =>
      Promise.all(keys.map(key =>
        key == CACHE_KEY || caches.delete(key)
      ))
    )
  ]))
);

addEventListener('fetch', event =>
  event.respondWith(
    caches.open(CACHE_KEY).then(cache =>
      // Respond with cached request if available.
      cache.match(event.request).then(response => {
        if (response || !prefetch.includes(event.request.url)) {
          return response || fetch(event.request);
        }
        const input = cacheBust(event.request);
        // Retry caching if missed during prefetch.
        return fetch(input).then(response => {
          if (response.ok || !response.status) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(error => {
          // Respond with a 400 "Bad Request" status.
          console.log(`fetch failed: ${ event.request.url }`, error);
          return new Response(new Blob, { 'status': 400, 'statusText': 'Bad Request' });
        })
      })
    )
  )
);
