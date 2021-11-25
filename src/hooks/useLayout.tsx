import { useContext } from "react"
import { LayoutContext, ILayoutContext } from "../LayoutProvider"

export function useLayout(): ILayoutContext {
  const layoutContext = useContext(LayoutContext)

  if (!layoutContext) {
    throw Error("Need context")
  }

  return layoutContext
}
