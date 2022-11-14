import { navigate } from "gatsby"
import React from "react"
import Button from "../Button"
import Code from "../Code"
import * as S from "./styles"

const Hero = (): JSX.Element => (
  <S.HeroWrapper>
    <S.StyledContainer>
      <S.HeroInner>
        <S.LogoWrapper>
          <S.StyledLogo />
        </S.LogoWrapper>

        <S.Intro>
          <S.Title>
            Lodash
            <small>
              A modern JavaScript utility library delivering modularity, performance & extras.
            </small>
          </S.Title>
        </S.Intro>

        <S.Buttons>
          <Button variant="primary" onClick={() => navigate("/docs")}>
            Documentation
          </Button>
          <Button variant="secondary">FP Guide</Button>
        </S.Buttons>

        <S.AsideTitleWrapper>
          <S.AsideTitle>Usage</S.AsideTitle>
        </S.AsideTitleWrapper>

        <S.Usage>
          <Code withContainer lang="bash">{`
$ npm i lodash
# or
yarn add lodash
`}</Code>

          <Code withContainer>{`
// Load the full build.
const _ = require('lodash');
// Load the core build.
const _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
const fp = require('lodash/fp');
 
// Load method categories.
const array = require('lodash/array');
const object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
const at = require('lodash/at');
const curryN = require('lodash/fp/curryN');
`}</Code>

          <S.Info>
            Also available through <S.StyledLink to="/">CDN copies</S.StyledLink>
            <br />
            Lodash is released under the <S.StyledLink to="/">MIT license</S.StyledLink> & supports
            modern environments.
          </S.Info>
        </S.Usage>
      </S.HeroInner>
    </S.StyledContainer>
  </S.HeroWrapper>
)

export default Hero
