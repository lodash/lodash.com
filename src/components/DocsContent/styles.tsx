import { styled } from "@stitches/react"
import Button from "../Button"
import { lighten } from "polished"

export const DocsContentWrapper = styled("main", {
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  marginLeft: "320px",
  width: "calc(100% - 320px)",
})

export const Content = styled("div", {
  background: "#1e2933",
  flex: "1 0 auto",
})

export const ContentWrapper = styled("div", {
  padding: "124px 24px 24px",
})

export const SeeAll = styled(Button, {
  marginBottom: "24px",
  background: "#293845",
  boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15), 0px 6px 10px #171f26",
  borderRadius: "3px",

  "&:hover, &:focus": {
    background: lighten(0.08, "#293845"),
  },
})

export const Heading = styled("h2", {
  fontSize: "24px",
  margin: "0 11px 24px",
})
