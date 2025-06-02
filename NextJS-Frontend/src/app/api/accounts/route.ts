import { NextResponse } from "next/server";

export interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
  icon: string;
  transactions: number;
  lastUpdated: string;
  institution?: string;
  accountNumber: string;
  color: string;
  recentActivity: { amount: number; description: string }[];
  isDefault: boolean;
  dueDate?: string;
  creditLimit?: number;
  performance?: string;
}

const accounts: Account[] = [
  
  {
    id: 1,
    name: "Main Checking",
    balance: 5400.83,
    type: "checking",
    icon: "Building",
    transactions: 47,
    lastUpdated: "Today",
    institution: "Chase Bank",
    accountNumber: "****4567",
    color: "blue",
    recentActivity: [
      { amount: -82.45, description: "Grocery Store" },
      { amount: -35.2, description: "Gas Station" },
      { amount: 1250.0, description: "Direct Deposit" },
    ],
    isDefault: true,
  },
  {
    id: 1,
    name: "Main Checking",
    balance: 5400.83,
    type: "checking",
    icon: "Building",
    transactions: 47,
    lastUpdated: "Today",
    institution: "Chase Bank",
    accountNumber: "****4567",
    color: "blue",
    recentActivity: [
      { amount: -82.45, description: "Grocery Store" },
      { amount: -35.2, description: "Gas Station" },
      { amount: 1250.0, description: "Direct Deposit" },
    ],
    isDefault: true,
  },
  
];

export async function GET() {
  return NextResponse.json(accounts);
}

export async function POST(request: Request) {
  const newAccount = await request.json();
  accounts.push({ ...newAccount, id: accounts.length + 1 });

  return NextResponse.json(
    { message: "Account created successfully" },
    { status: 201 }
  );
}

export async function PUT(request: Request) {
  const updatedAccount = await request.json();
  const index = accounts.findIndex((a) => a.id === updatedAccount.id);

  if (index !== -1) {
    accounts[index] = {
      ...accounts[index],
      ...updatedAccount,
    };
    return NextResponse.json({ message: "Account uodated successfully" });
  }
  return NextResponse.json({ eror: "Account not found" }, { status: 403 });
}


export async function DELETE(request: Request) {
  const { id } = await request.json();
  const index = accounts.findIndex((a) => a.id === id);
  if (index !== -1) {
    accounts.splice(index, 1);
    return NextResponse.json({ message: 'Account deleted successfully' });
  }
  return NextResponse.json({ error: 'Account not found' }, { status: 404 });
}