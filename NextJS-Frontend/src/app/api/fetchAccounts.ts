export interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
  icon: string;
  transactions: number;
  lastUpdated: string;
  institution: string;
  accountNumber: string;
  color: string;
  recentActivity: { amount: number; description: string }[];
  isDefault: boolean;
  dueDate?: string;
  creditLimit?: number;
  performance?: string;
}

export async function fetchAccounts(): Promise<Account[]> {
  try {
    const response = await fetch("/api/accounts");
    if (!response.ok) {
      throw new Error("Failed to fetch accouts");
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching accounts:", error);
    return [];
  }
}

export async function createAccount(
  account: Omit<Account, "id">
): Promise<Account> {
  try {
    const response = await fetch("/api/accounts/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(account),
    });
    if (!response.ok) {
      throw new Error("Failed to create account ");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred  :"
    );
  }
}


export async function updateAccount(
  account: Account
): Promise<void> {
  try {
    const response = await fetch(`/api/accounts/${account.id}`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(account),
    });
    if (!response.ok) {
      throw new Error("Failed to update account ");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred  :"
    );
  }
}

export async function deleteAccount(
  id: number
): Promise<void> {
  try {
    const response = await fetch(`/api/accounts/${id}`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
      
    });
    if (!response.ok) {
      throw new Error("Failed to delete account ");
    }
    return await response.json();
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred  :"
    );
  }
}
