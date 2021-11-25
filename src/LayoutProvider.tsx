import React, { useState, useMemo } from "react"

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
  const [type, setType] = useState<ELayoutType>("regular")
  const [scrolled, setScrolled] = useState(false)

  const memoizedValue = useMemo(() => {
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
