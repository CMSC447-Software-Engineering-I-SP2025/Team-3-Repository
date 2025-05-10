import { performApiCall } from "@/utils/apiUtils"
import ZenModeView from "./view"

const handleCreateApplication = async applicationData => {
  'use server'
  const apiUrl = process.env.API_URL
  const url = `${apiUrl}/application/create`
  const request = {
    url,
    requestBody: applicationData,
    method: 'POST',
    optionalErrorMessage: 'Failed to create job application. Please try again.'
  }

  return await performApiCall(request)
}

const ZenModePage = () => {
  return <ZenModeView handleCreateApplication={handleCreateApplication} />
}

export default ZenModePage