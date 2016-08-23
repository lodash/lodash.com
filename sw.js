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
 * Checks is a response status is classified as
 * [OK](https://fetch.spec.whatwg.org/#ok-status).
 *
 * @private
 * @param {number} status The status code to check.
 * @returns {boolean} Returns `true` if `status` is OK, else `false`.
 */
function isOk(status) {
  return !status || (status >= 200 && status <= 299);
}

/*----------------------------------------------------------------------------*/

addEventListener('install', event =>
  event.waitUntil(Promise.all([
    skipWaiting(),
    caches.open(CACHE_KEY).then(cache =>
      Promise.all(prefetch.map(entry =>
        // Attempt to prefetch and cache with 'cors'.
        fetch(entry, { 'cache': 'no-cache', 'mode': 'cors' })
          .then(response => isOk(response.status) && cache.put(entry, response))
          .catch(() =>
            // Fallback to prefetch and cache with 'no-cors'.
            fetch(entry, { 'cache': 'no-cache', 'mode': 'no-cors' })
              .then(response => {
                if (!isOk(response.status)) {
                  throw new TypeError('Response status is !ok');
                }
                cache.put(entry, response);
              })
              // Prefetch failed.
              .catch(event => console.log(`prefetch failed: ${ entry }`, error))
          )
      ))
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
      cache.match(event.request)
        .then(response => response || fetch(event.request))
        .catch(error => console.log(`fetch failed: ${ event.request.url }`, error))
    )
  )
);
