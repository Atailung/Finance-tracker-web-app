import { NextResponse } from "next/server";

export async function GET() {
  const stats = [
    {
      title: "Total Balance",
      value: "$17,246.21",
      description: "vs. last month",
      change: 12.5,
      icon: "ArrowUp",
    },
    {
      title: "Income",
      value: "$5,432.10",
      description: "vs. last month",
      change: 8.2,
      icon: "ArrowUp",
    },
   
    {
      title: "Expenses",
      value: "$3,782.65",
      description: "vs. last month",
      change: -3.1,
      icon: "ArrowDown",
    },
    {
      title: "Savings Rate",
      value: "30.4%",
      description: "vs. last month",
      change: 5.7,
      icon: "ArrowUp",
    },
   
  ];

  return NextResponse.json(stats);
}
