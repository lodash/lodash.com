---
resources: []
---
;(function(root) {
  'use strict';

{% assign resources = page.resources %}
{% for res in site.vendor.css %}
  {% assign resources = "{ 'href': '" | append:res.href | append:"', 'sri': '" | append:res.sri | append:"' }" %}
{% endfor %}

  var head = document.head;

  [{{ resources | join:',' }}]
    .forEach(function(res) {
      var link = document.createElement('link');
      link.crossorigin = 'anonymous';
      link.href = res.href;
      link.integrity = res.sri;
      link.rel = 'stylesheet';
      head.appendChild(link);
    });

  {% if jekyll.environment == 'production' %}
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  if (navigator.onLine) {
    root[root.GoogleAnalyticsObject = '_ga'] = {
      'l': Date.now(),
      'q': [
        ['create', 'UA-6065217-64', 'auto'],
        ['send', 'pageview']
      ]
    };
    var script = document.createElement('script');
    script.src = 'https://www.google-analytics.com/analytics.js';
    head.appendChild(script);
  }
  {% endif %}
}(this));
