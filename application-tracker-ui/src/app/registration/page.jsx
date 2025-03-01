import { performApiCall } from "@/utils/apiUtils"
import RegistrationView from "./view"

const handleRegistration = async userData => {
  'use server'
  const apiUrl = process.env.API_URL
  const url = `${apiUrl}/registration`
  const request = {
    url,
    requestBody: userData,
    method: 'POST'
  }

  return await performApiCall(request)
}

const RegistrationPage = () =>
  <RegistrationView handleRegistration={handleRegistration} />

export default RegistrationPage