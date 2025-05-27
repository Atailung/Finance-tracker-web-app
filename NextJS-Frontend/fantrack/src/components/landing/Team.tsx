import { teamMembers } from "../common/TeamData";
import { Github, Linkedin, Twitter, Facebook } from "lucide-react";
import Image from "next/image";

const Team: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-10 sm:px-6 lg:px-8 bg-background dark:bg-gray-900">
       <div className="mb-12 *:flex flex-col items-center justify-center space-y-4 ">
          <div className="inline-block gap-12 items-center ">
            <h1 className="bg-lime-400  text-black px-4 py-2 rounded-lg font-bold text-xl">
              Our Team
            </h1>
            <p className="text-foreground text-lg max-w-2xl dark:text-gray-300">
              Meet the passionate individuals behind our innovative finance tracking
          solution. Our team is dedicated to making financial management
          smarter, safer, and more personalized for everyone.
            </p>
          </div>
        </div> 
      

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="bg-white dark:bg-gray-800 p-6 rounded-3xl shadow-md hover:shadow-lg transition-shadow border border-b-5 border-gray-900 dark:border-gray-700 flex flex-col  text-center"
          >
            <div className="flex items-center justify-between bg-white dark:bg-gray-800 px-4 py-3  w-full max-w-3xl mx-auto">
              {/* Profile Image */}
              <div className="w-16 h-16 relative">
                {/* Background image with low opacity */}
                <Image
                  src="/profile_pic.svg"
                  alt="Team member background"
                  className="absolute inset-0 w-full h-full object-cover rounded-full opacity-10"
                  width={112}
                  height={112}
                />

                {/* Dark overlay ring */}
                <div className="absolute inset-0 dark:bg-gray-900 rounded-full border-2 border-gray-800" />
                <Image
                  src={member.image || "/default-profile.png"}
                  alt={member.name}
                  className="rounded-full object-cover"
                  fill
                />
              </div>

              {/* Name + Position */}
              <div className="flex flex-col items-center flex-1 px-4">
                <h3 className="font-semibold  text-gray-900 dark:text-white">
                  {member.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {member.position}
                </p>
              </div>

              {/* Social Icons */}
              <div className="flex space-x-3 text-gray-500 dark:text-gray-300">
                {member.social?.linkedin && (
                  <a
                    href={member.social.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Linkedin className="w-5 h-5 hover:text-green-600" />
                  </a>
                )}
                {member.social?.github && (
                  <a
                    href={member.social.github}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="w-5 h-5 hover:text-black dark:hover:text-white" />
                  </a>
                )}
                {member.social?.twitter && (
                  <a
                    href={member.social.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Twitter className="w-5 h-5 hover:text-blue-400" />
                  </a>
                )}
                {member.social?.facebook && (
                  <a
                    href={member.social.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Facebook className="w-5 h-5 hover:text-blue-600" />
                  </a>
                )}
              </div>
            </div>

            <div className="text-center mt-4">
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300 font-semibold">
                {member.bio}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Team;
