import { Banknote, Building, CreditCard, PiggyBank, Tag, Wallet } from "lucide-react";

export const categoryIcons: Record<string, React.ReactNode> = {
  Food: <Tag className="h-4 w-4 text-orange-500" />,
  Income: <Banknote className="h-4 w-4 text-emerald-500" />,
  Utilities: <Wallet className="h-4 w-4 text-blue-500" />,
  Dining: <Wallet className="h-4 w-4 text-pink-500" />,
  Transportation: <Wallet className="h-4 w-4 text-indigo-500" />,
  Entertainment: <Wallet className="h-4 w-4 text-purple-500" />,
  Shopping: <Wallet className="h-4 w-4 text-cyan-500" />,
  Healthcare: <Wallet className="h-4 w-4 text-red-500" />,
  Housing: <Building className="h-4 w-4 text-gray-500" />,
  Education: <Wallet className="h-4 w-4 text-yellow-500" />,
  Other: <Wallet className="h-4 w-4 text-slate-500" />,
};


export const statusColors = {
  completed:
    'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-900/20 dark:text-emerald-400',
  pending: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/20 dark:text-amber-400',
  failed: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-900/20 dark:text-red-400',
};



export const accountIcons: Record<string, React.ReactNode> = {
  'Main Checking': <CreditCard className="h-4 w-4 text-blue-500" />,
  Savings: <PiggyBank className="h-4 w-4 text-emerald-500" />,
  'Credit Card': <CreditCard className="h-4 w-4 text-purple-500" />,
  Cash: <Wallet className="h-4 w-4 text-amber-500" />,
};