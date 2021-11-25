import React from "react"
import { useKeyboardEvent } from "./hooks/useKeyboardEvent"
import { IGroup, IMethodNode } from "./types"
import { filterGroups } from "./utils"

interface ISidebarProviderProps {
  children: React.ReactNode
  initialGroups: IGroup[]
  searchInput: string
  version: string
}

interface IBaseInput {
  type: "input" | "method" | "nothing"
  methodId?: string
}

interface IFocusOnInput extends IBaseInput {
  type: "input"
}

interface IFocusOnMethod extends IBaseInput {
  type: "method"
  methodId: string
}

interface IFocusOnNothing extends IBaseInput {
  type: "nothing"
}

export type Focus = IFocusOnInput | IFocusOnMethod | IFocusOnNothing

export interface ISidebarContext {
  state: {
    focus: Focus
    filteredGroups: IGroup[]
  }
  actions: {
    focusMethod: (methodId: string) => void
    focusPrevious: () => void
    focusNext: () => void
    clearFocus: () => void
    focusInput: () => void
  }
}

export const SidebarContext = React.createContext<ISidebarContext | null>(null)

export function SidebarProvider({
  children,
  initialGroups,
  searchInput,
  version,
}: ISidebarProviderProps): JSX.Element {
  const [focus, setFocus] = React.useState<Focus>({
    type: "nothing",
  })

  const filteredGroups = React.useMemo<IGroup[]>(() => {
    return filterGroups(initialGroups, searchInput, version)
  }, [JSON.stringify(initialGroups), searchInput, version])

  const flattenedMethods = React.useMemo<IMethodNode[]>(() => {
    return filteredGroups.flatMap((group) => group.edges.map((edge) => edge.node))
  }, [JSON.stringify(filteredGroups), version])

  const methodIdx = flattenedMethods.map((m) => m.id)

  const focusPrevious = () => {
    const currentIndex = methodIdx.findIndex((id) => id === focus.methodId)
    const previousId = methodIdx[currentIndex - 1]
    const isFirst = currentIndex === 0

    if (focus.type !== "method") {
      return
    }

    if (isFirst) {
      focusInput()
    } else {
      focusMethod(previousId)
    }
  }

  const focusNext = () => {
    const currentIndex = methodIdx.findIndex((id) => id === focus.methodId)
    const nextId = methodIdx[currentIndex + 1]
    const isLast = currentIndex === methodIdx.length - 1

    if (!isLast) {
      focusMethod(nextId)
    }
  }

  useKeyboardEvent("/", focusInput)
  useKeyboardEvent("ArrowUp", focusPrevious, [flattenedMethods, focus.type, focus.methodId])
  useKeyboardEvent("ArrowDown", focusNext, [flattenedMethods, focus.type, focus.methodId])

  function clearFocus(): void {
    setFocus({ type: "nothing" })
  }

  function focusInput(): void {
    setFocus({ type: "input" })
  }

  function focusMethod(methodId: string): void {
    setFocus({ type: "method", methodId })
  }

  const memoizedValue = React.useMemo(() => {
    return {
      state: {
        focus,
        filteredGroups,
      },
      actions: {
        focusMethod,
        focusPrevious,
        focusNext,
        clearFocus,
        focusInput,
      },
    }
  }, [JSON.stringify(focus), JSON.stringify(filteredGroups)])

  return <SidebarContext.Provider value={memoizedValue}>{children}</SidebarContext.Provider>
}
