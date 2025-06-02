export interface TeamMemberType {
  id: number;
  name: string;
  position: string;
  bio: string;
  image?: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    facebook?: string;
  };
}

export const teamMembers: TeamMemberType[] = [
  {
    id: 1,
    name: "Arun Joshi",
    position: "Full Stack Developer",
    bio: "Specialized in MERN stack and scalable applications.",
    image: "/arun-joshi.jpg",
    social: {
      linkedin: "https://linkedin.com/in/arunjoshi",
      github: "https://github.com/arunjoshi",
    },
  },
  {
    id: 2,
    name: "Ayush Rijal",
    position: "UI/UX Designer",
    bio: "Expert in creating intuitive and visually appealing interfaces.",
    image: "/ayush-rijal.jpg",
    social: {
      twitter: "https://twitter.com/ayushrijal",
      linkedin: "https://linkedin.com/in/ayushrijal",
    },
  },
  {
    id: 3,
    name: "Sandesh Subedi",
    position: "UI/UX Designer",
    bio: "Focuses on user-centered design and seamless experiences.",
    image: "/sandesh-subedi.jpg",
    social: {
      twitter: "https://twitter.com/sandeshsubedi",
      linkedin: "https://linkedin.com/in/sandeshsubedi",
    },
  },
  {
    id: 4,
    name: "Kushal Pandey",
    position: "UI/UX Designer",
    bio: "Passionate about designing accessible and modern interfaces.",
    image: "/kushal-pandey.jpg",
    social: {
      twitter: "https://twitter.com/kushalpandey",
      linkedin: "https://linkedin.com/in/kushalpandey",
    },
  },
  {
    id: 5,
    name: "Kistana",
    position: "UI/UX Designer",
    bio: "Brings creativity and functionality together in every design.",
    image: "/kistana.jpg",
    social: {
      twitter: "https://twitter.com/kistana",
      linkedin: "https://linkedin.com/in/kistana",
    },
  },
  {
    id: 6,
    name: "Saurav Subedi",
    position: "UI/UX Designer",
    bio: "Dedicated to enhancing user satisfaction through thoughtful design.",
    image: "/saurav-subedi.jpg",
    social: {
      twitter: "https://twitter.com/sauravsubedi",
      linkedin: "https://linkedin.com/in/sauravsubedi",
    },
  },
];



// "use client";
// // import { Card, CardContent } from "@/components/ui/card";
// // import CreateAccountDialog from "@/components/ui/accountUi/create-account-drawer";
// // import { Plus } from "lucide-react";
// import React from "react";
// import DemoDahboardPage from "@/app/dashboardDemo/DemoDahboardPage";


// const DashboardPage = () => {
//   return (
//     <div className="px-5">
//       {/* Budget Progress */}
//       <DemoDahboardPage/>
//       {/* Overview */}

//       {/* account grid */}
//       {/* <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
//         <CreateAccountDialog>
//           <Card className="flex flex-col hover:shadow-md  items-center justify-center h-full pt-5 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border-gray-200 dark:border-gray-700">
//             <CardContent className="text-center flex flex-col items-center justify-center h-full">
//               <Plus className="h-6 w-6 text-emerald-600 dark:text-emerald-400" />
//               <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mt-2">
//                 Create New Account
//               </h2>
//             </CardContent>
//           </Card>
//         </CreateAccountDialog>
//       </div> */}
//     </div>
//   );
// };

// export default DashboardPage;



