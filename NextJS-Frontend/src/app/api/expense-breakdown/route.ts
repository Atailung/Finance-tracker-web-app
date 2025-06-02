import { NextResponse } from 'next/server';

export interface ExpenseData {
  name: string;
  value: number;
  color: string;
}

const expenseData: ExpenseData[] = [
  { name: 'Housing', value: 1200, color: 'hsl(var(--chart-1))' },
  { name: 'Food', value: 600, color: 'hsl(var(--chart-2))' },
  { name: 'Transportation', value: 400, color: 'hsl(var(--chart-3))' },
  { name: 'Entertainment', value: 300, color: 'hsl(var(--chart-4))' },
  { name: 'Other', value: 200, color: 'hsl(var(--chart-5))' },
];

export async function GET() {
  return NextResponse.json(expenseData);
}