import { Link } from "gatsby"
import React from "react"
import styled from "styled-components"
import Logo from "../images/lodash.svg"
import Select from "./Select"

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
      <Link to="/">
        <StyledLogo />
      </Link>
    </LogoWrapper>

    <Select
      options={[
        { value: "4.17.11", text: "4.17.11" },
        { value: "3.10.1", text: "3.10.1" },
        { value: "2.4.2", text: "2.4.2" },
        { value: "1.3.1", text: "1.3.1" },
      ]}
    />
  </HeaderWrapper>
)

export default Header
