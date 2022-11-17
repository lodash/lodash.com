import React from "react"
import Header from "../Header"
import * as S from "./styles"

interface IDocsContentProps {
  children: React.ReactNode
}

const DocsContent = (props: IDocsContentProps): JSX.Element => {
  return (
    <S.DocsContentWrapper>
      <S.Content>
        <S.ContentWrapper>
          <Header />
          {props.children}
        </S.ContentWrapper>
      </S.Content>
    </S.DocsContentWrapper>
  )
}

export default React.memo(DocsContent)
