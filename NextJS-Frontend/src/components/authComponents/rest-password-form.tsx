"use client";

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Loader2, Check } from "lucide-react";

interface ResetPasswordFormProps {
  onSwitchMode: (mode: "login" | "signup" | "reset") => void;
}

export function ResetPasswordForm({ onSwitchMode }: ResetPasswordFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    setIsEmailSent(true);
  };

  if (isEmailSent) {
    return (
      <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-lime-100/20 dark:from-gray-800/20 to-transparent pointer-events-none" />
        <CardHeader className="p-6 flex flex-col text-center">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Check Your Email</h2>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            We&apos;ve sent a password reset link to your email address
          </p>
        </CardHeader>
        <CardBody className="p-6 space-y-6 text-center">
          <div className="mx-auto w-12 h-12 bg-lime-100 dark:bg-lime-900/30 rounded-full flex items-center justify-center">
            <Check className="w-6 h-6 text-lime-500" />
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            If you don&apos;t see the email, check your spam folder or try again.
          </p>
        </CardBody>
        <CardFooter className="p-6 flex flex-col space-y-3">
          <Button
            color="primary"
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-lime-500 focus:ring-2 focus:ring-lime-500 transition-all"
            onClick={() => setIsEmailSent(false)}
          >
            Try Again
          </Button>
          <button
            onClick={() => onSwitchMode("login")}
            className="text-sm text-lime-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            Back to Sign In
          </button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md mx-auto bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lime-100/20 dark:from-gray-800/20 to-transparent pointer-events-none" />
      <CardHeader className="p-6 flex flex-col text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Reset Password</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Enter your email address to receive a reset link
        </p>
      </CardHeader>
      <CardBody className="p-6 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-5">
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
          <Button
            type="submit"
            color="primary"
            className="w-full  text-white font-semibold py-3 rounded-lg hover:bg-lime-950 focus:ring-2 focus:ring-lime-500 transition-all disabled:opacity-50"
            disabled={isLoading}
            aria-live="polite"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Send Reset Link
          </Button>
        </form>
      </CardBody>
      <CardFooter className="p-6 text-center">
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Remember your password?{" "}
          <button
            onClick={() => onSwitchMode("login")}
            className="text-lime-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            Sign In
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}