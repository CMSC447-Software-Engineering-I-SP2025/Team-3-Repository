import { performApiCall, performAuthenticatedApiCall } from "@/utils/apiUtils"
import { notFound } from "next/navigation"
import ApplicationsView from "./view"
import { headers } from "next/headers"

const filterApplications = async request => {
  'use server'
  return { data: [], status: 200, error: null }
}

const ApplicationsPage = async () => {
  const { data, status } = await performAuthenticatedApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/application/user?userId=${process.env.TESTING_USER_ID}`,
    cacheOptions: { revalidate: 0  }
  }, headers())


  if (status !== 200) { notFound() }

  return <ApplicationsView applications={data}  filterApplications={filterApplications} />
}

export default ApplicationsPage
