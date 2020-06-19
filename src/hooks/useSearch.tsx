import { useContext } from "react"
import { SearchContext, ISearchContextInterface } from "../SearchProvider"

export function useSearch(): ISearchContextInterface {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  return searchContext
}
