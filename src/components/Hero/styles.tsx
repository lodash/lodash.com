import { Link } from "gatsby"
import { darken } from "polished"
import { styled } from "@stitches/react"
import Logo from "../../images/lodash.svg"
import { CodeWrapper } from "../Code/styles"
import Container from "../Container"

export const HeroWrapper = styled("header", {
  display: "flex",
  minHeight: "calc(100vh - 128px)",
  padding: "64px 0",
  background: `linear-gradient(135deg, rgba(44, 67, 109, 1) 0%, rgba(60, 69, 78, 0) 150%),
    linear-gradient(180deg, rgba(34, 85, 144, 1) 0%, rgba(52, 146, 255, 1) 100%)`,
  color: "#fff",
  marginBottom: "64px",
})

export const StyledContainer = styled(Container, {
  justifyContent: "center",
})

export const HeroInner = styled("div", {
  display: "grid",
  gridTemplateColumns: "125px auto",
  gridTemplateAreas: `
    "logo        intro"
    "aside       buttons"
    "usage-title usage"`,
  rowGap: "32px",
  columnGap: "32px",
})

export const Aside = styled("aside", {
  gridArea: "aside",
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "center",
  fontWeight: 700,

  "@media screen and (max-width: 991px)": {
    justifyContent: "flex-start",
  },
})

export const Content = styled("div", {
  gridArea: "content",
  display: "flex",
  justifyContent: "center",
  flexDirection: "column",
  fontSize: "17px",

  "@media screen and (max-width: 991px)": {
    marginLeft: 0,
  },

  [`${Aside} + &`]: {
    marginLeft: 0,
  },

  "& > :first-child": {
    marginTop: 0,
  },

  "& > :last-child": {
    marginBottom: 0,
  },

  [`${CodeWrapper}`]: {
    marginTop: 0,
  },
})

export const LogoWrapper = styled(Aside, {
  gridArea: "logo",
})

export const Intro = styled(Content, {
  gridArea: "intro",
})

export const Usage = styled(Content, {
  gridArea: "usage",
})

export const AsideTitleWrapper = styled(Aside, {
  gridArea: "usage-title",
})

export const AsideTitle = styled("h3", {
  fontSize: "24px",
  fontWeight: 500,
  alignSelf: "flex-start",
  marginTop: 0,
})

export const Title = styled("h1", {
  fontSize: "28px",
  fontWeight: 500,
  margin: 0,

  small: {
    marginTop: "8px",
    fontSize: "20px",
    color: "#b6c7d9",
    display: "block",
    fontWeight: 400,
  },
})

export const StyledLogo = styled(Logo, {
  width: "125px",
})

export const Buttons = styled(Content, {
  gridArea: "buttons",
  display: "flex",
  flexDirection: "row",
  justifyContent: "flex-start",
})

export const StyledLink = styled(Link, {
  color: "#fff",
  borderBottom: "1px solid #75b5ff",
  textDecoration: "none",
  whiteSpace: "nowrap",
  transition: "color 0.3s",

  "&:hover, &:focus": {
    color: darken(0.12, "#ceddf7"),
    transition: "none",
  },
})

export const Info = styled("p", {
  color: "#ceddf7",
  fontSize: "15px",
})
