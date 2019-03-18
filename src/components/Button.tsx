import { darken } from "polished"
import React from "react"
import styled from "styled-components"

interface ButtonProps {
  type?: "primary" | "secondary"
  onClick?: () => void
}

const ButtonWrapper = styled.div<ButtonProps>`
  background: ${props => (props.type === "primary" ? `#ffeb80` : `#fffbe5`)};
  color: #545454;
  font-size: 17px;
  padding: 16px 32px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15),
    0px 6px 10px rgba(255, 223, 52, 0.2);
  cursor: pointer;
  transition: 0.3s background;

  &:hover,
  &:focus {
    background: ${props =>
      props.type === "primary"
        ? darken(0.2, `#ffeb80`)
        : darken(0.2, `#fffbe5`)};
  }

  & + & {
    margin-left: 8px;
  }
`

const Button: React.SFC<ButtonProps> = ({ type, children, ...restProps }) => (
  <ButtonWrapper type={type} {...restProps}>
    {children}
  </ButtonWrapper>
)

Button.defaultProps = {
  type: "secondary",
}

export default Button
