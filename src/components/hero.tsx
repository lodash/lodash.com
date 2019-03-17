import React from "react"
import styled from "styled-components"
import Container from "./container"

const HeroWrapper = styled.header`
  display: flex;
  min-height: 100vh;
  background: rebeccapurple;
  color: #fff;
  margin-bottom: 1.45rem;
`

const HeroInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 0 auto;
`

const Hero: React.SFC = () => (
  <HeroWrapper>
    <Container>
      <HeroInner>Hello from Hero</HeroInner>
    </Container>
  </HeroWrapper>
)

Hero.defaultProps = {
  siteTitle: ``,
}

export default Hero
