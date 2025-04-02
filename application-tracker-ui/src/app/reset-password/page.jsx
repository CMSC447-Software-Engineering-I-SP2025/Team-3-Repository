// src/app/change-password/page.jsx
import ChangePasswordView from './view';

// Server Action for placeholder API call
async function changePasswordAction(data) {
  'use server';
  const { newPassword } = data;

  // Placeholder API call
  try {
    const response = await fetch(`${process.env.API_URL}/change-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ newPassword }),
    });

    if (!response.ok) {
      throw new Error('Password change failed');
    }

    const result = await response.json();
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const ChangePasswordPage = () => {
  return <ChangePasswordView action={changePasswordAction} />;
};

export default ChangePasswordPage;