import React from "react"
import * as SC from "./styles"

type Item = React.ReactElement | string

interface IULProps {
  items?: Item[]
}

const UL = ({ items = [], ...restProps }: IULProps): JSX.Element | null => {
  if (!items.length) {
    return null
  }

  return (
    <SC.ULWrapper {...restProps}>
      {items.map((item, index) => {
        return (
          <SC.LI key={index}>
            <SC.StyledChevronRight />
            {item}
          </SC.LI>
        )
      })}
    </SC.ULWrapper>
  )
}

export default UL
