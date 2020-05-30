---
---
(function(root) {
  'use strict'

  var head = document.head,
      rootEl = document.documentElement

  function addStyleSheet(res) {
    var link = document.createElement('link')

    if (res.integrity &&
        res.href.slice(0, 6) === 'https:') {
      link.crossOrigin = 'anonymous'
      link.integrity = res.integrity
    }

    link.rel = 'stylesheet'
    link.href = res.href
    head.appendChild(link)
  }

  function toggleOffline() {
    rootEl.classList.toggle('offline')
  }

  /*--------------------------------------------------------------------------*/

  {% assign resources = site.data.init.array %}
  {% for res in site.vendor.css %}
    {% assign object = res | jsonify %}
    {% assign resources = resources | push:object %}
  {% endfor %}

  // Add asynchronous style sheets.
  [{{ resources | join:',' }}].forEach(addStyleSheet)

  {% if jekyll.environment == 'production' %}
  // Register service worker.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js')
  }
  // Fallback to AppCache.
  else if ('applicationCache' in root) {
    var iframe = document.createElement('iframe')
    iframe.style.display = 'none'
    iframe.src = '/appcache.html'
    document.body.appendChild(iframe)
  }
  {% endif %}

  // Toggle offline status.
  addEventListener('offline', toggleOffline)
  addEventListener('online', toggleOffline)
}(this))
