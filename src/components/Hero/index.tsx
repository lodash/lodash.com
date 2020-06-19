import { navigate } from "gatsby"
import React from "react"
import Button from "../Button"
import Code from "../Code"
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
                A modern JavaScript utility library delivering modularity, performance & extras.
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
            <SC.AsideTitle>Usage</SC.AsideTitle>
          </SC.Aside>
          <SC.Content>
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

            <SC.Info>
              Also available through <SC.StyledLink to="/">CDN copies</SC.StyledLink>
              <br />
              Lodash is released under the <SC.StyledLink to="/">MIT license</SC.StyledLink> &
              supports modern environments.
            </SC.Info>
          </SC.Content>
        </SC.Row>
      </SC.HeroInner>
    </SC.StyledContainer>
  </SC.HeroWrapper>
)

export default Hero
