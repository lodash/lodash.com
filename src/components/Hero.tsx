import { Link, navigate } from "gatsby"
import React from "react"
import styled from "styled-components"
import Logo from "../images/lodash.svg"
import Button from "./Button"
import Container from "./Container"

const HeroWrapper = styled.header`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(
      135deg,
      rgba(60, 69, 78, 1) 0%,
      rgba(60, 69, 78, 0) 150%
    ),
    linear-gradient(180deg, rgba(34, 85, 144, 1) 0%, rgba(52, 146, 255, 1) 100%);
  color: #fff;
  margin-bottom: 1.45rem;
`

const StyledContainer = styled(Container)`
  justify-content: center;
`

const HeroInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
`

const Row = styled.div`
  display: flex;
  width: 100%;

  & + & {
    margin-top: 32px;
  }
`

const Aside = styled.aside`
  display: flex;
  flex: 0 0 35%;
  padding-right: 32px;
  justify-content: flex-end;
  align-items: center;
  font-weight: 700;
`

const AsideTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  align-self: flex-start;
`

const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1 0 65%;
  font-size: 17px;
  margin-left: 35%;

  ${Aside} + & {
    margin-left: 0;
  }
`

const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin: 0;

  small {
    margin-top: 8px;
    font-size: 20px;
    color: #b6c7d9;
    display: block;
    font-weight: 400;
  }
`

const StyledLogo = styled(Logo)`
  width: 125px;
`

const ButtonsWrapper = styled.div`
  display: flex;
`

const UL = styled.ul`
  list-style: none;
  margin-left: 0;

  li {
    margin: 0;
  }
`

const StyledLink = styled(Link)`
  color: #fff;
  border-bottom: 1px solid #75b5ff;
  text-decoration: none;
  white-space: nowrap;
`

const Info = styled.p`
  color: #ceddf7;
  font-size: 15px;
`

const Hero = (): JSX.Element => (
  <HeroWrapper>
    <StyledContainer>
      <HeroInner>
        <Row>
          <Aside>
            <StyledLogo />
          </Aside>
          <Content>
            <Title>
              Lodash
              <small>
                A modern JavaScript utility library delivering modularity,
                performance & extras.
              </small>
            </Title>
          </Content>
        </Row>

        <Row>
          <Content>
            <ButtonsWrapper>
              <Button type="primary" onClick={() => navigate("/docs")}>
                Documentation
              </Button>
              <Button type="secondary">FP Guide</Button>
            </ButtonsWrapper>
          </Content>
        </Row>

        <Row>
          <Aside>
            <AsideTitle>Download</AsideTitle>
          </Aside>
          <Content>
            <UL>
              <li>
                <StyledLink to="/">Core build</StyledLink> (
                <StyledLink to="/">~4kB gzipped</StyledLink>)
              </li>
              <li>
                <StyledLink to="/">Full build</StyledLink> (
                <StyledLink to="/">~24kB gzipped</StyledLink>)
              </li>
              <li>
                <StyledLink to="/">CDN copies</StyledLink>
              </li>
            </UL>

            <Info>
              Lodash is released under the{" "}
              <StyledLink to="/">MIT license</StyledLink> & supports modern
              environments.
              <br />
              Review the <StyledLink to="/">build differences</StyledLink> &
              pick one that’s right for you.
            </Info>
          </Content>
        </Row>
      </HeroInner>
    </StyledContainer>
  </HeroWrapper>
)

export default Hero
