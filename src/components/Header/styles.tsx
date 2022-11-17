import { styled } from "@stitches/react"
import Logo from "../../images/lodash.svg"

export const HeaderWrapper = styled("header", {
  "--offset": "320px",
  display: "flex",
  alignItems: "center",
  background: "#171f26",
  padding: "24px",
  height: "100px",
  position: "fixed",
  top: 0,
  left: "var(--offset)",
  right: 0,
  zIndex: 10,

  "@media screen and (max-width: 768px)": {
    "--offset": 0,
  },

  "&:after": {
    content: "",
    position: "absolute",
    top: "100%",
    left: 0,
    right: 0,
    background: "linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0))",
    height: "45px",
    pointerEvents: "none",
    opacity: 0,
    transition: "opacity 0.3s",
  },

  "&.is-scrolled:after": {
    opacity: 1,
  },
})

export const LogoWrapper = styled("div", {
  display: "flex",
  alignItems: "center",
  paddingRight: "20px",
  marginRight: "20px",
  borderRight: "2px solid #293845",
})

export const StyledLogo = styled(Logo, {
  width: "58px",
})

export const Burger = styled("button", {
  position: "relative",
  display: "none",
  background: "none",
  border: "none",
  padding: "10px",
  width: "44px",
  height: "44px",
  marginLeft: "auto",
  cursor: "pointer",

  "@media screen and (max-width: 768px)": {
    display: "block",
  },

  "&::before, &::after": {
    position: "absolute",
    content: "",
    height: "2px",
    background: "#fff",
    left: "10px",
    right: "10px",
    transformOrigin: "center",
    transition: "transform 0.20s ease-in-out",
  },

  "&::before": {
    top: "15px",
  },

  "&::after": {
    bottom: "15px",
  },

  variants: {
    open: {
      true: {
        "&::before": {
          transform: "rotate(45deg) translateX(8.5px)",
          transformOrigin: "top 0",
        },

        "&::after": {
          transform: "rotate(-45deg) translateX(8.5px)",
          transformOrigin: "bottom 0",
        },
      },
    },
  },
})
