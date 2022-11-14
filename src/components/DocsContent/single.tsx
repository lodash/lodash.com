import { navigate } from "gatsby"
import React from "react"
import { IMethod } from "../../types"
import Header from "../Header"
import Method from "../Method"
import * as S from "./styles"

interface ISingleMethodProps {
  method: IMethod["node"]
}

const SingleMethod = (props: ISingleMethodProps): JSX.Element => {
  return (
    <S.ContentWrapper>
      <Header />
      <S.SeeAll
        onClick={() => navigate(`/docs/${props.method.category.toLowerCase()}`)}
        variant="tertiary"
      >
        ← See all
      </S.SeeAll>
      <Method method={props.method} isSingle={true} />
    </S.ContentWrapper>
  )
}

export default React.memo(SingleMethod)
