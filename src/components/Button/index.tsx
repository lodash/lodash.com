import cx from "classnames"
import React from "react"
import * as S from "./styles"

export interface IButtonProps {
  type?: "primary" | "secondary"
  onClick?: () => void
  children: React.ReactNode
}

const Button = ({ type = "secondary", children, ...restProps }: IButtonProps): JSX.Element => (
  <S.ButtonWrapper
    className={cx({ "type-primary": type === "primary", "type-secondary": type === "secondary" })}
    {...restProps}
  >
    {children}
  </S.ButtonWrapper>
)

export default Button
