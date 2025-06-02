export interface Transaction {
  id: number;
  name: string;
  amount: number;
  date: string;
  category: string;
  iconSrc: string;
  description: string;
  account: string;
  status: 'completed' | 'pending' | 'Failed';
  merchant?: string;
  notes?: string;
  tags?: string[];
  receiptId? : string;
  paymentMethod?: string;
}

export async function fetchTransactions(): Promise<Transaction[]> {
  try {
    const response = await fetch("/api/transactions");
    if (!response.ok) {
      throw new Error("failed to fetch transcations");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}
