import React from "react"
import { DataContext, IDataContext } from "../DataProvider"

export function useData(): IDataContext {
  const dataContext = React.useContext(DataContext)

  if (!dataContext) {
    throw Error("Need context")
  }

  return dataContext
}
