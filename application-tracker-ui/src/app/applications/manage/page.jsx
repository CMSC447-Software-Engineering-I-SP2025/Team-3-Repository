import { notFound } from "next/navigation"
import ApplicationManageView from "./view"
import { performApiCall, performAuthenticatedApiCall } from "@/utils/apiUtils"
import { headers } from "next/headers"

const resolveApplication = async id => {
  const data = await performAuthenticatedApiCall({
    method: 'GET',
    requestBody: null,
    url: `${process.env.API_URL}/application/id?id=${id}`
  }, headers())
  return data
}


const updateApplication = async (body, headers) => {
  'use server'

  const nheaders = new Headers()
  for (const [key, value] of Object.entries(headers)) {
    nheaders.set(key, value)
  }

  const data = await performAuthenticatedApiCall({
    method: 'PUT',
    requestBody: body,
    url: `${process.env.API_URL}/application/modify`
  }, nheaders)
  return data
}

const deleteApplication = async (id, headers) => {
  'use server'
  const nheaders = new Headers()
  for (const [key, value] of Object.entries(headers)) {
    nheaders.set(key, value)
  }

  return await performAuthenticatedApiCall({
    method: 'DELETE',
    url: `${process.env.API_URL}/application?id=${id}`
  }, nheaders)
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