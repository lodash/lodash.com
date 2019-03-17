import React from "react"
import styled from "styled-components"
import Logo from "../images/lodash.svg"
import Container from "./container"

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

const HeroInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
`

const Aside = styled.aside`
  display: flex;
  flex: 0 0 35%;
  padding-right: 32px;
  justify-content: flex-end;
  align-items: center;
`

const Content = styled.div`
  flex: 1 0 auto;
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

const Hero: React.SFC = () => (
  <HeroWrapper>
    <Container>
      <HeroInner>
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
      </HeroInner>
    </Container>
  </HeroWrapper>
)

Hero.defaultProps = {
  siteTitle: ``,
}

export default Hero
