import React from "react"
import { Method as MethodInterface } from "../../types"
import * as SC from "./styles"

interface MethodProps {
  method: MethodInterface["node"]
}

function hasNPMPackage(method: MethodInterface["node"]): boolean {
  if (method.name === "templateSettings") {
    return true
  }

  return !["methods", "properties", "seq"].includes(method.category.toLowerCase())
}

const Method = ({ method, ...restProps }: MethodProps): JSX.Element => (
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
      <SC.StyledMarkdown source={method.desc} escapeHtml={false} />

      <SC.Subtitle>Since</SC.Subtitle>
      <SC.SubContent>{method.since}</SC.SubContent>

      <SC.Subtitle>Arguments</SC.Subtitle>
      <SC.SubContent>
        <SC.Arguments>
          <SC.ArgumentCol>
            <SC.ArgumentHeader>argument</SC.ArgumentHeader>
            {method.params.map((param, i) => (
              <SC.ArgumentValue key={i}>
                <SC.InlineCode>{param.name}</SC.InlineCode>
              </SC.ArgumentValue>
            ))}
          </SC.ArgumentCol>

          <SC.ArgumentCol>
            <SC.ArgumentHeader>type</SC.ArgumentHeader>
            {method.params.map((param, i) => (
              <SC.ArgumentValue key={i}>{param.type}</SC.ArgumentValue>
            ))}
          </SC.ArgumentCol>

          <SC.ArgumentCol>
            <SC.ArgumentHeader>description</SC.ArgumentHeader>
            {method.params.map((param, i) => (
              <SC.ArgumentValue key={i}>{param.desc}</SC.ArgumentValue>
            ))}
          </SC.ArgumentCol>
        </SC.Arguments>
      </SC.SubContent>

      {/* TODO: reimplement? */}
      <SC.Subtitle>Returns</SC.Subtitle>
      <SC.SubContent>
        <SC.InlineCode>(array)</SC.InlineCode>
      </SC.SubContent>

      <SC.Subtitle>Example</SC.Subtitle>
      <SC.StyledCode>
        {method.example
          .replace(/```js/, "")
          .replace(/```/, "")
          .trim()}
      </SC.StyledCode>
    </SC.Content>
  </SC.MethodWrapper>
)

export default Method
