import { styled } from "../../stitches.config"
import Button from "../Button"

export const DocsContentWrapper = styled("main", {
  "--offset": "320px",
  position: "relative",
  display: "flex",
  flexDirection: "column",
  flex: "1 1 auto",
  marginLeft: "var(--offset)",
  width: "calc(100% - var(--offset))",
  transition: "width 0.2s ease-in-out, margin-left 0.2s ease-in-out",

  "@media screen and (max-width: 768px)": {
    "--offset": 0,
  },
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
