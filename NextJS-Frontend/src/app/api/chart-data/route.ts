import { NextResponse } from "next/server";


export interface ChartData{
    name : string;
    income: number;
    expenses: number;
}


const monthlyData: ChartData[] =
[
  { name: 'Jan', income: 4000, expenses: 2400 },
  { name: 'Feb', income: 3000, expenses: 1398 },
  { name: 'Mar', income: 9800, expenses: 2000 },
  { name: 'Apr', income: 3908, expenses: 2780 },
  { name: 'May', income: 4800, expenses: 1890 },
  { name: 'Jun', income: 3800, expenses: 2390 },
  
];

const weeklyData: ChartData[] = [
  { name: 'Mon', income: 1200, expenses: 900 },
  { name: 'Tue', income: 1400, expenses: 1000 },
  { name: 'Wed', income: 1300, expenses: 1200 },
  { name: 'Thu', income: 1500, expenses: 800 },
  { name: 'Fri', income: 1800, expenses: 1100 },
  { name: 'Sat', income: 800, expenses: 600 },
  { name: 'Sun', income: 500, expenses: 400 },
];




export async function GET(){
    return NextResponse.json({monthly: monthlyData, weekly: weeklyData})
}