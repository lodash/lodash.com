import { navigate } from "gatsby"
import React from "react"
import { Method as MethodInterface } from "../../types"
import Header from "../Header"
import Method from "../Method"
import * as SC from "./styles"

interface DocsContentProps {
  methods: MethodInterface[]
}

const methodFromPath = (props: any) => {
  const [, method] = props["*"].split("/")

  return method
}

const DocsContent = (props: DocsContentProps): JSX.Element => {
  const currentMethod = methodFromPath(props)
  const { methods } = props

  const SingleMethod = ({ name }) => {
    const method = methods.find(({ node: method }) => method.name === name)
    return <Method method={method.node} />
  }

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
        {currentMethod ? (
          <SingleMethod name={currentMethod} />
        ) : (
          /* TODO: get rid of i, currently a dirty fix because Seq-chain is not unique */
          methods.map((methodNode, i) => {
            const { node: method } = methodNode
            return (
              <Method
                key={`${method.category}-${method.name}-${i}`}
                method={method}
              />
            )
          })
        )}
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default DocsContent
