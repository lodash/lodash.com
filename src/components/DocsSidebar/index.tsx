import cx from "classnames"
import React from "react"
import PerfectScrollbar from "react-perfect-scrollbar"
import "react-perfect-scrollbar/dist/css/styles.css"
import { useSidebar } from "../../hooks/useSidebar"
import { IGroup, IMethodNode } from "../../types"
import { normalizeCategory } from "../../utils"
import SearchInput from "../SearchInput"
import * as S from "./styles"

const MethodLink = React.memo(
  ({
    method,
    setCurrentFocus,
  }: {
    method: IMethodNode
    setCurrentFocus: (methodId: string) => void
  }): JSX.Element => {
    const { state: sidebarState } = useSidebar()
    const linkRef = React.useRef<HTMLAnchorElement | undefined>(undefined)

    const isFocused =
      sidebarState.focus.type === "method" && sidebarState.focus.methodId === method.id

    React.useEffect(() => {
      if (isFocused) {
        linkRef.current?.focus()
      }
    }, [isFocused])

    // TODO: extract, very temporary
    const latestVersion = "4.17.11"

    const lowerCategoryName = normalizeCategory(method.category).toLowerCase()

    const toUrl =
      method.version === latestVersion
        ? `/docs/${lowerCategoryName}/${method.name}`
        : `/docs/${method.version}/${lowerCategoryName}/${method.name}`

    return (
      <div key={method.id}>
        <S.StyledMethodLink
          innerRef={linkRef}
          // to={`/docs/${method.aliasOf || method.name}`}
          // TODO: remove version if latest
          to={toUrl}
          activeClassName="active"
          className={cx({ "is-focused": isFocused })}
          onFocus={() => {
            setCurrentFocus(method.id)
          }}
        >
          _.{method.name}
          {/* {method.aliasOf && ` -> ${method.aliasOf}`} */}
        </S.StyledMethodLink>
      </div>
    )
  }
)

const MethodGroup = React.memo(
  ({
    group,
    setCurrentFocus,
    onCollapse,
  }: {
    group: IGroup
    setCurrentFocus: (methodId: string) => void
    onCollapse: () => void
  }) => {
    const [expanded, setExpanded] = React.useState(true)
    const { edges: groupMethods } = group

    function toggleExpanded(): void {
      setExpanded((state) => !state)
      onCollapse()
    }

    const categoryName = normalizeCategory(group.fieldValue)

    return (
      <S.MethodType key={categoryName}>
        <S.MethodTypeTitle onClick={toggleExpanded}>
          {expanded ? <S.Min /> : <S.Max />} {categoryName}
        </S.MethodTypeTitle>
        {expanded && (
          <S.Methods>
            {groupMethods.map((methodNode) => {
              const { node: method } = methodNode
              return (
                <MethodLink key={method.id} method={method} setCurrentFocus={setCurrentFocus} />
              )
            })}
          </S.Methods>
        )}
      </S.MethodType>
    )
  }
)

const DocsSidebar = (): JSX.Element => {
  const scrollbarRef = React.useRef<PerfectScrollbar>(null)
  const { actions: sidebarActions, state: sidebarState } = useSidebar()

  const onCollapse = React.useCallback(() => {
    scrollbarRef.current?.updateScroll()
  }, [scrollbarRef.current?.updateScroll])

  return (
    <S.Sidebar>
      <SearchInput />
      <S.ScrollbarWrapper>
        <PerfectScrollbar ref={scrollbarRef}>
          {sidebarState.filteredGroups.map((group) => {
            return (
              <MethodGroup
                key={group.fieldValue}
                group={group}
                onCollapse={onCollapse}
                setCurrentFocus={sidebarActions.focusMethod}
              />
            )
          })}
        </PerfectScrollbar>
      </S.ScrollbarWrapper>
    </S.Sidebar>
  )
}

export default React.memo(DocsSidebar)
