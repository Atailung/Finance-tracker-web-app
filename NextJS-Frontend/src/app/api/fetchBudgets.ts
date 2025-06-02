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

export async function fetchBudgets(): Promise<Budget[]> {
  try {
    const response = await fetch("/api/budgets");
    if (!response.ok) {
      throw new Error(" failed to fetching budgets data");
    }
    return await response.json();
  } catch (error) {
    console.error("Error to fetch Budget Data :", error);
    return [];
  }
}

export async function createBudget(
  Budget: Omit<Budget, "id" | "lastUpdated">
): Promise<void> {
  try {
    const response = await fetch("/api/budgets", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(Budget),
    });
    if (!response.ok) {
      throw new Error("Failed to create budget");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}

export async function updateBudget(budget: Budget): Promise<void> {
  try {
    const response = await fetch('/api/budgets', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(budget),
    });
    if (!response.ok) {
      throw new Error('Failed to update budget');
    }
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : 'An unexpected error occurred');
  }
}

export async function deleteBudget(id: number): Promise<void> {
  try {
    const response = await fetch("/api/budgets", {
      method: "DELETE",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id }),
    });
    if (!response.ok) {
      throw new Error("Failed to delete budget");
    }
  } catch (error) {
    throw new Error(
      error instanceof Error ? error.message : "An unexpected error occurred"
    );
  }
}
