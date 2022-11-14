import { lighten } from "polished"
import Markdown from "react-markdown"
import { styled, css, CSS } from "@stitches/react"
import Button from "../Button"
import Code from "../Code"

export const MethodWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  background: "#293845",
  padding: "11px 11px 24px",
  marginBottom: "75px",
})

export const Name = styled("h2", {
  display: "flex",
  alignItems: "center",
  background: "#171f26",
  borderRadius: "3px",
  fontSize: "20px",
  lineHeight: "31px",
  fontFamily: "var(--font-mono)",
  fontWeight: "400",
  color: "#bfd0e0",
  padding: "16px 26px",
  margin: 0,
})

export const Subtitle = styled("h3", {
  marginTop: "16px",
  marginBottom: "10px",
  fontSize: "18px",
  fontWeight: 700,
  color: "#a0afbd",
})

export const MetaLinks = styled("div", {
  display: "flex",
  margin: "16px 0",
})

export const MetaLink = styled("a", {
  color: "#75b5ff",
  textDecoration: "none",
  borderBottom: "1px solid",
  fontSize: "16px",

  "& + &": {
    marginLeft: "24px",
  },

  "&:hover, &:focus": {
    color: lighten(0.1, "#75b5ff"),
  },
})

export const Content = styled("div", {
  padding: "0 18px",
  color: "#a0afbd",
})

export const SubContent = styled("div", {
  marginLeft: "10px",
  fontSize: "16px",
})

export const CodeWrapper = styled("div", {
  position: "relative",
  marginLeft: "-29px",
  marginRight: "-29px",
})

export const StyledCode = styled(Code, {
  margin: 0,
  paddingLeft: "calc(18px + 11px)",
  paddingRight: "calc(18px + 11px)",
  background: "#171f26",
})

export const REPLButton = styled(Button, {
  position: "absolute",
  bottom: "20px",
  right: "36px",
})

export const CloseREPLButton = styled(Button, {
  position: "absolute",
  top: "-38px",
  right: "28px",
  background: "#171f26",
  color: "#a0afbd",
  fontWeight: 700,

  "&:hover": {
    color: "#fff",
  },
})

const rawInlineCode: CSS = {
  borderRadius: "4px",
  display: "inline-block",
  background: "#171f26",
  color: "#74a9f2",
  padding: "6px 10px",
}

const inlineCode = css(rawInlineCode)

export const InlineCode = styled("code", inlineCode)

export const Arguments = styled("div", {
  display: "grid",
  gridAutoFlow: "column",
  gridTemplateColumns: "min-content min-content",
  alignItems: "center",
  rowGap: "8px",
})

export const ArgumentHeader = styled("div", {
  color: "#a0afbd",
  borderBottom: "1px solid #364959",
  paddingBottom: "4px",
  paddingRight: "16px",
})

export const ArgumentValue = styled("div", {
  paddingRight: "16px",

  [`${InlineCode}`]: {
    whiteSpace: "nowrap",
  },
})

export const ArgumentValueCode = styled(ArgumentValue, {
  color: "#fff",
  fontFamily: "var(--font-mono)",
})

export const StyledMarkdown = styled(Markdown, {
  code: {
    ...rawInlineCode,
    display: "inline",
    padding: "5px 7px",
  },
})

export const RunkitEmbedWrapper = styled("div", {
  paddingLeft: "29px",
  paddingRight: "29px",
})
