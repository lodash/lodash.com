import { Link } from "gatsby"
import { lighten } from "polished"
import React from "react"
import styled from "styled-components"
import Code from "./Code"

interface Param {
  name: string
  type: string
  desc: string
}

interface MethodProps {
  method: {
    name: string
    call: string
    desc: string
    since: string
    params: Param[]
    example: string
  }
}

const MethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #293845;
  padding: 11px 11px 24px;

  & + & {
    margin-top: 75px;
  }
`

const Name = styled.h2`
  display: flex;
  align-items: center;
  background: #171f26;
  border-radius: 3px;
  font-size: 24px;
  line-height: 31px;
  font-weight: 400;
  color: #bfd0e0;
  padding: 16px 26px;
  margin: 0;
`

const Subtitle = styled.h3`
  margin-top: 16px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #a0afbd;
`

const MetaLinks = styled.div`
  display: flex;
  margin: 16px 0;
`

const MetaLink = styled(Link)`
  color: #75b5ff;
  text-decoration: none;
  border-bottom: 1px solid;
  font-size: 16px;

  & + & {
    margin-left: 24px;
  }

  &:hover,
  &:focus {
    color: ${lighten(0.1, "#75b5ff")};
  }
`

const Content = styled.div`
  padding: 0 18px;
  color: #a0afbd;
`

const SubContent = styled.div`
  margin-left: 10px;
  font-size: 16px;
`

const StyledCode = styled(Code)`
  margin: 0 calc(-18px - 11px);
  padding-left: calc(18px + 11px);
  padding-right: calc(18px + 11px);
  background: #171f26;
`

const InlineCode = styled.code`
  border-radius: 4px;
  display: inline-block;
  background: #171f26;
  color: #74a9f2;
  padding: 6px 10px;
`

const Arguments = styled.div`
  display: flex;
`

const ArgumentCol = styled.div`
  flex: 0 0 auto;

  &:last-child {
    flex-grow: 1;
  }
`

const ArgumentHeader = styled.div`
  color: #a0afbd;
  border-bottom: 1px solid #364959;
  padding-bottom: 4px;
  padding-right: 16px;
`

const ArgumentValue = styled.div`
  color: #fff;
  margin-top: 8px;
  padding-right: 16px;
`

const Method = ({ method, ...restProps }: MethodProps): JSX.Element => (
  <MethodWrapper {...restProps}>
    <Name>_.{method.call}</Name>

    <Content>
      <MetaLinks>
        <MetaLink to="/">source</MetaLink>
        <MetaLink to="/">npm package</MetaLink>
      </MetaLinks>

      {/* TODO: extract to sensible HTML */}
      {method.desc}

      <Subtitle>Since</Subtitle>
      <SubContent>{method.since}</SubContent>

      <Subtitle>Arguments</Subtitle>
      <SubContent>
        <Arguments>
          <ArgumentCol>
            <ArgumentHeader>argument</ArgumentHeader>
            {method.params.map((param, i) => (
              <ArgumentValue key={i}>
                <InlineCode>{param.name}</InlineCode>
              </ArgumentValue>
            ))}
          </ArgumentCol>

          <ArgumentCol>
            <ArgumentHeader>type</ArgumentHeader>
            {method.params.map((param, i) => (
              <ArgumentValue key={i}>{param.type}</ArgumentValue>
            ))}
          </ArgumentCol>

          <ArgumentCol>
            <ArgumentHeader>description</ArgumentHeader>
            {method.params.map((param, i) => (
              <ArgumentValue key={i}>{param.desc}</ArgumentValue>
            ))}
          </ArgumentCol>
        </Arguments>
      </SubContent>

      {/* TODO: reimplement? */}
      <Subtitle>Returns</Subtitle>
      <SubContent>
        <InlineCode>(array)</InlineCode>
      </SubContent>

      <Subtitle>Example</Subtitle>
      <StyledCode>
        {method.example
          .replace(/```js/, "")
          .replace(/```/, "")
          .trim()}
      </StyledCode>
    </Content>
  </MethodWrapper>
)

export default Method
