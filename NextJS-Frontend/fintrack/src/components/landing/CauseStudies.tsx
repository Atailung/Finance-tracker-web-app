import { Button } from "@heroui/button";
import { ArrowUpRight } from "lucide-react";

interface Study {
  title: string;
  buttonText?: string;
}

const CaseStudies: React.FC = () => {
  const studies: Study[] = [
    { title: "Case Study 1", buttonText: "Learn More" },
    { title: "Case Study 2", buttonText: "Learn More" },
    { title: "Case Study 3", buttonText: "Learn More" },
  ];

  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-background dark:bg-gray-900">
      <div className="mb-12 text-center sm:text-left">
        <div className="mb-12 *:flex flex-col items-center justify-center space-y-4 ">
          <div className="inline-block gap-12 items-center ">
            <h1 className="bg-lime-400 text-black px-4 py-2 rounded-lg font-bold text-xl">
              Case Studies
            </h1>
            <p className="text-foreground text-lg max-w-2xl dark:text-gray-300">
              Explore real-life examples of our proven digital marketing
              successes through our case studies.
            </p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 divide-x-4 divide-gray-600 md:grid-cols-3 sm:gap-2  dark:divide-gray-900 rounded-3xl border border-b-5 border-gray-900 dark:border-gray-700">
        {studies.map((study, index) => (
          <div
            key={index}
            className="dark:border-gray-700  p-6 bg-gray-50 dark:bg-gray-800 rounded-3xl"
          >
            <h3 className="text-lg font-semibold text-foreground dark:text-white mb-2">
              {study.title}
            </h3>
            <Button className="mt-4 text-foreground dark:text-white font-medium">
              <ArrowUpRight className="w-5 h-5 mr-2 text-green-600" />
              {study.buttonText || "Learn More"}
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CaseStudies;
