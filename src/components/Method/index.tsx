import React from "react"
import rehypeRaw from "rehype-raw"
import { IMethodNode } from "../../types"
import * as SC from "./styles"

interface IMethodProps {
  method: IMethodNode
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

const Method = ({ method, ...restProps }: IMethodProps): JSX.Element => (
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
            <SC.ArgumentValue key={i}>{param.type}</SC.ArgumentValue>
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
      <SC.StyledCode>{formatExample(method.example)}</SC.StyledCode>
    </SC.Content>
  </SC.MethodWrapper>
)

export default Method
