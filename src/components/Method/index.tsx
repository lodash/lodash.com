import { navigate } from "gatsby"
import React from "react"
import RunkitEmbed from "react-runkit"
import rehypeRaw from "rehype-raw"
import { useScript } from "../../hooks/useScript"
import { useSearch } from "../../hooks/useSearch"
import { IMethodNode } from "../../types"
import * as SC from "./styles"

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

  const formattedExample = React.useMemo(() => {
    return formatExample(method.example)
  }, [method.example])

  React.useEffect(() => {
    const qs = new URLSearchParams(window.location.search)

    if (qs.get("repl")) {
      setRepl(true)
    }
  }, [window.location.href])

  const enableRepl = React.useCallback(() => {
    // because of virtual scroll, we can't append the runkit embed, only allow when single
    if (isSingle) {
      setRepl(true)
    } else {
      navigate(`/docs/${method.name}?repl=true`)
    }
  }, [])

  const disableRepl = React.useCallback(() => {
    setRepl(false)
  }, [])

  return (
    <SC.MethodWrapper {...restProps}>
      <SC.Name>_.{method.call}</SC.Name>

      <SC.Content>
        <SC.MetaLinks>
          <SC.MetaLink
            href={`https://github.com/lodash/lodash/blob/4.17.11/lodash.js#L${method.lineNumber}`}
            target="_blank"
          >
            source
          </SC.MetaLink>
          {hasNPMPackage(method) && (
            <SC.MetaLink
              href={`https://www.npmjs.com/package/lodash.${method.name.toLowerCase()}`}
              target="_blank"
            >
              npm package
            </SC.MetaLink>
          )}
        </SC.MetaLinks>

        {/* TODO: possibly switch to a lighter solution? */}
        <SC.StyledMarkdown rehypePlugins={[rehypeRaw]}>{method.desc}</SC.StyledMarkdown>

        <SC.Subtitle>Since</SC.Subtitle>
        <SC.SubContent>{method.since}</SC.SubContent>

        <SC.Subtitle>Arguments</SC.Subtitle>
        <SC.SubContent>
          {/* I would rather not have to do this */}
          <SC.Arguments style={{ gridTemplateRows: `repeat(${method.params.length + 1}, 1fr)` }}>
            <SC.ArgumentHeader>argument</SC.ArgumentHeader>
            {method.params.map((param, i) => (
              <SC.ArgumentValue key={i}>
                <SC.InlineCode>{param.name}</SC.InlineCode>
              </SC.ArgumentValue>
            ))}

            <SC.ArgumentHeader>type</SC.ArgumentHeader>
            {method.params.map((param, i) => (
              <SC.ArgumentValueCode key={i}>{param.type}</SC.ArgumentValueCode>
            ))}

            <SC.ArgumentHeader>description</SC.ArgumentHeader>
            {method.params.map((param, i) => (
              <SC.ArgumentValue key={i}>{param.desc}</SC.ArgumentValue>
            ))}
          </SC.Arguments>
        </SC.SubContent>

        {/* TODO: reimplement? */}
        <SC.Subtitle>Returns</SC.Subtitle>
        <SC.SubContent>
          <SC.InlineCode>(array)</SC.InlineCode>
        </SC.SubContent>

        <SC.Subtitle>Example</SC.Subtitle>
        <SC.CodeWrapper>
          {!repl && (
            <>
              <SC.StyledCode>{formattedExample}</SC.StyledCode>
              <SC.REPLButton onClick={enableRepl}>Try in REPL →</SC.REPLButton>
            </>
          )}

          {runkitScriptStatus === "ready" && repl && (
            <SC.RunkitEmbedWrapper>
              <SC.CloseREPLButton onClick={disableRepl}>Exit REPL</SC.CloseREPLButton>
              <RunkitEmbed
                nodeVersion="16"
                source={formattedExample}
                preamble={`
                var _ = require("lodash@${stateSearch.version}")
                _.assign(global, require("lodash-doc-globals"))
                Object.observe = _.noop
              `}
              />
            </SC.RunkitEmbedWrapper>
          )}
        </SC.CodeWrapper>
      </SC.Content>
    </SC.MethodWrapper>
  )
}

export default Method
