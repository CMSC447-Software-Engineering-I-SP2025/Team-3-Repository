import { HeaderValues } from "@/constants"
import { cookies, headers } from "next/headers"

export const getToken = (token) => {
  if (token) { return token }
  const cook = cookies().getAll()
  const hasToken = cook.find(({ name }) => name === HeaderValues.TOKEN)?.value
  return hasToken
}

export const getUserDetails = async(suppliedToken) => {
  const token = getToken(suppliedToken)
  if (!token) { return { status: 401, email: null } }

  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  headers.append('Authorization', `Bearer ${token}`)
  const endpoint = `${process.env.API_URL}/auth/details`
  const options = {
    headers,
    method: 'GET',
    next: { revalidate: 0 }
  }

  const response = await fetch(endpoint, options)
    .then(async data => {
      if (data.status !== 200) {
        return { status: data.status, email: null }
      }

      const body = await data.json()
      return {
        status: data.status,
        email: body?.email ?? null,
        id: body?.id ?? null
      }
    })
    .catch(() => ({
      status: 500,
      email: null
    }))

    return response
}

export const isAuthenticated = async() => {
  const heads = headers()
  const humanFuckingReadable = Array
    .from(heads.entries())
    .reduce((acc, [key, val]) => ({ ...acc, [key]: val  }), {})

  const token = humanFuckingReadable[HeaderValues.TOKEN] 
  if (!token) { return false }


  const userDetails = await getUserDetails(token)
  return userDetails?.status == 200 && userDetails?.email
}