import styled from "styled-components"
import Button from "../Button"
import { lighten } from "polished"

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
  background: #293845;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15), 0px 6px 10px #171f26;
  border-radius: 3px;

  &:hover,
  &:focus {
    background: ${lighten(0.08, "#293845")};
  }
`
