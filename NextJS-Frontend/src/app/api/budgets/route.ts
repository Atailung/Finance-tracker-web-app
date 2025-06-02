
import { NextResponse } from "next/server";

export interface Budget {
  id: number;
  name: string;
  current: number;
  max: number;
  color: string;
  icon: string;
  period: string;
  lastUpdated: string;
  trend: string;
  category: string;
}

const budgets: Budget[] = [
  {
    id: 1,
    name: "Housing",
    current: 980,
    max: 1200,
    color: "bg-blue-500",
    icon: "housing",
    period: "monthly",
    lastUpdated: "2 days ago",
    trend: "stable",
    category: "essential",
  },
  {
    id: 2,
    name: "Food & Dining",
    current: 550,
    max: 600,
    color: "bg-emerald-500",
    icon: "food",
    period: "monthly",
    lastUpdated: "1 day ago",
    trend: "increasing",
    category: "essential",
  },
  {
    id: 3,
    name: "Transportation",
    current: 430,
    max: 400,
    color: "bg-red-500",
    icon: "transportation",
    period: "monthly",
    lastUpdated: "3 hours ago",
    trend: "increasing",
    category: "essential",
  },
  {
    id: 4,
    name: "Entertainment",
    current: 180,
    max: 300,
    color: "bg-purple-500",
    icon: "entertainment",
    period: "monthly",
    lastUpdated: "5 days ago",
    trend: "decreasing",
    category: "lifestyle",
  },
  {
    id: 5,
    name: "Shopping",
    current: 320,
    max: 350,
    color: "bg-amber-500",
    icon: "shopping",
    period: "monthly",
    lastUpdated: "1 day ago",
    trend: "stable",
    category: "lifestyle",
  },
  {
    id: 6,
    name: "Utilities",
    current: 230,
    max: 250,
    color: "bg-indigo-500",
    icon: "utilities",
    period: "monthly",
    lastUpdated: "1 week ago",
    trend: "stable",
    category: "essential",
  },
  {
    id: 7,
    name: "Healthcare",
    current: 120,
    max: 200,
    color: "bg-pink-500",
    icon: "healthcare",
    period: "monthly",
    lastUpdated: "2 weeks ago",
    trend: "stable",
    category: "essential",
  },
  {
    id: 8,
    name: "Personal Care",
    current: 90,
    max: 150,
    color: "bg-teal-500",
    icon: "personal",
    period: "monthly",
    lastUpdated: "3 days ago",
    trend: "decreasing",
    category: "lifestyle",
  },
];

export async function GET() {
  return NextResponse.json(budgets);
}

export async function POST(request: Request) {
  const newBudget = await request.json();
  budgets.push({
    ...newBudget,
    id: budgets.length + 1,
    lastUpdated: "just now",
  });
  return NextResponse.json(
    { message: "Budget created successfully" },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const updateBudget = await request.json();
  const index = budgets.findIndex((b) => b.id === updateBudget.id);
  if (index !== -1) {
    budgets[index] = {
      ...budgets[index],
      ...updateBudget,
      lastUpdated: "just now",
    };
    return NextResponse.json({ message: "Budget updated successfully" });
  }
  return NextResponse.json({ error: "Budet not found" }, { status: 404 });
}

export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = budgets.findIndex((b) => b.id === id);
  if (index !== -1) {
    budgets.splice(index, 1);
    return NextResponse.json({ message: "Budget deleted successfully" });
  }
  return NextResponse.json({ error: "Budget not found " }, { status: 404 });
}
