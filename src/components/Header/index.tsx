import useWindowScrollPosition from "@rehooks/window-scroll-position"
import useScrollbarSize from "react-scrollbar-size"
import cx from "classnames"
import { Link } from "gatsby"
import React, { memo } from "react"
import Select from "../Select"
import * as SC from "./styles"
import { useSearch } from "../../hooks/useSearch"
import { useLayout } from "../../hooks/useLayout"

interface IHeaderProps {
  isScrolled: boolean
  style?: React.CSSProperties
}

const Header = ({ isScrolled, style }: IHeaderProps): JSX.Element => {
  const { state: searchState, actions: searchActions } = useSearch()

  return (
    <SC.HeaderWrapper style={style} className={cx({ "is-scrolled": isScrolled })}>
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
        value={searchState.version}
        onChange={(value) => {
          searchActions.updateVersion(value)
        }}
      />
    </SC.HeaderWrapper>
  )
}

// to avoid excessive rerenders, Header is wrapped into React.memo
const MemodHeader: React.MemoExoticComponent<typeof Header> = memo(Header)

const HeaderWrapper = (): JSX.Element => {
  const { state: layoutState } = useLayout()
  const { width: scrollbarWidth } = useScrollbarSize()

  // HACK: since useWindowScrollPosition cannot compile on Node and is replaced,
  // we pass it a fallback dummy object
  const scrollPosition =
    typeof useWindowScrollPosition === "function" ? useWindowScrollPosition() : { x: 0, y: 0 }

  const isScrolledByLayout = React.useMemo(() => {
    if (layoutState.layoutType === "virtual") {
      return layoutState.isScrolled
    }

    return scrollPosition.y !== 0
  }, [layoutState.isScrolled, scrollPosition])

  return (
    <MemodHeader
      style={{ right: layoutState.layoutType === "virtual" ? scrollbarWidth : 0 }}
      isScrolled={isScrolledByLayout}
    />
  )
}

export default HeaderWrapper
