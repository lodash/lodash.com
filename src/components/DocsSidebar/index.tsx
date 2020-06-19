import cx from "classnames"
import React, { memo, useEffect, useState } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { useKeyboardEvent } from "../../hooks/useKeyboardEvent"
import { useSidebar } from "../../hooks/useSidebar"
import { IGroup as IGroupInterface, IMethod as MethodInterface } from "../../types"
import SearchInput from "../SearchInput"
import * as SC from "./styles"

const MethodLink = memo(
  ({
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
      groupIsFocused && sidebarState.focus.type === "method" && sidebarState.focus.method === index

    return (
      <div key={`${method.category}-${method.name}-${index}`}>
        <SC.StyledMethodLink
          // to={`/docs/${method.aliasOf || method.name}`}
          to={`/docs/${method.name}`}
          activeClassName="active"
          className={cx({ "is-focused": isFocused })}
        >
          _.{method.name}
          {/* {method.aliasOf && ` -> ${method.aliasOf}`} */}
        </SC.StyledMethodLink>
      </div>
    )
  }
)

const MethodGroup = memo(
  ({
    group,
    groupIndex,
    previousGroupLength,
  }: {
    group: IGroupInterface
    groupIndex: number
    previousGroupLength: number | null
  }) => {
    const { state: sidebarState, actions: sidebarActions } = useSidebar()
    const [expanded, setExpanded] = useState(true)
    const { edges: groupMethods } = group
    const { focus } = sidebarState

    const groupIsFocused = focus.type === "method" && focus.group === groupIndex

    useEffect(() => {
      if (!groupIsFocused) {
        return
      }

      // TODO: this should hopefully infer the type
      const focusingFirstMethod = (focus.method as number) < 0
      const focusingLastMethod = focus.method === group.edges.length

      if (focusingFirstMethod) {
        const previousGroupIndex = previousGroupLength ? previousGroupLength - 1 : 0
        sidebarActions.focusPreviousGroup(previousGroupIndex)
      }

      if (focusingLastMethod) {
        sidebarActions.focusNextGroup()
      }
    }, [groupIsFocused, focus])

    function toggleExpanded(): void {
      setExpanded((state) => !state)
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
                  key={index}
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
)

const DocsSidebar = (): JSX.Element => {
  const { actions: sidebarActions, state: sidebarState } = useSidebar()
  const { focusInput } = sidebarActions
  const { filteredGroups } = sidebarState
  useKeyboardEvent("/", () => {
    focusInput()
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
              key={group.fieldValue}
              group={group}
              previousGroupLength={previousGroupLength(groupIndex)}
              groupIndex={groupIndex}
            />
          )
        })}
      </PerfectScrollbar>
    </SC.Sidebar>
  )
}

export default memo(DocsSidebar)
