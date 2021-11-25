import { lighten } from "polished"
import Markdown from "react-markdown"
import styled, { css } from "styled-components"
import Code from "../Code"

export const MethodWrapper = styled.div`
  display: flex;
  flex-direction: column;
  background: #293845;
  padding: 11px 11px 24px;
  margin-bottom: 75px;
`

export const Name = styled.h2`
  display: flex;
  align-items: center;
  background: #171f26;
  border-radius: 3px;
  font-size: 20px;
  line-height: 31px;
  font-family: var(--font-mono);
  font-weight: 400;
  color: #bfd0e0;
  padding: 16px 26px;
  margin: 0;
`

export const Subtitle = styled.h3`
  margin-top: 16px;
  margin-bottom: 10px;
  font-size: 18px;
  font-weight: 700;
  color: #a0afbd;
`

export const MetaLinks = styled.div`
  display: flex;
  margin: 16px 0;
`

export const MetaLink = styled.a`
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

export const Content = styled.div`
  padding: 0 18px;
  color: #a0afbd;
`

export const SubContent = styled.div`
  margin-left: 10px;
  font-size: 16px;
`

export const StyledCode = styled(Code)`
  margin: 0 calc(-18px - 11px);
  padding-left: calc(18px + 11px);
  padding-right: calc(18px + 11px);
  background: #171f26;
`

const inlineCode = css`
  border-radius: 4px;
  display: inline-block;
  background: #171f26;
  color: #74a9f2;
  padding: 6px 10px;
`

export const InlineCode = styled.code`
  ${inlineCode};
`

export const Arguments = styled.div`
  display: grid;
  grid-auto-flow: column;
  grid-template-columns: min-content min-content;
  align-items: center;
  row-gap: 8px;
`

export const ArgumentHeader = styled.div`
  color: #a0afbd;
  border-bottom: 1px solid #364959;
  padding-bottom: 4px;
  padding-right: 16px;
`

export const ArgumentValue = styled.div`
  padding-right: 16px;

  ${InlineCode} {
    white-space: nowrap;
  }
`

export const ArgumentValueCode = styled(ArgumentValue)`
  color: #fff;
  font-family: var(--font-mono);
`

export const StyledMarkdown = styled(Markdown)`
  code {
    ${inlineCode};
    display: inline;
    padding: 5px 7px;
  }
`
