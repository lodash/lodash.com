import { graphql, useStaticQuery } from "gatsby"
import React from "react"
import styled from "styled-components"

import DocsContent from "../components/DocsContent"
import DocsSidebar from "../components/DocsSidebar"
import Layout from "../components/Layout"
import SEO from "../components/SEO"
import { SearchProvider } from "../SearchProvider"
import {
  AllLodashMethodQuery,
  Group as GroupInterface,
  Method as MethodInterface,
} from "../types"

// TODO: temporary polyfill currently preventing build
import "../polyfills"

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const Docs = ({
  groups,
  methods,
  ...restProps
}: {
  groups: GroupInterface[]
  methods: MethodInterface[]
}): JSX.Element => (
  <SearchProvider>
    <Layout>
      <SEO title="Docs" />
      <Wrapper>
        <DocsSidebar groups={groups} />
        <DocsContent {...restProps} methods={methods} />
      </Wrapper>
    </Layout>
  </SearchProvider>
)

const DocsPage = (props: any): JSX.Element => {
  const data: AllLodashMethodQuery = useStaticQuery(graphql`
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
  `)

  const groups = data.allLodashMethod.group
  // TODO: optimize performance
  const methods = groups.map(group => group.edges).flat()

  return <Docs {...props} data={data} groups={groups} methods={methods} />
}

export default DocsPage
