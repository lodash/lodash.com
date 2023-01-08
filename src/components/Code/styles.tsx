import { styled } from "../../stitches.config"

export const CodeWrapper = styled("div", {
  margin: "32px 0",
  padding: "32px 0",
  background: "#171f26",
  fontSize: "16px",

  ".desktop-code": {
    "@media screen and (max-width: 1023px)": {
      display: "none !important",
    },
  },

  ".mobile-code": {
    "@media screen and (min-width: 1024px)": {
      display: "none !important",
    },
  },
})
