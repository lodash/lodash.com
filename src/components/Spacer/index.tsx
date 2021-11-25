import React from "react"

export interface ISpacerProps {
  height: number
}

const Spacer = (props: ISpacerProps): JSX.Element => <div style={{ height: props.height }} />

export default Spacer
