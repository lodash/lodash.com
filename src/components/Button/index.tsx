import React from "react"
import * as SC from "./styles"

export interface IButtonProps {
  type?: "primary" | "secondary"
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ type = "secondary", children, ...restProps }: IButtonProps): JSX.Element => (
  <SC.ButtonWrapper type={type} {...restProps}>
    {children}
  </SC.ButtonWrapper>
)

export default Button
