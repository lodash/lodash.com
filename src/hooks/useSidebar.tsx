import { useContext } from "react"
import { SidebarContext, ISidebarContextInterface } from "../SidebarProvider"

export function useSidebar(): ISidebarContextInterface {
  const sidebarContext = useContext(SidebarContext)

  if (!sidebarContext) {
    throw Error("Need context")
  }

  return sidebarContext
}
