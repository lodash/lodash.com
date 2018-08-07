const globby = require('globby');
const path = require('path');
const fs = require('fs-extra');
const _ = require('lodash');
const postcss = require('postcss');

const subsetLocalFont = require('./subsetLocalFont');

const patterns = [
  '*.html',
  '_layouts/*.html',
  'docs/*.html',
  'assets/js/*.js'
];

const formats = [
  // 'woff2',
  'woff'
];

const cssPath = path.resolve(__dirname, '../vendor/cdn.jsdelivr.net/fontawesome/4.7.0/css');

function unquote(str) {
  return str.replace(/^["']|["']$/g, '').replace('\\', '');
}

const iconClasses = globby(patterns)
  .then(paths => Promise.all(paths.map(path => fs.readFile(path, 'utf8'))))
  .then(files => {
    return files
      .map(content => {
        return content.match(/fa-[a-z-]+/g);
      });
  })
  .then(result => {
    return _.uniq(_.flatten(_.compact(result))).sort();
  });

const cssAst = fs.readFile(`${cssPath}/font-awesome.min.css`, 'utf8')
  .then(source => {
    const ast = postcss.parse(source);

    const fontFace = ast.nodes.find(node => node.type === 'atrule' && node.name === 'font-face');
    const srcDeclaration = fontFace.nodes.find(node => node.prop === 'src' && node.value.includes(`format('woff')`));

    const [match, href] = srcDeclaration.value.match(/url\('([^'\?]+?.woff)\?.+?'\) format\('woff'\)/);

    const originalFontPath = path.resolve(cssPath, href);

    iconClasses.then(faClasses => {
      const usedSelectors = ['.fa'].concat(faClasses.map(c => `.${c}`)).concat(faClasses.map(c => `.${c}:before`));
      const iconRules = ast.nodes
        .filter(node => node.type === 'rule' && node.selector.split(',').some(selector => usedSelectors.includes(selector.trim())));

      const codepoints = iconRules
        .map(rule => {
          return contentDeclaration = rule.nodes.find(node => node.prop === 'content');
        })
        .filter(decl => decl)
        .map(decl => unquote(decl.value));

      const styles = iconRules.map(rule => postcss.rule(rule).toString()).join('');

      const fontSources = Promise.all(formats.map(format => {
        return subsetLocalFont(originalFontPath, format, codepoints)
          .then(buffer => {
            return {
              buffer,
              format
            };
          });
      }));

      fontSources
        .then(sources => {
          return sources
            .map(source => {
              return `url(data:font/${source.format};base64,${source.buffer.toString('base64')}) format('${source.format}')`;
            })
            .join(', ');
        })
        .then(srcValue => {
          fontFace.walkDecls('src', decl => decl.remove());
          fontFace.append({ prop: 'src', value: srcValue });

          console.error(fontFace.toString() + styles);

          console.log(fontFace.toString() + styles);
        });
    });

  });
