export interface Stat {
  title: string;
  value: string;
  description: string;
  change: number;
  icon: string;
}

export async function fetchStats(): Promise<Stat[]> {
  try {
    const response = await fetch('/api/stats');
    if (!response.ok) {
      throw new Error('Failed to fetch stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching stats:', error);
    return [];
  }
}