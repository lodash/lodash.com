import React, { useEffect, useState } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { useSearch } from "../../hooks/useSearch"
import { useSidebar } from "../../hooks/useSidebar"
import { Focus } from "../../SidebarProvider"
import { Group as GroupInterface, Method as MethodInterface } from "../../types"
import SearchInput from "../SearchInput"
import * as SC from "./styles"

interface DocsSidebarProps {
  groups: GroupInterface[]
}

const filterMethod = (method: MethodInterface["node"], input: string) => {
  return method.name.toLowerCase().includes(input.toLowerCase())
}

// TODO: refactor to avoid the weird need for input?
const filterMethods = (
  m: MethodInterface[],
  input: string
): MethodInterface[] =>
  m.filter(({ node: method }) => filterMethod(method, input))

// TODO: refactor to avoid the weird need for input?
const filterGroups = (g: GroupInterface[], input: string): GroupInterface[] =>
  g.filter(({ edges: groupMethods }) => {
    return filterMethods(groupMethods, input).length
  })

const MethodLink = ({
  method,
  index,
  groupIsFocused,
}: {
  method: MethodInterface["node"]
  index: number
  groupIsFocused: boolean
}): JSX.Element => {
  const { state: sidebarState } = useSidebar()

  const isFocused =
    groupIsFocused &&
    sidebarState.focus.type === "method" &&
    sidebarState.focus.method === index

  return (
    <div key={`${method.category}-${method.name}-${index}`}>
      <SC.StyledMethodLink
        // to={`/docs/${method.aliasOf || method.name}`}
        to={`/docs/${method.name}`}
        activeClassName="active"
        isFocused={isFocused}
      >
        _.{method.name}
        {/* {method.aliasOf && ` -> ${method.aliasOf}`} */}
      </SC.StyledMethodLink>
    </div>
  )
}

const MethodGroup = ({
  group,
  focus,
  groupIndex,
  previousGroupLength,
}: {
  group: GroupInterface
  focus: Focus
  groupIndex: number
  previousGroupLength: number | null
}) => {
  const { actions: sidebarActions } = useSidebar()
  const [expanded, setExpanded] = useState(true)
  const { edges: groupMethods } = group

  const groupIsFocused = focus.type === "method" && focus.group === groupIndex

  useEffect(() => {
    if (!groupIsFocused) {
      return
    }

    // TODO: this should hopefully infer the type
    const focusingFirstMethod = (focus.method as number) < 0
    const focusingLastMethod = focus.method === group.edges.length

    if (focusingFirstMethod) {
      const previousGroupIndex = previousGroupLength
        ? previousGroupLength - 1
        : 0
      sidebarActions.focusPreviousGroup(previousGroupIndex)
    }

    if (focusingLastMethod) {
      sidebarActions.focusNextGroup()
    }
  }, [groupIsFocused, focus])

  function toggleExpanded(): void {
    setExpanded(state => !state)
  }

  return (
    <SC.MethodType key={group.fieldValue}>
      <SC.MethodTypeTitle onClick={toggleExpanded}>
        {expanded ? <SC.Min /> : <SC.Max />} {group.fieldValue}
      </SC.MethodTypeTitle>
      {expanded && (
        <SC.Methods>
          {/* TODO: get rid of i, currently a dirty fix because Seq-chain is not unique */}
          {groupMethods.map((methodNode, index) => {
            const { node: method } = methodNode
            return (
              <MethodLink
                method={method}
                groupIsFocused={groupIsFocused}
                index={index}
              />
            )
          })}
        </SC.Methods>
      )}
    </SC.MethodType>
  )
}

const DocsSidebar = ({ groups }: DocsSidebarProps): JSX.Element => {
  const { state: searchState } = useSearch()
  const { state: sidebarState } = useSidebar()
  const { input } = searchState

  const filteredGroups = filterGroups(groups, input).map(group => {
    return {
      ...group,
      edges: group.edges.filter(m => filterMethod(m.node, input)),
    }
  })

  function previousGroupLength(groupIndex: number): number | null {
    if (groupIndex === 0) {
      return null
    }

    return filteredGroups[groupIndex - 1].edges.length
  }

  return (
    <SC.Sidebar>
      <SearchInput />
      <PerfectScrollbar>
        {filteredGroups.map((group, groupIndex) => {
          return (
            <MethodGroup
              group={group}
              focus={sidebarState.focus}
              previousGroupLength={previousGroupLength(groupIndex)}
              groupIndex={groupIndex}
            />
          )
        })}
      </PerfectScrollbar>
    </SC.Sidebar>
  )
}

export default DocsSidebar
