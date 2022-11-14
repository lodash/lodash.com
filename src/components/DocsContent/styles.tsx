import { styled } from "@stitches/react"
import Button from "../Button"

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
})

export const Heading = styled("h2", {
  fontSize: "24px",
  margin: "0 11px 24px",
})
