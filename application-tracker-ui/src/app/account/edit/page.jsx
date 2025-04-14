import { performApiCall, performAuthenticatedApiCall } from "@/utils/apiUtils";
import UserEditView from "./view";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { HeaderValues } from "@/constants";

const handleUpdateUser = async data => {
  'use server'
  const response = await performAuthenticatedApiCall({
    method: 'PUT',
    requestBody: data,
    url: `${process.env.API_URL}/users/modify`
  }, headers())

  return response
}

export default async function EditData() {
  const heads = headers()
  const email = heads.get(HeaderValues.EMAIL)

  // hard-coded, will work later when login is supported
  const { data, status } = await performAuthenticatedApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/users/email?email=${email}`
  }, heads)

  if (!data || status !== 200) { notFound() }

  return <UserEditView user={data} handleUpdate={handleUpdateUser} />;
}
