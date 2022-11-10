import React from "react"
import { Virtuoso } from "react-virtuoso"
import { useLayout } from "../../hooks/useLayout"
import { IMethod } from "../../types"
import Header from "../Header"
import Method from "../Method"
import Spacer from "../Spacer"
import * as S from "./styles"

interface IAllMethodsProps {
  methods: IMethod[]
}

const AllMethods = (props: IAllMethodsProps): JSX.Element => {
  const { actions: layoutActions } = useLayout()

  // HACK: in order to replicate standard browser behavior
  // the List element cannot receive top/bottom padding, because it uses padding itself to offset the content inside, so a fake header and footer are used,
  // furthermore, the Header component needs to be offset by the width of the scrollbar, for which there is no natural way to get
  return (
    <Virtuoso
      data={props.methods}
      components={{
        Header: () => (
          <>
            <Header />
            <Spacer height={124} />
          </>
        ),
        Footer: () => <Spacer height={124} />,
        List: React.forwardRef((listProps, ref) => {
          return <S.ContentWrapper {...listProps} ref={ref} />
        }),
      }}
      atTopStateChange={(isTop) => {
        layoutActions.setScrolled(!isTop)
      }}
      itemContent={(index, item) => {
        const method = item.node

        return (
          <Method
            key={`${method.category}-${method.name}-${index}`}
            method={method}
            isSingle={false}
          />
        )
      }}
      increaseViewportBy={10}
    />
  )
}

export default React.memo(AllMethods)
