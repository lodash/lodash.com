import { useEffect } from "react"

type noop = () => void

export function useKeyboardEvent(key: string, callback: noop): void {
  // necessary because Gatsby statically built does not have access to window
  const windowGlobal = typeof window !== "undefined" && window

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback()
      }
    }

    if (windowGlobal) {
      windowGlobal.addEventListener("keydown", handler)
    }
    return () => {
      if (windowGlobal) {
        windowGlobal.removeEventListener("keydown", handler)
      }
    }
  }, [])
}
