import { performApiCall, performAuthenticatedApiCall } from '@/utils/apiUtils.js';
import View from './view.jsx';
import { notFound } from 'next/navigation.js';
import { cookies, headers } from 'next/headers.js';
import { HeaderValues } from '@/constants/index.js';

export default async function ProfilePage() {
  const nheaders = headers()
  const email = nheaders.get(HeaderValues.EMAIL)

  const { data, status } = await performAuthenticatedApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/users/email?email=${email}`
  }, nheaders)
  
  if (!data || status !== 200) {
    notFound()
  }

  return <View user={data} />;
}
