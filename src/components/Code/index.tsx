import React from "react"
import Highlight from "react-syntax-highlighter"
import prettier from "prettier/standalone"
import plugins from "prettier/parser-babel"
import Container from "../Container"
import lodashSyntaxHighlighting from "./lodash-syntax-highlighting"
import * as S from "./styles"

function formatByWidth(code, width) {
  return prettier.format(code, {
    parser: "babel",
    printWidth: width,
    plugins: [plugins],
  })
}

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

  const formattedCode = React.useMemo(() => {
    return {
      40: formatByWidth(children, 40),
      80: formatByWidth(children, 80),
    }
  }, [children])

  console.log(formattedCode)

  return (
    <S.CodeWrapper {...restProps}>
      <MaybeContainer>
        <Highlight className="mobile-code" language={lang} style={lodashSyntaxHighlighting}>
          {formattedCode[40]}
        </Highlight>
        <Highlight className="desktop-code" language={lang} style={lodashSyntaxHighlighting}>
          {formattedCode[80]}
        </Highlight>
      </MaybeContainer>
    </S.CodeWrapper>
  )
}

export default Code
