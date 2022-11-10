import React from "react"
import LayoutDocs from "./layout-docs"
import LayoutHome from "./layout-home"

interface ILayoutProps {
  children: React.ReactNode
  pageContext: {
    layout?: string
  }
}

export default (props: ILayoutProps) => {
  if (props.pageContext.layout === "docs") {
    return <LayoutDocs>{props.children}</LayoutDocs>
  }

  return <LayoutHome>{props.children}</LayoutHome>
}
