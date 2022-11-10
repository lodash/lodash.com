import React from "react"
import * as S from "./styles"

type Item = React.ReactElement | string

interface IULProps {
  items?: Item[]
}

const UL = ({ items = [], ...restProps }: IULProps): JSX.Element | null => {
  if (!items.length) {
    return null
  }

  return (
    <S.ULWrapper {...restProps}>
      {items.map((item, index) => {
        return (
          <S.LI key={index}>
            <S.StyledChevronRight />
            {item}
          </S.LI>
        )
      })}
    </S.ULWrapper>
  )
}

export default UL
