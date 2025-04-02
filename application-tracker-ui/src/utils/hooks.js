import { useState, useEffect } from "react";

export const useSessionStorage = (name) => {
  const [value, setValue] = useState('')

  useEffect(() => {
    setValue(sessionStorage.getItem(name))
  }, [])

  const setter = value => {
    if (typeof window === 'undefined') { return }
    window.sessionStorage.setItem(name, value)
    setValue(value)
  }

  return [value, setter] 
}
