import cx from "classnames"
import React from "react"
import { useSearch } from "../../hooks/useSearch"
import { useSidebar } from "../../hooks/useSidebar"
import * as SC from "./styles"

const SearchInput = (): JSX.Element => {
  const { state: searchState, actions: searchActions } = useSearch()
  const { state: sidebarState, actions: sidebarActions } = useSidebar()

  function setFocus(): void {
    sidebarActions.focusInput()
  }

  function clearFocus(): void {
    sidebarActions.clearFocus()
  }

  function handleOnChange(event: React.ChangeEvent<HTMLInputElement>): void {
    searchActions.update(event.currentTarget.value)
  }

  const isFocused = sidebarState.focus.type === "input"

  React.useEffect(() => {
    if (isFocused) {
      // I would rather use a ref, but GatsbyLink seems to be improperly typed
      // see https://github.com/gatsbyjs/gatsby/issues/16682
      document.querySelector<HTMLInputElement>(".search-input")?.focus()
    }
  }, [isFocused])

  return (
    <SC.SearchInputWrapper className={cx({ "is-focused": isFocused })}>
      <SC.StyledSearchIcon />
      <SC.SearchInput
        className="search-input"
        value={searchState.input}
        onChange={handleOnChange}
        placeholder="Search"
        onFocus={setFocus}
        onBlur={clearFocus}
      />
      {!isFocused && <SC.FocusHint>/</SC.FocusHint>}
    </SC.SearchInputWrapper>
  )
}

export default SearchInput
