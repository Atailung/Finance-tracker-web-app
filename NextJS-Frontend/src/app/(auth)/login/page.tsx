"use client";

import { SignIn } from "@clerk/nextjs";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-lime-50 dark:from-gray-900 dark:to-gray-800">
      <div className="w-full max-w-md px-4 py-8 bg-white dark:bg-gray-900 shadow-lg rounded-lg">
        <SignIn path="/login" routing="path" signUpUrl="/sign-up" />
      </div>
    </div>
  );
}
