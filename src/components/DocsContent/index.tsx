import React from "react"
import * as SC from "./styles"

interface IDocsContentProps {
  children: React.ReactNode
}

const DocsContent = (props: IDocsContentProps): JSX.Element => {
  return (
    <SC.DocsContentWrapper>
      <SC.Content>{props.children}</SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default React.memo(DocsContent)
