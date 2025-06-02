import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { ArrowDownRight, ArrowUpRight, DollarSign } from "lucide-react";
import { formatCurrency } from "@/lib/accountUtils";

interface AccountSummaryCardsProps {
  totalAssets: number;
  totalLiabilities: number;
  netWorth: number;
}

function AccountSummaryCards({
  totalAssets,
  totalLiabilities,
  netWorth,
}: AccountSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card className="bg-white dark:bg-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Net Worth
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign
              className="h-5 w-5 text-blue-500 mr-2"
              aria-hidden="true"
            />
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">
              {formatCurrency(netWorth)}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Assets
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowUpRight
              className="h-5 w-5 text-emerald-500 mr-2"
              aria-hidden="true"
            />
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(totalAssets)}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Liabilities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowDownRight
              className="h-5 w-5 text-red-500 mr-2"
              aria-hidden="true"
            />
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(totalLiabilities)}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default AccountSummaryCards;
