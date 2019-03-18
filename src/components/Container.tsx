import React from "react"
import styled from "styled-components"

const ContainerWrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0 32px;
  margin: 0 auto;
  width: 1300px;
  max-width: 100%;

  & > :first-child {
    margin-top: 0;
  }

  & > :last-child {
    margin-bottom: 0;
  }
`

const Container: React.SFC<{}> = ({ children, ...restProps }) => (
  <ContainerWrapper {...restProps}>{children}</ContainerWrapper>
)

export default Container
