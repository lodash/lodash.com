'use strict';

const _ = require('lodash');
const path = require('path');
const manifest = require('./manifest.json');

/*----------------------------------------------------------------------------*/

module.exports = {
  'assets/img/lodash.svg': _(manifest.icons)
    .reject(['sizes', 'any'])
    .map(icon => {
      const sizes = icon.sizes.split('x');
      return {
        'rename': path.basename(icon.src),
        'width': sizes[0],
        'height': sizes[1],
        'flatten': true
      };
    })
    .push(
      {
        'rename': 'mstile-150x150.png',
        'width': '150',
        'height': '150',
        'flatten': true
      },
      {
        'rename': 'apple-touch-180x180.png',
        'width': '180',
        'height': '180',
        'flatten': true
      }
    )
    .value(),
  'icons/favicon-16x16.png': [
    {
      'rename': 'favicon-32x32.png',
      'width': '32',
      'height': '32',
      'interpolation': 'nearest'
    },
    {
      'rename': 'favicon-48x48.png',
      'width': '48',
      'height': '48',
      'interpolation': 'nearest'
    }
  ],
};
