import useWindowScrollPosition from "@rehooks/window-scroll-position"
import { Link } from "gatsby"
import React from "react"
import Select from "../Select"
import * as SC from "./styles"

const Header = (): JSX.Element => {
  // HACK: since useWindowScrollPosition cannot compile on Node and is replaced,
  // we pass it a fallback dummy object
  const position =
    typeof useWindowScrollPosition === "function"
      ? useWindowScrollPosition()
      : { x: 0, y: 0 }
  const scrolled = position.y !== 0

  return (
    <SC.HeaderWrapper scrolled={scrolled}>
      <SC.LogoWrapper>
        <Link to="/">
          <SC.StyledLogo />
        </Link>
      </SC.LogoWrapper>

      <Select
        options={[
          { value: "4.17.11", text: "4.17.11" },
          { value: "3.10.1", text: "3.10.1" },
          { value: "2.4.2", text: "2.4.2" },
          { value: "1.3.1", text: "1.3.1" },
        ]}
      />
    </SC.HeaderWrapper>
  )
}

export default Header
