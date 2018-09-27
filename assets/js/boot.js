---
---
(function(root) {
  'use strict'

  var head = document.head,
      rootEl = document.documentElement

  function toggleOffline() {
    rootEl.classList.toggle('offline')
  }

  /*--------------------------------------------------------------------------*/

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
  // Initialize Google Analytics.
  if (navigator.onLine) {
    root[root.GoogleAnalyticsObject = '_ga'] = {
      'l': Date.now(),
      'q': {{ site.google_analytics.commands | jsonify }}
    }
    var script = document.createElement('script')
    script.src = '{{ site.google_analytics.href }}'
    head.appendChild(script)
  }
  {% endif %}

  // Toggle offline status.
  addEventListener('offline', toggleOffline)
  addEventListener('online', toggleOffline)
}(this))
