import React from "react"
import * as S from "./styles"

export interface IButtonProps {
  variant?: "primary" | "secondary" | "tertiary"
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ variant = "secondary", children, ...restProps }: IButtonProps): JSX.Element => {
  return (
    <S.ButtonWrapper variant={variant} {...restProps}>
      {children}
    </S.ButtonWrapper>
  )
}

export default Button
