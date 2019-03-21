import { Link } from "gatsby"
import React from "react"

import Container from "../components/Container"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const SecondPage = (): JSX.Element => (
  <Layout>
    <SEO title="Page two" />
    <Container>
      <h1>Hi from the second page</h1>
      <p>Welcome to page 2</p>
      <Link to="/">Go back to the homepage</Link>
    </Container>
  </Layout>
)

export default SecondPage
