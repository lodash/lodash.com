import React from "react"
import { useSearch } from "./hooks/useSearch"
import { IGroup, IMethod } from "./types"

interface IDataProviderProps {
  children: React.ReactNode
  groups: IGroup[]
}

export interface IDataContext {
  state: {
    groups: IGroup[]
    allMethods: IMethod[]
    methodsFromVersion: IMethod[]
  }
}

export const DataContext = React.createContext<IDataContext | null>(null)

export function DataProvider({ children, groups }: IDataProviderProps): JSX.Element {
  const { state: searchState } = useSearch()

  // TODO: optimize performance
  const allMethods = React.useMemo(() => {
    return groups.map((group) => group.edges).flat()
  }, [groups])

  // Consider possibly moving this in the GraphQL query
  const methodsFromVersion = React.useMemo(() => {
    return allMethods.filter((method) => method.node.version === searchState.version)
  }, [allMethods, searchState.version])

  return (
    <DataContext.Provider
      value={{
        state: {
          groups,
          allMethods,
          methodsFromVersion,
        },
      }}
    >
      {children}
    </DataContext.Provider>
  )
}
