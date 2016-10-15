addEventListener('load', function() {
  var html = (function() {
    var DESC = encodeURI('Check out lodash – A JavaScript utility library delivering consistency, modularity, performance, %26 extras').replace('%25', '%'),
        FRAME_OPEN = '<iframe frameborder=0 scrolling=0 allowtransparency ',
        FRAME_CLOSE = '></iframe>',
        GHB_CLS = 'class=btn-gh ',
        GHB_SRC = 'src=https://ghbtns.com/github-btn.html?user=lodash&amp;repo=lodash&amp;count=true&amp;type=',
        TWT_CLS = 'class=btn-twitter-',
        TWT_FLW = 'follow',
        TWT_QRY = '_button.html?dnt=true&amp;size=m&amp;show_count=',
        TWT_SRC = 'src=https://platform.twitter.com/widgets/';

    return (
      FRAME_OPEN + GHB_CLS + GHB_SRC + 'star' + FRAME_CLOSE +
      FRAME_OPEN + GHB_CLS + GHB_SRC + 'fork' + FRAME_CLOSE +
      FRAME_OPEN + TWT_CLS + TWT_FLW + ' ' + TWT_SRC + TWT_FLW + TWT_QRY + 'false&amp;screen_name=bestiejs' + FRAME_CLOSE +
      FRAME_OPEN + TWT_CLS + 'share ' + TWT_SRC + 'tweet' + TWT_QRY + 'true&amp;url=https://lodash.com/&amp;text=' + DESC + FRAME_CLOSE
    );
  }());

  var container = document.getElementById('social');
  if (navigator.onLine) {
    container.innerHTML = html;
  } else {
    container.parentNode.style.display = 'none';
  }
});
