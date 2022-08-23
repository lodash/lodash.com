import React from "react"
import { useData } from "../../hooks/useData"
import AllMethods from "./all"
import * as SC from "./styles"

const DocsContent = (): JSX.Element => {
  const { state: dataState } = useData()
  const methods = dataState.methodsFromVersion

  return (
    <SC.DocsContentWrapper>
      <SC.Content>
        <AllMethods methods={methods} />
      </SC.Content>
    </SC.DocsContentWrapper>
  )
}

export default React.memo(DocsContent)
