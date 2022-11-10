import React from "react"
import * as S from "./styles"

interface IContainerProps {
  children: React.ReactNode
}

const Container = ({ children, ...restProps }: IContainerProps): JSX.Element => (
  <S.ContainerWrapper {...restProps}>{children}</S.ContainerWrapper>
)

export default Container
