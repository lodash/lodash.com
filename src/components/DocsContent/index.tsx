import React from "react"
import * as S from "./styles"

interface IDocsContentProps {
  children: React.ReactNode
}

const DocsContent = (props: IDocsContentProps): JSX.Element => {
  return (
    <S.DocsContentWrapper>
      <S.Content>{props.children}</S.Content>
    </S.DocsContentWrapper>
  )
}

export default React.memo(DocsContent)
