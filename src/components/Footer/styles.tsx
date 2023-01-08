import { Link } from "gatsby"
import { lighten } from "polished"
import { styled } from "../../stitches.config"

export const FooterWrapper = styled("footer", {
  marginTop: "32px",
  padding: "32px 0",
  background: "#171f26",
})

export const StyledLink = styled(Link, {
  color: "#9cb2ff",
  textDecoration: "none",
  transition: "color 0.3s",

  "&:hover, &:focus": {
    color: lighten(0.12, "#9cb2ff"),
    transition: "none",
  },
})
