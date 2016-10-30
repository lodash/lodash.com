---
---
;(function(root) {
  'use strict';

  var head = document.head,
      rootEl = document.documentElement;

  function addStyleSheet(res) {
    var link = document.createElement('link');
    link.crossOrigin = 'anonymous';
    link.integrity = res.integrity;
    link.rel = 'stylesheet';
    link.href = res.href;
    head.appendChild(link);
  }

  function toggleOffline() {
    rootEl.classList.toggle('offline');
  }

  /*--------------------------------------------------------------------------*/

  {% assign resources = site.data.init.array %}
  {% for res in site.vendor.css %}
    {% assign resources = "{ 'href': '" | append:res.href | append:"', 'integrity': '" | append:res.integrity | append:"' }" %}
  {% endfor %}

  // Add asynchronous stylesheets.
  [{{ resources | join:',' }}].forEach(addStyleSheet);

  {% if jekyll.environment == 'production' %}
  // Register service worker.
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  // Initialize Google Analytics.
  if (navigator.onLine) {
    root[root.GoogleAnalyticsObject = '_ga'] = {
      'l': Date.now(),
      'q': {{ site.google_analytics.commands | jsonify }}
    };
    var script = document.createElement('script');
    script.src = '{{ site.google_analytics.href }}';
    head.appendChild(script);
  }
  {% endif %}

  // Toggle offline status.
  addEventListener('offline', toggleOffline);
  addEventListener('online', toggleOffline);
}(this));
