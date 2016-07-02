const menuElem = document.querySelector('.toc-container'),
      mobileMenu = document.querySelector('.mobile-menu a'),
      replElems = document.querySelectorAll('.highlight.js'),
      versionElem = document.getElementById('version');

const requireLodash = "const _ = require('lodash');";

const Menu = React.createClass({
  getInitialState: () => {
    return {
      content: [],
      searchVal: '',
    }
  },

  componentWillMount: function() {
    // Before component mounts, use the initial html for initial state
    let content = menuElem.children;
    content = _.map(content, elem => {
      return {
        title: elem.querySelector('h2 code').innerText,
        expanded: true,
        functions: _.map(elem.querySelectorAll('ul li a'), val => {
          return {
            name: val.innerText,
            href: val.getAttribute('href'),
          }
        }),
      }
    });

    this.setState({
      content: content,
    });
  },

  onChangeExpanded: function(title) {
    const content = this.state.content.map(value => {
      if (value.title === title) {
        value.expanded = !value.expanded;
      }
      return value;
    });

    this.setState({
      content: content
    });
  },

  onChangeSearch: function(e) {
    this.setState({
      searchVal: e.target.value,
    });
  },

  onClickFuncName: function() {
    // Close mobile menu
    menuElem.classList.remove('open');

    // Empty search box
    _.defer(() => {
      this.setState({
        searchVal: ''
      });
    });
  },

  render: function() {
    const { content, searchVal } = this.state;

    const filtered =
      content
        .map(collection => {
          // If search is for collection title, return collection
          if (collection.title.toLowerCase().includes(searchVal.toLowerCase())) {
            return collection;
          }
          // Else if search is for func, return matching functions
          return {
            title: collection.title,
            expanded: collection.expanded,
            functions: collection.functions.filter(
              func => func.name.toLowerCase().includes(searchVal.toLowerCase())
            ),
          };
        })
        .filter(collection => collection.functions.length > 0);

    const collections = filtered.map(collection => {
      return (
        <div>
          <h2>
            <span
              className={ collection.expanded ? 'fa fa-minus-square-o' : 'fa fa-plus-square-o' }
              style={{ marginRight: 10, fontSize: 14, cursor: 'pointer' }}
              onClick={this.onChangeExpanded.bind(this, collection.title)}>
            </span>
            {collection.title}
          </h2>
          {
            !collection.expanded
            ? ''
            : <ul>
                {
                  collection.functions.map(func => {
                    return (
                      <li>
                        <a
                          href={ func.href }
                          onClick={ this.onClickFuncName }>
                          <code>{ func.name }</code>
                        </a>
                      </li>
                    );
                  })
                }
              </ul>
          }
        </div>
      )
    });

    return (
      <div>
        <div className="search">
          <span className="fa fa-search"></span>
          <input
            type="search"
            placeholder="Search"
            value={ this.state.searchVal }
            onChange={ this.onChangeSearch.bind(this) } />
        </div>
        {collections}
      </div>
    );
  },
});

ReactDOM.render(
  <Menu />,
  menuElem
);

_.forEach(replElems, pre => {
  const button = document.createElement('a');
  const parent = pre.parentElement;

  button.classList.add('btn-repl');
  button.innerText = 'Try in REPL';
  parent.appendChild(button);
  parent.style.position = 'relative';

  button.addEventListener('click', () => {
    const source = [requireLodash, pre.innerText].join('\n\n');

    pre.style.minHeight = pre.scrollHeight + 'px';
    pre.innerHTML = '';
    pre.classList.add('repl');

    _.delay(() => {
      parent.removeChild(button);
      const notebook = Tonic.createNotebook({
        // the parent element for the new notebook
        element: pre,

        // specify the source of the notebook
        source: source,

        onLoad: notebook => notebook.evaluate(null),
      });
    }, 500);

  });
});

mobileMenu.addEventListener('click', () => {
  menuElem.classList.toggle('open');
});

versionElem.addEventListener('change', e => {
  const { value } = e.target;
  if (value) {
    location.href = `/docs/${ value }`;
  }
});
