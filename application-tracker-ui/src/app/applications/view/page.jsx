import { performAuthenticatedApiCall } from "@/utils/apiUtils";
import ApplicationsView from "./view.jsx";
import { notFound } from "next/navigation";
import { headers } from "next/headers";
import { getUserDetails } from "@/utils/securityUtils";
import { HeaderValues } from "@/constants";

export default async function ApplicationsPage() {
  const nheaders = headers();
  const token = nheaders.get(HeaderValues.TOKEN);
  const details = await getUserDetails(token);
  const { id = null } = details;

  if (!id) {
    notFound();
  }

  const response = await performAuthenticatedApiCall({
    method: 'POST',
    url: `${process.env.API_URL}/search`,
    requestBody: { userId: id },
  }, nheaders);

  const { data, status } = response

  if (!data || status !== 200) {
    notFound();
  }

  return <ApplicationsView initialApplications={data} />;
}
