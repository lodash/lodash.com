import React from "react"
import { SearchContext, ISearchContext } from "../SearchProvider"

export function useSearch(): ISearchContext {
  const searchContext = React.useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  return searchContext
}
