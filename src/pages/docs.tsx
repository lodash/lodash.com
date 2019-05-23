import { graphql, Link, navigate, StaticQuery } from "gatsby"
import { darken } from "polished"
import React, { useContext } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import styled from "styled-components"
import { SearchContext, SearchProvider } from "../SearchProvider"

import Button from "../components/Button"
import Header from "../components/Header"
import Layout from "../components/Layout"
import Method from "../components/Method"
import SearchInput from "../components/SearchInput"
import SEO from "../components/SEO"

// TODO: temporary polyfill currently preventing build
import "../polyfills"

const Wrapper = styled.div`
  display: flex;
  min-height: 100vh;
`

const Sidebar = styled.aside`
  background: #293845;
  flex: 0 0 320px;
  width: 320px;
  padding: 32px 16px;
  position: fixed;
  height: 100vh;
  z-index: 1;

  .ps__rail-y {
    background-color: transparent !important;
  }

  .ps__thumb-y {
    background-color: #1f2a34 !important;
  }

  .scrollbar-container::before {
    pointer-events: none;
    position: fixed;
    content: "";
    display: block;
    left: 0;
    bottom: 0;
    width: 320px;
    height: 142px;
    background: linear-gradient(
      0deg,
      rgba(41, 56, 69, 1) 30%,
      rgba(41, 56, 69, 0) 100%
    );
    transition: opacity 1s;
  }

  &:hover .scrollbar-container::before {
    opacity: 0;
  }
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

const MethodType = styled.div``

const MethodTypeTitle = styled.h4`
  color: #fff;
  font-size: 16px;
  font-weight: 400;
  margin: 0 0 16px;
  display: flex;
  align-items: center;
`

const MinMax = styled.div`
  width: 12px;
  height: 12px;
  line-height: 12px;
  background: #fff;
  border-radius: 2px;
  color: #31363b;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-right: 12px;
`

const Min = styled(MinMax)`
  &:before {
    content: "-";
  }
`

const Max = styled(MinMax)`
  &:before {
    content: "+";
  }
`

const Methods = styled.div`
  margin-left: 4px;
  border-left: 1px dashed #6a7580;
  padding-left: 16px;
`

const StyledMethodLink = styled(Link)`
  color: #91a0ae;
  font-size: 16px;
  line-height: 18px;
  padding: 4px 0;
  text-decoration: none;
  letter-spacing: 1px;

  &.active {
    color: #fff !important;
  }

  &:hover,
  &:focus {
    color: ${darken(0.1, "#91a0ae")};
  }
`

const SeeAll = styled(Button)`
  margin-bottom: 24px;
`

const expanded = true

const methodFromPath = (props: any) => {
  const [, method] = props["*"].split("/")

  return method
}

const Docs = (props: any): JSX.Element => {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  const { state } = searchContext
  const currentMethod = methodFromPath(props)

  const filterMethods = (methods) => methods.filter(({ node: method }) => {
    return method.name.includes(state.input)
  })

  const filterGroups = (groups) => groups.filter(({ edges: groupMethods }) => {
    return filterMethods(groupMethods).length
  })

  return (
    <Layout>
      <SEO title="Docs" />
      <Wrapper>
        <Sidebar>
          <SearchInput />
          <PerfectScrollbar>
            {filterGroups(props.groups).map(group => {
              const { edges: groupMethods } = group

              return (
                <MethodType>
                  <MethodTypeTitle>
                    {expanded ? <Min /> : <Max />} {group.fieldValue}
                  </MethodTypeTitle>
                  <Methods>
                    {filterMethods(groupMethods).map(({ node: method }) => (
                      <div>
                        <StyledMethodLink
                          // to={`/docs/${method.aliasOf || method.name}`}
                          to={`/docs/${method.name}`}
                          activeClassName="active"
                        >
                          _.{method.name}
                          {/* {method.aliasOf && ` -> ${method.aliasOf}`} */}
                        </StyledMethodLink>
                      </div>
                    ))}
                  </Methods>
                </MethodType>
              )
            })}
          </PerfectScrollbar>
        </Sidebar>
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
  )
}

const DocsPage = (props: any): JSX.Element => {
  return (
    <SearchProvider>
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
    </SearchProvider>
  )
}

export default DocsPage
