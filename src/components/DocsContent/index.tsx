import { navigate } from "gatsby"
import React, { memo } from "react"
import { AutoSizer, CellMeasurer, CellMeasurerCache, List, ListRowProps } from "react-virtualized"
import { IMethod as IMethodInterface } from "../../types"
import Header from "../Header"
import Method from "../Method"
import * as SC from "./styles"

interface IDocsContentProps {
  methods: IMethodInterface[]
}

const methodFromPath = (props: any): string => {
  const [, method] = props["*"].split("/")

  return method
}

const DocsContent = (props: IDocsContentProps): JSX.Element => {
  const currentMethod = methodFromPath(props)
  const cache = new CellMeasurerCache({ defaultHeight: 700, fixedWidth: true })

  const SingleMethod = ({ name }: { name: string }) => {
    const method = props.methods.find(({ node: m }) => m.name === name) as IMethodInterface
    return <Method method={method.node} />
  }

  function rowRenderer({ index, key, parent, style }: ListRowProps): JSX.Element {
    const { node: method } = props.methods[index]

    // If row content is complex, consider rendering a light-weight placeholder while scrolling.
    const content = <Method key={`${method.category}-${method.name}-${index}`} method={method} />

    return (
      <CellMeasurer cache={cache} columnIndex={0} key={key} parent={parent} rowIndex={index}>
        <div style={style}>{content}</div>
      </CellMeasurer>
    )
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
          <AutoSizer>
            {({ width, height }) => (
              <List
                rowRenderer={rowRenderer}
                width={width}
                height={height}
                rowHeight={cache.rowHeight}
                rowCount={props.methods.length}
              />
            )}
          </AutoSizer>
        )}
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default memo(DocsContent)
