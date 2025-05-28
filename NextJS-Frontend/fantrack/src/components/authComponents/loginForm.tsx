"use client";

import React, { useState } from "react";
import { Button, Input } from "@heroui/react";
import { Card, CardHeader, CardBody, CardFooter } from "@heroui/card";
import { Loader2, Github } from "lucide-react";
import Image from "next/image";

interface LoginFormProps {
  onSwitchMode: (mode: "login" | "signup" | "reset") => void;
}

export default function LoginForm({ onSwitchMode }: LoginFormProps) {
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate a login request
    await new Promise((resolve) => setTimeout(resolve, 2000));
    setIsLoading(false);
    // Handle successful login here
  };

  return (
    <Card className="w-full bg-white dark:bg-gray-900 rounded-3xl shadow-lg overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-lime-100/20 dark:from-gray-800/20 to-transparent pointer-events-none" />
      <CardHeader className="p-6 flex flex-col text-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Welcome To Fantarack</h2>
        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
          Enter your credentials to access your account
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
              placeholder="fantrack2025@info.co"
              required
              disabled={isLoading}
              classNames={{
                input: "text-gray-900 dark:text-gray-100",
                inputWrapper: "bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-lime-400 focus-within:border-lime-400 rounded-lg h-12",
              }}
            />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password <span className="text-red-500">*</span>
              </label>
              <button
                onClick={() => onSwitchMode("reset")}
                className="text-sm text-lime-500 hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500"
              >
                Forgot Password?
              </button>
            </div>
            <Input
              id="password"
              type="password"
              placeholder="Password"
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
            className="w-full text-white font-semibold py-3 rounded-lg hover:bg-lime-950 focus:ring-2 focus:ring-lime-950 transition-all disabled:opacity-50"
            disabled={isLoading}
            aria-live="polite"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Sign In
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
          <Button
            variant="bordered"
            disabled={isLoading}
            className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:border-lime-400"
          >
            <Github className="mr-2 h-4 w-4" /> GitHub
          </Button>
          <Button
            variant="bordered"
            disabled={isLoading}
            className="text-gray-900 dark:text-gray-100 border-gray-300 dark:border-gray-600 hover:border-lime-400"
          >
            <Image src="/Google_Logo.svg" alt="Google logo" width={16} height={16} className="mr-2" /> Google
          </Button>
        </div>
      </CardBody>
      <CardFooter className="p-6 mx-auto text-center items-center">
        <p className="text-sm text-center  text-gray-600 dark:text-gray-400">
          Don&apos;t have an account?{" "}
          <button
            onClick={() => onSwitchMode("signup")}
            className="text-lime-500 font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-lime-500"
          >
            Sign Up
          </button>
        </p>
      </CardFooter>
    </Card>
  );
}