import { Link } from "gatsby"
import { darken } from "polished"
import styled, { css } from "styled-components"

export const Sidebar = styled.aside`
  background: #293845;
  flex: 0 0 320px;
  width: 320px;
  padding: 32px 16px;
  position: fixed;
  height: 100vh;
  z-index: 1;

  .ps__rail-y {
    background-color: transparent !important;
  }

  .ps__thumb-y {
    background-color: #1f2a34 !important;
  }

  .scrollbar-container::before {
    pointer-events: none;
    position: fixed;
    content: "";
    display: block;
    left: 0;
    bottom: 0;
    width: 320px;
    height: 142px;
    background: linear-gradient(
      0deg,
      rgba(41, 56, 69, 1) 30%,
      rgba(41, 56, 69, 0) 100%
    );
    transition: opacity 1s;
  }

  &:hover .scrollbar-container::before {
    opacity: 0;
  }
`

export const MethodType = styled.div`
  & + & {
    margin-top: 32px;
  }
`

export const MethodTypeTitle = styled.h4`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
`

export const Methods = styled.div`
  margin-left: 4px;
  border-left: 1px dashed #6a7580;
  padding-left: 16px;
`

export const StyledMethodLink = styled(Link)<{ isFocused: boolean }>`
  color: #91a0ae;
  font-size: 16px;
  line-height: 18px;
  padding: 4px 0;
  text-decoration: none;
  letter-spacing: 1px;

  &.active {
    color: #fff !important;
  }

  &:hover,
  &:focus {
    color: ${darken(0.1, "#91a0ae")};
  }

  ${props =>
    props.isFocused &&
    css`
      background: #3492ff;
      box-shadow: -2px 0 0 2px #3492ff, 2px 0 0 2px #3492ff;
      color: #fff;
    `}
`

const MinMax = styled.div`
  width: 12px;
  height: 12px;
  line-height: 12px;
  background: #fff;
  border-radius: 2px;
  color: #31363b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`

export const Min = styled(MinMax)`
  &:before {
    content: "-";
  }
`

export const Max = styled(MinMax)`
  &:before {
    content: "+";
  }
`
