/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

import { GatsbyNode } from "gatsby"
// You can delete this file if you're not using it
import path from 'path'
import uniq from 'lodash/uniq'
import uniqBy from 'lodash/uniqBy'

// TODO: use from src/utils once gatsby-node.js is converted to TypeScript
// duplicated for now
function normalizeCategory(category: string) {
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

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({ stage, loaders, actions }) => {
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

export const createPages: GatsbyNode["createPages"] = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions

  // Query for markdown nodes to use in creating pages.
  const result = await graphql<Queries.AllMethodsQuery>(
    `
      query AllMethods {
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

  if (!result.data) {
    reporter.panicOnBuild(`Could not get data out of the query`)
    return
  }

  const allMethods = result.data.allLodashMethod.group.flatMap((group) => group.edges)
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
  const getNormalizedCategory = (method: typeof allMethodsFromLatest[number]) => {
    if (!method.node.category) {
      reporter.panicOnBuild(`Category of '${method.node.name}' was null`)
      throw Error()
    }
    return normalizeCategory(method.node.category)
  }
  const categories = uniq(allMethodsFromLatest.map(getNormalizedCategory))
  categories.forEach((category) => {
    const path = `/docs/${category.toLowerCase()}`
    console.log(`Creating page for category ${path}`)
    createPage({
      path,
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
    const normalizedCategory = normalizeCategory(category!)

    if (!methodName) {
      return
    }

    if (version === latestVersion) {
      const path = `/docs/${normalizedCategory.toLowerCase()}/${methodName}`
      console.log(`Creating page for method ${path}`)
      createPage({
        path,
        component: methodPageTemplate,
        // In your blog post template's graphql query, you can use pagePath
        // as a GraphQL variable to query for data from the markdown file.
        context: {
          layout: "docs",
          methodName,
        },
      })
    }

    const path = `/docs/${version}/${normalizedCategory.toLowerCase()}/${methodName}`
    console.log(`Creating page for method ${path}`)
    createPage({
      path,
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
