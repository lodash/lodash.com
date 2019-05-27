import { useContext } from "react"
import { SearchContext, SearchContextInterface } from "../SearchProvider"

export function useSearch(): SearchContextInterface {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  return searchContext
}
