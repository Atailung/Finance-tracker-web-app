import { NextResponse } from "next/server";
import {
  PAYMENT_METHODS,
  STATUS_OPTIONS,
  CATEGORIES,
} from "@/app/constant/receipts";
export interface ReceiptType {
  id: number;
  merchant: string;
  date: string; // Changed to string for JSON serialization
  amount: number;
  category: string;
  status: "processed" | "pending" | "rejected";
  paymentMethod: string;
  taxAmount: number;
  confidence: number;
  imageUrl?: string;
  notes?: string;
  tags?: string[];
}

const receipts: ReceiptType[] = [
  {
    id: 1,
    merchant: "Whole Foods Market",
    date: new Date("2025-04-12").toISOString(),
    amount: 124.85,
    category: "Groceries",
    status: "processed",
    paymentMethod: "Credit Card",
    taxAmount: 10.39,
    confidence: 98,
    tags: ["food", "organic"],
    notes: "Weekly grocery shopping",
  },
  {
    id: 2,
    merchant: "Best Buy Electronics",
    date: new Date("2025-04-10").toISOString(),
    amount: 599.99,
    category: "Electronics",
    status: "processed",
    paymentMethod: "Debit Card",
    taxAmount: 48.0,
    confidence: 95,
    tags: ["tech", "home office"],
  },
  {
    id: 3,
    merchant: "Shell Gas Station",
    date: new Date("2025-04-08").toISOString(),
    amount: 45.23,
    category: "Transportation",
    status: "processed",
    paymentMethod: "Credit Card",
    taxAmount: 3.62,
    confidence: 92,
    tags: ["car", "travel"],
  },
  {
    id: 4,
    merchant: "The Italian Corner",
    date: new Date("2025-04-07").toISOString(),
    amount: 67.29,
    category: "Dining",
    status: "pending",
    paymentMethod: "Cash",
    taxAmount: 5.38,
    confidence: 87,
    tags: ["food", "entertainment"],
  },
  {
    id: 5,
    merchant: "CVS Pharmacy",
    date: new Date("2025-04-05").toISOString(),
    amount: 32.15,
    category: "Healthcare",
    status: "pending",
    paymentMethod: "Credit Card",
    taxAmount: 2.57,
    confidence: 94,
    tags: ["health", "personal"],
  },
  {
    id: 6,
    merchant: "Amazon",
    date: new Date("2025-04-03").toISOString(),
    amount: 89.97,
    category: "Shopping",
    status: "processed",
    paymentMethod: "Credit Card",
    taxAmount: 7.2,
    confidence: 99,
    tags: ["online", "household"],
  },
  {
    id: 7,
    merchant: "Starbucks",
    date: new Date("2025-04-02").toISOString(),
    amount: 12.45,
    category: "Dining",
    status: "processed",
    paymentMethod: "Mobile Payment",
    taxAmount: 0.99,
    confidence: 96,
    tags: ["coffee", "food"],
  },
  {
    id: 8,
    merchant: "Uber",
    date: new Date("2025-04-01").toISOString(),
    amount: 24.5,
    category: "Transportation",
    status: "rejected",
    paymentMethod: "Credit Card",
    taxAmount: 1.96,
    confidence: 85,
    tags: ["travel", "business"],
  },
];

export async function GET() {
  return NextResponse.json({
    receipts,
    categories: CATEGORIES,
    paymentMethods: PAYMENT_METHODS,
    statusOptions: STATUS_OPTIONS,
  });
}
