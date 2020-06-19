import React, { useEffect, useState, useMemo } from "react"
import { useKeyboardEvent } from "./hooks/useKeyboardEvent"
import { IGroup, IMethod, IMethodNode } from "./types"

interface ISidebarProviderProps {
  children: React.ReactNode
  initialGroups: IGroup[]
  searchInput: string
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

function filterMethod(method: IMethod, input: string): boolean {
  return method.node.name.toLowerCase().includes(input.toLowerCase())
}

function filterMethods(methods: IMethod[], input: string): IMethod[] {
  return methods.filter((method) => filterMethod(method, input))
}

function filterGroups(groups: IGroup[], input: string): IGroup[] {
  return groups
    .map((group) => {
      return {
        ...group,
        edges: group.edges.filter((method) => filterMethod(method, input)),
      }
    })
    .filter(({ edges: groupMethods }) => {
      return filterMethods(groupMethods, input).length
    })
}

export function SidebarProvider({
  children,
  initialGroups,
  searchInput,
}: ISidebarProviderProps): JSX.Element {
  const [filteredGroups, setFilteredGroups] = useState<IGroup[]>([])
  const [focus, setFocus] = useState<Focus>({
    type: "nothing",
  })

  useEffect(() => {
    setFilteredGroups(initialGroups)
  }, [])

  useEffect(() => {
    setFilteredGroups(filterGroups(initialGroups, searchInput))
  }, [searchInput])

  const flattenedMethods = useMemo<IMethodNode[]>(() => {
    return filteredGroups.flatMap((group) => group.edges.map((edge) => edge.node))
  }, [JSON.stringify(filteredGroups)])

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

  const memoizedValue = useMemo(() => {
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
