import { PageProps } from "gatsby"
import React, { memo, useEffect, useMemo } from "react"
import { useLayout } from "../../hooks/useLayout"
import { IMethod } from "../../types"
import SingleMethod from "./single"
import AllMethods from "./all"
import * as SC from "./styles"

interface IDocsContentProps extends PageProps {
  methods: IMethod[]
}

const methodFromPath = (location: PageProps["location"]): string => {
  const [, , method] = location.pathname.split("/")

  return method
}

const DocsContent = (props: IDocsContentProps): JSX.Element => {
  const { actions: layoutActions } = useLayout()
  const currentMethod = methodFromPath(props.location)

  useEffect(() => {
    layoutActions.setLayoutType(currentMethod ? "regular" : "virtual")
  }, [currentMethod])

  // TODO: support method non-found for current version
  const method = useMemo(() => {
    return props.methods.find(({ node: m }) => m.name === currentMethod) as IMethod
  }, [currentMethod, props.methods])

  return (
    <SC.DocsContentWrapper>
      <SC.Content>
        {currentMethod ? <SingleMethod method={method} /> : <AllMethods methods={props.methods} />}
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default memo(DocsContent)
