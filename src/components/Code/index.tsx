import React from "react"
import Highlight from "react-highlight"
import Container from "../Container"
import * as SC from "./styles"

interface CodeProps {
  children: React.ReactNode
  lang?: string
  withContainer?: boolean
}

const Code = ({
  children,
  withContainer = false,
  lang = "js",
  ...restProps
}: CodeProps): JSX.Element => {
  const MaybeContainer = withContainer ? Container : React.Fragment
  const trimmedCode = React.Children.map(children, child => {
    return typeof child === "string" ? child.trim() : child
  })

  return (
    <SC.CodeWrapper {...restProps}>
      <MaybeContainer>
        <Highlight children={trimmedCode} className={lang} />
      </MaybeContainer>
    </SC.CodeWrapper>
  )
}

export default Code
