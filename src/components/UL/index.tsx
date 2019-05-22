import React from "react"
import * as SC from "./styles"

type Item = React.ReactElement | string

interface ULProps {
  items?: Item[]
}

const UL = ({ items = [], ...restProps }: ULProps): JSX.Element | null => {
  if (!items.length) {
    return null
  }

  return (
    <SC.ULWrapper {...restProps}>
      {items.map(item => {
        return (
          <SC.LI>
            <SC.StyledChevronRight />
            {item}
          </SC.LI>
        )
      })}
    </SC.ULWrapper>
  )
}

export default UL
