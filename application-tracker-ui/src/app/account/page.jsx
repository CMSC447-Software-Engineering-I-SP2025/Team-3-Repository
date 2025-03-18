import { performApiCall } from '@/utils/apiUtils.js';
import View from './view.jsx';
import { notFound } from 'next/navigation.js';

export default async function ProfilePage() {
  
  // hard-coded, will work later when login is supported
  const { data, status } = await performApiCall({
    method: 'GET',
    url: `${process.env.API_URL}/users/email?email=somenewemail@dev.com`
  })

  if (!data || status !== 200) { notFound() }

  return <View user={data} />;
}
