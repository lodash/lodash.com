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

  function handleOnChange(event: React.KeyboardEvent<HTMLInputElement>): void {
    searchActions.update(event.target.value)
    clearFocus()
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>): void {
    if (event.key === "ArrowUp") {
      sidebarActions.focusPrevious()
    }
    if (event.key === "ArrowDown") {
      sidebarActions.focusNext()
    }
  }

  const isFocused = sidebarState.focus.type === "input"

  return (
    <SC.SearchInputWrapper focused={isFocused}>
      <SC.StyledSearchIcon />
      <SC.SearchInput
        value={searchState.input}
        onChange={handleOnChange}
        placeholder="Search"
        onFocus={setFocus}
        onBlur={clearFocus}
        onKeyDown={handleKeyDown}
      />
      {!isFocused && <SC.FocusHint>/</SC.FocusHint>}
    </SC.SearchInputWrapper>
  )
}

export default SearchInput
