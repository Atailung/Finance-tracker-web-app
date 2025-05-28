import Image from "next/image";
import React from "react";
import { Button } from "@heroui/react";

const Header = ({ isLoggedIn = false }) => {
  return (
    <nav className="bg-white dark:bg-gray-800 border-b border-gray-800 px-4 lg:px-6 py-2.5">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between">
        <a href="https://flowbite.com" className="flex items-center space-x-3">
          <Image
            src="https://flowbite.com/docs/images/logo.svg"
            alt="Fantrack Logo"
            width={36}
            height={36}
            className="h-9"
          />
          <span className="text-xl font-semibold text-gray-900 dark:text-white">
            Fantrack
          </span>
        </a>
        <Button
          color="primary"
          className="text-xl  font-medium rounded-lg px-4 py-2 transition-colors "
        >
          <a
            href={isLoggedIn ? "/dashboard" : "/login"}
            className={`${
              isLoggedIn
                ? "text-white bg-primary-700 dark:bg-primary-600 "
                : "text-white dark:text-white"
            } focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800`}
          >
            {isLoggedIn ? "Open Dashboard" : "Log In"}
          </a>
        </Button>
      </div>
    </nav>
  );
};

export default Header;
