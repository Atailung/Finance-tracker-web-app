"use client";

import React from "react";
import { Tabs, Tab, Input, Link, Button, Card, CardBody } from "@heroui/react";
import Image from "next/image";

export default function ContactUs() {
  const [selected, setSelected] = React.useState<"say-hi" | "get-quote">("say-hi");

  const handleSelectionChange = (key: React.Key) => {
    setSelected(key as "say-hi" | "get-quote");
  };

  return (
    <div className=" mx-auto px-4 py-16 sm:px-6 lg:px-8 bg-background dark:bg-gray-900 min-h-screen">
      {/* Header Section */}
      <div className="mb-12 *:flex flex-col items-center justify-center space-y-4 ">
          <div className="inline-block gap-12 items-center ">
            <h1 className="bg-lime-400  text-black px-4 py-2 rounded-lg font-bold text-xl">
              Contact Us
            </h1>
            <p className="text-foreground text-lg max-w-2xl dark:text-gray-300">
              Reach out to us for support, inquiries, or to request a quote.
          We&apos;re here to assist you!
            </p>
          </div>
        </div> 
      

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left Side - Form Card */}
        <Card className="w-full bg-white dark:bg-gray-800 dark:border-gray-700 p-2">
          <CardBody className="p-8">
            <Tabs
              color="success"
              radius="full"
              fullWidth
              aria-label="Contact form tabs"
              selectedKey={selected}
              size="lg"
              onSelectionChange={handleSelectionChange}
              className="mb-8"
            >
              {/* Say Hi Tab */}
              <Tab key="say-hi" className = "dark:text-white " title="Say Hi!">
                <form className="flex flex-col gap-7">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-sm font-semibold text-foreground dark:text-gray-300 mb-2"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="name"
                      isRequired
                      placeholder="Enter your name"
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300 focus:outline-none focus:ring-3 focus:ring-lime-500 transition-all duration-200"
                      size="lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-sm font-semibold text-foreground dark:text-gray-300 mb-2"
                    >
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="email"
                      isRequired
                      placeholder="Enter your email"
                      type="email"
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300 focus:outline-none focus:ring-3 focus:ring-lime-500 transition-all duration-200"
                      size="lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="message"
                      className="block text-sm font-semibold text-foreground dark:text-gray-300 mb-2"
                    >
                      Your Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="message"
                      placeholder="Tell us more about what you need..."
                      className=" p-4 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-lime-500 transition-all duration-200 h-36 resize-y overflow-auto"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Looking for a detailed estimate?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("get-quote")}
                      className="text-lime-500 hover:text-lime-600 font-medium transition-colors duration-200 cursor-pointer"
                    >
                      Request a Quote
                    </Link>
                  </p>
                  <Button
                    fullWidth
                    color="primary"
                    className=" text-white font-bold py-3 px-6 rounded-xl text-lg hover:bg-lime-600 transition-all duration-300 shadow-md transform hover:scale-105"
                  >
                    Send Message
                  </Button>
                </form>
              </Tab>

              {/* Get Quote Tab */}
              <Tab key="get-quote" className = "dark:text-white" title="Get a Quote">
                <form className="flex flex-col gap-7">
                  <div>
                    <label
                      htmlFor="full-name"
                      className="block text-sm font-semibold text-foreground dark:text-gray-300 mb-2"
                    >
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="full-name"
                      isRequired
                      placeholder="Enter your full name"
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300 focus:outline-none focus:ring-3 focus:ring-lime-500 transition-all duration-200"
                      size="lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="quote-email"
                      className="block text-sm font-semibold text-foreground dark:text-gray-300 mb-2"
                    >
                      Email Address <span className="text-red-500">*</span>
                    </label>
                    <Input
                      id="quote-email"
                      isRequired
                      placeholder="Enter your email"
                      type="email"
                      className="w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300 focus:outline-none focus:ring-3 focus:ring-lime-500 transition-all duration-200"
                      size="lg"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="description"
                      className="block text-sm font-semibold text-foreground dark:text-gray-300 mb-2"
                    >
                      Project Description{" "}
                      <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="description"
                      placeholder="Describe your project or needs in detail..."
                      className="p-4 w-full rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-foreground dark:text-gray-300 placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-3 focus:ring-lime-500 transition-all duration-200 h-36 resize-y overflow-auto"
                    />
                  </div>
                  <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-2">
                    Just want to send a quick message?{" "}
                    <Link
                      size="sm"
                      onPress={() => setSelected("say-hi")}
                      className="text-lime-500  hover:text-lime-600 font-medium transition-colors duration-200 cursor-pointer"
                    >
                      Say Hi
                    </Link>
                  </p>
                  <Button
                    fullWidth
                    color="primary"
                    className=" text-white font-bold py-3 px-6 rounded-xl text-lg hover:bg-lime-600 transition-all duration-300 shadow-md transform hover:scale-105"
                  >
                    Request Quote
                  </Button>
                </form>
              </Tab>
            </Tabs>
          </CardBody>
        </Card>

        {/* Right Side - Image */}
        <div className="hidden lg:flex justify-center items-center w-full relative">
          <div className="relative w-full max-w-lg h-[400px]  overflow-hidden  ">
            <Image
              src="/Contact-us-rafiki.svg"
              alt="Contact us illustration"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 0vw, 50vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
