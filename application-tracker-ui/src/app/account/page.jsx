import View from './view.jsx';

export default function ProfilePage() {
  // Simulated user data (Normally, this would come from an API)
  const user = {
    username: "john_doe123",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    skills: ["JavaScript", "React", "Node.js", "CSS", "HTML"],
  };

  return <View user={user} />;
}
