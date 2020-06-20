import cx from "classnames"
import React, { useEffect, useRef, useState } from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import * as SC from "./styles"

interface IOptionItem {
  value: string
  text: string
}

interface ISelectProps {
  options: IOptionItem[]
  value: string
  onChange?: (value: string) => void
}

const Select = ({ options = [], onChange, ...props }: ISelectProps): JSX.Element => {
  const ref = useRef<HTMLDivElement>(null)
  const [selected, setSelected] = useState<string | null>(null)
  const [open, setOpen] = useState<boolean>(false)
  useOnClickOutside(ref, () => setOpen(false))

  useEffect(() => {
    if (options.length && props.value) {
      setSelected(props.value)
    }
  }, [props.value])

  const selectOption = (newValue: string) => {
    setOpen(false)
    setSelected(newValue)

    if (onChange) {
      onChange(newValue)
    }
  }

  return (
    <SC.SelectWrapper {...props} ref={ref}>
      <SC.Selected onClick={() => setOpen(!open)}>
        {selected}
        <SC.Arrow />
      </SC.Selected>
      {options.length ? (
        <SC.Options className={cx({ "is-open": open })}>
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
