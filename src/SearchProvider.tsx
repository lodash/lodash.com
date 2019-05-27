import React, { useState } from "react"

interface SearchProviderProps {
  children: React.ReactNode
}

export interface SearchContextInterface {
  state: {
    input: string
  }
  actions: {
    update: (value: string) => void
  }
}

export const SearchContext = React.createContext<SearchContextInterface | null>(
  null
)

export function SearchProvider({ children }: SearchProviderProps): JSX.Element {
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
