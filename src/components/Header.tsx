import React from "react"
import styled from "styled-components"
import Logo from "../images/lodash.svg"

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  background: #171f26;
  padding: 24px;
`

const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 2px solid #293845;
`

const StyledLogo = styled(Logo)`
  width: 58px;
`

const Header = (): JSX.Element => (
  <HeaderWrapper>
    <LogoWrapper>
      <StyledLogo />
    </LogoWrapper>
  </HeaderWrapper>
)

export default Header
