---
ignored: [
  'appcache.html',
  'manifest.appcache',
  'robots.txt'
]
prefetch: [
  '/sw.js',
  '/manifest.webmanifest',
  '/icons/apple-touch-180x180.png',
  '/icons/favicon-32x32.png'
]
---
'use strict'

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
    {% assign prefetch = prefetch | push:href %}
  {% endfor %}
{% endfor %}

{% comment %}
Add site font faces to prefetch.
{% endcomment %}
{% for family in site.font-face %}
  {% for style in family[1] %}
    {% for href in style[1] %}
      {% assign prefetch = prefetch | push:href %}
    {% endfor %}
  {% endfor %}
{% endfor %}

{% comment %}
Add site js prefetch.
{% endcomment %}
{% for hrefs in site.js %}
  {% for href in hrefs[1] %}
    {% assign basename = href | split:'/' | last %}
    {% assign ignored = ignored | push:basename %}
    {% assign prefetch = prefetch | push:href %}
  {% endfor %}
{% endfor %}

{% comment %}
Add static files to prefetch.
{% endcomment %}
{% for file in site.static_files %}
  {% assign basename = file.path | split:'/' | last %}
  {% unless ignored contains basename or file.path contains 'anchor-js' %}
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
{% for res in site.builds %}
  {% assign prefetch = prefetch | push:res[1].href %}
{% endfor %}

{% comment %}
Add vendor files to prefetch.
{% endcomment %}
{% for resources in site.vendor %}
  {% for res in resources[1] %}
    {% assign prefetch = prefetch | push:res.href %}
  {% endfor %}
{% endfor %}

{% comment %}
Cleanup prefetch.
{% endcomment %}
{% assign prefetch = prefetch | uniq | sort %}

const BUILD_REV = '{{ site.github.build_revision }}'

const prefetch = {{ prefetch | jsonify }}
  .map(href => new URL(href, location))

const redirect = [/*insert_redirect*/]
  .map(entry => (entry[1] = new URL(entry[1], location), entry))

const reHtml = /(?:(\/)index)?\.html$/
const reSplat = /:splat\b/

/**
 * Checks if `status` is a [redirect code](https://fetch.spec.whatwg.org/#redirect-status).
 *
 * @param {number} status The status code to check.
 * @returns {boolean} Returns `true` if `status` is a redirect code, else `false`.
 */
function isRedirect(status) {
  return (
    // Moved permanently.
    status === 301 ||
    // Moved temporarily.
    status === 302 ||
    // See other.
    status === 303 ||
    // Temporary redirect.
    status === 307 ||
    // Permanent redirect.
    status === 308
  )
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
  const isReq = resource instanceof Request
  const url = new URL(isReq ? resource.url : resource)

  // Add cache entry for the extensionless variant.
  if (reHtml.test(url.pathname)) {
    const extless = new URL(url)
    extless.pathname = extless.pathname.replace(reHtml, '$1')
    cache.put(new Request(extless, isReq ? resource : undefined), response.clone())
  }
  return cache.put(resource, response)
}

/*----------------------------------------------------------------------------*/

addEventListener('install', event =>
  event.waitUntil(Promise.all([
    skipWaiting(),
    caches.open(BUILD_REV).then(cache =>
      Promise.all(prefetch.map(uri =>
        fetch(uri)
          .then(response => response.ok && put(cache, uri, response))
          .catch(error => console.log(`prefetch failed: ${ uri }`, error))
      ))
    )
  ]))
)

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
)

addEventListener('fetch', event => {
  const { request } = event
  const url = new URL(request.url)
  event.respondWith(
    caches.open(BUILD_REV).then(cache =>
      cache.match(request).then(response => {
        if (response) {
          return response
        }
        // Detect URL redirects.
        if (url.origin == location.origin) {
          for (let { 0:pattern, 1:to, 2:status } of redirect) {
            const match = pattern.exec(url.pathname)
            const search = to.search || url.search
            const splat = match ? match[1] : undefined
            status = isRedirect(status) ? status : 302
            if (splat !== undefined) {
              to = new URL(to.pathname.replace(reSplat, splat) + search, location)
            } else if (!to.search && search) {
              to = new URL(to.pathname + search, location)
            }
            if (match) {
              if (url.href != to.href) {
                const response = Response.redirect(to, status)
                // Repro for http://bugzil.la/1319846.
                if (/fx_bug_1319846/.test(url.href)) {
                  put(cache, url, response.clone())
                }
                return response
              }
              break
            }
          }
        }
        // Fetch requests that weren't prefetched.
        else if (!prefetch.find(({ href }) => href == url.href)) {
          return fetch(request)
        }
        // Retry requests that failed during prefetch.
        return fetch(request).then(response => {
          if (response.ok) {
            put(cache, request, response.clone())
          }
          return response
        })
      })
      .catch(error => {
        // Respond with a 400 "Bad Request" status.
        console.log(`fetch failed: ${ url }`, error)
        return new Response(new Blob, { 'status': 400, 'statusText': 'Bad Request' })
      })
    )
  )
})
