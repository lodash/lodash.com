import cx from "classnames"
import React from "react"
import { useSearch } from "../../hooks/useSearch"
import { useSidebar } from "../../hooks/useSidebar"
import * as S from "./styles"

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
    <S.SearchInputWrapper className={cx({ "is-focused": isFocused })}>
      <S.StyledSearchIcon />
      <S.SearchInput
        className="search-input"
        value={searchState.input}
        onChange={handleOnChange}
        placeholder="Search"
        onFocus={setFocus}
        onBlur={clearFocus}
      />
      {!isFocused && <S.FocusHint>/</S.FocusHint>}
    </S.SearchInputWrapper>
  )
}

export default SearchInput
