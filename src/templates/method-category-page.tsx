import { graphql } from "gatsby"
import React from "react"
import MultipleMethod from "../components/DocsContent/multiple"
import SEO from "../components/SEO"
import { IMethod } from "../types"

const MethodCategoryPage = (props: any) => {
  const methods = props.data.allLodashMethod.edges as IMethod[]

  return (
    <>
      <SEO title={`${props.pageContext.categoryName} methods`} />
      <MultipleMethod category={props.pageContext.categoryName} methods={methods} />
    </>
  )
}

export default MethodCategoryPage

export const query = graphql`
  query MethodCategoryQuery($categoryName: String!) {
    allLodashMethod(filter: { category: { eq: $categoryName } }) {
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
`
