import styled from "styled-components"
import ChevronRight from "../../images/right-chevron.svg"

export const ULWrapper = styled.ul`
  list-style: none;
  margin-left: 16px;
`

export const LI = styled.li`
  display: flex;
  align-items: center;
  margin-bottom: 0;
`

export const StyledChevronRight = styled(ChevronRight)`
  display: inline-block;
  width: 10px;
  margin-right: 5px;

  path {
    fill: #96a4b2;
  }
`
