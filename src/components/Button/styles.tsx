import { darken } from "polished"
import styled from "styled-components"
import { ButtonProps } from "./index"

const primary = "#3492ff"
const secondary = "#fff"

export const ButtonWrapper = styled.div<ButtonProps>`
  display: inline-flex;
  background: ${props => (props.type === "primary" ? primary : secondary)};
  color: ${props => (props.type === "primary" ? "#fff" : "#4b71ca")};
  font-size: 17px;
  padding: 16px 32px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15),
    0px 6px 10px rgba(51, 144, 252, 0.2);
  cursor: pointer;
  transition: 0.3s background;
  justify-content: center;
  align-items: center;
  text-align: center;

  &:hover,
  &:focus {
    background: ${props =>
      props.type === "primary" ? darken(0.1, primary) : darken(0.1, secondary)};
  }

  & + & {
    margin-left: 8px;
  }
`
