---
---

'use strict';

var CACHE_KEY = 'cache-v{{ site.time | replace:" ","" | replace:":","" | replace:"-","" }}';

var prefetch = [
{% for release in site.releases %}
  '/docs/{{ release }}',
  '/docs/{{ release }}.html',
  'https://rawgit.com/lodash/lodash/{{ release }}/lodash.js',
{% endfor %}
  '/',
  '/index.html',
  '/404',
  '/404.html',
  '/custom-builds',
  '/custom-builds.html',
  '/favicon.ico',
  '/assets/js/docs.js',
  'https://embed.tonicdev.com/',
  'https://npmcdn.com/react@{{ site.react_version }}/dist/react.min.js',
  'https://npmcdn.com/react-dom@{{ site.react_version }}/dist/react-dom.min.js'
];

var skipCache = [
  'google-analytics.com'
];

addEventListener('install', event =>
  event.waitUntil(Promise.all([
    skipWaiting(),
    caches.open(CACHE_KEY).then(cache =>
      Promise.all(prefetch.map(entry =>
        cache
          .add(new Request(entry, { 'mode': 'no-cors' }))
          .catch(error => console.log('prefetch failed: ' + entry, error))
      ))
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
        .catch(error => console.log('fetch failed: ' + event.request.url, error))
      )
    )
  )
);
