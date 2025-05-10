'use client'
import { HeaderValues } from "@/constants"

export const getBrowserToken = () => {
  const session = window.sessionStorage.getItem(HeaderValues.TOKEN)
  if (session) { return session }

  const cookie = document.cookie
    ?.split(';')
    ?.filter(str => str.includes(HeaderValues.TOKEN))?.[0]
    ?.split('=')?.[1]

    return cookie
}

export const generateRequestHeaders = () => {
  if (typeof window === 'undefined') {
    return null
  }

  const token = getBrowserToken()
  const headers = { [HeaderValues.TOKEN]: token }
  return headers
}