import { performAuthenticatedApiCall } from "@/utils/apiUtils";
import RecommendationsView from "./view.jsx";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUserDetails } from "@/utils/securityUtils";
import { HeaderValues } from "@/constants";

export default async function RecommendationsPage() {
  const nheaders = headers();
  const token = nheaders.get(HeaderValues.TOKEN);
  const details = await getUserDetails(token);
  const { id = null } = details;

  const targetUrl = `${process.env.API_URL}/jobs/match?userId=${id}`;
  
  const headersObj = {};
  nheaders.forEach((value, key) => {
    headersObj[key] = value;
  });

  const response = await performAuthenticatedApiCall({
    method: 'GET',
    url: targetUrl,
  }, nheaders);
  const { data, status } = response;

  if (!data || status !== 200) {
    notFound();
  }

  return <RecommendationsView jobs={data} />;
}
