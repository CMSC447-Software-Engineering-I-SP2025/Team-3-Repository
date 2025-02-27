export const performApiCall = async request => {
  const {
    method,
    requestBody,
    url,
    optionalErrorMessage = null
  } = request
  const headers = new Headers()
  headers.append('Content-Type', 'application/json')

  const body = JSON.stringify(requestBody)

  const fetchOptions = { headers, method, body }
  return await fetch(url, fetchOptions)
    .then(async apiResponse => {
      if (apiResponse.status !== 200) {
        return optionalErrorMessage ?? 'Request Failed' 
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