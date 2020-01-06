---
---
(function() {
  'use strict'

  var focusLast,
      searchNode,
      BitapSearcher = new Fuse().options.searchFn,
      carbonated = false,
      clickCount = 0,
      docs = document.querySelector('.doc-container'),
      focusFirst = document.querySelector('a'),
      mobileMenu = document.querySelector('.mobile-menu'),
      reQuery = /[?&]q=([^&]+)/,
      reReferSearch = /\blodash[. ](\w+)/i,
      referSearchValue = getReferSearchValue(document.referrer),
      slice = Array.prototype.slice,
      toc = document.querySelector('.toc-container'),
      urlSearchValue = getSearchQuery(location.search),
      versionMatch = location.pathname.match(/[\d.]+(?=(?:\.html)?$)/),
      versionSelect = document.getElementById('version'),
      version = versionMatch ? versionMatch[0] : '{{ site.release }}'

  function Searcher(pattern) {
    this.__engine__ = new BitapSearcher(normalizeSearchValue(pattern), { 'threshold': 0.25 })
  }

  Searcher.prototype.isMatch = function(text) {
    return this.__engine__.search(normalizeSearchValue(text)).isMatch
  }

  function carbonate() {
    if (!carbonated && typeof phantom == 'undefined' &&
        !document.hidden && navigator.onLine &&
          getComputedStyle(mobileMenu).display == 'none') {
      carbonated = true
      var script = document.createElement('script')
      script.addEventListener('error', decarbonate)
      script.id = '{{ site.carbon_ads.id }}'
      script.src = '{{ site.carbon_ads.href }}'
      toc.style.transform = 'none'
      toc.insertBefore(script, toc.firstChild)
    }
  }

  function className() {
    return slice.call(arguments).join(' ')
  }

  function collapseSpaces(string) {
    return string.replace(/\s+/g, '')
  }

  function decarbonate() {
    toc.style.transform = ''
  }

  function decode(string) {
    return decodeURIComponent(string).replace(/\+/g, ' ')
  }

  function getReferSearch(url) {
    var match = reReferSearch.exec(getSearchQuery(url))
    return match ? normalize(match[1]) : ''
  }

  function getReferSearchValue(url) {
    var pattern = getReferSearch(url)
    return _.findKey(pattern && _.prototype, function(value, key) {
      return normalize(key) == pattern
    }) || ''
  }

  function getSearchQuery(url) {
    var match = reQuery.exec(url)
    return match ? decode(match[1]) : ''
  }

  function isClick(event){
    if (event.type == 'click') {
      return true
    }
    var key = event.key || event.keyIdentifier
    if (key == ' ' || key == 'U+0020') {
      event.preventDefault()
      return true
    }
    return key == 'Enter'
  }

  function normalize(string) {
    return trim(collapseSpaces(string.toLowerCase()))
  }

  function normalizeSearchValue(string) {
    return normalize(string).replace(/^_\.?/, '')
  }

  function toggleHiddenClass(object, property) {
    return object[property] ? '' : 'hidden'
  }

  function toggleMobileMenu(state) {
    state = state === undefined ? !toc.classList.contains('open') : state
    mobileMenu.firstChild.title = (state ? 'Collapse' : 'Expand') + ' Menu'
    toc.classList[state ? 'add' : 'remove']('open')
    if (state) {
      searchNode.focus()
    }
  }

  function trim(string) {
    return string.replace(/^\s+|\s+$/g, '')
  }

  /*--------------------------------------------------------------------------*/

  var Menu = React.createClass({
    'displayName': 'Menu',

    'getInitialState': function() {
      return {
        'content': [],
        'searchFound': true,
        'searchValue': ''
      }
    },

    'componentWillMount': function() {
      // Before component mounts, use the initial HTML for its state.
      this.setState({
        'content': _.map(toc.children, function(node, key) {
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
              }
            })
          }
        })
      })
    },

    'componentDidMount': function() {
      document.addEventListener('keydown', this.onDocumentKeyDown, true)
    },

    'componentWillUnmount': function() {
      document.removeEventListener('keydown', this.onDocumentKeyDown, true)
    },

    'handleSearchChange': function(searchValue) {
      var normed = normalizeSearchValue(searchValue),
          searcher = new Searcher(searchValue),
          searchFound = false

      this.setState({
        'content': this.state.content.map(function(collection) {
          // The collection is visible if `searchValue` matches its title or
          // any of its function entries.
          var found = !normed || searcher.isMatch(collection.title),
              visible = found,
              changed = collection.visible !== visible

          var functions = collection.functions.map(function(entry) {
            var entryVis = (
              found ||
              searcher.isMatch(entry.name) ||
              searcher.isMatch(entry.href.split('#')[1])
            )
            visible || (visible = entryVis)
            searchFound || (searchFound = entryVis)
            if (entry.visible !== entryVis) {
              changed = true
              return _.assign({}, entry, { 'visible': entryVis })
            }
            return entry
          })
          return changed
            ? _.assign({}, collection, { 'functions': functions, 'visible': visible })
            : collection
        }),
        'searchFound': searchFound,
        'searchValue': searchValue
      })
    },

    'onChangeExpanded': function(event, index) {
      var content = this.state.content.slice(),
          collection = content[index]

      content[index] = _.assign({}, collection, { 'expanded': !collection.expanded })
      this.setState({ 'content': content })
    },

    'onChangeSearch': function(event) {
      this.handleSearchChange(event.target.value)
    },

    'onClickMenuItem': function() {
      if (++clickCount % 4 === 0 &&
          typeof _carbonads != 'undefined' &&
          typeof _carbonads.refresh == 'function') {
        try {
          _carbonads.refresh()
        } catch (e) {}
      }
      toggleMobileMenu(false)
    },

    'onDocumentKeyDown': function(event) {
      var key = event.key || event.keyIdentifier
      if ((key == 'Tab' || key == 'U+0009') &&
          toc.classList.contains('open') && event.target === focusLast) {
        // Restart tab cycle.
        event.preventDefault()
        focusFirst.focus()
      }
      if (key == '/' || key == 'U+002F') {
        // Don't actually type a `/` in the input.
        event.preventDefault()
        searchNode.focus()
      }
    },

    'onRefMenuItem': function(node) {
      focusLast = node
    },

    'onRefSearch': function(node) {
      searchNode = node

      // Prefill the search field based on the query string or referrer.
      this.handleSearchChange(urlSearchValue || referSearchValue)
    },

    'shouldComponentUpdate': function(nextProps, nextState) {
      return (this.state.searchFound || nextState.searchFound) &&
        (normalize(this.state.searchValue) !== normalize(nextState.searchValue) ||
          !_.isEqual(this.state.content, nextState.content))
    },

    'render': function() {
      var _this = this

      var elements = this.state.content.map(function(collection, index, content) {
        var expanded = collection.expanded,
            isLast = (index + 1) == content.size

        var expanderClick = function(event) {
          if (isClick(event)) {
            _this.onChangeExpanded(event, index)
          }
        }

        return React.createElement(
          'div',
          {
            'key': collection.key,
            'className': toggleHiddenClass(collection, 'visible')
          },
          React.createElement(
            'h2',
            {
              'className': 'collapsible-title',
              'onClick': expanderClick,
              'onKeyPress': expanderClick
            },
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
            collection.title
          ),
          React.createElement(
            'ul',
            {
              'className': toggleHiddenClass(collection, 'expanded')
            },
            collection.functions.map(function(entry, subIndex, entries) {
              var children = [entry.name],
                  isLastEntry = isLast && (subIndex + 1) == entries.size

              if (/^_\./.test(entry.name)) {
                children = [
                  React.createElement('span', { 'className': 'subtle-punctuation' }, '_.'),
                  entry.name.slice(2)
                ]
              }
              return React.createElement(
                'li',
                {
                  'key': entry.key,
                  'className': toggleHiddenClass(entry, 'visible')
                },
                React.createElement(
                  'a',
                  {
                    'href': entry.href,
                    'onClick': _this.onClickMenuItem,
                    'ref': isLastEntry ? _this.onRefMenuItem : undefined
                  },
                  React.createElement.apply(React, [
                    'code',
                    null
                  ].concat(children))
                )
              )
            })
          )
        )
      })

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
              'autoFocus': getComputedStyle(mobileMenu).display == 'none',
              'placeholder': 'Search',
              'type': 'search',
              'value': this.state.searchValue,
              'onChange': this.onChangeSearch,
              'ref': this.onRefSearch
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
      )
    }
  })

  /*--------------------------------------------------------------------------*/

  ReactDOM.render(
    React.createElement(Menu),
    toc
  )

  // Select current doc version.
  _.each(versionSelect.options, function(option) {
    if (option.value == version) {
      option.selected = true
      return false
    }
  })

  // Change the documentation URL.
  versionSelect.addEventListener('change', function(event) {
    var value = event.target.value
    if (value) {
      location.href = value == '1.3.1'
        ? '{{ site.links.docs_v1 }}'
        : '/docs/' + value + location.hash
    }
  })

  // Toggle the mobile menu.
  mobileMenu.addEventListener('click', function(event) {
    event.preventDefault()
    toggleMobileMenu()
  })

  docs.addEventListener('click', function() {
    toggleMobileMenu(false)
  })

  document.addEventListener('visibilitychange', carbonate)

  // Scroll to the chosen method entry.
  addEventListener('hashchange', function() {
    var node = document.getElementById(location.hash.slice(1))
    if (node) {
      node.scrollIntoView()
    }
  })

  function onLoad() {
    // Initialize Carbon ad.
    if (!document.hidden) {
      carbonate()
    }
    // Add REPL buttons.
    if ('innerText' in docs) {
      _.each(docs.querySelectorAll('.highlight.js'), function(div) {
        var button = document.createElement('a'),
            parent = div.parentNode

        button.classList.add('btn-repl')
        button.textContent = 'Try in REPL'
        button.style.display = navigator.onLine ? '' : 'none'
        button.addEventListener('click', function() {
          if (typeof RunKit == 'undefined') {
            return
          }

          var source = div.innerText
          parent.removeChild(div)
          parent.removeChild(button)
          RunKit.createNotebook({
            'element': parent,
            'nodeVersion': '*',
            'preamble': [
              'var _ = require("lodash@' + versionSelect.value + '")',
              '_.assign(global, require("lodash-doc-globals"))',
              'Object.observe = _.noop'
            ].join('\n'),
            'source': source,
            'theme': 'atom-light-syntax',
            'onLoad': function(notebook) {
              if (!RunKit.version) {
                var iframe = parent.lastElementChild
                iframe.style.cssText = 'height:' + iframe.style.height
                iframe.classList.add('repl')
              }
              notebook.evaluate()
            }
          })
        })
        parent.appendChild(button)
      })
    }
  }

  if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', onLoad)
  } else {
    addEventListener('load', onLoad)
  }
}())
