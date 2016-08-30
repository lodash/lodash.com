;(function() {
  var docs = document.querySelector('.doc-container'),
      menuEl = document.querySelector('.toc-container'),
      mobileMenu = document.querySelector('.mobile-menu a'),
      replBtns = [],
      version = location.pathname.match(/[\d.]+(?=(?:\.html)?$)/)[0],
      versionSelect = document.getElementById('version');

  function search(string, target) {
    return string.toLowerCase().indexOf(target.toLowerCase()) > -1;
  }

  var Menu = React.createClass({
    'displayName': 'Menu',

    'getInitialState': function() {
      return {
        'content': new Immutable.List,
        'searchValue': ''
      };
    },

    'componentWillMount': function() {
      // Before component mounts, use the initial HTML for its state.
      this.setState({
        'content': Immutable.fromJS(_.map(menuEl.children, function(node) {
          return {
            'title': node.querySelector('h2 code').innerText,
            'expanded': true,
            'functions': _.map(node.querySelectorAll('ul li a'), function(anchor) {
              return {
                'name': anchor.innerText,
                'href': anchor.href,
                'visible': true
              };
            })
          };
        }))
      });
    },

    'onChangeExpanded': function(event, title) {
      this.setState({
        'content': this.state.content.map(function(collection) {
          return collection.get('title') == title
            ? collection.set('expanded', !collection.expanded)
            : collection;
        })
      });
    },

    'onChangeSearch': function(event) {
      this.setState({
        'searchValue': event.target.value
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
          searchValue = this.state.searchValue;

      var filtered = content
        .map(function(collection) {
          // The collection is visible if `searchValue` matches its title
          // or any of its function entries.
          var matched = search(collection.get('title'), searchValue),
              visible = matched;

          return collection
            .update('functions', function(functions) {
              return functions.map(function(entry) {
                var entryVis = matched || search(entry.get('name'), searchValue);
                visible || (visible = entryVis);
                return entry.set('visible', entryVis);
              });
            })
            .set('visible', visible);
        })
        .filterNot(function(collection) {
          return collection.get('functions').isEmpty();
        });

      var matched = filtered.some(function(collection) {
        return collection.get('visible');
      });

      var collections = filtered.map(function(collection) {
        return React.createElement(
          'div',
          {
            'className': collection.get('visible') ? '' : 'hidden'
          },
          React.createElement(
            'h2',
            null,
            React.createElement(
              'span',
              {
                'className': collection.get('expanded') ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o',
                'onClick': _.bind(_this.onChangeExpanded, _this, _, collection.get('title'))
              }
            ),
            collection.get('title')
          ),
          React.createElement(
            'ul',
            {
              'className': collection.get('expanded') ? '' : 'hidden'
            },
            collection.get('functions').map(function(entry) {
              return React.createElement(
                'li',
                {
                  'className': entry.get('visible') ? '' : 'hidden'
                },
                React.createElement(
                  'a',
                  {
                    'href': entry.get('href'),
                    'onClick': _this.onClickFuncName
                  },
                  React.createElement(
                    'code',
                    null,
                    entry.get('name')
                  )
                )
              );
            })
          )
        );
      });

      return React.createElement(
        'div',
        {
          'className': 'react-menu-container'
        },
        React.createElement(
          'div',
          {
            'className': 'search'
          },
          React.createElement(
            'span',
            {
              'className': 'fa fa-search'
            }
          ),
          React.createElement(
            'input',
            {
              'placeholder': 'Search',
              'type': 'search',
              'value': this.state.searchValue,
              'onChange': _.bind(this.onChangeSearch, this)
            }
          )
        ),
        collections,
        React.createElement(
          'div',
          {
            'className': matched ? 'hidden' : 'empty-state'
          },
          'Sorry, no matches.'
        )
      );
    }
  });

  ReactDOM.render(
    React.createElement(Menu),
    menuEl
  );

  _.each(versionSelect.options, function(option) {
    if (option.value == version) {
      option.selected = true;
      return false;
    }
  });

  _.each(document.querySelectorAll('.highlight.js'), function(pre) {
    var button = document.createElement('a'),
        parent = pre.parentElement;

    button.classList.add('btn-repl');
    button.innerText = 'Try in REPL';
    button.style.display = navigator.onLine ? '' : 'none';

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
          'nodeVersion': '*',
          'preamble': [
            'var _ = require("lodash@' + versionSelect.value + '");',
            '_.assign(global, require("lodash-doc-globals"));',
            'Object.observe = _.noop;'
          ].join('\n'),
          'source': source,
          'onLoad': function(notebook) {
            notebook.evaluate();
          }
        });
      }, 500);
    });

    replBtns.push(button);
  });

  // Open the mobile menu.
  mobileMenu.addEventListener('click', function(event) {
    event.preventDefault();
    menuEl.classList.toggle('open');
  });

  // Close the mobile menu.
  docs.addEventListener('click', function() {
    menuEl.classList.remove('open');
  });

  // Change the documentation URL.
  versionSelect.addEventListener('change', function(event) {
    var value = event.target.value;
    if (value) {
      location.href = value == '1.3.1'
        ? 'https://github.com/lodash/lodash/blob/1.3.1/doc/README.md'
        : '/docs/' + value;
    }
  });

  // Toggle REPL buttons for online status.
  addEventListener('offline', function() {
    _.each(replBtns, function(button) {
      button.style.display = 'none';
    });
  });

  addEventListener('online', function() {
    _.each(replBtns, function(button) {
      button.style.display = '';
    });
  });
}());
