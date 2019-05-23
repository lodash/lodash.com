import styled from "styled-components"
import SearchIcon from "../../images/search.svg"

export const SearchInputWrapper = styled.div<{ focused: boolean }>`
  display: flex;
  background: #1f2a34;
  color: #fff;
  font-size: 17px;
  padding: 12px 16px;
  cursor: pointer;
  transition: 0.3s background;
  align-items: center;
  margin-bottom: 32px;
  border: 2px solid ${props => (props.focused ? "#3492ff" : "#1f2a34")};
`

export const StyledSearchIcon = styled(SearchIcon)`
  fill: #fff;
  width: 14px;
  flex: 0 0 14px;
  height: auto;
`

export const SearchInput = styled.input`
  margin-left: 14px;
  border: 0;
  background: transparent;
  color: #fff;
  flex: 1 0 auto;

  &:focus {
    outline: 0;
  }
`
