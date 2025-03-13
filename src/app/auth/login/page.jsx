'use client'

import { LoginForm } from "@/components/login-form"
import { useRouter } from "next/navigation";
import  signLogin  from "@/services/auth-provider.jsx";

export default function LoginPage() {

  const router = useRouter();

  const handlelogin = async(email, password) => {
    try {

      console.log(email,password)
      // Call the login service
      // await login(email, password);
      // Redirect to the user dashboard
      await signLogin (email, password);
      router.push("/user");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    (
    <div
      className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        <LoginForm onLogin={handlelogin}/>
      </div>
    </div>)
  );
}
k