import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import DocsContent from "../components/DocsContent"
import DocsSidebar from "../components/DocsSidebar"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { SearchProvider } from "../SearchProvider"
import { SidebarProvider } from "../SidebarProvider"
import { AllLodashMethodQuery } from "../types"

// TODO: temporary polyfill currently preventing build
import "../polyfills"

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const ALL_LODASH_METHOD_QUERY = graphql`
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
`

const DocsPage = (props: any): JSX.Element => {
  const data: AllLodashMethodQuery = useStaticQuery(ALL_LODASH_METHOD_QUERY)

  const groups = data.allLodashMethod.group
  // TODO: optimize performance
  const methods = groups.map(group => group.edges).flat()

  return (
    <SearchProvider>
      <Layout>
        <SEO title="Docs" />
        <Wrapper>
          <SidebarProvider>
            <DocsSidebar groups={groups} />
          </SidebarProvider>
          <DocsContent {...props} methods={methods} />
        </Wrapper>
      </Layout>
    </SearchProvider>
  )
}

export default DocsPage
