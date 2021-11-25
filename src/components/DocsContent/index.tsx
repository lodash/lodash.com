import { PageProps } from "gatsby"
import React from "react"
import { useLayout } from "../../hooks/useLayout"
import { useData } from "../../hooks/useData"
import { IMethod } from "../../types"
import SingleMethod from "./single"
import AllMethods from "./all"
import * as SC from "./styles"

type IDocsContentProps = PageProps

const methodFromPath = (location: PageProps["location"]): string => {
  const [, , method] = location.pathname.split("/")

  return method
}

const DocsContent = (props: IDocsContentProps): JSX.Element => {
  const { state: dataState } = useData()
  const { actions: layoutActions } = useLayout()
  const currentMethod = methodFromPath(props.location)
  const methods = dataState.methodsFromVersion

  React.useEffect(() => {
    layoutActions.setLayoutType(currentMethod ? "regular" : "virtual")
  }, [currentMethod])

  // TODO: support method non-found for current version
  const method = React.useMemo(() => {
    return methods.find(({ node: m }) => m.name === currentMethod) as IMethod
  }, [currentMethod, methods])

  return (
    <SC.DocsContentWrapper>
      <SC.Content>
        {currentMethod ? <SingleMethod method={method} /> : <AllMethods methods={methods} />}
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default React.memo(DocsContent)
