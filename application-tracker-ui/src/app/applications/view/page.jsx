import { performApiCall, performAuthenticatedApiCall } from "@/utils/apiUtils"
import { notFound } from "next/navigation"
import ApplicationsView from "./view"
import { headers } from "next/headers"
import { getUserDetails } from "@/utils/securityUtils"
import { HeaderValues } from "@/constants"

const filterApplications = async request => {
  'use server'
  return { data: [], status: 200, error: null }
}

const ApplicationsPage = async () => {
  const token = headers().get(HeaderValues.TOKEN)
  const details = await getUserDetails(token)
  const { id = null } = details

  if (!id) {
    notFound()
  }

  const { data, status } = await performAuthenticatedApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/application/user?userId=${id}`,
    cacheOptions: { revalidate: 0  }
  }, headers())


  if (status !== 200) { notFound() }

  return <ApplicationsView applications={data}  filterApplications={filterApplications} />
}

export default ApplicationsPage
