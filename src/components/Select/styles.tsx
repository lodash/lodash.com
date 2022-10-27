import { styled } from "@stitches/react"
import Triangle from "../../images/triangle.svg"

export const SelectWrapper = styled("div", {
  position: "relative",
  fontWeight: "bold",
  userSelect: "none",
})

export const Arrow = styled(Triangle, {
  marginLeft: "8px",
  width: "11px",
})

export const Selected = styled("div", {
  display: "flex",
  alignItems: "center",
  padding: "16px 21px",
  background: "#293845",
  color: "#fff",
  borderRadius: "3px",
  position: "relative",
  zIndex: "1",
  cursor: "pointer",
})

export const Options = styled("div", {
  background: "#293845",
  color: "#fff",
  borderRadius: "3px",
  padding: "8px 0",
  opacity: 0,
  transition: "opacity 0.3s, margin-top 0.3s",
  position: "absolute",
  top: "100%",
  left: 0,
  right: 0,
  zIndex: "10",
  marginTop: "-30px",
  pointerEvents: "none",
  boxShadow: "0 4px 12px rgba(0, 0, 0, 0.3), 0 7px 18px rgba(0, 0, 0, 0.2)",

  "&.is-open": {
    opacity: 1,
    marginTop: "4px",
    pointerEvents: "auto",
  },
})

export const Option = styled("div", {
  padding: "4px 21px",
  cursor: "pointer",

  "&:hover": {
    background: "rgba(0, 0, 0, 0.2)",
  },
})
