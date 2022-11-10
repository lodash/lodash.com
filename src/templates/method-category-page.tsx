import { graphql } from "gatsby"
import React from "react"
import MultipleMethod from "../components/DocsContent/multiple"
import { IMethod } from "../types"

const MethodCategoryPage = (props: any) => {
  const methods = props.data.allLodashMethod.edges as IMethod[]

  return <MultipleMethod methods={methods} />
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
