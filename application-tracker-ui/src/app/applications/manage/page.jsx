import { notFound } from "next/navigation"
import ApplicationManageView from "./view"
import { performApiCall } from "@/utils/apiUtils"

const resolveApplication = async id => {
  const data = await performApiCall({
    method: 'GET',
    requestBody: null,
    url: `${process.env.API_URL}/application/id?id=${id}`
  })
  return data
}


const updateApplication = async body => {
  'use server'
  const data = await performApiCall({
    method: 'PUT',
    requestBody: body,
    url: `${process.env.API_URL}/application/modify`
  })
  return data
}

const deleteApplication = async id => {
  'use server'
  return await performApiCall({
    method: 'DELETE',
    url: `${process.env.API_URL}/application?id=${id}`
  })
}


const ApplicationManagePage = async({ searchParams }) => {
  // load the application here
  const { id = null, action = null } = await searchParams
  if (!id) { notFound() }

  // waiting on application controller done
  const { status, data } = await resolveApplication(id)
  if (!data || status !== 200) { notFound() }

  return <ApplicationManageView
    action={action}
    application={data}
    handleUpdate={updateApplication}
    handleDelete={deleteApplication}
  />
}

export default ApplicationManagePage