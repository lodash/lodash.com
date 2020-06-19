import { darken } from "polished"
import styled from "styled-components"

const primary = {
  background: "#3492ff",
  foreground: "#fff",
}

const secondary = {
  background: "#fff",
  foreground: "#4b71ca",
}

export const ButtonWrapper = styled.div`
  display: inline-flex;
  font-size: 17px;
  padding: 16px 32px;
  border-radius: 5px;
  box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.15), 0px 6px 10px rgba(51, 144, 252, 0.2);
  cursor: pointer;
  transition: 0.3s background;
  justify-content: center;
  align-items: center;
  text-align: center;

  &.primary {
    background: ${primary.background};
    color: ${primary.foreground};

    &:hover,
    &:focus {
      background: ${darken(0.1, primary.background)};
    }
  }

  &.secondary {
    background: ${secondary.background};
    color: ${secondary.foreground};

    &:hover,
    &:focus {
      background: ${darken(0.1, secondary.background)};
    }
  }

  & + & {
    margin-left: 8px;
  }
`
