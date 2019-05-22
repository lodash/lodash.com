import React from "react"
import * as SC from "./styles"

export interface ButtonProps {
  type?: "primary" | "secondary"
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({
  type = "secondary",
  children,
  ...restProps
}: ButtonProps): JSX.Element => (
  <SC.ButtonWrapper type={type} {...restProps}>
    {children}
  </SC.ButtonWrapper>
)

export default Button
