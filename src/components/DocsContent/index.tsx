import { navigate, PageProps } from "gatsby"
import React, { memo } from "react"
import { Virtuoso } from "react-virtuoso"
import { IMethod } from "../../types"
import Header from "../Header"
import Method from "../Method"
import * as SC from "./styles"

interface IDocsContentProps extends PageProps {
  methods: IMethod[]
}

const methodFromPath = (location: PageProps["location"]): string => {
  const [, , method] = location.pathname.split("/")

  return method
}

const DocsContent = (props: IDocsContentProps): JSX.Element => {
  const currentMethod = methodFromPath(props.location)

  const SingleMethod = ({ name }: { name: string }) => {
    const method = props.methods.find(({ node: m }) => m.name === name) as IMethod
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

        {currentMethod ? (
          <SingleMethod name={currentMethod} />
        ) : (
          <Virtuoso
            data={props.methods}
            components={{
              List: React.forwardRef((listProps, ref) => {
                return <div {...listProps} ref={ref} />
              }),
            }}
            itemContent={(index, item) => {
              const method = item.node

              return <Method key={`${method.category}-${method.name}-${index}`} method={method} />
            }}
            increaseViewportBy={10}
          ></Virtuoso>
        )}
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default memo(DocsContent)
