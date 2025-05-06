import { DEFAULT_SEARCH_REQUEST, HeaderValues } from "@/constants"
import { performAuthenticatedApiCall } from "@/utils/apiUtils"
import { headers } from "next/headers"
import DatavizView from "./view"

const fetchApps = async (request, optHeaders = null) => {
  'use server'

  let newHeaders = headers()
  if (optHeaders) {
    const updatedHeaders = new Headers()
    for (const [key, value] of Object.entries(optHeaders)) {
      updatedHeaders.set(key, value)
    }

    newHeaders = updatedHeaders
  }

  return await performAuthenticatedApiCall({
    url: `${process.env.API_URL}/charts/big-boy`,
    requestBody: request,
    method: 'POST'
  }, newHeaders)
}

const DatavizPage = async () => {
  const init = await fetchApps(DEFAULT_SEARCH_REQUEST)
  return <DatavizView data={init} resolveCharts={fetchApps} />
}

export default DatavizPage