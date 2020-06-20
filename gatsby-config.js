module.exports = {
  siteMetadata: {
    title: `Lodash documentation`,
    description: `A modern JavaScript utility library delivering modularity, performance & extras. Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers,
    objects, strings, etc.`,
    author: `@jdalton`,
  },
  plugins: [
    `gatsby-plugin-react-helmet`,
    {
      resolve: `gatsby-plugin-create-client-paths`,
      options: { prefixes: [`/docs/*`] },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: "gatsby-source-lodash",
      options: {
        versions: [
          {
            version: "4.17.11",
            url: "https://raw.githubusercontent.com/lodash/lodash/4.17.11-npm/lodash.js",
          },
          {
            version: "3.10.1",
            url: "https://raw.githubusercontent.com/lodash/lodash/3.10.1-npm/index.js",
          },
          {
            version: "2.4.2",
            url: "https://raw.githubusercontent.com/lodash/lodash/2.4.2/lodash.js",
          },
          {
            version: "1.3.1",
            url: "https://raw.githubusercontent.com/lodash/lodash/1.3.1/lodash.js",
          },
        ],
      },
    },
    `gatsby-plugin-react-svg`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-styled-components`,
    `gatsby-plugin-polished`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Lodash documentation`,
        short_name: `Lodash`,
        start_url: `/`,
        background_color: `#ffffff`,
        theme_color: `#3492ff`,
        display: `minimal-ui`,
        icon: `src/images/favicon.png`, // This path is relative to the root of the site.
      },
    },
    // this (optional) plugin enables Progressive Web App + Offline functionality
    // To learn more, visit: https://gatsby.dev/offline
    // 'gatsby-plugin-offline',
  ],
}
