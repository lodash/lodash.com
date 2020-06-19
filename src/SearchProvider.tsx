import React, { useState } from "react"

interface ISearchProviderProps {
  children: React.ReactNode
}

export interface ISearchContext {
  state: {
    input: string
  }
  actions: {
    update: (value: string) => void
  }
}

export const SearchContext = React.createContext<ISearchContext | null>(null)

export function SearchProvider({ children }: ISearchProviderProps): JSX.Element {
  const [input, setInput] = useState("")

  const update = (value: string): void => {
    setInput(value)
  }

  return (
    <SearchContext.Provider
      value={{
        state: {
          input,
        },
        actions: {
          update,
        },
      }}
    >
      {children}
    </SearchContext.Provider>
  )
}
