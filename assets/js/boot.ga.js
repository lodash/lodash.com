this[GoogleAnalyticsObject = '_ga'] = {
  'l': Date.now(),
  'q': [
    ['create', 'UA-6065217-64', 'auto'],
    ['send', 'pageview']
  ]
};

document.head.appendChild(function() {
  var script = document.createElement('script');
  script.src = 'https://www.google-analytics.com/analytics.js';
  return script;
}());
