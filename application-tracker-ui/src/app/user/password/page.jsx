import { performApiCall } from "@/utils/apiUtils"
import ResetPasswordView from "./view"

const resetPassword = async data => {
  'use server'
  const response = await performApiCall({
    method: 'POST',
    requestBody: data,
    url: `${process.env.API_URL}/recovery/confirm` 
  }, true)

  return response
}

const PasswordResetView = async ({ searchParams }) => {
  
  return <ResetPasswordView {...searchParams} action={resetPassword}/> 
}

export default PasswordResetView