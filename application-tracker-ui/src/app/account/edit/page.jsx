import { performApiCall } from "@/utils/apiUtils";
import UserEditView from "./view";
import { notFound } from "next/navigation";

const handleUpdateUser = async data => {
  'use server'
  const response = await performApiCall({
    method: 'PUT',
    requestBody: data,
    url: `${process.env.API_URL}/users/modify`
  })

  return response
}

export default async function EditData() {

  // hard-coded, will work later when login is supported
  const { data, status } = await performApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/users/email?email=somenewemail@dev.com`
  })

  if (!data || status !== 200) { notFound() }

  return <UserEditView user={data} handleUpdate={handleUpdateUser} />;
}
