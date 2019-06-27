import { useContext } from "react"
import { SidebarContext, SidebarContextInterface } from "../SidebarProvider"

export function useSidebar(): SidebarContextInterface {
  const sidebarContext = useContext(SidebarContext)

  if (!sidebarContext) {
    throw Error("Need context")
  }

  return sidebarContext
}
