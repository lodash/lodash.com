import { darken, lighten } from "polished"
import Markdown from "react-markdown"
import styled, { css } from "styled-components"
import Button from "../Button"
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

export const CodeWrapper = styled.div`
  position: relative;
  margin-left: -29px;
  margin-right: -29px;
`

export const StyledCode = styled(Code)`
  margin: 0;
  padding-left: calc(18px + 11px);
  padding-right: calc(18px + 11px);
  background: #171f26;
`

export const REPLButton = styled(Button)`
  position: absolute;
  bottom: 20px;
  right: 36px;
  padding: 12px 21px;
  background: #293845;
  box-shadow: inset 0 -3px 0 #acbcca, 0px 6px 10px #171f26, 2px 2px 3px rgba(0, 0, 0, 0.15);
  border-radius: 3px;
  transition: all 0.3s ease-in-out;

  &:hover {
    transform: translateY(3px);
    background: ${darken(0.05, "#293845")};
    color: #fff;
    box-shadow: inset 0 0 0 #acbcca, 0px 6px 10px #171f26, 2px 2px 3px rgba(0, 0, 0, 0.15);
  }
`

export const CloseREPLButton = styled(Button)`
  position: absolute;
  top: -38px;
  right: 28px;
  background: #171f26;
  box-shadow: none;
  padding: 2px 7px;
  font-weight: 700;
  font-size: 14px;

  &:hover {
    color: #fff;
  }
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

export const RunkitEmbedWrapper = styled.div`
  padding-left: 29px;
  padding-right: 29px;
`
