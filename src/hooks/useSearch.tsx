import { useContext } from "react"
import { SearchContext, ISearchContext } from "../SearchProvider"

export function useSearch(): ISearchContext {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  return searchContext
}
