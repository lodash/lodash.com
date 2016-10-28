---
resources: []
---
;(function(root) {
  'use strict';

{% assign resources = page.resources %}
{% for res in site.vendor.css %}
  {% assign resources = "{ 'href': '" | append:res.href | append:"', 'integrity': '" | append:res.integrity | append:"' }" %}
{% endfor %}

  var head = document.head;

  [{{ resources | join:',' }}]
    .forEach(function(res) {
      var link = document.createElement('link');
      link.crossOrigin = 'anonymous';
      link.integrity = res.integrity;
      link.rel = 'stylesheet';
      link.href = res.href;
      head.appendChild(link);
    });

  {% if jekyll.environment == 'production' %}
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
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
}(this));
