import { Link, navigate } from "gatsby"
import { darken } from "polished"
import React from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import styled from "styled-components"

import Button from "../components/Button"
import Header from "../components/Header"
import Layout from "../components/Layout"
import Method from "../components/Method"
import SEO from "../components/SEO"

const ArrayMethods = [
  { name: "chunk" },
  { name: "compact" },
  { name: "concat" },
  { name: "difference" },
  { name: "differenceBy" },
  { name: "differenceWith" },
  { name: "drop" },
  { name: "dropRight" },
  { name: "dropRightWhile" },
  { name: "dropWhile" },
  { name: "fill" },
  { name: "findIndex" },
  { name: "findLastIndex" },
  { name: "first", aliasOf: "head" },
  { name: "flatten" },
  { name: "flattenDeep" },
  { name: "flattenDepth" },
  { name: "fromPairs" },
  { name: "head" },
  { name: "indexOf" },
  { name: "initial" },
  { name: "intersection" },
  { name: "intersectionBy" },
  { name: "intersectionWith" },
  { name: "join" },
  { name: "last" },
  { name: "lastIndexOf" },
  { name: "nth" },
  { name: "pull" },
  { name: "pullAll" },
  { name: "pullAllBy" },
  { name: "pullAllWith" },
  { name: "pullAt" },
  { name: "remove" },
  { name: "reverse" },
  { name: "slice" },
  { name: "sortedIndex" },
  { name: "sortedIndexBy" },
  { name: "sortedIndexOf" },
  { name: "sortedLastIndex" },
  { name: "sortedLastIndexBy" },
  { name: "sortedLastIndexOf" },
  { name: "sortedUniq" },
  { name: "sortedUniqBy" },
  { name: "tail" },
  { name: "take" },
  { name: "takeRight" },
  { name: "takeRightWhile" },
  { name: "takeWhile" },
  { name: "union" },
  { name: "unionBy" },
  { name: "unionWith" },
  { name: "uniq" },
  { name: "uniqBy" },
  { name: "uniqWith" },
  { name: "unzip" },
  { name: "unzipWith" },
  { name: "without" },
  { name: "xor" },
  { name: "xorBy" },
  { name: "xorWith" },
  { name: "zip" },
  { name: "zipObject" },
  { name: "zipObjectDeep" },
  { name: "zipWith" },
]

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

const DocsPage = (props: any): JSX.Element => {
  const currentMethod = methodFromPath(props)

  return (
    <Layout>
      <SEO title="Docs" />
      <Wrapper>
        <Sidebar>
          <PerfectScrollbar>
            <MethodType>
              <MethodTypeTitle>
                {expanded ? <Min /> : <Max />} Array
              </MethodTypeTitle>
              <Methods>
                {ArrayMethods.map(method => (
                  <div>
                    <StyledMethodLink
                      to={`/docs/${method.aliasOf || method.name}`}
                      activeClassName="active"
                    >
                      _.{method.name}
                      {method.aliasOf && ` -> ${method.aliasOf}`}
                    </StyledMethodLink>
                  </div>
                ))}
              </Methods>
            </MethodType>
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
            {ArrayMethods.filter(
              m => !currentMethod || m.name === currentMethod
            ).map(method => (
              <Method name={method.name} />
            ))}
          </Content>
        </Main>
      </Wrapper>
    </Layout>
  )
}

export default DocsPage
