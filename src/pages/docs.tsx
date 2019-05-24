import { graphql, navigate, StaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import Button from "../components/Button"
import DocsSidebar from "../components/DocsSidebar"
import Header from "../components/Header"
import Layout from "../components/Layout"
import Method from "../components/Method"
import SEO from "../components/SEO"
import { SearchProvider } from "../SearchProvider"

// TODO: temporary polyfill currently preventing build
import "../polyfills"

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const Main = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin-left: 320px;
`

const Content = styled.div`
  background: #1e2933;
  flex: 1 0 auto;
  padding: 124px 24px 24px;
`

const SeeAll = styled(Button)`
  margin-bottom: 24px;
`

const methodFromPath = (props: any) => {
  const [, method] = props["*"].split("/")

  return method
}

const Docs = (props: any): JSX.Element => {
  const currentMethod = methodFromPath(props)

  return (
    <SearchProvider>
      <Layout>
        <SEO title="Docs" />
        <Wrapper>
          <DocsSidebar groups={props.groups} />
          <Main>
            <Header />
            <Content>
              {currentMethod && (
                <SeeAll onClick={() => navigate("/docs")} type="primary">
                  ← See all
                </SeeAll>
              )}
              {/* TODO: optimize performance */}
              {props.methods
                .filter(
                  ({ node: method }) =>
                    !currentMethod || method.name === currentMethod
                )
                .map(({ node: method }) => (
                  <Method method={method} />
                ))}
            </Content>
          </Main>
        </Wrapper>
      </Layout>
    </SearchProvider>
  )
}

const DocsPage = (props: any): JSX.Element => {
  return (
    <StaticQuery
      query={graphql`
        query {
          allLodashMethod {
            group(field: category) {
              field
              fieldValue
              totalCount
              edges {
                node {
                  id
                  name
                  category
                  aliases
                  desc
                  example
                  since
                  params {
                    type
                    name
                    desc
                  }
                  call
                }
              }
            }
          }
        }
      `}
      render={data => {
        const groups = data.allLodashMethod.group
        // TODO: optimize performance
        const methods = groups.map(group => group.edges).flat()

        return <Docs {...props} data={data} groups={groups} methods={methods} />
      }}
    />
  )
}

export default DocsPage
