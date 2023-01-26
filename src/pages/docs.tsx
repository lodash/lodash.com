import { graphql, useStaticQuery, PageProps, Link } from "gatsby"
import React from "react"
import { lighten } from "polished"
import { styled } from "@stitches/react"

import Code from "../components/Code"
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

const CodeWrapper = styled("div", {
  margin: "0 -24px",
})

function trimLines(code: string): string {
  return code
    .split("\n")
    .map((line) => line.trim())
    .join("\n")
}

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
        <WrappedLayout {...props}>
          <Title>Getting started</Title>

          <CodeWrapper>
            <Code lang="bash" withContainer={true}>
              {trimLines(`
              npm install lodash
              # or yarn
              yarn add lodash
            `)}
            </Code>
          </CodeWrapper>

          <Subtitle>TypeScript</Subtitle>

          <CodeWrapper>
            <Code lang="bash" withContainer={true}>
              {trimLines(`
              npm install @types/lodash
              # or yarn
              yarn add @types/lodash
            `)}
            </Code>
          </CodeWrapper>
        </WrappedLayout>
      </DataProvider>
    </SearchProvider>
  )
}

export default DocsPage
