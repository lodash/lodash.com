import { useContext } from "react"
import { SidebarContext, ISidebarContext } from "../SidebarProvider"

export function useSidebar(): ISidebarContext {
  const sidebarContext = useContext(SidebarContext)

  if (!sidebarContext) {
    throw Error("Need context")
  }

  return sidebarContext
}
