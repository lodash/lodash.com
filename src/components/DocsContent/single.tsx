import { navigate } from "gatsby"
import React from "react"
import { IMethod } from "../../types"
import Method from "../Method"
import * as S from "./styles"

interface ISingleMethodProps {
  method: IMethod["node"]
}

const SingleMethod = (props: ISingleMethodProps): JSX.Element => {
  return (
    <>
      <S.SeeAll
        onClick={() => navigate(`/docs/${props.method.category.toLowerCase()}`)}
        variant="tertiary"
      >
        ← See all
      </S.SeeAll>

      <Method method={props.method} isSingle={true} />
    </>
  )
}

export default React.memo(SingleMethod)
