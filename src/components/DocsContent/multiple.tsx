import React from "react"
import { IMethod } from "../../types"
import Header from "../Header"
import Method from "../Method"
import * as SC from "./styles"

interface IMultipleMethodProps {
  methods: IMethod[]
}

const MultipleMethod = (props: IMultipleMethodProps): JSX.Element => {
  return (
    <SC.ContentWrapper>
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
    </SC.ContentWrapper>
  )
}

export default React.memo(MultipleMethod)
