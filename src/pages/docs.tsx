import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import DocsContent from "../components/DocsContent"
import DocsSidebar from "../components/DocsSidebar"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { useSearch } from "../hooks/useSearch"
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

const WrappedLayout = (props: any): JSX.Element => {
  const { state: searchState } = useSearch()
  const { groups, methods, ...restProps } = props

  return (
    <Layout>
      <SEO title="Docs" />
      <Wrapper>
        <SidebarProvider initialGroups={groups} searchInput={searchState.input}>
          <DocsSidebar />
        </SidebarProvider>
        <DocsContent {...restProps} methods={methods} />
      </Wrapper>
    </Layout>
  )
}

const DocsPage = (props: any): JSX.Element => {
  const data: AllLodashMethodQuery = useStaticQuery(ALL_LODASH_METHOD_QUERY)

  const groups = data.allLodashMethod.group
  // TODO: optimize performance
  const methods = groups.map(group => group.edges).flat()

  return (
    <SearchProvider>
      <WrappedLayout {...props} groups={groups} methods={methods} />
    </SearchProvider>
  )
}

export default DocsPage
