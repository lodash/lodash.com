import { navigate } from "gatsby"
import React from "react"
import Header from "../Header"
import Method from "../Method"
import * as SC from "./styles"

interface DocsContentProps {
  methods: any
}

const methodFromPath = (props: any) => {
  const [, method] = props["*"].split("/")

  return method
}

const DocsContent = (props: DocsContentProps): JSX.Element => {
  const currentMethod = methodFromPath(props)
  const { methods } = props

  return (
    <SC.DocsContentWrapper>
      <Header />
      <SC.Content>
        {currentMethod && (
          <SC.SeeAll onClick={() => navigate("/docs")} type="primary">
            ← See all
          </SC.SeeAll>
        )}
        {/* TODO: optimize performance */}
        {methods
          .filter(
            ({ node: method }) =>
              !currentMethod || method.name === currentMethod
          )
          /* TODO: get rid of i, currently a dirty fix because Seq-chain is not unique */
          .map((methodNode, i) => {
            const { node: method } = methodNode
            return (
              <Method
                key={`${method.category}-${method.name}-${i}`}
                method={method}
              />
            )
          })}
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default DocsContent
