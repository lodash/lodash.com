// https://github.com/googlefonts/tools/blob/master/experimental/make_kit.py
// https://github.com/filamentgroup/glyphhanger/blob/master/index.js

// Installation:
// pip install fonttools brotli zopfli

const childProcess = require('child_process');

try {
  childProcess.execSync('pyftsubset --help');
} catch (err) {
  throw new Error(
    'Subsetting tool not available. How to install: `pip install fonttools brotli zopfli`'
  );
}

const pify = require('pify');
const fs = require('fs-extra');
const getTemporaryFilePath = require('gettemporaryfilepath');

require('promise.prototype.finally').shim();

const allowedFormats = ['woff', 'woff2'];

const execFile = pify(childProcess.execFile);

function subsetLocalFont(inputFile, format, unicodes = '*') {
  if (!allowedFormats.includes(format)) {
    throw new Error(
      `Invalid output format: \`${format}\`. Allowed formats: ${allowedFormats
        .map(t => `\`${t}\``)
        .join(', ')}`
    );
  }

  const tempOutputFileName = getTemporaryFilePath({
    prefix: 'output-',
    suffix: `.${format}`
  });

  const args = [
    inputFile,
    `--output-file=${tempOutputFileName}`,
    '--obfuscate_names',
    `--flavor=${format}`,
    `--unicodes=${unicodes.join(',')}`
  ];

  if (format === 'woff') {
    args.push('--with-zopfli');
  }

  return execFile('pyftsubset', args)
    .catch(err => {
      if (
        err.message.includes(
          'fontTools.ttLib.TTLibError: Not a TrueType or OpenType font (not enough data)'
        )
      ) {
        throw new Error('Not a TrueType or OpenType font');
      }

      throw err;
    })
    .then(() => fs.readFile(tempOutputFileName))
    .finally(() => {
      fs.unlink(tempOutputFileName, () => {});
    });
}

module.exports = subsetLocalFont;
