import { useEffect } from "react"

type noop = () => void

export function useKeyboardEvent(key: string, callback: noop) {
  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.key === key) {
        callback()
      }
    }

    window.addEventListener("keydown", handler)
    return () => {
      window.removeEventListener("keydown", handler)
    }
  }, [])
}
