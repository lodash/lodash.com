import styled from "styled-components"
import Button from "../Button"

export const DocsContentWrapper = styled.main`
  position: relative;
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin-left: 320px;
`

export const Content = styled.div`
  background: #1e2933;
  flex: 1 0 auto;
  padding: 124px 24px 24px;
`

export const SeeAll = styled(Button)`
  margin-bottom: 24px;
`
