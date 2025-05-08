import { cookies } from "next/headers"
import { isAuthenticated } from "./securityUtils"
import { HeaderValues } from "@/constants"

export const performApiCall = async (request = {}, ignore = false) => {
  const {
    method,
    requestBody,
    url,
    optionalErrorMessage = null,
    cacheOptions = { revalidate: 3600 },
    headers = [],
    token = null
  } = request

  const heads = new Headers()
  heads.append('Content-Type', 'application/json')
  if (token) {
    heads.append('Authorization', `Bearer ${token}`)
  }
  headers.forEach(({ key, value }) => heads.append(key, value))
  const nullBody = method !== 'GET' && method !== 'DELETE'

  const body = nullBody ? JSON.stringify(requestBody) : null

  const fetchOptions = {
    headers: heads,
    method,
    body,
    cache: 'no-store'
  }
  return await fetch(url, fetchOptions)
    .then(async apiResponse => {
      if (apiResponse.status !== 200) {
        return {
          status: apiResponse.status,
          error: optionalErrorMessage ?? 'Request Failed',
          data: null
        } 
      }

      if (apiResponse.status === 200 && ignore) {
        return { status: 200, error: null, data: null }
      }

      // parse JSON from the response
      const parsedResponse = ignore ? null : await apiResponse.json()
      return {
        status: apiResponse.status,
        data: parsedResponse,
        error: null
      }
    })
    .catch(err => ({
      status: null,
      data: null,
      error: err?.message ?? err
    }))
}

export const performAuthenticatedApiCall = async(request, headers) => {
  if (!isAuthenticated(headers)) {
    return { status: 406, data: null }
  }

  const token = headers.get(HeaderValues.TOKEN)
  if (!token) {
    return { status: 407, data: null }
  } 

  return performApiCall({ ...request, token })
}