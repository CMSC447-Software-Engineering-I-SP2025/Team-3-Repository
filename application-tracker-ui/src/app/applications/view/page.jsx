import { performApiCall } from "@/utils/apiUtils"
import { notFound } from "next/navigation"
import ApplicationsView from "./view"

const ApplicationsPage = async () => {
  const { data, status } = await performApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/application/user?userId=67d8506f9c0d6b3246eed5ba`,
    cacheOptions: { revalidate: 0  }
  })

  if (status !== 200) { notFound() }

  return <ApplicationsView applications={data} />
}

export default ApplicationsPage