import React, { useContext, useState } from "react"
import { SearchContext } from "../../SearchProvider"
import * as SC from "./styles"

const SearchInput = (): JSX.Element => {
  const searchContext = useContext(SearchContext)

  if (!searchContext) {
    throw Error("Need context")
  }

  const { state, actions } = searchContext
  const [focused, setFocused] = useState(false)

  function setFocus(): void {
    setFocused(true)
  }

  function clearFocus(): void {
    setFocused(false)
  }

  function handleOnChange(event: KeyboardEvent<HTMLInputElement>): void {
    actions.update(event.target.value)
  }

  return (
    <SC.SearchInputWrapper focused={focused}>
      <SC.StyledSearchIcon />
      <SC.SearchInput
        value={state.input}
        onChange={handleOnChange}
        placeholder="Search"
        onFocus={setFocus}
        onBlur={clearFocus}
      />
    </SC.SearchInputWrapper>
  )
}

export default SearchInput
