import { graphql } from "gatsby"
import React from "react"

const MethodPage = (props: any) => {
  console.log(props)

  return (
    <>
      page for <b>{props.data.lodashMethod.name}</b> method
    </>
  )
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
