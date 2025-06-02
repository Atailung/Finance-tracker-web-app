import {
  Building,
  CreditCard,
  LineChart,
  PiggyBank,
  Wallet,
} from "lucide-react";

export interface Activity {
  amount: number;
  description: string;
}

export interface Account {
  id: number;
  name: string;
  balance: number;
  type: string;
  icon: string;
  transactions: number;
  lastUpdated: string;
  institution?: string;
  accountNumber?: string;
  color: string;
  recentActivity?: Activity[];
  isDefault: boolean;
  dueDate?: string;
  creditLimit?: number;
  performance?: string;
}



export interface FormErrors {
  [key: string]: string;
}

export const accountTypes = [
  {
    value: "checking",
    label: "Checking",
    icon: "Building",
    color: "bg-blue-500",
  },
  {
    value: "savings",
    label: "Savings",
    icon: "PiggyBank",
    color: "bg-green-500",
  },
  {
    value: "credit",
    label: "Credit Card",
    icon: "CreditCard",
    color: "bg-purple-500",
  },
  { value: "cash", label: "Cash", icon: "Wallet", color: "bg-amber-500" },
  {
    value: "investment",
    label: "Investment",
    icon: "LineChart",
    color: "bg-indigo-500",
  },
];

export const categoryIcons: Record<string, React.ElementType> = {
  Building,
  PiggyBank,
  CreditCard,
  Wallet,
  LineChart,
};

export const getIconComponent = (iconKey: string): React.ElementType => {
  return categoryIcons[iconKey] || Building;
};

export const getAccountTypeConfig = (type: string) => {
  return accountTypes.find((t) => t.value === type) || accountTypes[0];
};



export const formatCurrency = (amount: number ): string =>{
    return amount.toLocaleString("en-Us", {
        style: 'currency',
        currency : "NRP",
        minimumFractionDigits: 2,
        maximumFractionDigits: 2,
    })
}



export const validateAccountForm = (formData: Partial<Account>): FormErrors => {
  const errors: FormErrors = {};
  if (!formData.name?.trim()) {
    errors.name = 'Account name is required';
  }
  if (!formData.type) {
    errors.type = 'Account type is required';
  }
  if (formData.balance === undefined || formData.balance === null) {
    errors.balance = 'Balance is required';
  }
  if (formData.accountNumber && formData.accountNumber.length > 4) {
    errors.accountNumber = 'Please enter only the last 4 digits';
  }
  return errors;
};