import React from "react"

export function useScrollPosition(): number {
  const [scrollPosition, setScrollPosition] = React.useState(0)

  React.useEffect(() => {
    const updatePosition = () => {
      setScrollPosition(window.pageYOffset)
    }
    window.addEventListener("scroll", updatePosition)
    updatePosition()

    return () => window.removeEventListener("scroll", updatePosition)
  }, [])

  return scrollPosition
}
