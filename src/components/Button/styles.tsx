import { darken } from "polished"
import { styled } from "@stitches/react"

const primary = {
  background: "#3492ff",
  foreground: "#fff",
}

const secondary = {
  background: "#fff",
  foreground: "#4b71ca",
}

export const ButtonWrapper = styled("div", {
  display: "inline-flex",
  fontSize: "17px",
  padding: "16px 32px",
  borderRadius: "5px",
  boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15), 0px 6px 10px rgba(51, 144, 252, 0.2)",
  cursor: "pointer",
  transition: "0.3s background",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",

  "&.type-primary": {
    background: primary.background,
    color: primary.foreground,

    "&:hover, &:focus": {
      background: darken(0.1, primary.background),
    },
  },

  "&.type-secondary": {
    background: secondary.background,
    color: secondary.foreground,

    "&:hover, &:focus": {
      background: darken(0.1, secondary.background),
    },
  },

  "& + &": {
    marginLeft: "8px",
  },
})
