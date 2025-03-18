export const performApiCall = async (request = {}) => {
  const {
    method,
    requestBody,
    url,
    optionalErrorMessage = null,
    cacheOptions = { revalidate: 3600 }
  } = request
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')
  const nullBody = method !== 'GET' && method !== 'DELETE'

  const body = nullBody ? JSON.stringify(requestBody) : null

  const fetchOptions = {
    headers,
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

      // parse JSON from the response
      const parsedResponse = await apiResponse.json()
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