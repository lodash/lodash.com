import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

import Code from "../components/Code"
import Container from "../components/Container"
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import UL from "../components/UL"

const Title = styled.h2`
  font-size: 24px;
  font-weight: 500;
`

const Subtitle = styled.h3`
  font-size: 17px;
  font-weight: 500;
`

const StyledLink = styled(Link)`
  color: #75b5ff;
  text-decoration: none;
  border-bottom: 1px solid;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <Hero />

    <Container>
      <Title>Installation</Title>
      <p>In a browser:</p>
    </Container>
    <Code>{`<script src="lodash.js"></script>`}</Code>

    <Container>
      <p>Using npm:</p>
    </Container>
    <Code>{`$ npm i -g npm
$ npm i --save lodash`}</Code>

    <Container>
      <p>In Node.js:</p>
    </Container>
    <Code>{`// Load the full build.
var _ = require('lodash');
// Load the core build.
var _ = require('lodash/core');
// Load the FP build for immutable auto-curried iteratee-first data-last methods.
var fp = require('lodash/fp');
 
// Load method categories.
var array = require('lodash/array');
var object = require('lodash/fp/object');
 
// Cherry-pick methods for smaller browserify/rollup/webpack bundles.
var at = require('lodash/at');
var curryN = require('lodash/fp/curryN');
`}</Code>

    <Container>
      <Subtitle>Note:</Subtitle>
      <p>
        Install <StyledLink to="/">n_</StyledLink> for Lodash use in the Node.js
        &lt; 6 REPL.
      </p>

      <Title>Why Lodash?</Title>
      <p>
        Lodash makes JavaScript easier by taking the hassle out of working with
        arrays, numbers, objects, strings, etc. Lodash’s modular methods are
        great for:
      </p>

      <UL
        items={[
          "Iterating arrays, objects, & strings",
          "Manipulating & testing values",
          "Creating composite functions",
        ]}
      />

      <Title>Module Formats</Title>
      <p>Lodash is available in a variety of builds & module formats.</p>

      <UL
        items={[
          "lodash & per method packages",
          "lodash-es, babel-plugin-lodash, & lodash-webpack-plugin",
          "lodash/fp",
          "lodash-amd",
        ]}
      />

      <Title>Further Reading</Title>
      <UL
        items={[
          <StyledLink to="/">Contributing</StyledLink>,
          <StyledLink to="/">Release Notes</StyledLink>,
          <StyledLink to="/">Wiki (Changelog, Roadmap, etc.)</StyledLink>,
        ]}
      />

      <Title>Support</Title>
      <p>
        Tested in Chrome 54-55, Firefox 49-50, IE 11, Edge 14, Safari 9-10,
        Node.js 6-7, & PhantomJS 2.1.1. Automated browser & CI test runs are
        available.
      </p>
    </Container>
  </Layout>
)

export default IndexPage
