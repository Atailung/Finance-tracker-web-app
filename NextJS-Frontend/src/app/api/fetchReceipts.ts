import { PAYMENT_METHODS, STATUS_OPTIONS } from "@/app/constant/receipts";

export interface ReceiptType {
  id: number;
  merchant: string;
  date: string;
  amount: number;
  category: string;
  status: "processed" | "pending" | "failed";
  paymentMethod: string;
  taxAmount: number;
  confidence: number;
  imageUrl?: string;
  notes?: string;
  tags?: string;
  
}

export interface ReceiptData {
  receipts: ReceiptType[];
  categories: string[];
  paymentMethods: typeof PAYMENT_METHODS;
  statusOptions: typeof STATUS_OPTIONS;
}

export async function fetchReceipts(): Promise<ReceiptData> {
  try {
    const response = await fetch("/api/receipts");
    if (!response.ok) {
      throw new Error("Failed to fetch receipts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching receipts:", error);
    return {
      receipts: [],
      categories: [],
      paymentMethods: PAYMENT_METHODS,
      statusOptions: STATUS_OPTIONS,
    };
  }
}
