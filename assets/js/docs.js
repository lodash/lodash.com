---
---
;(function() {
  'use strict';

  var focusLast,
      searchNode,
      BitapSearcher = new Fuse().options.searchFn,
      docs = document.querySelector('.doc-container'),
      focusFirst = document.querySelector('a'),
      menuEl = document.querySelector('.toc-container'),
      mobileMenu = document.querySelector('.mobile-menu a'),
      replBtns = [],
      slice = Array.prototype.slice,
      version = location.pathname.match(/[\d.]+(?=(?:\.html)?$)/)[0],
      versionSelect = document.getElementById('version');

  function Searcher(pattern) {
    this.__engine__ = new BitapSearcher(pattern, { 'threshold': 0.35 });
  }

  Searcher.prototype.isMatch = function(text) {
    return this.__engine__.search(text).isMatch;
  };

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
    if (key == ' ' || key == 'U+0020') {
      event.preventDefault();
      return true;
    }
    return key == 'Enter';
  }

  function normalize(string) {
    return collapseSpaces(string.toLowerCase());
  }

  function focusLastRefCallback(node) {
    focusLast = node;
  }

  function searchRefCallback(node) {
    searchNode = node;
  }

  function toggleHiddenClass(map, property) {
    return map.get(property) ? '' : 'hidden';
  }

  function toggleMobileMenu(state) {
    state = state === undefined ? !menuEl.classList.contains('open') : state;
    mobileMenu.title = (state ? 'Collapse' : 'Expand') + ' Menu';
    menuEl.classList[state ? 'add' : 'remove']('open');
    if (state) {
      searchNode.focus();
    }
  }

  /*--------------------------------------------------------------------------*/

  var Menu = React.createClass({
    'displayName': 'Menu',

    'getInitialState': function() {
      return {
        'content': new Immutable.List,
        'searchFound': true,
        'searchValue': ''
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
      document.addEventListener('keydown', this.onDocumentKeyDown, true);
    },

    'componentWillUnmount': function() {
      document.removeEventListener('keydown', this.onDocumentKeyDown, true);
    },

    'handleSearchChange': function(searchValue) {
      var searcher = new Searcher(searchValue),
          searchFound = false;

      this.setState({
        'content': this.state.content.map(function(collection) {
          // The collection is visible if `searchValue` matches its title or
          // any of its function entries.
          var found = !searchValue || searcher.isMatch(collection.get('title')),
              visible = found;

          return collection
            .update('functions', function(functions) {
              return functions.map(function(entry) {
                var entryVis = (
                  found ||
                  searcher.isMatch(entry.get('name')) ||
                  searcher.isMatch(entry.get('href').split('#')[1])
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
      this.handleSearchChange(event.target.value);
    },

    'onClickFuncName': function() {
      var _this = this;

      // Close mobile menu.
      toggleMobileMenu(false);

      // Empty search box.
      _.defer(function() {
        _this.handleSearchChange('');
      });
    },

    'onDocumentKeyDown': function(event) {
      var key = event.key || event.keyIdentifier;
      if ((key == 'Tab' || key == 'U+0009') &&
          menuEl.classList.contains('open') && event.target === focusLast) {
        // Restart tab cycle.
        event.preventDefault();
        focusFirst.focus();
      }
      if (key == '/' || key == 'U+002F') {
        // Don't actually type a `/` in the input.
        event.preventDefault();
        searchNode.focus();
      }
    },

    'shouldComponentUpdate': function(nextProps, nextState) {
      return (this.state.searchFound || nextState.searchFound) &&
        (normalize(this.state.searchValue) !== normalize(nextState.searchValue) ||
          !this.state.content.equals(nextState.content));
    },

    'render': function() {
      var _this = this;

      var elements = this.state.content.map(function(collection, index, content) {
        var expanded = collection.get('expanded');
        var isLast = (index + 1) == content.size;

        var expanderClick = function(event) {
          if (isClick(event)) {
            _this.onChangeExpanded(event, index);
          }
        };

        return React.createElement(
          'div',
          {
            'key': collection.get('key'),
            'className': toggleHiddenClass(collection, 'visible')
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
              'className': toggleHiddenClass(collection, 'expanded')
            },
            collection.get('functions').map(function(entry, subIndex, entries) {
              var isLastEntry = isLast && (subIndex + 1) === entries.size;
              return React.createElement(
                'li',
                {
                  'key': entry.get('key'),
                  'className': toggleHiddenClass(entry, 'visible')
                },
                React.createElement(
                  'a',
                  {
                    'href': entry.get('href'),
                    'onClick': _this.onClickFuncName,
                    'ref': isLastEntry ? focusLastRefCallback : undefined
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
            'i',
            {
              'aria-hidden': true,
              'className': 'fa fa-search'
            }
          ),
          React.createElement(
            'input',
            {
              'autoFocus': getComputedStyle(mobileMenu.parentNode).display == 'none',
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

  /*--------------------------------------------------------------------------*/

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

        RunKit.createNotebook({
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
    toggleMobileMenu();
  });

  // Close the mobile menu.
  docs.addEventListener('click', function() {
    toggleMobileMenu(false);
  });

  // Change the documentation URL.
  versionSelect.addEventListener('change', function(event) {
    var value = event.target.value;
    if (value) {
      location.href = value == '1.3.1'
        ? '{{ site.links.docs_v1 }}'
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
