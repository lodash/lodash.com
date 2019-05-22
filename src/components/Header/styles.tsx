import styled from "styled-components"
import Logo from "../../images/lodash.svg"

export const HeaderWrapper = styled.header<{ scrolled: boolean }>`
  display: flex;
  align-items: center;
  background: #171f26;
  padding: 24px;
  height: 100px;
  position: fixed;
  top: 0;
  left: 320px;
  right: 0;

  &:after {
    content: "";
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: linear-gradient(180deg, rgba(0, 0, 0, 0.35), rgba(0, 0, 0, 0));
    height: 45px;
    pointer-events: none;
    opacity: ${({ scrolled }) => (scrolled ? 1 : 0)};
    transition: opacity 0.3s;
  }
`

export const LogoWrapper = styled.div`
  display: flex;
  align-items: center;
  padding-right: 20px;
  margin-right: 20px;
  border-right: 2px solid #293845;
`

export const StyledLogo = styled(Logo)`
  width: 58px;
`
