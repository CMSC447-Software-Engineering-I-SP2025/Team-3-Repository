import { performApiCall, performAuthenticatedApiCall } from "@/utils/apiUtils"
import ApplicationCreateView from "./view"
import { getToken, getUserDetails } from "@/utils/securityUtils"
import { headers } from "next/headers"
import { HeaderValues } from "@/constants"
import { notFound } from "next/navigation"

const handleCreateApplication = async (applicationData, headers) => {
  'use server'

  const nheaders = new Headers()
  for (const [key, value] of Object.entries(headers)) {
    nheaders.set(key, value)
  }
  
  const apiUrl = process.env.API_URL
  const url = `${apiUrl}/application/create`
  const request = {
    url,
    requestBody: applicationData,
    method: 'POST',
    optionalErrorMessage: 'Failed to create job application. Please try again.'
  }

  return await performAuthenticatedApiCall(request, nheaders)
}

const ApplicationCreatePage = async() => {
  const token = headers().get(HeaderValues.TOKEN)
  const udetails = await getUserDetails(token)
  if (udetails.status !== 200 || !udetails?.id) {
    notFound()
  }

  return <ApplicationCreateView handleCreateApplication={handleCreateApplication} userId={udetails?.id} />
}

export default ApplicationCreatePage