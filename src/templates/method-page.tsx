import { graphql } from "gatsby"
import React from "react"
import SingleMethod from "../components/DocsContent/single"
import { IMethod } from "../types"

const MethodPage = (props: any) => {
  const method = props.data.lodashMethod as IMethod["node"]

  return <SingleMethod method={method} />
}

export default MethodPage

export const query = graphql`
  query MethodQuery($methodName: String!) {
    lodashMethod(name: { eq: $methodName }) {
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
`
