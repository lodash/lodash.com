import React, { useContext } from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { SearchContext } from "../../SearchProvider"
import SearchInput from "../SearchInput"
import * as SC from "./styles"

interface DocsSidebarProps {
  groups: any
}

const DocsSidebar = ({ groups }: DocsSidebarProps): JSX.Element => {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  const { state } = searchContext

  const expanded = true

  const filterMethods = m =>
    m.filter(({ node: method }) => {
      return method.name.includes(state.input)
    })

  const filterGroups = g =>
    g.filter(({ edges: groupMethods }) => {
      return filterMethods(groupMethods).length
    })

  return (
    <SC.Sidebar>
      <SearchInput />
      <PerfectScrollbar>
        {filterGroups(groups).map(group => {
          const { edges: groupMethods } = group

          return (
            <SC.MethodType>
              <SC.MethodTypeTitle>
                {expanded ? <SC.Min /> : <SC.Max />} {group.fieldValue}
              </SC.MethodTypeTitle>
              <SC.Methods>
                {filterMethods(groupMethods).map(({ node: method }) => (
                  <div>
                    <SC.StyledMethodLink
                      // to={`/docs/${method.aliasOf || method.name}`}
                      to={`/docs/${method.name}`}
                      activeClassName="active"
                    >
                      _.{method.name}
                      {/* {method.aliasOf && ` -> ${method.aliasOf}`} */}
                    </SC.StyledMethodLink>
                  </div>
                ))}
              </SC.Methods>
            </SC.MethodType>
          )
        })}
      </PerfectScrollbar>
    </SC.Sidebar>
  )
}

export default DocsSidebar
