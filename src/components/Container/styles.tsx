import { styled } from "@stitches/react"

export const ContainerWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  padding: "0 32px",
  margin: "0 auto",
  width: "100%",
  maxWidth: "1300px",

  "& > :first-child": {
    marginTop: "0",
  },

  "& > :last-child": {
    marginBottom: "0",
  },
})
