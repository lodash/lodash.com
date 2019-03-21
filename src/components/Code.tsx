import React from "react"
import styled from "styled-components"
import Container from "./Container"

interface CodeProps {
  children: React.ReactNode
  withContainer?: boolean
}

const CodeWrapper = styled.div`
  margin: 32px 0;
  padding: 32px 0;
  background: #1f2a34;
`

const CodeInner = styled.code``

// TODO: dirty temp fix for a basic implementation - get rid of me
const TAGS: { [name: string]: string } = {
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
}

function replaceTag(tag: string): string {
  return TAGS[tag] || tag
}

function safeTagsReplace(str: string): string {
  return str.replace(/[&<>]/g, replaceTag)
}

// TODO: dirty temp fix for a basic implementation - get rid of me
const encodeString = (str: React.ReactNode) => {
  return str
    ? (str as string)
        .replace(/[&<>]/g, safeTagsReplace)
        .replace(/(?:\r\n|\r|\n)/g, "<br />")
    : ""
}

const Code = ({
  children,
  withContainer = false,
  ...restProps
}: CodeProps): JSX.Element => {
  const MaybeContainer = withContainer ? Container : React.Fragment

  return (
    <CodeWrapper {...restProps}>
      <MaybeContainer>
        <CodeInner
          dangerouslySetInnerHTML={{ __html: encodeString(children) }}
        />
      </MaybeContainer>
    </CodeWrapper>
  )
}

export default Code
