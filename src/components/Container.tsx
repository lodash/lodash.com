import React from "react"
import styled from "styled-components"

interface ContainerProps {
  children: React.ReactNode
}

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  margin: 0 auto;
  width: 100%;
  max-width: 1300px;

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`

const Container = ({ children, ...restProps }: ContainerProps): JSX.Element => (
  <ContainerWrapper {...restProps}>{children}</ContainerWrapper>
)

export default Container
