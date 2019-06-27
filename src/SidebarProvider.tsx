import React, { useEffect, useState } from "react"
import { Group as GroupInterface, Method as MethodInterface } from "./types"

interface SidebarProviderProps {
  children: React.ReactNode
  initialGroups: GroupInterface[]
  searchInput: string
}

interface BaseInput {
  type: "input" | "method" | "nothing"
  method: number | null
  group: number | null
}

interface FocusOnInput extends BaseInput {
  type: "input"
  method: null
  group: null
}

interface FocusOnMethod extends BaseInput {
  type: "method"
  method: number
  group: number
}

interface FocusOnNothing extends BaseInput {
  type: "nothing"
  method: null
  group: null
}

export type Focus = FocusOnInput | FocusOnMethod | FocusOnNothing

export interface SidebarContextInterface {
  state: {
    focus: Focus
    filteredGroups: GroupInterface[]
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

export const SidebarContext = React.createContext<SidebarContextInterface | null>(
  null
)

function filterMethod(method: MethodInterface, input: string): boolean {
  return method.node.name.toLowerCase().includes(input.toLowerCase())
}

function filterMethods(
  methods: MethodInterface[],
  input: string
): MethodInterface[] {
  return methods.filter(method => filterMethod(method, input))
}

function filterGroups(
  groups: GroupInterface[],
  input: string
): GroupInterface[] {
  return groups
    .map(group => {
      return {
        ...group,
        edges: group.edges.filter(method => filterMethod(method, input)),
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
}: SidebarProviderProps): JSX.Element {
  const [filteredGroups, setFilteredGroups] = useState<GroupInterface[]>([])
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
