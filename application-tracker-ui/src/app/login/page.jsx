import { cookies } from "next/headers";
import LoginView from "./view";

// Server Action to handle login
async function loginAction(data) {
  'use server';
  const { username, password } = data;

  //placeholder api call
  try {
    const response = await fetch(`${process.env.API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    const result = await response.text();
    // set the token in server cookies
    cookies().set('Authorization', `Bearer ${result}`)
    return { success: true, data: result };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

const LoginPage = () => {
  const c = cookies()
  return <LoginView action={loginAction} />;
};

export default LoginPage;