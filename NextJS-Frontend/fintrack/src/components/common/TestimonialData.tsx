 interface Testimonial {
  id: number;
  quote: string;
  author: string;
  role: string;
}

export const testimonials: Testimonial[] = [
    {
      id: 1,
      quote: "This finance tracker transformed how I manage my money. It's intuitive and incredibly helpful!",
      author: "Jane Doe",
      role: "Entrepreneur",
    },
    {
      id: 2,
      quote: "The smart AI alerts saved me from overspending. I highly recommend this tool to everyone.",
      author: "John Smith",
      role: "Freelancer",
    },
    {
      id: 3,
      quote: "The analytics feature gave me deep insights into my spending habits. A game-changer!",
      author: "Emily Johnson",
      role: "Marketing Manager",
    },
  ];