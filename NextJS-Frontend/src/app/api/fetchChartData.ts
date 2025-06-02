export interface ChartData {
  name: string;
  income: number;
  expenses: number;
}

export async function fetchChartData(): Promise<{
  monthly: ChartData[];
  weekly: ChartData[];
}> {
  try {
    const response = await fetch("/api/chart-data");
    if (!response.ok) {
      throw new Error("failed to fetch chart data");
    }
    return await response.json();
  } catch (error) {
    console.error("error fetching chart data :", error);
    return { monthly: [], weekly: [] };
  }
}
