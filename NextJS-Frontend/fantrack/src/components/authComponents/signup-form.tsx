// "use client";
// import React, { useState } from "react";
// import { Button, Input } from "@heroui/react";
// import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
// import { Loader2, Github } from "lucide-react";
// import { Checkbox } from "@heroui/checkbox";
// import Image from "next/image";

// interface SignupFormProps {
//   onSwitchMode: (mode: "login" | "signup" | "reset") => void
// }

// export function SignupForm({ onSwitchMode }: SignupFormProps) {
//   const [isLoading, setIsLoading] = useState(false)

//   const handleSubmit = async (event: React.FormEvent) => {
//     event.preventDefault()
//     setIsLoading(true)

//     // Simulate API call
//     setTimeout(() => {
//       setIsLoading(false)
//     }, 2000)
//   }

//   return (
//     <Card className="w-full">
//       <CardHeader className="space-y-1">
//         <div className="flex items-center justify-between">
//           <CardHeader className="text-2xl font-bold">Create account</CardHeader>
//         </div>
//         <CardBody>Enter your information to create your account</CardBody>
//       </CardHeader>
//       <CardBody className="space-y-4">
//         <form onSubmit={handleSubmit} className="space-y-4">
//           <div className="grid grid-cols-2 gap-4">
//             <div className="space-y-2">
//               <label htmlFor="firstName">First name</label>
//               <Input id="firstName" placeholder="John" required disabled={isLoading} />
//             </div>
//             <div className="space-y-2">
//               <label htmlFor="lastName">Last name</label>
//               <Input id="lastName" placeholder="Doe" required disabled={isLoading} />
//             </div>
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="email">Email</label>
//             <Input id="email" type="email" placeholder="m@example.com" required disabled={isLoading} />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="password">Password</label>
//             <Input id="password" type="password" required disabled={isLoading} />
//           </div>
//           <div className="space-y-2">
//             <label htmlFor="confirmPassword">Confirm password</label>
//             <Input id="confirmPassword" type="password" required disabled={isLoading} />
//           </div>
//           <div className="flex items-center space-x-2">
//             <Checkbox id="terms" required />
//             <label htmlFor="terms" className="text-sm">
//               I agree to the{" "}
//               <a href="#" className="text-primary hover:underline">
//                 Terms of Service
//               </a>{" "}
//               and{" "}
//               <a href="#" className="text-primary hover:underline">
//                 Privacy Policy
//               </a>
//             </label>
//           </div>
//           <Button type="submit" className="w-full" disabled={isLoading}>
//             {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
//             Create account
//           </Button>
//         </form>

//         <div className="relative">
//           <div className="absolute inset-0 flex items-center">
//             <span className="w-full border-t" />
//           </div>
//           <div className="relative flex justify-center text-xs uppercase">
//             <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
//           </div>
//         </div>

//         <div className="grid grid-cols-2 gap-4">
//           <Button variant="bordered"  disabled={isLoading}>
//             <Github className="mr-2 h-4 w-4" />
//             GitHub
//           </Button>
//           <Button variant="bordered" disabled={isLoading}>
//             <Image src="/Google_Logo" alt="google logo" width={24} height = {24} className="mr-2 h-4 w-4" />

//             Google
//           </Button>
//         </div>
//       </CardBody>
//       <CardFooter>
//         <p className="text-center text-sm text-muted-foreground w-full">
//           Already have an account?{" "}
//           <button onClick={() => onSwitchMode("login")} className="font-medium text-primary hover:underline">
//             Sign in
//           </button>
//         </p>
//       </CardFooter>
//     </Card>
//   )
// }











"use client";

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Loader2, Github, } from "lucide-react";
import { Checkbox } from "@heroui/checkbox";
import Image from "next/image";

interface SignupFormProps {
  onSwitchMode: (mode: "login" | "signup" | "reset") => void;
}

export function SignupForm({ onSwitchMode }: SignupFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
  };

  return (
    <Card className="w-full flex  mx-auto bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lime-100/20 dark:from-gray-800/20 to-transparent pointer-events-none" />
      <CardHeader className="p-6 flex flex-col text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Create Your Account</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Enter your details to get started</p>
      </CardHeader>
      <CardBody className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                First Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="firstName"
                placeholder="John"
                required
                disabled={isLoading}
                classNames={{
                  input: "text-gray-900 dark:text-gray-100",
                  inputWrapper: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-lime-400 focus-within:border-lime-400 rounded-lg h-12",
                }}
              />
            </div>
            <div className="space-y-2">
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Last Name <span className="text-red-500">*</span>
              </label>
              <Input
                id="lastName"
                placeholder="Doe"
                required
                disabled={isLoading}
                classNames={{
                  input: "text-gray-900 dark:text-gray-100",
                  inputWrapper: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-lime-400 focus-within:border-lime-400 rounded-lg h-12",
                }}
              />
            </div>
          </div>
          <div className="space-y-2">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Email <span className="text-red-500">*</span>
            </label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              disabled={isLoading}
              classNames={{
                input: "text-gray-900 dark:text-gray-100",
                inputWrapper: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-lime-400 focus-within:border-lime-400 rounded-lg h-12",
              }}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="password"
              type="password"
              required
              disabled={isLoading}
              classNames={{
                input: "text-gray-900 dark:text-gray-100",
                inputWrapper: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-lime-400 focus-within:border-lime-400 rounded-lg h-12",
              }}
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Confirm Password <span className="text-red-500">*</span>
            </label>
            <Input
              id="confirmPassword"
              type="password"
              required
              disabled={isLoading}
              classNames={{
                input: "text-gray-900 dark:text-gray-100",
                inputWrapper: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-lime-400 focus-within:border-lime-400 rounded-lg h-12",
              }}
            />
          </div>
          <div className="flex items-center space-x-2 gap-2">
            <Checkbox defaultSelected color="success" id="terms" className="w-4 h-4" required />
            <label htmlFor="terms" className="text-sm text-gray-700 dark:text-gray-300">
              I agree to the{" "}
              <a href="#" className="text-lime-500 hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-lime-500 hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500">
                Privacy Policy
              </a>
            </label>
          </div>
          <Button
            type="submit"
            color ="primary"
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-lime-900 focus:ring-2 focus:ring-lime-500 transition-all disabled:opacity-50"
            disabled={isLoading}
            aria-live="polite"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Account
          </Button>
        </form>

        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-gray-300 dark:border-gray-600" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-white dark:bg-gray-900 px-2 text-gray-500 dark:text-gray-400">Or continue with</span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Button variant="bordered" disabled={isLoading} className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:border-lime-400">
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
          <Button variant="bordered" disabled={isLoading} className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:border-lime-400">
            <Image src="/Google_Logo.svg" alt="Google logo" width={16} height={16} className="mr-2" /> Google
          </Button>
        </div>
      </CardBody>
      <CardFooter className="p-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            onClick={() => onSwitchMode("login")}
            className="text-lime-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            Sign in
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}