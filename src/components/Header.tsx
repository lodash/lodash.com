import React from "react"
import styled from "styled-components"

interface HeaderProps {
  siteTitle?: string
}

const HeaderWrapper = styled.header`
  background: #171f26;
  padding: 24px;
`

const Header: React.SFC<HeaderProps> = ({ siteTitle }) => (
  <HeaderWrapper>hello from header</HeaderWrapper>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
