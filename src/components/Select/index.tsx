import React, { useEffect, useState } from "react"
import * as SC from "./styles"

interface OptionItem {
  value: string
  text: string
}

interface SelectProps {
  options: OptionItem[]
}

const Select = ({ options = [], ...restProps }: SelectProps): JSX.Element => {
  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (options.length) {
      setSelected(options[0].value)
    }
  }, [])

  const selectOption = (value: string) => {
    setOpen(false)
    setSelected(value)
  }

  return (
    <SC.SelectWrapper {...restProps}>
      <SC.Selected onClick={() => setOpen(!open)}>
        {selected}
        <SC.Arrow />
      </SC.Selected>
      {options.length ? (
        <SC.Options open={open}>
          {options
            .filter(({ value }) => value !== selected)
            .map(({ value, text }) => (
              <SC.Option
                key={value}
                onClick={() => {
                  selectOption(value)
                }}
              >
                {text}
              </SC.Option>
            ))}
        </SC.Options>
      ) : null}
    </SC.SelectWrapper>
  )
}

export default Select
