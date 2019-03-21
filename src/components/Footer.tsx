import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Container from "./Container"

const FooterWrapper = styled.footer`
  margin-top: 32px;
  padding: 32px 0;
  background: #171f26;
`

const StyledLink = styled(Link)`
  color: #9cb2ff;
  text-decoration: none;
`

const Footer = (): JSX.Element => (
  <FooterWrapper>
    <Container>
      <p>
        Site made with ❤️ by <StyledLink to="/">@veksenn</StyledLink> &{" "}
        <StyledLink to="/">@zthall</StyledLink>.
        <br />
        Maintained by the <StyledLink to="/">core team</StyledLink> with help
        from <StyledLink to="/">our contributors</StyledLink>.
      </p>
    </Container>
  </FooterWrapper>
)

export default Footer
