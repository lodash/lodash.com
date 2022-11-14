import React from "react"
import Stitches from "@stitches/react"
import * as S from "./styles"

type StyledButtonVariants = Stitches.VariantProps<typeof S.ButtonWrapper>

export interface IButtonProps extends StyledButtonVariants {
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
