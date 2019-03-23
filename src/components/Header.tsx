import useWindowScrollPosition from "@rehooks/window-scroll-position"
import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Logo from "../images/lodash.svg"
import Select from "./Select"

const HeaderWrapper = styled.header<{ scrolled: boolean }>`
  display: flex;
  align-items: center;
  background: #171f26;
  padding: 24px;
  height: 100px;
  position: fixed;
  top: 0;
  left: 320px;
  right: 0;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0));
    height: 45px;
    pointer-events: none;
    opacity: ${({ scrolled }) => (scrolled ? 1 : 0)};
    transition: opacity 0.3s;
  }
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 2px solid #293845;
`

const StyledLogo = styled(Logo)`
  width: 58px;
`

const Header = (): JSX.Element => {
  // HACK: since useWindowScrollPosition cannot compile on Node and is replaced,
  // we pass it a fallback dummy object
  const position = typeof useWindowScrollPosition === "function" ? useWindowScrollPosition() : { x: 0, y: 0 }
  const scrolled = position.y !== 0

  return (
    <HeaderWrapper scrolled={scrolled}>
      <LogoWrapper>
        <Link to="/">
          <StyledLogo />
        </Link>
      </LogoWrapper>

      <Select
        options={[
          { value: "4.17.11", text: "4.17.11" },
          { value: "3.10.1", text: "3.10.1" },
          { value: "2.4.2", text: "2.4.2" },
          { value: "1.3.1", text: "1.3.1" },
        ]}
      />
    </HeaderWrapper>
  )
}

export default Header
