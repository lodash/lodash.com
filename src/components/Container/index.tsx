import React from "react"
import * as SC from "./styles"

interface ContainerProps {
  children: React.ReactNode
}

const Container = ({ children, ...restProps }: ContainerProps): JSX.Element => (
  <SC.ContainerWrapper {...restProps}>{children}</SC.ContainerWrapper>
)

export default Container
