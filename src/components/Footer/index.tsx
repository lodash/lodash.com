import React from "react"
import Container from "../Container"
import * as SC from "./styles"

const Footer = (): JSX.Element => (
  <SC.FooterWrapper>
    <Container>
      <p>
        Site made with ❤️ by <SC.StyledLink to="/">@veksenn</SC.StyledLink> &{" "}
        <SC.StyledLink to="/">@zthall</SC.StyledLink>.
        <br />
        Maintained by the <SC.StyledLink to="/">core team</SC.StyledLink> with
        help from <SC.StyledLink to="/">our contributors</SC.StyledLink>.
      </p>
    </Container>
  </SC.FooterWrapper>
)

export default Footer
