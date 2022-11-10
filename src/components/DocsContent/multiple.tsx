import React from "react"
import { IMethod } from "../../types"
import Header from "../Header"
import Method from "../Method"
import * as S from "./styles"

interface IMultipleMethodProps {
  methods: IMethod[]
}

const MultipleMethod = (props: IMultipleMethodProps): JSX.Element => {
  return (
    <S.ContentWrapper>
      <Header />

      {props.methods.map((m, index) => {
        const method = m.node

        return (
          <Method
            key={`${method.category}-${method.name}-${index}`}
            method={method}
            isSingle={false}
          />
        )
      })}
    </S.ContentWrapper>
  )
}

export default React.memo(MultipleMethod)
