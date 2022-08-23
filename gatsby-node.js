/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

// You can delete this file if you're not using it

const path = require("path")

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
          group(field: category) {
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

  const allMethods = result.data.allLodashMethod.group
    .map((group) => group.edges)
    .flat()
    .filter((method) => method.node.version === "4.17.11")

  createPage({
    path: `/docs/`,
    component: path.resolve(`src/pages/docs.tsx`),
  })

  // Create pages for each markdown file.
  const methodPageTemplate = path.resolve(`src/templates/method-page.tsx`)
  allMethods.forEach((method) => {
    const methodName = method.node.name
    if (!methodName) {
      return
    }

    createPage({
      path: `/docs/${methodName}`,
      component: methodPageTemplate,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        methodName,
      },
    })
  })
}
