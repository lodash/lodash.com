import React from "react"
import Container from "../Container"
import * as S from "./styles"

const Footer = (): JSX.Element => (
  <S.FooterWrapper>
    <Container>
      <p>
        Site made with ❤️ by <S.StyledLink to="/">@veksenn</S.StyledLink> &{" "}
        <S.StyledLink to="/">@zthall</S.StyledLink>.
        <br />
        Maintained by the <S.StyledLink to="/">core team</S.StyledLink> with help from{" "}
        <S.StyledLink to="/">our contributors</S.StyledLink>.
      </p>
    </Container>
  </S.FooterWrapper>
)

export default Footer
