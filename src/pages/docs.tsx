import { graphql, useStaticQuery, PageProps } from "gatsby"
import React from "react"
import styled from "styled-components"

import DocsContent from "../components/DocsContent"
import DocsSidebar from "../components/DocsSidebar"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { useSearch } from "../hooks/useSearch"
import { LayoutProvider } from "../LayoutProvider"
import { SearchProvider } from "../SearchProvider"
import { SidebarProvider } from "../SidebarProvider"
import { IAllLodashMethodQuery, IGroup, IMethod } from "../types"

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
            lineNumber
            version
          }
        }
      }
    }
  }
`

type IDocsPageProps = PageProps & IAllLodashMethodQuery

interface IWrappedLayout extends IDocsPageProps {
  groups: IGroup[]
  methods: IMethod[]
}

const WrappedLayout = (props: IWrappedLayout): JSX.Element => {
  const { state: searchState } = useSearch()
  const { groups, methods, ...restProps } = props

  // this is short-lived, will be moved in the GraphQL query
  const filteredMethods = methods.filter((method) => method.node.version === searchState.version)

  return (
    <Layout>
      <SEO title="Docs" />
      <Wrapper>
        <SidebarProvider
          initialGroups={groups}
          searchInput={searchState.input}
          version={searchState.version}
        >
          <DocsSidebar />
        </SidebarProvider>
        <LayoutProvider>
          <DocsContent {...restProps} methods={filteredMethods} />
        </LayoutProvider>
      </Wrapper>
    </Layout>
  )
}

const DocsPage = (props: IDocsPageProps): JSX.Element => {
  const data: IAllLodashMethodQuery = useStaticQuery(ALL_LODASH_METHOD_QUERY)

  const groups = data.allLodashMethod.group
  // TODO: optimize performance
  const methods = groups.map((group) => group.edges).flat()

  return (
    <SearchProvider>
      <WrappedLayout {...props} groups={groups} methods={methods} />
    </SearchProvider>
  )
}

export default DocsPage
