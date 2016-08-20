---
---

'use strict';

var CACHE_KEY = 'cache-v{{ site.time | replace:" ","" | replace:":","" | replace:"-","" }}';

var prefetch = [
{% for release in site.releases %}
  '/docs/{{ release }}.html',
  'https://rawgit.com/lodash/lodash/{{ release }}/lodash.js',
{% endfor %}
  '/404.html',
  '/custom-builds.html',
  '/assets/js/docs.js',
  'https://embed.tonicdev.com/',
  'https://npmcdn.com/react@15.3.1/dist/react.min.js',
  'https://npmcdn.com/react-dom@15.3.1/dist/react-dom.min.js'
];

var skipCache = [
  'google-analytics.com'
];

addEventListener('install', event =>
  event.waitUntil(Promise.all([
    skipWaiting(),
    caches.open(CACHE_KEY).then(cache =>
      cache
        .addAll(prefetch.map(entry => new Request(entry, { 'mode': 'no-cors' })))
        .catch(error => console.log('prefetch failed:', error))
    )
  ]))
);

addEventListener('activate', event =>
  event.waitUntil(Promise.all([
    clients.claim(),
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
      cache.match(event.request).then(response =>
        response || fetch(event.request).then(response => {
          if (!skipCache.some(entry => event.request.url.includes(entry))) {
            cache.put(event.request, response.clone());
          }
          return response;
        })
        .catch(error => console.log('fetch failed:', error))
      )
    )
  )
);
