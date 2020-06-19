import useWindowScrollPosition from "@rehooks/window-scroll-position"
import cx from "classnames"
import { Link } from "gatsby"
import React, { memo } from "react"
import Select from "../Select"
import * as SC from "./styles"

interface IHeaderProps {
  isScrolled: boolean
}

const Header = ({ isScrolled }: IHeaderProps): JSX.Element => (
  <SC.HeaderWrapper className={cx({ "is-scrolled": isScrolled })}>
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

// to avoid excessive rerenders, Header is wrapped into React.memo
const MemodHeader: React.MemoExoticComponent<typeof Header> = memo(Header)

const HeaderWrapper = (): JSX.Element => {
  // HACK: since useWindowScrollPosition cannot compile on Node and is replaced,
  // we pass it a fallback dummy object
  const position =
    typeof useWindowScrollPosition === "function" ? useWindowScrollPosition() : { x: 0, y: 0 }
  const isScrolled = position.y !== 0

  return <MemodHeader isScrolled={isScrolled} />
}

export default HeaderWrapper
