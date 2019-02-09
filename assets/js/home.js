---
---
addEventListener('load', function() {
  'use strict'

  var DSC = encodeURI('Check out lodash – {{ site.description | replace:"&","%26" | remove_first:"." }}').replace('%25', '%'),
      FRM_OPEN = '<iframe frameborder=0 scrolling=0 allowtransparency ',
      FRM_CLOSE = '></iframe>',
      GHB_CLS = 'class=btn-gh ',
      GHB_SRC = 'src=https://ghbtns.com/github-btn.html?user=lodash&amp;repo=lodash&amp;count=true&amp;type=',
      TWT_CLS = 'class=btn-twitter-',
      TWT_FLW = 'follow',
      TWT_QRY = '_button.html?dnt=true&amp;size=m&amp;show_count=',
      TWT_SRC = 'src=https://platform.twitter.com/widgets/'

  var html =
    FRM_OPEN + GHB_CLS + GHB_SRC + 'star' + FRM_CLOSE +
    FRM_OPEN + GHB_CLS + GHB_SRC + 'fork' + FRM_CLOSE +
    FRM_OPEN + TWT_CLS + TWT_FLW + ' ' + TWT_SRC + TWT_FLW + TWT_QRY + 'false&amp;screen_name=bestiejs' + FRM_CLOSE +
    FRM_OPEN + TWT_CLS + 'share '      + TWT_SRC + 'tweet' + TWT_QRY + 'true&amp;url=' + location.origin + '/&amp;text=' + DSC + FRM_CLOSE

  var container = document.getElementById('social')
  if (navigator.onLine && typeof phantom == 'undefined') {
    container.innerHTML = html
  } else {
    container.parentNode.style.display = 'none'
  }
})
