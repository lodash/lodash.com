import React from "react"

interface ILayoutProviderProps {
  children: React.ReactNode
}

type ELayoutType = "virtual" | "regular"

export interface ILayoutContext {
  state: {
    layoutType: ELayoutType
    isScrolled: boolean
  }
  actions: {
    setLayoutType: React.Dispatch<React.SetStateAction<ELayoutType>>
    setScrolled: React.Dispatch<React.SetStateAction<boolean>>
  }
}

export const LayoutContext = React.createContext<ILayoutContext | null>(null)

export function LayoutProvider({ children }: ILayoutProviderProps): JSX.Element {
  const [type, setType] = React.useState<ELayoutType>("regular")
  const [scrolled, setScrolled] = React.useState(false)

  const memoizedValue = React.useMemo(() => {
    return {
      state: {
        layoutType: type,
        isScrolled: scrolled,
      },
      actions: {
        setLayoutType: setType,
        setScrolled,
      },
    }
  }, [scrolled, type])

  return <LayoutContext.Provider value={memoizedValue}>{children}</LayoutContext.Provider>
}
