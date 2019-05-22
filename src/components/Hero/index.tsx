import { navigate } from "gatsby"
import React from "react"
import Button from "../Button"
import * as SC from "./styles"

const Hero = (): JSX.Element => (
  <SC.HeroWrapper>
    <SC.StyledContainer>
      <SC.HeroInner>
        <SC.Row>
          <SC.Aside>
            <SC.StyledLogo />
          </SC.Aside>
          <SC.Content>
            <SC.Title>
              Lodash
              <small>
                A modern JavaScript utility library delivering modularity,
                performance & extras.
              </small>
            </SC.Title>
          </SC.Content>
        </SC.Row>

        <SC.Row>
          <SC.Content>
            <SC.ButtonsWrapper>
              <Button type="primary" onClick={() => navigate("/docs")}>
                Documentation
              </Button>
              <Button type="secondary">FP Guide</Button>
            </SC.ButtonsWrapper>
          </SC.Content>
        </SC.Row>

        <SC.Row>
          <SC.Aside>
            <SC.AsideTitle>Download</SC.AsideTitle>
          </SC.Aside>
          <SC.Content>
            <SC.UL>
              <li>
                <SC.StyledLink to="/">Core build</SC.StyledLink> (
                <SC.StyledLink to="/">~4kB gzipped</SC.StyledLink>)
              </li>
              <li>
                <SC.StyledLink to="/">Full build</SC.StyledLink> (
                <SC.StyledLink to="/">~24kB gzipped</SC.StyledLink>)
              </li>
              <li>
                <SC.StyledLink to="/">CDN copies</SC.StyledLink>
              </li>
            </SC.UL>

            <SC.Info>
              Lodash is released under the{" "}
              <SC.StyledLink to="/">MIT license</SC.StyledLink> & supports
              modern environments.
              <br />
              Review the <SC.StyledLink to="/">
                build differences
              </SC.StyledLink>{" "}
              & pick one that’s right for you.
            </SC.Info>
          </SC.Content>
        </SC.Row>
      </SC.HeroInner>
    </SC.StyledContainer>
  </SC.HeroWrapper>
)

export default Hero
