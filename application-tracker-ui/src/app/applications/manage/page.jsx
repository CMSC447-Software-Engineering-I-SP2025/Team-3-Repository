import { notFound } from "next/navigation"
import ApplicationManageView from "./view"
import { performApiCall } from "@/utils/apiUtils"

const resolveApplication = async() => {
  const data = await performApiCall({
    method: 'GET',
    requestBody: null,
    url: process.env.API_URL
  })
  return data
}


const ApplicationManagePage = async({ searchParams }) => {
  // load the application here
  const { id = null } = await searchParams
  if (!id) { notFound() }

  // waiting on application controller done
  const { status, data } = await resolveApplication()
  if (false && (!data || status !== 200)) { notFound() }


  return <ApplicationManageView application={data} />
}

export default ApplicationManagePage