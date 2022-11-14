import React from "react"
import * as S from "./styles"

export interface IButtonProps {
  variant?: "primary" | "secondary" | "tertiary" | "3d"
  size?: "small" | "medium" | "large"
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ variant, size, children, ...restProps }: IButtonProps): JSX.Element => {
  return (
    <S.ButtonWrapper variant={variant} size={size} {...restProps}>
      {children}
    </S.ButtonWrapper>
  )
}

export default Button
