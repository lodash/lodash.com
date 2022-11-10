import { navigate } from "gatsby"
import React from "react"
import { IMethod } from "../../types"
import Header from "../Header"
import Method from "../Method"
import * as SC from "./styles"

interface ISingleMethodProps {
  method: IMethod["node"]
}

const SingleMethod = (props: ISingleMethodProps): JSX.Element => {
  return (
    <SC.ContentWrapper>
      <Header />
      <SC.SeeAll onClick={() => navigate("/docs")} type="primary">
        ← See all
      </SC.SeeAll>
      <Method method={props.method} isSingle={true} />
    </SC.ContentWrapper>
  )
}

export default React.memo(SingleMethod)
