import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

interface HeaderProps {
  siteTitle?: string
}

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
`

const HeaderInner = styled.div`
  margin: 0 auto;
  max-width: 960px;
  padding: 1.45rem 1.0875rem;
`

const Title = styled.h1`
  margin: 0;
`

const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
`

const Header: React.SFC<HeaderProps> = ({ siteTitle }) => (
  <HeaderWrapper>
    <HeaderInner>
      <Title>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </Title>
    </HeaderInner>
  </HeaderWrapper>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
