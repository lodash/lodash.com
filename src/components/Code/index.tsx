import React from "react"
import Highlight from "react-syntax-highlighter"
import prettier from "prettier/standalone"
import plugins from "prettier/parser-babel"
import Container from "../Container"
import lodashSyntaxHighlighting from "./lodash-syntax-highlighting"
import * as S from "./styles"

function formatByWidth(code: string, width: number) {
  try {
    return prettier.format(code, {
      parser: "babel",
      printWidth: width,
      plugins: [plugins],
    })
  } catch (err) {
    return code
  }
}

function trimmedFirstLine(code: string) {
  return code
    .split("\n")
    .filter((line, index) => {
      if (index === 0 && line.trim() === "") {
        return false
      }
      return true
    })
    .join("\n")
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
    const code = trimmedFirstLine(children)
    return {
      40: lang === "javascript" ? formatByWidth(code, 40) : code,
      80: lang === "javascript" ? formatByWidth(code, 80) : code,
    }
  }, [lang, children])

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
