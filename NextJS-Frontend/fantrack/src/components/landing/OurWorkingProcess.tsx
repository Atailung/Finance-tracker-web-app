
"use client";
import React from "react";
import { ChevronDown } from "lucide-react";


interface Process {
  id: number;
  title: string;
  description: string;
  isOpen?: boolean;
}

const OurWorkingProcess: React.FC = () => {
  const processes: Process[] = [
      {
    id: 1,
    title: "What is eSewa?",
    description: "eSewa is a digital wallet that allows users to pay, send, and receive money in Nepal.",
    isOpen: true,
  },
  {
    id: 2,
    title: "How do I load funds into eSewa?",
    description: "You can load funds via bank transfer, mobile banking, or direct deposit.",
  },
  {
    id: 3,
    title: "Is eSewa safe?",
    description: "Yes, it is regulated by Nepal Rastra Bank and uses secure encryption technology.",
  },
  ];
  const [openProcess, setOpenProcess] = React.useState<number | null>(() => {
    return processes.find((process) => process.isOpen)?.id || null;
  })

  const toggleProcess = (id: number) => {
    setOpenProcess((prev) => (prev === id ? null : id));
  };

  return (
    <div className=" mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-background dark:bg-gray-900">
      {/* Header Section */}
        <div className="mb-12 *:flex flex-col items-center justify-center space-y-4 ">
          <div className="inline-block gap-12 items-center ">
            <h1 className="bg-lime-400  text-black px-4 py-2 rounded-lg font-bold text-xl">
              Our Working Process
            </h1>
            <p className="text-foreground text-lg max-w-2xl dark:text-gray-300">
              Step-by-Step Guide to Our Digital Marketing Approach
            </p>
          </div>
        </div> 
      {/* Accordion Section */}
        <div className="space-y-4 border border-gray-900 dark:border-gray-700 rounded-3xl p-4 bg-gray-50 dark:bg-gray-800">
        {processes.map((process) => {
            const isOpen = openProcess === process.id;
            return (
                <div
                    key={process.id}
                    className={`border border-b-5 border-gray-900 rounded-3xl p-4 transition-all duration-300 text-white ${
                    isOpen ? "bg-lime-500  dark:bg-gray-800" : "bg-lime-600 dark:bg-gray-900"
                    }`}
                >
                    <div
                    className="flex justify-between items-center cursor-pointer"
                    onClick={() => toggleProcess(process.id)}
                    >
                    <h3 className="text-lg font-semibold text-foreground dark:text-white">
                        {process.title}
                    </h3>
                    <div className="bg-white rounded-full border border-gray-900 p-2 flex items-center justify-center">

                    <ChevronDown
                        className={`w-6 h-6 text-black transition-transform duration-300 ${
                        isOpen ? "transform rotate-180" : ""
                        }`}
                    />
                    </div>
                    </div>
                    {isOpen && (
                    <p className="mt-2 text-white dark:text-gray-400">
                        {process.description}
                    </p>
                    )}
                </div>
            )

        })}

        </div>
    </div>
  );
};

export default OurWorkingProcess;