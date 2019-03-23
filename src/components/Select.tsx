import React, { useEffect, useState } from "react"
import styled from "styled-components"
import Triangle from "../images/triangle.svg"

interface OptionItem {
  value: string
  text: string
}

interface SelectProps {
  options: OptionItem[]
}

const SelectWrapper = styled.div`
  position: relative;
  font-weight: bold;
`

const Arrow = styled(Triangle)`
  margin-left: 8px;
  width: 11px;
`

const Selected = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 21px;
  background: #293845;
  color: #fff;
  border-radius: 3px;
  position: relative;
  z-index: 1;
  cursor: pointer;
`

const Options = styled.div<{ open: boolean }>`
  background: #293845;
  color: #fff;
  border-radius: 3px;
  padding: 8px 0;
  opacity: ${({ open }) => (open ? 1 : 0)};
  transition: opacity 0.3s, margin-top 0.3s;
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  margin-top: ${({ open }) => (open ? "4px" : "-30px")};
`

const Option = styled.div`
  padding: 4px 21px;
  cursor: pointer;

  &:hover {
    background: rgba(0, 0, 0, 0.2);
  }
`

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
    <SelectWrapper {...restProps}>
      <Selected onClick={() => setOpen(!open)}>
        {selected}
        <Arrow />
      </Selected>
      {options.length ? (
        <Options open={open}>
          {options
            .filter(({ value }) => value !== selected)
            .map(({ value, text }) => (
              <Option
                onClick={() => {
                  selectOption(value)
                }}
              >
                {text}
              </Option>
            ))}
        </Options>
      ) : null}
    </SelectWrapper>
  )
}

export default Select
