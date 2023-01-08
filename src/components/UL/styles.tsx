import { styled } from "../../stitches.config"
import ChevronRight from "../../images/right-chevron.svg"

export const ULWrapper = styled("ul", {
  listStyle: "none",
  marginLeft: "16px",
})

export const StyledChevronRight = styled(ChevronRight, {
  display: "inline-block",
  width: "10px",
  marginRight: "5px",
  flex: "0 0 auto",

  path: {
    fill: "#96a4b2",
  },
})

export const LI = styled("li", {
  display: "flex",
  alignItems: "center",
  marginBottom: 0,

  [`& > ${StyledChevronRight} + * + *`]: {
    marginLeft: "8px",
  },
})
