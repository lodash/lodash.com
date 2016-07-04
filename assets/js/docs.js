;(function() {
  var menuEl = document.querySelector('.toc-container'),
      mobileMenu = document.querySelector('.mobile-menu a'),
      repls = document.querySelectorAll('.highlight.js'),
      versionSelect = document.getElementById('version');

  var Menu = React.createClass({
    'displayName': 'Menu',

    'getInitialState': function() {
      return {
        'content': [],
        'searchValue': ''
      };
    },

    'componentWillMount': function() {
      // Before component mounts, use the initial html for initial state.
      var content = _.map(menuEl.children, function(node) {
        return {
          'title': node.querySelector('h2 code').innerText,
          'expanded': true,
          'functions': _.map(node.querySelectorAll('ul li a'), function(anchor) {
            return {
              'name': anchor.innerText,
              'href': anchor.getAttribute('href')
            };
          })
        };
      });

      this.setState({
        'content': content
      });
    },

    'onChangeExpanded': function(title) {
      var content = _.map(this.state.content, function(value) {
        if (value.title == title) {
          value.expanded = !value.expanded;
        }
        return value;
      });

      this.setState({
        'content': content
      });
    },

    'onChangeSearch': function(e) {
      this.setState({
        'searchValue': e.target.value
      });
    },

    'onClickFuncName': function() {
      var _this = this;

      // Close mobile menu.
      menuEl.classList.remove('open');

      // Empty search box.
      _.defer(function() {
        _this.setState({
          'searchValue': ''
        });
      });
    },

    'render': function() {
      var _this = this,
          content = this.state.content,
          searchValue = this.state.searchValue,
          lowerSearchValue = searchValue.toLowerCase();

      var filtered = _(content)
        .map(function(collection) {
          // If search is for a collection title, return collection.
          if (_.includes(collection.title.toLowerCase(), lowerSearchValue)) {
            return collection;
          }
          // Else if search is for a function, return matching functions.
          return {
            'title': collection.title,
            'expanded': collection.expanded,
            'functions': _.filter(collection.functions, function(func) {
              return _.includes(func.name.toLowerCase(), lowerSearchValue);
            })
          };
        })
        .filter('functions.length')
        .value();

      var collections = _.map(filtered, function(collection) {
        return React.createElement(
          'div',
          null,
          React.createElement(
            'h2',
            null,
            React.createElement('span', {
              'className': collection.expanded ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o',
              'style': { 'marginRight': 10, 'fontSize': 14, 'cursor': 'pointer' },
              'onClick': _.bind(_this.onChangeExpanded, _this, collection.title)
            }),
            collection.title
          ),
          !collection.expanded ? '' : React.createElement(
            'ul',
            null,
            _.map(collection.functions, function(object) {
              return React.createElement(
                'li',
                null,
                React.createElement(
                  'a',
                  {
                    'href': object.href,
                    'onClick': _this.onClickFuncName
                  },
                  React.createElement(
                    'code',
                    null,
                    object.name
                  )
                )
              );
            })
          )
        );
      });

      return React.createElement(
        'div',
        null,
        React.createElement(
          'div',
          { 'className': 'search' },
          React.createElement('span', {
            'className': 'fa fa-search'
          }),
          React.createElement('input', {
            'placeholder': 'Search',
            'type': 'search',
            'value': this.state.searchValue,
            'onChange': _.bind(this.onChangeSearch, this)
          })
        ),
        collections
      );
    }
  });

  ReactDOM.render(
    React.createElement(Menu, null),
    menuEl
  );

  _.forEach(repls, function(pre) {
    var button = document.createElement('a'),
        parent = pre.parentElement;

    button.classList.add('btn-repl');
    button.innerText = 'Try in REPL';
    parent.appendChild(button);
    parent.style.position = 'relative';

    button.addEventListener('click', function() {
      var source = pre.innerText;
      pre.style.minHeight = pre.scrollHeight + 'px';
      pre.innerHTML = '';
      pre.classList.add('repl');

      _.delay(function() {
        parent.removeChild(button);

        Tonic.createNotebook({
          'element': pre,
          'preamble': 'var _ = require("lodash@' + versionSelect.value.slice(1) +'")',
          'source': source,
          'onLoad': function(notebook) {
            notebook.evaluate();
          }
        });
      }, 500);
    });
  });

  mobileMenu.addEventListener('click', function(e) {
    e.preventDefault();
    menuEl.classList.toggle('open');
  });

  versionSelect.addEventListener('change', function(e) {
    var value = e.target.value;
    if (value) {
      location.href = '/docs/' + value;
    }
  });
}());
