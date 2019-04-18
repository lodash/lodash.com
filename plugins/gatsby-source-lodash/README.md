# Gatsby Source Lodash

A simple Gatsby Source Plugin to grab method metadata from Lodash.

## Usage

In the `gatsby-config.js` file, add `gatsby-source-lodash` to the `module.exports`.

```js
module.exports = {
  plugins: [
    ...
    {
      resolve: "gatsby-source-lodash",
      options: {
        versions: [{
          version: '4.17.11',
          url: 'https://raw.githubusercontent.com/lodash/lodash/4.17.11-npm/lodash.js',
        }]
      },
    },
    ...
  ]
}
```
