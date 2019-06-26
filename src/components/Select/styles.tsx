import styled from "styled-components"
import Triangle from "../../images/triangle.svg"

export const SelectWrapper = styled.div`
  position: relative;
  font-weight: bold;
  user-select: none;
`

export const Arrow = styled(Triangle)`
  margin-left: 8px;
  width: 11px;
`

export const Selected = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 21px;
  background: #293845;
  color: #fff;
  border-radius: 3px;
  position: relative;
  z-index: 1;
  cursor: pointer;
`

export const Options = styled.div<{ open: boolean }>`
  background: #293845;
  color: #fff;
  border-radius: 3px;
  padding: 8px 0;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 0.3s, margin-top 0.3s;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  z-index: 10;
  margin-top: ${({ open }) => (open ? "4px" : "-30px")};
  pointer-events: ${({ open }) => (open ? "auto" : "none")};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3), 0 7px 18px rgba(0, 0, 0, 0.2);
`

export const Option = styled.div`
  padding: 4px 21px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`
