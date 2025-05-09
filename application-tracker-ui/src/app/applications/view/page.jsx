import { performAuthenticatedApiCall } from "@/utils/apiUtils"
import { notFound } from "next/navigation"
import ApplicationsView from "./view"
import { headers } from "next/headers"

const ApplicationsPage = async () => {
  const headersList = headers()
  const userId = process.env.TESTING_USER_ID 

  const { data, status } = await performAuthenticatedApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/application/user?userId=${userId}`,
    cacheOptions: { revalidate: 0 }
  }, headersList)

  if (status !== 200) { 
    notFound() 
  }

  return (
    <ApplicationsView 
      initialApplications={data}
      userId={userId}
    />
  )
}

export default ApplicationsPage