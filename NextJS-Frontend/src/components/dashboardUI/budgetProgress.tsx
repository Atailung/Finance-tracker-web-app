'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { fetchBudgets, Budget } from '@/app/api/fetchBudgets';

export function BudgetProgress() {
  const [budgets, setBudgets] = useState<Budget[]>([]);

  useEffect(() => {
    async function loadBudgets() {
      const budgetData = await fetchBudgets();
      setBudgets(budgetData);
    }
    loadBudgets();
  }, []);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Budget Progress</CardTitle>
        <CardDescription>Track your spending against monthly budgets</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        {budgets.map((budget) => {
          const percentage = Math.min(Math.round((budget.current / budget.max) * 100), 100);
          const isOverBudget = budget.current > budget.max;

          return (
            <div key={budget.id} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-sm font-medium leading-none">
                    {budget.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    ${budget.current.toLocaleString()} of ${budget.max.toLocaleString()}
                  </p>
                </div>
                <p className={`text-sm font-medium ${isOverBudget ? 'text-destructive' : ''}`}>
                  {percentage}%
                </p>
              </div>
              <Progress
                value={percentage}
                className={`h-2 ${isOverBudget ? 'bg-muted' : ''} ${isOverBudget ? 'progress-over-budget' : ''}`}
              />
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}