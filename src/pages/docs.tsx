import React from "react"
import styled from "styled-components"

import Header from "../components/Header"
import Layout from "../components/Layout"
import SEO from "../components/SEO"

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const Sidebar = styled.aside`
  background: #293845;
  flex: 0 0 320px;
  padding: 32px 16px;
`

const Main = styled.main`
  display: flex;
  flex-direction: column;
  flex: 1 0 auto;
`

const Content = styled.div`
  background: #1e2933;
  flex: 1 0 auto;
  padding: 24px;
`

const DocsPage = () => (
  <Layout>
    <SEO title="Docs" />
    <Wrapper>
      <Sidebar>sidebar</Sidebar>
      <Main>
        <Header />
        <Content>hello from docs</Content>
      </Main>
    </Wrapper>
  </Layout>
)

export default DocsPage
