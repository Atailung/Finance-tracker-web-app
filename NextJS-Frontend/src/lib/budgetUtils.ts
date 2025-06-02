import {
  Home,
  Utensils,
  Car,
  Gamepad2,
  ShoppingBag,
  Zap,
  Heart,
  Sparkles,
} from 'lucide-react';

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

export interface EditFormData {
  name: string;
  amount: string;
  period: string;
  icon: string;
  description: string;
}

export interface EditFormErrors {
  name?: string;
  amount?: string;
  period?: string;
  general?: string;
}

export const categoryIcons: Record<string, React.ElementType> = {
  housing: Home,
  food: Utensils,
  transportation: Car,
  entertainment: Gamepad2,
  shopping: ShoppingBag,
  utilities: Zap,
  healthcare: Heart,
  personal: Sparkles,
};

export const getIconComponent = (iconKey: string): React.ElementType => {
  return categoryIcons[iconKey] || Home;
};

export const getIconColor = (iconKey: string): string => {
  const colorMap: Record<string, string> = {
    housing: 'bg-blue-500',
    food: 'bg-emerald-500',
    transportation: 'bg-red-500',
    entertainment: 'bg-purple-500',
    shopping: 'bg-amber-500',
    utilities: 'bg-indigo-500',
    healthcare: 'bg-pink-500',
    personal: 'bg-teal-500',
  };
  return colorMap[iconKey] || 'bg-blue-500';
};

export const getBudgetStatus = (current: number, max: number) => {
  const percentage = (current / max) * 100;
  if (current > max) return { status: 'over', color: 'text-red-600', bgColor: 'bg-red-50 border-red-200' };
  if (percentage > 80) return { status: 'warning', color: 'text-amber-600', bgColor: 'bg-amber-50 border-amber-200' };
  return { status: 'good', color: 'text-emerald-600', bgColor: 'bg-emerald-50 border-emerald-200' };
};

export const validateEditForm = (formData: EditFormData, budgets: Budget[], editingBudgetId: number | null): EditFormErrors => {
  const errors: EditFormErrors = {};

  // Validate name
  if (!formData.name.trim()) {
    errors.name = 'Category name is required';
  } else if (formData.name.trim().length < 2) {
    errors.name = 'Category name must be at least 2 characters';
  } else if (formData.name.trim().length > 50) {
    errors.name = 'Category name must be less than 50 characters';
  }

  // Check for duplicate names (excluding current budget)
  const existingBudget = budgets.find(
    (budget) => budget.name.toLowerCase() === formData.name.trim().toLowerCase() && budget.id !== editingBudgetId
  );
  if (existingBudget) {
    errors.name = 'A budget with this name already exists';
  }

  // Validate amount
  const amount = Number.parseFloat(formData.amount);
  if (!formData.amount.trim()) {
    errors.amount = 'Budget amount is required';
  } else if (isNaN(amount)) {
    errors.amount = 'Please enter a valid number';
  } else if (amount <= 0) {
    errors.amount = 'Budget amount must be greater than 0';
  } else if (amount > 1000000) {
    errors.amount = 'Budget amount must be less than $1,000,000';
  }

  // Validate period
  if (!formData.period) {
    errors.period = 'Budget period is required';
  }

  return errors;
};