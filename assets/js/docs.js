;(function() {
  'use strict';

  var docs = document.querySelector('.doc-container'),
      menuEl = document.querySelector('.toc-container'),
      mobileMenu = document.querySelector('.mobile-menu a'),
      replBtns = [],
      slice = Array.prototype.slice,
      version = location.pathname.match(/[\d.]+(?=(?:\.html)?$)/)[0],
      versionSelect = document.getElementById('version');

  function className() {
    return slice.call(arguments).join(' ');
  }

  function collapseSpaces(string) {
    return string.replace(/\s+/g, '');
  }

  function isClick(event){
    if (event.type == 'click') {
      return true;
    }
    var key = event.key || event.keyIdentifier;
    if (key == ' ') {
      event.preventDefault();
      return true;
    }
    return key == 'Enter';
  }

  function normalize(string) {
    return collapseSpaces(string.toLowerCase());
  }

  function search(string, target) {
    return normalize(string).indexOf(normalize(target)) > -1;
  }

  function toggleHidden(map, property) {
    return map.get(property) ? '' : 'hidden';
  }

  var Menu = React.createClass({
    'displayName': 'Menu',

    'getInitialState': function() {
      return {
        'content': new Immutable.List,
        'searchValue': '',
        'searchFound': true
      };
    },

    'componentWillMount': function() {
      // Before component mounts, use the initial HTML for its state.
      this.setState({
        'content': Immutable.fromJS(_.map(menuEl.children, function(node, key) {
          return {
            'key': key,
            'title': node.querySelector('h2 code').textContent,
            'expanded': true,
            'visible': true,
            'functions': _.map(node.querySelectorAll('ul li a'), function(anchor, subKey) {
              return {
                'key': key + ':' + subKey,
                'name': anchor.textContent,
                'href': anchor.href,
                'visible': true
              };
            })
          };
        }))
      });
    },

    'componentDidMount': function() {
      document.addEventListener('keydown', this.handleDocumentKeyDown);
    },

    'componentWillUnmount': function() {
      document.removeEventListener('keydown', this.handleDocumentKeyDown);
    },

    'handleDocumentKeyDown': function(e) {
        // Has the user pressed `/`?
        if (e.which === 191) {
          this.searchNode.focus();
          // Don't actually type a `/` in the input.
          e.preventDefault();
        }
    },

    'handleSearchChange': function(searchValue) {
      var searchFound = false;

      this.setState({
        'content': this.state.content.map(function(collection) {
          // The collection is visible if `searchValue` matches its title or
          // any of its function entries.
          var found = search(collection.get('title'), searchValue),
              visible = found;

          return collection
            .update('functions', function(functions) {
              return functions.map(function(entry) {
                var entryVis = (
                  found ||
                  search(entry.get('name'), searchValue) ||
                  search(entry.get('href').slice(1), searchValue)
                );
                visible || (visible = entryVis);
                searchFound || (searchFound = entryVis);
                return entry.set('visible', entryVis);
              });
            })
            .set('visible', visible);
        }),
        'searchFound': searchFound,
        'searchValue': searchValue
      });
    },

    'onChangeExpanded': function(event, index) {
      this.setState({
        'content': this.state.content.update(index, function(collection) {
          return collection.set('expanded', !collection.get('expanded'));
        })
      });
    },

    'onChangeSearch': function(event) {
      var searchValue = event.target.value;
      this.handleSearchChange(searchValue);
    },

    'onClickFuncName': function() {
      // Close mobile menu.
      menuEl.classList.remove('open');

      // Empty search box.
      this.handleSearchChange('');
    },

    'shouldComponentUpdate': function(nextProps, nextState) {
      return (this.state.searchFound || nextState.searchFound) &&
        (normalize(this.state.searchValue) !== normalize(nextState.searchValue) ||
          !this.state.content.equals(nextState.content));
    },

    'render': function() {
      var _this = this;

      var elements = this.state.content.map(function(collection, index) {
        var expanded = collection.get('expanded');

        var expanderClick = function(event) {
          if (isClick(event)) {
            _this.onChangeExpanded(event, index);
          }
        };

        return React.createElement(
          'div',
          {
            'key': collection.get('key'),
            'className': toggleHidden(collection, 'visible')
          },
          React.createElement(
            'h2',
            null,
            React.createElement(
              'i',
              {
                'className': className('fa', expanded ? 'fa-minus-square-o' : 'fa-plus-square-o'),
                'tabIndex': 0,
                'title': (expanded ? 'Collapse' : 'Expand') + ' Category',
                'onClick': expanderClick,
                'onKeyPress': expanderClick
              }
            ),
            collection.get('title')
          ),
          React.createElement(
            'ul',
            {
              'className': toggleHidden(collection, 'expanded')
            },
            collection.get('functions').map(function(entry) {
              return React.createElement(
                'li',
                {
                  'key': entry.get('key'),
                  'className': toggleHidden(entry, 'visible')
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

      var searchRefCallback = function(node) {
        _this.searchNode = node;
      };

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
            'i',
            {
              'aria-hidden': true,
              'className': 'fa fa-search'
            }
          ),
          React.createElement(
            'input',
            {
              'placeholder': 'Search',
              'type': 'search',
              'value': this.state.searchValue,
              'onChange': this.onChangeSearch,
              'ref': searchRefCallback
            }
          )
        ),
        elements,
        React.createElement(
          'div',
          {
            'className': className('empty-state', this.state.searchFound ? 'hidden' : '')
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

  // Select current doc version.
  _.each(versionSelect.options, function(option) {
    if (option.value == version) {
      option.selected = true;
      return false;
    }
  });

  // Add REPL buttons.
  if ('innerText' in docs) {
    _.each(docs.querySelectorAll('.highlight.js'), function(div) {
      var button = document.createElement('a'),
          parent = div.parentNode;

      button.classList.add('btn-repl');
      button.textContent = 'Try in REPL';
      button.style.display = navigator.onLine ? '' : 'none';

      parent.appendChild(button);

      button.addEventListener('click', function() {
        var source = div.innerText;
        parent.removeChild(div);
        parent.removeChild(button);

        Tonic.createNotebook({
          'element': parent,
          'nodeVersion': '*',
          'preamble': [
            'var _ = require("lodash@' + versionSelect.value + '");',
            '_.assign(global, require("lodash-doc-globals"));',
            'Object.observe = _.noop;'
          ].join('\n'),
          'source': source,
          'onLoad': function(notebook) {
            var iframe = parent.lastElementChild;
            iframe.style.cssText = 'height:' + iframe.style.height;
            iframe.classList.add('repl');
            notebook.evaluate();
          }
        });
      });

      replBtns.push(button);
    });
  }
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
