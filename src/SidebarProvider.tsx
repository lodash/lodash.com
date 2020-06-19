import React, { useEffect, useState } from "react"
import { IGroup as IGroupInterface, IMethod as IMethodInterface } from "./types"

interface ISidebarProviderProps {
  children: React.ReactNode
  initialGroups: IGroupInterface[]
  searchInput: string
}

interface IBaseInput {
  type: "input" | "method" | "nothing"
  method: number | null
  group: number | null
}

interface IFocusOnInput extends IBaseInput {
  type: "input"
  method: null
  group: null
}

interface IFocusOnMethod extends IBaseInput {
  type: "method"
  method: number
  group: number
}

interface IFocusOnNothing extends IBaseInput {
  type: "nothing"
  method: null
  group: null
}

export type Focus = IFocusOnInput | IFocusOnMethod | IFocusOnNothing

export interface ISidebarContextInterface {
  state: {
    focus: Focus
    filteredGroups: IGroupInterface[]
  }
  actions: {
    focusPrevious: () => void
    focusNext: () => void
    focusPreviousGroup: (atIndex: number) => void
    focusNextGroup: () => void
    clearFocus: () => void
    focusInput: () => void
  }
}

export const SidebarContext = React.createContext<ISidebarContextInterface | null>(
  null
)

function filterMethod(method: IMethodInterface, input: string): boolean {
  return method.node.name.toLowerCase().includes(input.toLowerCase())
}

function filterMethods(
  methods: IMethodInterface[],
  input: string
): IMethodInterface[] {
  return methods.filter((method) => filterMethod(method, input))
}

function filterGroups(
  groups: IGroupInterface[],
  input: string
): IGroupInterface[] {
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
  const [filteredGroups, setFilteredGroups] = useState<IGroupInterface[]>([])
  const [focus, setFocus] = useState<Focus>({
    type: "nothing",
    method: null,
    group: null,
  })

  useEffect(() => {
    setFilteredGroups(initialGroups)
  }, [])

  useEffect(() => {
    setFilteredGroups(filterGroups(initialGroups, searchInput))
  }, [searchInput])

  function focusPrevious(): void {
    if (focus.type === "method" && focus.method === 0 && focus.group === 0) {
      focusInput()
    } else if (focus.type === "method") {
      focusMethod({ method: focus.method - 1, group: focus.group })
    }
  }

  function focusNext(): void {
    if (focus.type === "nothing" || focus.type === "input") {
      focusMethod({ method: 0, group: 0 })
    } else if (focus.type === "method") {
      focusMethod({ method: focus.method + 1, group: focus.group })
    }
  }

  function focusPreviousGroup(atIndex: number): void {
    focusMethod({
      method: atIndex,
      group: (focus.group as number) - 1,
    })
  }

  function focusNextGroup(): void {
    focusMethod({
      method: 0,
      group: (focus.group as number) + 1,
    })
  }

  function clearFocus(): void {
    setFocus({ type: "nothing", method: null, group: null })
  }

  function focusInput(): void {
    setFocus({ type: "input", method: null, group: null })
  }

  function focusMethod({
    method,
    group,
  }: {
    method: number
    group: number
  }): void {
    setFocus({ type: "method", method, group })
  }

  return (
    <SidebarContext.Provider
      value={{
        state: {
          focus,
          filteredGroups,
        },
        actions: {
          focusPrevious,
          focusNext,
          focusPreviousGroup,
          focusNextGroup,
          clearFocus,
          focusInput,
        },
      }}
    >
      {children}
    </SidebarContext.Provider>
  )
}
