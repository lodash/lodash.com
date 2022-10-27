import React from "react"
import Highlight from "react-syntax-highlighter"
import Container from "../Container"
import lodashSyntaxHighlighting from "./lodash-syntax-highlighting"
import * as SC from "./styles"

interface ICodeProps {
  children: string
  lang?: string
  withContainer?: boolean
}

const Code = ({
  children,
  withContainer = false,
  lang = "javascript",
  ...restProps
}: ICodeProps): JSX.Element => {
  const MaybeContainer = withContainer ? Container : React.Fragment

  return (
    <SC.CodeWrapper {...restProps}>
      <MaybeContainer>
        <Highlight language={lang} style={lodashSyntaxHighlighting}>
          {children.trim()}
        </Highlight>
      </MaybeContainer>
    </SC.CodeWrapper>
  )
}

export default Code
