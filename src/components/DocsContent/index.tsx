import { navigate } from "gatsby"
import React, { memo } from "react"
import {
  AutoSizer,
  CellMeasurer,
  CellMeasurerCache,
  List,
  ListRowProps,
} from "react-virtualized"
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
  const cache = new CellMeasurerCache({ defaultHeight: 700, fixedWidth: true })

  const SingleMethod = ({ name }) => {
    const method = methods.find(
      ({ node: method }) => method.name === name
    ) as MethodInterface
    return <Method method={method.node} />
  }

  function rowRenderer({
    index, // Index of row
    // isScrolling, // The List is currently being scrolled
    // isVisible, // This row is visible within the List (eg it is not an overscanned row)
    key, // Unique key within array of rendered rows
    parent, // Reference to the parent List (instance)
    style, // Style object to be applied to row (to position it);
  }: ListRowProps): JSX.Element {
    const { node: method } = methods[index]

    // If row content is complex, consider rendering a light-weight placeholder while scrolling.
    const content = (
      <Method
        key={`${method.category}-${method.name}-${index}`}
        method={method}
      />
    )

    // Style is required since it specifies how the row is to be sized and positioned.
    // React Virtualized depends on this sizing/positioning for proper scrolling behavior.
    // By default, the List component provides following style properties:
    //    position
    //    left
    //    top
    //    height
    //    width
    // You can add additional class names or style properties as you would like.
    // Key is also required by React to more efficiently manage the array of rows.
    return (
      <CellMeasurer
        cache={cache}
        columnIndex={0}
        key={key}
        parent={parent}
        rowIndex={index}
        // width={this._mostRecentWidth}
      >
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
                rowCount={methods.length}
              />
            )}
          </AutoSizer>
        )}
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default memo(DocsContent)
