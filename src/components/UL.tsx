import React from "react"
import styled from "styled-components"
import ChevronRight from "../images/right-chevron.svg"

type Item = React.ReactElement | string

interface ULProps {
  items?: Item[]
}

const ULWrapper = styled.ul`
  list-style: none;
  margin-left: 16px;
`

const LI = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0;
`

const StyledChevronRight = styled(ChevronRight)`
  display: inline-block;
  width: 10px;
  margin-right: 5px;

  path {
    fill: #96a4b2;
  }
`

const UL = ({ items = [], ...restProps }: ULProps): JSX.Element | null => {
  if (!items.length) {
    return null
  }

  return (
    <ULWrapper {...restProps}>
      {items.map(item => {
        return (
          <LI>
            <StyledChevronRight />
            {item}
          </LI>
        )
      })}
    </ULWrapper>
  )
}

export default UL
