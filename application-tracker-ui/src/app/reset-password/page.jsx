import { performApiCall } from "@/utils/apiUtils";
import ChangePasswordView from './view';

// Server Action for placeholder API call
async function changePasswordAction(data) {
  'use server';

  console.log(data)

  const response = await performApiCall({
    method: 'POST',
    requestBody: data, 
    url: `${process.env.API_URL}/recovery`, 
    optionalErrorMessage: 'Failed to reset password',
  }, true);

  if (response.status === 200) {
    return response;
  } else {
    return { status: 500, success: false, error: response.error };
  }
}

const ChangePasswordPage = () => {
  return <ChangePasswordView action={changePasswordAction} />;
};

export default ChangePasswordPage;