---
---
;(function(root) {
  var head = document.head;
  ['{{ site.vendor.css | join:"','" }}'].forEach(function(href) {
    var link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = href;
    head.appendChild(link);
  });
  {% if jekyll.environment == 'production' %}
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/sw.js');
  }
  if (navigator.onLine) {
    root[GoogleAnalyticsObject = '_ga'] = {
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
