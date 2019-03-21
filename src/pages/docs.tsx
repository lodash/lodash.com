import { Link, navigate } from "gatsby"
import { darken } from "polished"
import React from "react"
import styled from "styled-components"

import Button from "../components/Button"
import Header from "../components/Header"
import Layout from "../components/Layout"
import Method from "../components/Method"
import SEO from "../components/SEO"

const ArrayMethods = [
  "chunk",
  "compact",
  "concat",
  "difference",
  "differenceBy",
  "differenceWith",
  "drop",
  "dropRight",
  "dropRightWhile",
  "dropWhile",
  "fill",
  "findIndex",
  "findLastIndex",
  "first -> head",
  "flatten",
  "flattenDeep",
  "flattenDepth",
  "fromPairs",
  "head",
  "indexOf",
  "initial",
  "intersection",
  "intersectionBy",
  "intersectionWith",
  "join",
  "last",
  "lastIndexOf",
  "nth",
  "pull",
  "pullAll",
  "pullAllBy",
  "pullAllWith",
  "pullAt",
  "remove",
  "reverse",
  "slice",
  "sortedIndex",
  "sortedIndexBy",
  "sortedIndexOf",
  "sortedLastIndex",
  "sortedLastIndexBy",
  "sortedLastIndexOf",
  "sortedUniq",
  "sortedUniqBy",
  "tail",
  "take",
  "takeRight",
  "takeRightWhile",
  "takeWhile",
  "union",
  "unionBy",
  "unionWith",
  "uniq",
  "uniqBy",
  "uniqWith",
  "unzip",
  "unzipWith",
  "without",
  "xor",
  "xorBy",
  "xorWith",
  "zip",
  "zipObject",
  "zipObjectDeep",
  "zipWith",
]

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
  flex: 1 1 auto;
`

const Content = styled.div`
  background: #1e2933;
  flex: 1 0 auto;
  padding: 24px;
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
  line-height: 16px;
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

const DocsPage = (props: any) => {
  const currentMethod = methodFromPath(props)

  return (
    <Layout>
      <SEO title="Docs" />
      <Wrapper>
        <Sidebar>
          <MethodType>
            <MethodTypeTitle>
              {expanded ? <Min /> : <Max />} Array
            </MethodTypeTitle>
            <Methods>
              {ArrayMethods.map(method => (
                <div>
                  <StyledMethodLink
                    to={`/docs/${method}`}
                    activeClassName="active"
                  >
                    _.{method}
                  </StyledMethodLink>
                </div>
              ))}
            </Methods>
          </MethodType>
        </Sidebar>
        <Main>
          <Header />
          <Content>
            {currentMethod && (
              <SeeAll onClick={() => navigate("/docs")}>← See all</SeeAll>
            )}
            {ArrayMethods.filter(
              m => !currentMethod || m === currentMethod
            ).map(method => (
              <Method name={method} />
            ))}
          </Content>
        </Main>
      </Wrapper>
    </Layout>
  )
}

export default DocsPage
