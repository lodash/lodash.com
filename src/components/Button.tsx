import { darken } from "polished"
import React from "react"
import styled from "styled-components"

interface ButtonProps {
  type?: "primary" | "secondary"
  onClick?: () => void
  children: React.ReactNode
}

const primary = "#3492ff"
const secondary = "#fff"

const ButtonWrapper = styled.div<ButtonProps>`
  display: inline-flex;
  background: ${props => (props.type === "primary" ? primary : secondary)};
  color: ${props => (props.type === "primary" ? "#fff" : "#4b71ca")};
  font-size: 17px;
  padding: 16px 32px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15),
    0px 6px 10px rgba(51, 144, 252, 0.2);
  cursor: pointer;
  transition: 0.3s background;

  &:hover,
  &:focus {
    background: ${props =>
      props.type === "primary" ? darken(0.1, primary) : darken(0.1, secondary)};
  }

  & + & {
    margin-left: 8px;
  }
`

const Button = ({ type, children, ...restProps }: ButtonProps): JSX.Element => (
  <ButtonWrapper type={type} {...restProps}>
    {children}
  </ButtonWrapper>
)

Button.defaultProps = {
  type: "secondary",
}

export default Button
