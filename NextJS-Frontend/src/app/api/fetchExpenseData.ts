export interface ExpenseData{
    name : string;
    value : string;
    color : string;
}

export async function fetchExpenseData(): Promise<ExpenseData[]>{
    try {
       const response = await fetch('/api/expense-breakdown') ;
       if(!response.ok){
        throw new Error("Failed ro fetch expense data")
       }
       return await response.json();
    } catch (error) {
       console.error("Error fetching expense data :", error) 
       return [];
    }
}