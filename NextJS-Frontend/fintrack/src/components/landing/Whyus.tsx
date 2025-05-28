import { ArrowUpRight } from "lucide-react";
import { Button } from "@heroui/button";
import { Card, CardBody } from "@heroui/card";
import Image from "next/image";

interface Feature {
  title: string;
  image: string;
}

const WhyUs: React.FC = () => {
  const features: Feature[] = [
    {
      title: "Income and Expense  Tracking",
      image: "/income-expense-illustration.svg",
    },
    {
      title: "Pay-per-click Tracking",
      image: "/pay-per-click-illustration.svg",
    },
    { title: "Smart Scanning", image: "/smart-scanning-illustration.svg" },
    { title: "Smart AI Alerts", image: "/smart-ai-alerts-illustration.svg" },
    {
      title: "Smart Categorization",
      image: "/smart-categorization-illustration.svg",
    },
    {
      title: "Analytics and Tracking",
      image: "/analytics-tracking-illustration.svg",
    },
  ];

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-background dark:bg-gray-900">
        <div className="mb-12 *:flex flex-col items-center justify-center space-y-4 ">
            <div className="inline-block gap-12 items-center ">
                <h1 className="bg-lime-400 text-black px-4 py-2 rounded-lg font-bold text-xl">Why us?</h1> 
            <p className="text-foreground text-lg max-w-2xl dark:text-gray-300">
            We&apos;re not just building a finance tracker - we&apos;re creating a
            smarter, safer, and more personalized way to manage money.
            </p>
            </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {features.map((feature, index) => (
            <Card
                key={index}
                className="border-2 border-b-5 border-gray-900 dark:border-gray-700 rounded-3xl p-8 bg-gray-50 dark:bg-gray-800"
            >
                <CardBody className="p-0 ">
                <div className="flex justify-between items-start mb-8">
                    <div className="bg-lime-400 text-black px-4 py-2 rounded-lg font-bold text-lg">
                    {feature.title.split(" ")[0]}
                    <br />
                    {feature.title.split(" ").slice(1).join(" ")}
                    </div>
                    <div className="flex-1 flex justify-center">
                    <Image
                        src={feature.image}
                        alt={`${feature.title} illustration`}
                        width={120}
                        height={80}
                        className="text-gray-400 dark:text-gray-500"
                    />
                    </div>
                </div>
                <Button className="group p-0 h-auto text-foreground dark:text-white font-medium w-1/3 flex items-center justify-start">
                    <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center mr-2 transform transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1">
                    <ArrowUpRight className="w-10 h-10 text-green-600" />
                    </div>
                    Learn more
                </Button>
                </CardBody>
            </Card>
            ))}
        </div>
        <div className="flex gap-8 mt-12 items-center justify-between">
            <div className="3/5 flex flex-col justify-center items-start space-y-4">
                <h1 className="text-3xl font-semibold">Let&apos;s make thinks happen</h1>
                <p className="text-foreground max-w-2xl dark:text-gray-300">
                Join us in revolutionizing the way you manage your finances. With our
                innovative features and user-friendly design, you&apos;ll have the
                tools you need to take control of your financial future.
                </p>
                <Button color="primary"
                className=" text-white  px-6 py-3 rounded-lg font-semibold mt-4 hover:bg-gray-900 transition-colors duration-300"
                aria-label="Get started with FanTrack"
                >
                    Get Started
                </Button>
            </div>
            <div className="w-2/5"> 
            <Image
                src="/lets-go.svg"
                alt="Hero illustration showing financial tracking and management"
                width={500}
                height={500}
                className="w-full h-auto max-w-lg mx-auto scale-100 hover:scale-105 transition-transform duration-500"
                priority
            />
            </div>
        </div>
    </div>   
  );
};

export default WhyUs;




