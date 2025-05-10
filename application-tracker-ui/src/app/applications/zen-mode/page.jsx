import { performApiCall, performAuthenticatedApiCall } from "@/utils/apiUtils"
import ZenModeView from "./view"
import { headers } from "next/headers"
import { getUserDetails } from "@/utils/securityUtils"
import { HeaderValues } from "@/constants"
import { notFound } from "next/navigation"

const handleCreateApplication = async (data, headers) => {
  'use server'

  const nheaders = new Headers()
  for (const [key, val] of Object.entries(headers)) {
    nheaders.set(key, val)
  }

  const apiUrl = process.env.API_URL
  const url = `${apiUrl}/application/create`
  const request = {
    url,
    requestBody: data,
    method: 'POST',
    optionalErrorMessage: 'Failed to create job application. Please try again.'
  }

  return await performAuthenticatedApiCall(request, nheaders)
}

const ZenModePage = async() => {
  const token = headers().get(HeaderValues.TOKEN)
  const udata = await getUserDetails(token)

  if (udata?.status !== 200) {  
    notFound()
  }

  return <ZenModeView handleCreateApplication={handleCreateApplication} uid={udata?.id} />
}

export default ZenModePage