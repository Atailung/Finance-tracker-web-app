import { NextResponse } from 'next/server';

export interface Transaction {
  id: number;
  date: string; // Changed to string for JSON serialization
  description: string;
  category: string;
  amount: number;
  account: string;
  status: 'completed' | 'pending' | 'failed';
  merchant?: string;
  notes?: string;
  tags?: string[];
  receiptId?: string;
  paymentMethod?: string;
  name?: string;
}

const transactions: Transaction[] = [
  {
    id: 1,
    name: "Resturent ",
    date: new Date('2025-04-15').toISOString(),
    description: 'Whole Foods Market',
    merchant: 'Whole Foods Market',
    category: 'Food',
    amount: -124.85,
    account: 'Main Checking',
    status: 'completed',
    paymentMethod: 'Credit Card',
    tags: ['groceries', 'organic'],
    notes: 'Weekly grocery shopping',
  },
  {
    id: 2,
    name: "store",
    date: new Date('2025-04-10').toISOString(),
    description: 'Monthly Salary',
    category: 'Income',
    amount: 3500.0,
    account: 'Main Checking',
    status: 'completed',
    paymentMethod: 'Direct Deposit',
    tags: ['salary', 'work'],
  },
  {
    id: 3,
    name:"food",
    date: new Date('2025-04-08').toISOString(),
    description: 'Electric Bill',
    merchant: 'Pacific Gas & Electric',
    category: 'Utilities',
    amount: -95.4,
    account: 'Main Checking',
    status: 'completed',
    paymentMethod: 'Auto Pay',
    tags: ['utilities', 'monthly'],
  },
  {
    id: 4,
    name:"medicine",
    date: new Date('2025-04-07').toISOString(),
    description: 'The Italian Corner',
    merchant: 'The Italian Corner',
    category: 'Dining',
    amount: -67.29,
    account: 'Credit Card',
    status: 'pending',
    paymentMethod: 'Credit Card',
    tags: ['dining', 'entertainment'],
  },
  {
    id: 5,
    name: "payment",
    date: new Date('2025-04-05').toISOString(),
    description: 'Freelance Project',
    category: 'Income',
    amount: 250.0,
    account: 'Main Checking',
    status: 'completed',
    paymentMethod: 'Bank Transfer',
    tags: ['freelance', 'side income'],
  },
  {
    id: 6,
    name: "Electric bill",
    date: new Date('2025-04-03').toISOString(),
    description: 'Verizon Wireless',
    merchant: 'Verizon Wireless',
    category: 'Utilities',
    amount: -89.99,
    account: 'Credit Card',
    status: 'completed',
    paymentMethod: 'Credit Card',
    tags: ['phone', 'monthly'],
  },
  {
    id: 7,
    name:"water bill",
    date: new Date('2025-04-02').toISOString(),
    description: 'Shell Gas Station',
    merchant: 'Shell',
    category: 'Transportation',
    amount: -45.23,
    account: 'Credit Card',
    status: 'completed',
    paymentMethod: 'Credit Card',
    tags: ['gas', 'car'],
  },
  {
    id: 8,
    name: "waste Bill",
    date: new Date('2025-04-01').toISOString(),
    description: 'AMC Theaters',
    merchant: 'AMC Theaters',
    category: 'Entertainment',
    amount: -32.5,
    account: 'Credit Card',
    status: 'failed',
    paymentMethod: 'Credit Card',
    tags: ['movies', 'entertainment'],
  },
  {
    id: 9,
    name:'transporations',
    date: new Date('2025-03-30').toISOString(),
    description: 'Amazon Purchase',
    merchant: 'Amazon',
    category: 'Shopping',
    amount: -156.78,
    account: 'Credit Card',
    status: 'completed',
    paymentMethod: 'Credit Card',
    tags: ['online', 'household'],
  },
  {
    id: 10,
    name: "parking",
    date: new Date('2025-03-28').toISOString(),
    description: 'Starbucks',
    merchant: 'Starbucks',
    category: 'Dining',
    amount: -12.45,
    account: 'Credit Card',
    status: 'completed',
    paymentMethod: 'Mobile Payment',
    tags: ['coffee', 'morning'],
  },
];

export async function GET() {
  return NextResponse.json(transactions);
}