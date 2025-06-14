"use client";   

import React from "react";
import { Button } from "@heroui/react";
import { Card, CardTitle, CardDescription  } from "@/components/ui/card";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gradient-to-br from-gray-50 to-lime-50 dark:from-gray-900 dark:to-gray-800 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-6"> 

        {/* Card */}
        <Card className="bg-white dark:bg-gray-900 rounded-2xl shadow-lg overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-lime-100/20 dark:from-gray-800/20 to-transparent pointer-events-none" />
          <CardTitle className="p-6 flex flex-col text-center">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">404 - Page Not Found</h2>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              Oops! The page you&apos;re looking for doesn&apos;t exist.
            </p>
          </CardTitle>
          <CardTitle className="p-6 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              It looks like you might have taken a wrong turn. Let&apos;s get you back on track!
            </p>
            <Link href="/">
              <Button
                color="primary"
                
                size="lg"
                className=" text-white font-semibold py-3 rounded-lg hover:bg-lime-900 focus:ring-2 focus:ring-lime-500 transition-all"
              >
                Return to Homepage
              </Button>
            </Link>
          </CardTitle>
        </Card>
      </div>
    </div>
  );
}