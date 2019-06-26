import React, { useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import * as SC from "./styles"

interface OptionItem {
  value: string
  text: string
}

interface SelectProps {
  options: OptionItem[]
}

const Select = ({ options = [], ...restProps }: SelectProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  useOnClickOutside(ref, () => setOpen(false))

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
    <SC.SelectWrapper {...restProps} ref={ref}>
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
