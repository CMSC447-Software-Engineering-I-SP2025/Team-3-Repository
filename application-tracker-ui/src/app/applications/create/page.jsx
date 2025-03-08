import { performApiCall } from "@/utils/apiUtils"
import ApplicationCreateView from "./view"

const handleCreateApplication = async applicationData => {
  'use server'
  const apiUrl = process.env.API_URL
  const url = `${apiUrl}/applications`
  const request = {
    url,
    requestBody: applicationData,
    method: 'POST',
    optionalErrorMessage: 'Failed to create job application. Please try again.'
  }

  return await performApiCall(request)
}

const ApplicationCreatePage = () => {
  return <ApplicationCreateView handleCreateApplication={handleCreateApplication} />
}

export default ApplicationCreatePage