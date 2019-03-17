import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Container from "./container"

interface HeaderProps {
  siteTitle?: string
}

const HeaderWrapper = styled.header`
  background: rebeccapurple;
  margin-bottom: 1.45rem;
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
    <Container>
      <Title>
        <StyledLink to="/">{siteTitle}</StyledLink>
      </Title>
    </Container>
  </HeaderWrapper>
)

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
