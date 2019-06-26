import { Link } from "gatsby"
import styled from "styled-components"
import Logo from "../../images/lodash.svg"
import { CodeWrapper } from "../Code/styles"
import Container from "../Container"

export const HeroWrapper = styled.header`
  display: flex;
  min-height: 100vh;
  background: linear-gradient(
      135deg,
      rgba(60, 69, 78, 1) 0%,
      rgba(60, 69, 78, 0) 150%
    ),
    linear-gradient(180deg, rgba(34, 85, 144, 1) 0%, rgba(52, 146, 255, 1) 100%);
  color: #fff;
  margin-bottom: 64px;
`

export const StyledContainer = styled(Container)`
  justify-content: center;
`

export const HeroInner = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 0 0 auto;
  flex-wrap: wrap;
`

export const Row = styled.div`
  display: flex;
  width: 100%;

  @media screen and (max-width: 991px) {
    flex-direction: column;
  }

  & + & {
    margin-top: 32px;
  }
`

export const Aside = styled.aside`
  display: flex;
  flex: 0 0 35%;
  padding-right: 32px;
  justify-content: flex-end;
  align-items: center;
  font-weight: 700;

  @media screen and (max-width: 991px) {
    justify-content: flex-start;
    flex-basis: auto;
    padding-right: 0;
    padding-bottom: 32px;
  }
`

export const AsideTitle = styled.h3`
  font-size: 24px;
  font-weight: 500;
  align-self: flex-start;
  margin-top: 0;
`

export const Content = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  flex: 1 0 65%;
  font-size: 17px;
  margin-left: 35%;

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

export const ButtonsWrapper = styled.div`
  display: flex;
`

export const StyledLink = styled(Link)`
  color: #fff;
  border-bottom: 1px solid #75b5ff;
  text-decoration: none;
  white-space: nowrap;
`

export const Info = styled.p`
  color: #ceddf7;
  font-size: 15px;
`
