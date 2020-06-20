import { Link } from "gatsby"
import { darken } from "polished"
import styled from "styled-components"
import Logo from "../../images/lodash.svg"
import { CodeWrapper } from "../Code/styles"
import Container from "../Container"

export const HeroWrapper = styled.header`
  display: flex;
  min-height: calc(100vh - 128px);
  padding: 64px 0;
  background: linear-gradient(135deg, rgba(60, 69, 78, 1) 0%, rgba(60, 69, 78, 0) 150%),
    linear-gradient(180deg, rgba(34, 85, 144, 1) 0%, rgba(52, 146, 255, 1) 100%);
  color: #fff;
  margin-bottom: 64px;
`

export const StyledContainer = styled(Container)`
  justify-content: center;
`

export const HeroInner = styled.div`
  display: grid;
  grid-template-columns: 125px auto;
  grid-template-areas:
    "logo        intro"
    "aside       buttons"
    "usage-title usage";
  row-gap: 32px;
  column-gap: 32px;
`

export const Aside = styled.aside`
  grid-area: aside;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: 700;

  @media screen and (max-width: 991px) {
    justify-content: flex-start;
  }
`

export const Content = styled.div`
  grid-area: content;
  display: flex;
  justify-content: center;
  flex-direction: column;
  font-size: 17px;

  @media screen and (max-width: 991px) {
    margin-left: 0;
  }

  ${Aside} + & {
    margin-left: 0;
  }

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }

  ${CodeWrapper} {
    margin-top: 0;
  }
`

export const LogoWrapper = styled(Aside)`
  grid-area: logo;
`

export const Intro = styled(Content)`
  grid-area: intro;
`

export const Usage = styled(Content)`
  grid-area: usage;
`

export const AsideTitleWrapper = styled(Aside)`
  grid-area: usage-title;
`

export const AsideTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  align-self: flex-start;
  margin-top: 0;
`

export const Title = styled.h1`
  font-size: 28px;
  font-weight: 500;
  margin: 0;

  small {
    margin-top: 8px;
    font-size: 20px;
    color: #b6c7d9;
    display: block;
    font-weight: 400;
  }
`

export const StyledLogo = styled(Logo)`
  width: 125px;
`

export const Buttons = styled(Content)`
  grid-area: buttons;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
`

export const StyledLink = styled(Link)`
  color: #fff;
  border-bottom: 1px solid #75b5ff;
  text-decoration: none;
  white-space: nowrap;
  transition: color 0.3s;

  &:hover,
  &:focus {
    color: ${darken(0.12, "#ceddf7")};
    transition: none;
  }
`

export const Info = styled.p`
  color: #ceddf7;
  font-size: 15px;
`
