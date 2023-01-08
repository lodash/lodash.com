import { darken, lighten } from "polished"
import { styled } from "../../stitches.config"

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

export const ButtonWrapper = styled("button", {
  border: "none",
  display: "inline-flex",
  cursor: "pointer",
  transition: "0.3s background",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",

  "& + &": {
    marginLeft: "8px",
  },

  variants: {
    size: {
      small: {
        fontSize: "14px",
        padding: "2px 7px",
        borderRadius: "5px",
      },

      medium: {
        fontSize: "17px",
        padding: "12px 21px",
        borderRadius: "5px",
      },

      large: {
        fontSize: "17px",
        padding: "16px 32px",
        borderRadius: "5px",
      },
    },

    variant: {
      primary: {
        background: primary.background,
        color: primary.foreground,
        boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15), 0px 6px 10px rgba(51, 144, 252, 0.2)",

        "&:hover, &:focus": {
          background: darken(0.1, primary.background),
        },
      },

      secondary: {
        background: secondary.background,
        color: secondary.foreground,
        boxShadow: "2px 2px 3px rgba(0, 0, 0, 0.15), 0px 6px 10px rgba(51, 144, 252, 0.2)",

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

      "3d": {
        background: tertiary.background,
        color: "#a0afbd",
        boxShadow: "inset 0 -3px 0 #acbcca, 0px 6px 10px #171f26, 2px 2px 3px rgba(0, 0, 0, 0.15)",
        borderRadius: "3px",
        transition: "all 0.3s ease-in-out",

        "&:hover": {
          transform: "translateY(3px)",
          background: darken(0.05, tertiary.background),
          color: "#fff",
          boxShadow: "inset 0 0 0 #acbcca, 0px 6px 10px #171f26, 2px 2px 3px rgba(0, 0, 0, 0.15)",
        },
      },
    },
  },

  defaultVariants: {
    size: "large",
  },
})
