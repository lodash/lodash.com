import React, { useContext, useState } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { SearchContext } from "../../SearchProvider"
import { Group as GroupInterface, Method as MethodInterface } from "../../types"
import SearchInput from "../SearchInput"
import * as SC from "./styles"

interface DocsSidebarProps {
  groups: GroupInterface[]
}

// TODO: refactor to avoid the weird need for input?
const filterMethods = (
  m: MethodInterface[],
  input: string
): MethodInterface[] =>
  m.filter(({ node: method }) => {
    return method.name.toLowerCase().includes(input.toLowerCase())
  })

// TODO: refactor to avoid the weird need for input?
const filterGroups = (g: GroupInterface[], input: string): GroupInterface[] =>
  g.filter(({ edges: groupMethods }) => {
    return filterMethods(groupMethods, input).length
  })

const MethodGroup = ({
  group,
  input,
}: {
  group: GroupInterface
  input: string
}) => {
  const [expanded, setExpanded] = useState(true)
  const { edges: groupMethods } = group

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
          {filterMethods(groupMethods, input).map((methodNode, i) => {
            const { node: method } = methodNode
            return (
              <div key={`${method.category}-${method.name}-${i}`}>
                <SC.StyledMethodLink
                  // to={`/docs/${method.aliasOf || method.name}`}
                  to={`/docs/${method.name}`}
                  activeClassName="active"
                >
                  _.{method.name}
                  {/* {method.aliasOf && ` -> ${method.aliasOf}`} */}
                </SC.StyledMethodLink>
              </div>
            )
          })}
        </SC.Methods>
      )}
    </SC.MethodType>
  )
}

const DocsSidebar = ({ groups }: DocsSidebarProps): JSX.Element => {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  const { state } = searchContext

  return (
    <SC.Sidebar>
      <SearchInput />
      <PerfectScrollbar>
        {filterGroups(groups, state.input).map(group => {
          return <MethodGroup group={group} input={state.input} />
        })}
      </PerfectScrollbar>
    </SC.Sidebar>
  )
}

export default DocsSidebar
