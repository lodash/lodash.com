import React, { useState } from "react"

interface ISearchProviderProps {
  children: React.ReactNode
}

export interface ISearchContext {
  state: {
    input: string
    version: string
  }
  actions: {
    update: (value: string) => void
    updateVersion: (value: string) => void
  }
}

export const SearchContext = React.createContext<ISearchContext | null>(null)

export function SearchProvider({ children }: ISearchProviderProps): JSX.Element {
  const [input, setInput] = useState("")

  // this is short-lived, will eventually be moved to routing
  const [version, setVersion] = useState("4.17.11")

  const update = (value: string): void => {
    setInput(value)
  }

  const updateVersion = (value: string): void => {
    setVersion(value)
  }

  return (
    <SearchContext.Provider
      value={{
        state: {
          input,
          version,
        },
        actions: {
          update,
          updateVersion,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
