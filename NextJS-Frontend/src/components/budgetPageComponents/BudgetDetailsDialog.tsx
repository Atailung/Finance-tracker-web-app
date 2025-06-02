'use client';

import { Edit,  TrendingUp, TrendingDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Budget, getBudgetStatus, getIconComponent } from '@/lib/budgetUtils';
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '@heroui/button';

interface BudgetDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedBudgetId: number | null;
  budgets: Budget[];
  handleEditBudget: (id: number) => void;
}

export default function BudgetDetailsDialog({ open, setOpen, selectedBudgetId, budgets, handleEditBudget }: BudgetDetailsDialogProps) {
  const budget = budgets.find((b) => b.id === selectedBudgetId);
  if (!budget) return null;

  const percentage = Math.min(Math.round((budget.current / budget.max) * 100), 100);
  const status = getBudgetStatus(budget.current, budget.max);
  const Icon = getIconComponent(budget.icon);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Budget Details</DialogTitle>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={cn('p-4 rounded-xl', budget.color.replace('bg-', 'bg-opacity-10 bg-'))}>
                <Icon className={cn('h-8 w-8', budget.color.replace('bg-', 'text-'))} />
              </div>
              <div>
                <h3 className="text-2xl font-bold">{budget.name}</h3>
                <Badge
                  variant="outline"
                  className={cn(
                    'mt-1',
                    status.status === 'over'
                      ? 'border-red-200 text-red-700 bg-red-50 dark:bg-red-950 dark:border-red-800 dark:text-red-400'
                      : status.status === 'warning'
                      ? 'border-amber-200 text-amber-700 bg-amber-50 dark:bg-amber-950 dark:border-amber-800 dark:text-amber-400'
                      : 'border-emerald-200 text-emerald-700 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400'
                  )}
                >
                  {status.status === 'over' ? 'Over Budget' : status.status === 'warning' ? 'Near Limit' : 'On Track'}
                </Badge>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Current Spending</p>
                    <p className="text-2xl font-bold">
                      ${budget.current.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="pt-4">
                  <div className="text-center">
                    <p className="text-sm text-slate-500 dark:text-slate-400">Budget Limit</p>
                    <p className="text-2xl font-bold">
                      ${budget.max.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Budget Progress</span>
                <span className={cn('text-sm font-medium', status.color)}>{percentage}%</span>
              </div>
              <Progress
                value={percentage}
                className={cn('h-3', budget.current > budget.max ? 'bg-red-500' : percentage > 80 ? 'bg-amber-500' : 'bg-emerald-500')}
              />
              <div className="text-sm text-slate-500 dark:text-slate-400">
                {budget.current > budget.max ? (
                  <span className="text-red-600 dark:text-red-400">
                    Over budget by ${(budget.current - budget.max).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                ) : (
                  <span>
                    ${(budget.max - budget.current).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} remaining this {budget.period.replace('ly', '')}
                  </span>
                )}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-slate-500 dark:text-slate-400">Period:</span>
                <span className="ml-2 font-medium capitalize">{budget.period}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Category:</span>
                <span className="ml-2 font-medium capitalize">{budget.category}</span>
              </div>
              <div>
                <span className="text-slate-500 dark:text-slate-400">Last Updated:</span>
                <span className="ml-2 font-medium">{budget.lastUpdated}</span>
              </div>
              <div className="flex items-center">
                <span className="text-slate-500 dark:text-slate-400">Trend:</span>
                <div className="ml-2 flex items-center">
                  {budget.trend === 'increasing' ? (
                    <TrendingUp className="h-4 w-4 mr-1 text-red-500" />
                  ) : budget.trend === 'decreasing' ? (
                    <TrendingDown className="h-4 w-4 mr-1 text-emerald-500" />
                  ) : (
                    <div className="h-4 w-4 mr-1 rounded-full bg-slate-300" />
                  )}
                  <span className="font-medium capitalize">{budget.trend}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="bordered" onClick={() => setOpen(false)} className="flex-1 text-md  w-full dark:text-white font-semibold py-3 rounded-lg disabled:opacity-50 text-md">Close</Button>
          <Button
            color='primary'
            size='md'
            className="flex-1 text-md  w-full text-white font-semibold py-3 rounded-lg hover:bg-lime-950 focus:ring-2 focus:ring-lime-950 transition-all disabled:opacity-50 text-md"
            onClick={() => {
              setOpen(false);
              if (selectedBudgetId) handleEditBudget(selectedBudgetId);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Budget
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}