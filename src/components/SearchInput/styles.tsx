import styled from "styled-components"
import SearchIcon from "../../images/search.svg"

export const SearchInputWrapper = styled.div`
  position: relative;
  display: flex;
  background: #1f2a34;
  color: #fff;
  font-size: 17px;
  padding: 12px 16px;
  cursor: pointer;
  transition: 0.3s background;
  align-items: center;
  margin-bottom: 32px;
  border: 2px solid #1f2a34;

  &.is-focused,
  &:focus-within {
    border-color: #3492ff;
  }
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

export const FocusHint = styled.div`
  background: #171f26;
  color: #91a0ae;
  position: absolute;
  right: 16px;
  width: 24px;
  height: 24px;
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  font-weight: 700;
`
