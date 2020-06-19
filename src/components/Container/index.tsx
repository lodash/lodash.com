import React from "react"
import * as SC from "./styles"

interface IContainerProps {
  children: React.ReactNode
}

const Container = ({
  children,
  ...restProps
}: IContainerProps): JSX.Element => (
  <SC.ContainerWrapper {...restProps}>{children}</SC.ContainerWrapper>
)

export default Container
