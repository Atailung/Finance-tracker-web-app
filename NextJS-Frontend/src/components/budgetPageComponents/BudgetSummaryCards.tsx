"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { AlertTriangle, CheckCircle, DollarSign, Wallet } from "lucide-react";

interface BudgetSummaryCardsProps {
  totalBudget: number;
  totalSpent: number;
  onTrackCount: number;
  overBudgetCount: number;
}

function BudgetSummaryCards({
  totalBudget,
  totalSpent,
  onTrackCount,
  overBudgetCount,
}: BudgetSummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="bg-white dark:bg-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <Wallet className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-2xl font-bold text-green-600 dark:text-blue-400">
              $
              {totalBudget.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Total Spent
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <DollarSign className="h-5 w-5 text-slate-500 mr-2" />
            <span className="text-2xl font-bold text-slate-900 dark:text-slate-100">
              $
              {totalSpent.toLocaleString("en-US", {
                minimumFractionDigits: 0,
                maximumFractionDigits: 0,
              })}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            On Track
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <CheckCircle className="h-5 w-5 text-emerald-500 mr-2" />
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {onTrackCount}
            </span>
          </div>
        </CardContent>
      </Card>
      <Card className="bg-white dark:bg-slate-800 shadow-sm">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-slate-500 dark:text-slate-400">
            Over Budget
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {overBudgetCount}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default BudgetSummaryCards;
