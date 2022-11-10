import { graphql } from "gatsby"
import React from "react"
import Method from "../components/Method"
import { IMethod } from "../types"

const MethodCategoryPage = (props: any) => {
  console.log(props.data.allLodashMethod.edges)

  const methods = props.data.allLodashMethod.edges as IMethod[]

  return (
    <>
      page for <b>xx</b> category
      {methods.map((method) => (
        <Method method={method.node} isSingle={false} />
      ))}
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
