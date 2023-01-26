import { Link } from "gatsby"
import { darken } from "polished"
import { styled } from "../../stitches.config"

export const Sidebar = styled("aside", {
  "--offset": 0,
  display: "flex",
  flexDirection: "column",
  background: "#293845",
  flex: "0 0 320px",
  width: "320px",
  padding: "32px 16px 0 16px",
  position: "fixed",
  height: "100vh",
  zIndex: 1,
  transform: "translateX(var(--offset))",
  transition: "transform 0.2s ease-in-out",

  "@media screen and (max-width: 768px)": {
    "--offset": "-100%",
    zIndex: 100,
    boxShadow: "0 0 20px rgba(0, 0, 0, 0.4)",

    ".menu-open &": {
      "--offset": 0,
    },
  },

  ".ps__rail-y": {
    backgroundColor: "transparent !important",
  },

  ".ps__thumb-y": {
    backgroundColor: "#1f2a34 !important",
  },

  ".scrollbar-container": {
    display: "flex",
    flexDirection: "column",
    gap: "16px",
  },

  ".scrollbar-container::before": {
    pointerEvents: "none",
    position: "fixed",
    content: "",
    display: "block",
    left: 0,
    bottom: "32px",
    width: "320px",
    height: "142px",
    background: "linear-gradient(0deg, rgba(41, 56, 69, 1) 20%, rgba(41, 56, 69, 0) 100%)",
    transition: "opacity 1s",
  },

  "&:hover .scrollbar-container::before": {
    opacity: 0,
  },
})

export const ScrollbarWrapper = styled("div", {
  flex: "1 1 calc(100% - 58px - 32px)",
  height: "calc(100% - 58px - 32px)",
  paddingBottom: "32px",
})

export const MethodType = styled("div", {
  display: "flex",
  flexDirection: "column",
  gap: "16px",
})

export const MethodTypeTitle = styled("h4", {
  color: "#fff",
  fontSize: "16px",
  fontWeight: 400,
  margin: "0",
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  userSelect: "none",
})

export const Methods = styled("div", {
  marginLeft: "4px",
  borderLeft: "1px dashed #6a7580",
  paddingLeft: "16px",
})

export const StyledSidebarLink = styled(Link, {
  color: "#91a0ae",
  fontSize: "16px",
  lineHeight: "18px",
  padding: "4px 0",
  textDecoration: "none",
  letterSpacing: "1px",
  alignSelf: "flex-start",

  "&.active": {
    color: "#fff !important",
  },

  "&:hover": {
    color: darken(0.1, "#91a0ae"),
  },

  "&:focus": {
    background: "#3492ff",
    boxShadow: "-2px 0 0 2px #3492ff, 2px 0 0 2px #3492ff",
    color: "#fff",
    outline: "none",
  },
})

const MinMax = styled("div", {
  width: "12px",
  height: "12px",
  lineHeight: "12px",
  background: "#fff",
  borderRadius: "2px",
  color: "#31363b",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  marginRight: "12px",
})

export const Min = styled(MinMax, {
  "&:before": {
    content: "-",
  },
})

export const Max = styled(MinMax, {
  "&:before": {
    content: "+",
  },
})
