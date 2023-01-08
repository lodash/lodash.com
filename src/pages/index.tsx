import { Link } from "gatsby"
import { lighten } from "polished"
import React from "react"
import { styled } from "../stitches.config"

import Container from "../components/Container"
import Footer from "../components/Footer"
import Hero from "../components/Hero"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import UL from "../components/UL"

const Title = styled("h2", {
  fontSize: "24px",
  fontWeight: 500,
})

const Subtitle = styled("h3", {
  fontSize: "17px",
  fontWeight: 500,
})

const StyledLink = styled(Link, {
  color: "#75b5ff",
  textDecoration: "none",
  borderBottom: "1px solid",
  transition: "color 0.3s",

  "&:hover, &:focus": {
    color: lighten(0.12, "#75b5ff"),
    transition: "none",
  },
})

const IndexPage = (): JSX.Element => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />

    <Hero />

    <Container>
      <Title>Why Lodash?</Title>
      <p>
        Lodash makes JavaScript easier by taking the hassle out of working with arrays, numbers,
        objects, strings, etc. Lodash’s modular methods are great for:
      </p>

      <UL
        items={[
          "Iterating arrays, objects, & strings",
          "Manipulating & testing values",
          "Creating composite functions",
        ]}
      />

      <Title>Conventional builds</Title>
      <UL
        items={[
          <>
            <StyledLink to="/">Core build</StyledLink> <StyledLink to="/">~4kB gzipped</StyledLink>
          </>,
          <>
            <StyledLink to="/">Full build</StyledLink> <StyledLink to="/">~24kB gzipped</StyledLink>
          </>,
        ]}
      />
      <p>
        Review the <StyledLink to="/">build differences</StyledLink> & pick one that’s right for
        you.
      </p>

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

      <Subtitle>Note:</Subtitle>
      <p>
        Install <StyledLink to="/">n_</StyledLink> for Lodash use in the Node.js &lt; 6 REPL.
      </p>

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
        Tested in Chrome 54-55, Firefox 49-50, IE 11, Edge 14, Safari 9-10, Node.js 6-7, & PhantomJS
        2.1.1. Automated browser & CI test runs are available.
      </p>
    </Container>

    <Footer />
  </Layout>
)

export default IndexPage
