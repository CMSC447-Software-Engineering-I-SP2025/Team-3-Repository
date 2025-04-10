import { performApiCall } from "@/utils/apiUtils";
import ChangePasswordView from './view';

// Server Action for placeholder API call
async function changePasswordAction(data) {
  'use server';
  const { newPassword, token } = data;

  const response = await performApiCall({
    method: 'POST',
    requestBody: { newPassword}, //will add token here later after emailing link is done
    url: `${process.env.API_URL}/password-reset`, //placeholder endpoint
    optionalErrorMessage: 'Failed to reset password',
  });

  if (response.status === 200) {
    return { success: true, data: response.data };
  } else {
    return { success: false, error: response.error };
  }
}

const ChangePasswordPage = () => {
  return <ChangePasswordView action={changePasswordAction} />;
};

export default ChangePasswordPage;