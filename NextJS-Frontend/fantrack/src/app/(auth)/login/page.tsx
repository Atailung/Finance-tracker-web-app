// "use client";

// import { useState } from "react";
// import Image from "next/image";
// import LoginForm from "@/components/authComponents/loginForm";
// import { SignupForm } from "@/components/authComponents/signup-form";
// import { ResetPasswordForm } from "@/components/authComponents/rest-password-form";

// type AuthMode = "login" | "signup" | "reset";

// export default function AuthPage() {
//   const [authMode, setAuthMode] = useState<AuthMode>("login");

//   const renderForm = () => {
//     switch (authMode) {
//       case "login":
//         return <LoginForm onSwitchMode={setAuthMode} />;
//       case "signup":
//         return <SignupForm onSwitchMode={setAuthMode} />;
//       case "reset":
//         return <ResetPasswordForm onSwitchMode={setAuthMode} />;
//       default:
//         return <LoginForm onSwitchMode={setAuthMode} />;
//     }
//   };

//   return (
//     <div className="min-h-screen w-full lg:grid lg:grid-cols-2">
//       {/* Forms Section */}
//       <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
//         <div className="mx-auto w-full max-w-sm space-y-6">{renderForm()}</div>
//       </div>

//       {/* Image Section */}
//       <div className="hidden  lg:block relative ">
//         <Image
//           src="/Contact-us-rafiki.svg?height=1080&width=1920"
//           alt="Authentication illustration"
//           width={1920}
//           height={1080}
//           className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
//           priority
//         />
//       </div>
//     </div>
//   );
// }






"use client";

import { useState } from "react";
import Image from "next/image";
import LoginForm from "@/components/authComponents/loginForm";
import { SignupForm } from "@/components/authComponents/signup-form";
import { ResetPasswordForm } from "@/components/authComponents/rest-password-form";

type AuthMode = "login" | "signup" | "reset";

export default function AuthPage() {
  const [authMode, setAuthMode] = useState<AuthMode>("login");

  const renderForm = () => {
    switch (authMode) {
      case "login":
        return <LoginForm onSwitchMode={setAuthMode} />;
      case "signup":
        return <SignupForm onSwitchMode={setAuthMode} />;
      case "reset":
        return <ResetPasswordForm onSwitchMode={setAuthMode} />;
      default:
        return <LoginForm onSwitchMode={setAuthMode} />;
    }
  };

  return (
    <div className="min-h-screen w-full lg:grid lg:grid-cols-2 bg-gradient-to-br from-gray-50 to-lime-50 dark:from-gray-900 dark:to-gray-800">
      {/* Forms Section */}
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-md space-y-6">{renderForm()}</div>
      </div>

      {/* Image Section */}
      <div className="hidden lg:block relative">
        <div className="absolute inset-0 bg-gray-850 dark:bg-gray-850"></div>
        <Image
          src="/Contact-us-rafiki.svg?height=1080&width=1920"
          alt="Authentication illustration"
          width={1920}
          height={1080}
          className="absolute inset-0 h-full w-full object-cover"
          priority
        />
      </div>
    </div>
  );
}