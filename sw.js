---
---

'use strict';

var CACHE_KEY = 'cache-v{{ site.time | replace:" ","" | replace:":","" | replace:"-","" }}';

var prefetch = [
{% for file in site.static_files %}
  '{{ file.path }}',
{% endfor %}
{% for page in site.html_pages %}
  '{{ page.url | replace:".html","" }}',
  '/{{ page.path }}',
{% endfor %}
{% for release in site.releases %}
  'https://rawgit.com/lodash/lodash/{{ release }}/lodash.js',
{% endfor %}
  '/assets/css/main.css',
  'https://embed.tonicdev.com/',
  'https://cdn.jsdelivr.net/fontawesome/{{ site.fontawesome.version }}/css/font-awesome.min.css',
  'https://cdn.jsdelivr.net/fontawesome/{{ site.fontawesome.version }}/fonts/fontawesome-webfont.woff2?v={{ site.fontawesome.version }}',
  'https://npmcdn.com/react@{{ site.react.version }}/dist/react.min.js',
  'https://npmcdn.com/react-dom@{{ site.react.version }}/dist/react-dom.min.js'
];

/**
 * Converts `uri` to a `URL` object with a cache-bust query appended for
 * same-origin requests.
 *
 * @private
 * @param {uri} string The URI to convert.
 * @returns {Object} Returns the converted `URL` object.
 */
function toURL(uri) {
  // Use cache-bust query until cache modes are supported in Chrome.
  // Only add to same-origin requests to avoid potential 403 responses.
  // See https://github.com/mjackson/npm-http-server/issues/44.
  const result = new URL(uri, location.href);
  if (result.origin == location.origin) {
    result.search += `${ result.search ? '&' : '?' }${ CACHE_KEY }`;
  }
  return result;
}

/*----------------------------------------------------------------------------*/

addEventListener('install', event =>
  event.waitUntil(Promise.all([
    skipWaiting(),
    caches.open(CACHE_KEY).then(cache =>
      Promise.all(prefetch.map(uri => {
        const input = toURL(uri);
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
        // Retry caching if missed during prefetch.
        const input = toURL(event.request.url);
        return fetch(new Request(input, event.request)).then(response => {
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
