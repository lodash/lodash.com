import React, { useState } from "react"
import * as SC from "./styles"

const SearchInput = (): JSX.Element => {
  const [value, setValue] = useState("")
  const [focused, setFocused] = useState(false)

  function setFocus(): void {
    setFocused(true)
  }

  function clearFocus(): void {
    setFocused(false)
  }

  function handleOnChange(event: KeyboardEvent<HTMLInputElement>): void {
    setValue(event.target.value)
  }

  return (
    <SC.SearchInputWrapper focused={focused}>
      <SC.StyledSearchIcon />
      <SC.SearchInput
        value={value}
        onChange={handleOnChange}
        placeholder="Search"
        onFocus={setFocus}
        onBlur={clearFocus}
      />
    </SC.SearchInputWrapper>
  )
}

export default SearchInput
