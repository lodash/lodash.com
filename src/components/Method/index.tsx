import { navigate } from "gatsby"
import React from "react"
import RunkitEmbed from "react-runkit"
import rehypeRaw from "rehype-raw"
import { useScript } from "../../hooks/useScript"
import { useSearch } from "../../hooks/useSearch"
import { IMethodNode } from "../../types"
import * as S from "./styles"

const isBrowser = typeof window !== "undefined"

interface IMethodProps {
  method: IMethodNode
  isSingle: boolean
}

function hasNPMPackage(method: IMethodNode): boolean {
  if (method.name === "templateSettings") {
    return true
  }

  return !["methods", "properties", "seq"].includes(method.category.toLowerCase())
}

function formatExample(example: IMethodNode["example"]): string {
  // this is a temporary hack, should be eventually removed directly in gatsby-source-plugin
  const removeLastStar = (str: string) => str.split("\n").slice(0, -1).join("\n")
  const trimmedExample = example.replace(/```js/, "").replace(/```/, "").trim()

  return removeLastStar(trimmedExample)
}

const Method = ({ method, isSingle, ...restProps }: IMethodProps): JSX.Element => {
  const runkitScriptStatus = useScript("https://embed.runkit.com")

  const { state: stateSearch } = useSearch()
  const [repl, setRepl] = React.useState(false)

  const version = stateSearch.version

  const formattedExample = React.useMemo(() => {
    return formatExample(method.example)
  }, [method.example])

  React.useEffect(() => {
    if (isBrowser) {
      const qs = new URLSearchParams(window.location.search)

      if (qs.get("repl")) {
        setRepl(true)
      }
    }
  }, [isBrowser])

  const enableRepl = React.useCallback(() => {
    // because of virtual scroll, we can't append the runkit embed, only allow when single
    if (isSingle) {
      setRepl(true)
    } else {
      navigate(`/docs/${version}/${method.category.toLowerCase()}/${method.name}?repl=true`)
    }
  }, [])

  const disableRepl = React.useCallback(() => {
    setRepl(false)
  }, [])

  return (
    <S.MethodWrapper {...restProps}>
      <S.Name>_.{method.call}</S.Name>

      <S.Content>
        <S.MetaLinks>
          <S.MetaLink
            href={`https://github.com/lodash/lodash/blob/${version}/lodash.js#L${method.lineNumber}`}
            target="_blank"
            rel="noopener"
          >
            source
          </S.MetaLink>
          {hasNPMPackage(method) && (
            <S.MetaLink
              href={`https://www.npmjs.com/package/lodash.${method.name.toLowerCase()}`}
              target="_blank"
              rel="noopener"
            >
              npm package
            </S.MetaLink>
          )}
        </S.MetaLinks>

        {/* TODO: possibly switch to a lighter solution? */}
        <S.StyledMarkdown rehypePlugins={[rehypeRaw]}>{method.desc}</S.StyledMarkdown>

        {method.since && (
          <>
            <S.Subtitle>Since</S.Subtitle>
            <S.SubContent>{method.since}</S.SubContent>
          </>
        )}

        {method.params.length > 0 && (
          <>
            <S.Subtitle>Arguments</S.Subtitle>
            <S.SubContent>
              {/* I would rather not have to do this */}
              <S.Arguments style={{ gridTemplateRows: `repeat(${method.params.length + 1}, 1fr)` }}>
                <S.ArgumentHeader>argument</S.ArgumentHeader>
                {method.params.map((param, i) => (
                  <S.ArgumentValue key={i}>
                    <S.InlineCode>{param.name}</S.InlineCode>
                  </S.ArgumentValue>
                ))}

                <S.ArgumentHeader>type</S.ArgumentHeader>
                {method.params.map((param, i) => (
                  <S.ArgumentValueCode key={i}>{param.type}</S.ArgumentValueCode>
                ))}

                <S.ArgumentHeader>description</S.ArgumentHeader>
                {method.params.map((param, i) => (
                  <S.ArgumentValue key={i}>{param.desc}</S.ArgumentValue>
                ))}
              </S.Arguments>
            </S.SubContent>
          </>
        )}

        {/* TODO: reimplement? */}
        <S.Subtitle>Returns</S.Subtitle>
        <S.SubContent>
          <S.InlineCode>(array)</S.InlineCode>
        </S.SubContent>

        {method.example && (
          <>
            <S.Subtitle>Example</S.Subtitle>
            <S.CodeWrapper>
              {!repl && (
                <>
                  <S.StyledCode>{formattedExample}</S.StyledCode>
                  <S.REPLButton variant="3d" size="medium" onClick={enableRepl}>
                    Try in REPL →
                  </S.REPLButton>
                </>
              )}

              {runkitScriptStatus === "ready" && repl && (
                <S.RunkitEmbedWrapper>
                  <S.CloseREPLButton size="small" onClick={disableRepl}>
                    Exit REPL
                  </S.CloseREPLButton>
                  <RunkitEmbed
                    nodeVersion="16"
                    source={formattedExample}
                    preamble={`
                var _ = require("lodash@${stateSearch.version}")
                _.assign(global, require("lodash-doc-globals"))
                Object.observe = _.noop
              `}
                  />
                </S.RunkitEmbedWrapper>
              )}
            </S.CodeWrapper>
          </>
        )}
      </S.Content>
    </S.MethodWrapper>
  )
}

export default Method
