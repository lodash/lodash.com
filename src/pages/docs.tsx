import { graphql, useStaticQuery, PageProps } from "gatsby"
import React from "react"
import { styled } from "@stitches/react"

import DocsContent from "../components/DocsContent"
import DocsSidebar from "../components/DocsSidebar"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { useSearch } from "../hooks/useSearch"
import { useData } from "../hooks/useData"
import { SearchProvider } from "../SearchProvider"
import { SidebarProvider } from "../SidebarProvider"
import { DataProvider } from "../DataProvider"
import { IAllLodashMethodQuery } from "../types"

// TODO: temporary polyfill currently preventing build
import "../polyfills"

const Wrapper = styled("div", {
  display: "flex",
  minHeight: "100vh",
})

const ALL_LODASH_METHOD_QUERY = graphql`
  query {
    allLodashMethod {
      group(field: { category: SELECT }) {
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

interface IDocsPageProps extends Omit<PageProps, "children"> {
  children: React.ReactNode
}

const WrappedLayout = (props: IDocsPageProps): JSX.Element => {
  const { state: searchState } = useSearch()
  const { state: dataState } = useData()

  return (
    <Layout>
      <SEO title="Docs" />
      <Wrapper>
        <SidebarProvider
          initialGroups={dataState.groups}
          searchInput={searchState.input}
          version={searchState.version}
        >
          <DocsSidebar />
        </SidebarProvider>
        <DocsContent>{props.children}</DocsContent>
      </Wrapper>
    </Layout>
  )
}

const DocsPage = (props: PageProps): JSX.Element => {
  const data: IAllLodashMethodQuery = useStaticQuery(ALL_LODASH_METHOD_QUERY)

  const methodGroups = data.allLodashMethod.group

  return (
    <SearchProvider>
      <DataProvider groups={methodGroups}>
        <WrappedLayout {...props}>Docs home</WrappedLayout>
      </DataProvider>
    </SearchProvider>
  )
}

export default DocsPage
