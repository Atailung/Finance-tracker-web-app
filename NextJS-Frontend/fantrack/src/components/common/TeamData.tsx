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