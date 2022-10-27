import { styled } from "@stitches/react"
import Logo from "../../images/lodash.svg"

export const HeaderWrapper = styled("header", {
  display: "flex",
  alignItems: "center",
  background: "#171f26",
  padding: "24px",
  height: "100px",
  position: "fixed",
  top: 0,
  left: "320px",
  right: 0,
  zIndex: 10,

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
