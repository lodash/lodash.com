import { navigate, PageProps } from "gatsby"
import React, { memo, useEffect } from "react"
import { Virtuoso } from "react-virtuoso"
import { useLayout } from "../../hooks/useLayout"
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
  const {
    actions: { setLayoutType, setScrolled },
  } = useLayout()
  const currentMethod = methodFromPath(props.location)

  useEffect(() => {
    setLayoutType(currentMethod ? "regular" : "virtual")
  }, [currentMethod])

  const SingleMethod = ({ name }: { name: string }) => {
    const method = props.methods.find(({ node: m }) => m.name === name) as IMethod
    return <Method method={method.node} />
  }

  return (
    <SC.DocsContentWrapper>
      <SC.Content>
        {currentMethod && (
          <SC.ContentWrapper>
            <Header />
            <SC.SeeAll onClick={() => navigate("/docs")} type="primary">
              ← See all
            </SC.SeeAll>
            <SingleMethod name={currentMethod} />
          </SC.ContentWrapper>
        )}

        {/* HACK: in order to replicate standard browser behavior */}
        {/* the List element cannot receive top/bottom padding, because it uses padding itself to offset the content inside, so a fake header and footer are used,
        furthermore, the Header component needs to be offset by the width of the scrollbar, for which there is no natural way to get */}
        {!currentMethod && (
          <Virtuoso
            data={props.methods}
            components={{
              Header: () => (
                <>
                  <Header />
                  <div style={{ height: "124px" }} />
                </>
              ),
              Footer: () => <div style={{ height: "24px" }} />,
              List: React.forwardRef((listProps, ref) => {
                return <SC.ContentWrapper {...listProps} ref={ref} />
              }),
            }}
            atTopStateChange={(isTop) => {
              setScrolled(!isTop)
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
