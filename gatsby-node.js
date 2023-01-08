/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")
const uniq = require("lodash/uniq")
const uniqBy = require("lodash/uniqBy")
const { getCssText } = require('./stitches.config');

module.onBodyRender = ({ setHeadComponents }) => {
  setHeadComponents([
    `<style
      id="stitches"
      // rome-ignore lint/security/noDangerouslySetInnerHtml: <explanation>
      dangerouslySetInnerHTML={{
        __html: ${getCssText()},
      }}
    />`,
  ]);
};

// TODO: use from src/utils once gatsby-node.js is converted to TypeScript
// duplicated for now
function normalizeCategory(category) {
  switch (category) {
    case "Arrays":
      return "Array"
    case "Collections":
      return "Collection"
    case "Functions":
      return "Function"
    case "Utilities":
      return "Util"
    case "Chaining":
      return "Seq"
    default:
      return category
  }
}

exports.onCreateWebpackConfig = ({ stage, loaders, actions }) => {
  if (stage === "build-html") {
    actions.setWebpackConfig({
      module: {
        rules: [
          {
            test: /window-scroll-position/,
            use: loaders.null(),
          },
        ],
      },
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allLodashMethod {
          group(field: { category: SELECT }) {
            field
            fieldValue
            totalCount
            edges {
              node {
                id
                name
                category
                aliases
                desc
                example
                since
                params {
                  type
                  name
                  desc
                }
                call
                lineNumber
                version
              }
            }
          }
        }
      }
    `
  )

  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }

  const allMethods = result.data.allLodashMethod.group.map((group) => group.edges).flat()
  const allVersions = uniqBy(allMethods, "node.version").map((method) => method.node.version)
  const latestVersion = allVersions.sort().at(-1)
  const allMethodsFromLatest = allMethods.filter((method) => method.node.version === latestVersion)

  createPage({
    path: `/docs/`,
    component: path.resolve(`src/pages/docs.tsx`),
  })

  // Create pages for each category.
  // TODO: handle strategy for normalizing/redirecting across versions
  // for example, latest version has "Array" category, but older versions have "Arrays"
  // some are even quite different, like "Chaining" vs "Seq"
  const methodCategoryPageTemplate = path.resolve(`src/templates/method-category-page.tsx`)
  const categories = uniq(allMethodsFromLatest.map((method) => method.node.category))
  categories.forEach((category) => {
    createPage({
      path: `/docs/${category.toLowerCase()}`,
      component: methodCategoryPageTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        layout: "docs",
        categoryName: category,
      },
    })
  })

  // Create pages for each markdown file.
  const methodPageTemplate = path.resolve(`src/templates/method-page.tsx`)
  allMethods.forEach((method) => {
    const methodName = method.node.name
    const category = method.node.category
    const version = method.node.version

    if (!methodName) {
      return
    }

    if (version === latestVersion) {
      createPage({
        path: `/docs/${category.toLowerCase()}/${methodName}`,
        component: methodPageTemplate,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          layout: "docs",
          methodName,
        },
      })
    }

    createPage({
      path: `/docs/${version}/${category.toLowerCase()}/${methodName}`,
      component: methodPageTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        layout: "docs",
        methodName,
      },
    })
  })
}
