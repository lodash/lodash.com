import React from "react"
import { SidebarContext, ISidebarContext } from "../SidebarProvider"

export function useSidebar(): ISidebarContext {
  const sidebarContext = React.useContext(SidebarContext)

  if (!sidebarContext) {
    throw Error("Need context")
  }

  return sidebarContext
}
