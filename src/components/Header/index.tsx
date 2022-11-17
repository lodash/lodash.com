// import useScrollbarSize from "react-scrollbar-size"
import cx from "classnames"
import { Link } from "gatsby"
import React from "react"
import Select from "../Select"
import * as S from "./styles"
import { useSearch } from "../../hooks/useSearch"
import { useScrollPosition } from "../../hooks/useScrollPosition"

const Header = (): JSX.Element => {
  const { state: searchState, actions: searchActions } = useSearch()
  const scrollPosition = typeof useScrollPosition === "function" ? useScrollPosition() : 0

  const isScrolled = scrollPosition !== 0

  return (
    <S.HeaderWrapper className={cx({ "is-scrolled": isScrolled })}>
      <S.LogoWrapper>
        <Link to="/">
          <S.StyledLogo />
        </Link>
      </S.LogoWrapper>

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
    </S.HeaderWrapper>
  )
}

export default React.memo(Header)
