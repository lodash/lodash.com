import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"

import Container from "../components/Container"
import Hero from "../components/Hero"
import Image from "../components/Image"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const ImageWrapper = styled.div`
  max-width: 300px;
  margin-bottom: 1.45rem;
`

const IndexPage = () => (
  <Layout>
    <SEO title="Home" keywords={[`gatsby`, `application`, `react`]} />
    <Hero />
    <Container>
      <h1>Hi people</h1>
      <p>Welcome to your new Gatsby site.</p>
      <p>Now go build something great.</p>
      <ImageWrapper>
        <Image />
      </ImageWrapper>
      <Link to="/page-2/">Go to page 2</Link>
    </Container>
  </Layout>
)

export default IndexPage
