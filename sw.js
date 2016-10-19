---
ignored: [
  'robots.txt'
]
prefetch: [
  '/sw.js',
  '/manifest.json',
  '/icons/apple-touch-180x180.png',
  '/icons/favicon-32x32.png'
]
---
'use strict';

{% assign BUILD_REV = site.github.build_revision %}

{% assign ignored = page.ignored %}
{% assign prefetch = page.prefetch %}

{% comment %}
Add conditionally ignored files.
{% endcomment %}
{% unless site.github.hostname == 'github.com' %}
  {% assign ignored = ignored | push:'favicon-16x16.png' %}
{% endunless %}

{% comment %}
Add site css to prefetch.
{% endcomment %}
{% for hrefs in site.css %}
  {% for href in hrefs[1] %}
    {% assign busted = href | append:'?v=' | append:BUILD_REV %}
    {% assign prefetch = prefetch | push:busted %}
  {% endfor %}
{% endfor %}

{% comment %}
Add site js prefetch.
{% endcomment %}
{% for hrefs in site.js %}
  {% for href in hrefs[1] %}
    {% assign basename = href | split:'/' | last %}
    {% assign busted = href | append:'?v=' | append:BUILD_REV %}
    {% assign ignored = ignored | push:basename %}
    {% assign prefetch = prefetch | push:busted %}
  {% endfor %}
{% endfor %}

{% comment %}
Add static files to prefetch.
{% endcomment %}
{% for file in site.static_files %}
  {% assign basename = file.path | split:'/' | last %}
  {% unless ignored contains basename %}
    {% assign prefetch = prefetch | push:file.path %}
  {% endunless %}
{% endfor %}

{% comment %}
Add html pages to prefetch.
{% endcomment %}
{% for page in site.html_pages %}
  {% assign href = '/' | append:page.path %}
  {% assign prefetch = prefetch | push:href %}
{% endfor %}

{% comment %}
Add Lodash scripts to prefetch.
{% endcomment %}
{% for release in site.releases %}
  {% assign href = 'https://cdn.jsdelivr.net/lodash/' | append:release | append:'/lodash.min.js' %}
  {% assign prefetch = prefetch | push:href %}
{% endfor %}

{% comment %}
Add vendor files to prefetch.
{% endcomment %}
{% for  hrefs in site.vendor %}
  {% for href in hrefs[1] %}
    {% assign prefetch = prefetch | push:href %}
  {% endfor %}
{% endfor %}

const BUILD_REV = '{{ BUILD_REV }}';

const prefetch = [`{{ prefetch | uniq | join:'`,`' }}`]
  .map(href => new URL(href, location));

const redirect = [/*insert_redirect*/]
  .map(entry => (entry[1] = new URL(entry[1], location), entry));

const reSplat = /:splat\b/;

/**
 * Appends a cache-bust query to same-origin URIs and requests.
 *
 * @private
 * @param {*} resource The resource to cache bust.
 * @returns {*} Returns the cache busted resource.
 */
function bust(resource) {
  const isReq = resource instanceof Request;
  if (isReq && resource.mode == 'navigate') {
    return resource;
  }
  // Use cache-bust query until cache modes are supported in Chrome.
  // Only add to same-origin requests to avoid potential 403 responses.
  // See https://github.com/mjackson/npm-http-server/issues/44.
  const url = new URL(isReq ? resource.url : resource);
  if (url.origin == location.origin) {
    if (!url.searchParams.has('v')) {
      url.searchParams.set('v', BUILD_REV);
    }
    return isReq ? new Request(url, resource) : url;
  }
  return resource;
}

/**
 * A specialized version of `Cache#put` which caches an additional extensionless
 * resource for HTML requests.
 *
 * @private
 * @param {Object} cache The cache object
 * @param {*} resource The resource key.
 * @param {Object} response The response value.
 * @returns {Promise} Returns a promise that resolves to `undefined`.
 */
function put(cache, resource, response) {
  const isReq = resource instanceof Request;
  const url = new URL(isReq ? resource.url : resource, location);
  // Add cache entry for the extensionless variant.
  if (url.pathname.endsWith('.html')) {
    const extless = new URL(url);
    extless.pathname = extless.pathname.replace(/(?:index)?\.html$/, '');
    cache.put(new Request(extless, isReq ? resource : undefined), response.clone());
  }
  return cache.put(resource, response);
}

/*----------------------------------------------------------------------------*/

addEventListener('install', event =>
  event.waitUntil(Promise.all([
    skipWaiting(),
    caches.open(BUILD_REV).then(cache =>
      Promise.all(prefetch.map(uri => {
        const input = bust(uri);
        // Attempt to prefetch and cache with 'cors'.
        return fetch(input, { 'redirect': 'manual' })
          .then(response => {
            if (response.ok || response.type == 'opaqueredirect') {
              return put(cache, uri, response);
            }
          })
          .catch(() =>
            // Fallback to prefetch and cache with 'no-cors'.
            fetch(input, { 'mode': 'no-cors', 'redirect': 'manual' })
              .then(response => {
                if (response.status && !response.ok) {
                  throw new TypeError('Response status is !ok');
                }
                put(cache, uri, response);
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
        key == BUILD_REV || caches.delete(key)
      ))
    )
  ]))
);

addEventListener('fetch', event => {
  const { request } = event;
  const url = new URL(request.url);
  event.respondWith(
    caches.open(BUILD_REV).then(cache =>
      cache.match(request).then(response => {
        // Return the cached response if available.
        if (response) {
          return response;
        }
        // Detect URL redirects.
        if (url.origin == location.origin) {
          for (let { 0:pattern, 1:to, 2:status } of redirect) {
            const match = pattern.exec(url.pathname);
            const search = to.search || url.search;
            const splat = match ? match[1] : undefined;
            if (splat !== undefined) {
              to = new URL(to.pathname.replace(reSplat, splat) + search, location);
            } else if (!to.search && search) {
              to = new URL(to.pathname + search, location);
            }
            if (match) {
              if (url.href != to.href) {
                response = Response.redirect(to, status);
                put(cache, url, response.clone());
                return response;
              }
              break;
            }
          }
        }
        // Fetch requests that weren't prefetched.
        else if (!prefetch.find(({ href }) => href == url.href)) {
          return fetch(request);
        }
        // Retry requests that failed during prefetch.
        return fetch(bust(request)).then(response => {
          if (response.ok || !response.status) {
            put(cache, request, response.clone());
          }
          return response;
        });
      })
      .catch(error => {
        // Respond with a 400 "Bad Request" status.
        console.log(`fetch failed: ${ url }`, error);
        return new Response(new Blob, { 'status': 400, 'statusText': 'Bad Request' });
      })
    )
  )
});
