import { darken, lighten } from "polished"
import { styled } from "@stitches/react"

const primary = {
  background: "#3492ff",
  foreground: "#fff",
}

const secondary = {
  background: "#fff",
  foreground: "#4b71ca",
}

const tertiary = {
  background: "#293845",
  foreground: "#fff",
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

  "& + &": {
    marginLeft: "8px",
  },

  variants: {
    variant: {
      primary: {
        background: primary.background,
        color: primary.foreground,

        "&:hover, &:focus": {
          background: darken(0.1, primary.background),
        },
      },

      secondary: {
        background: secondary.background,
        color: secondary.foreground,

        "&:hover, &:focus": {
          background: darken(0.1, secondary.background),
        },
      },

      tertiary: {
        background: tertiary.background,
        color: tertiary.foreground,
        boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15), 0px 6px 10px #171f26",
        borderRadius: "3px",

        "&:hover, &:focus": {
          background: lighten(0.08, tertiary.background),
        },
      },
    },
  },
})
