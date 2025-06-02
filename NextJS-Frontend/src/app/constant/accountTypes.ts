import { CreditCard, PiggyBank } from "lucide-react";

export const accountTypes = [
  {
    value: "CURRENT",
    label: "Current Account",
    description: "For everyday transactions",
    icon: CreditCard,
  },
  {
    value: "SAVINGS",
    label: "Savings Account",
    description: "For saving money",
    icon: PiggyBank,
  },
] as const;