import cx from "classnames"
import React from "react"
import { useOnClickOutside } from "../../hooks/useOnClickOutside"
import * as S from "./styles"

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
  const ref = React.useRef<HTMLDivElement>(null)
  const [selected, setSelected] = React.useState<string | null>(props.value)
  const [open, setOpen] = React.useState<boolean>(false)
  useOnClickOutside(ref, () => setOpen(false))

  React.useEffect(() => {
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
    <S.SelectWrapper {...props} ref={ref}>
      <S.Selected onClick={() => setOpen(!open)}>
        {selected}
        <S.Arrow />
      </S.Selected>
      {options.length ? (
        <S.Options className={cx({ "is-open": open })}>
          {options
            .filter(({ value }) => value !== selected)
            .map(({ value, text }) => (
              <S.Option
                key={value}
                onClick={() => {
                  selectOption(value)
                }}
              >
                {text}
              </S.Option>
            ))}
        </S.Options>
      ) : null}
    </S.SelectWrapper>
  )
}

export default Select
