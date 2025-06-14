
import type { Metadata } from "next";
import { Poppins as PoppinsFont } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "next-themes";
import { Toaster } from "react-hot-toast";

import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";

const Poppins = PoppinsFont({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--font-poppins",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Fantrack",
  description: "Personal Finance Tracker web version. The best web application.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${Poppins.variable} antialiased`}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem={false}>
            <main>
            <header className="flex justify-end items-center p-4 gap-4 h-16">
                <SignedOut>
                  <SignInButton />
                  <SignUpButton />
                </SignedOut>
                <SignedIn>
                  <UserButton />
                </SignedIn>
              </header>
              <Toaster position="top-center" toastOptions={{ duration: 3000 }} />
              {children}
            </main>
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
