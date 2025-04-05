import { performApiCall } from "@/utils/apiUtils";
import UserRegistrationView from "./view";

const handleRegistration = async (userData) => {
  'use server';
  
  try {
    const apiUrl = process.env.API_URL;
    const url = `${apiUrl}/users/signup`;
    
    const response = await performApiCall({
      url,
      method: 'POST',
      requestBody: userData
    });

    return response
  } catch (error) {
    return { status: 500, data: error.message }
  }
};

export default function RegistrationPage() {
  return <UserRegistrationView handleRegistration={handleRegistration} />;
}
