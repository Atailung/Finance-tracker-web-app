'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { formatCurrency } from '@/lib/accountUtils';

interface Stats {
  totalIncome: number;
  totalExpenses: number;
  netAmount: number;
  totalTransactions: number;
}

interface SummaryCardsProps {
  stats: Stats;
}

export function SummaryCards({ stats }: SummaryCardsProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card className="border-0 shadow-md bg-gradient-to-br from-emerald-50 to-emerald-100/50 border-emerald-200 dark:from-emerald-950/20 dark:to-emerald-900/10 dark:border-emerald-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-emerald-600 dark:text-emerald-400">Total Income</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowUpRight className="h-5 w-5 text-emerald-500 mr-2" />
            <span className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">
              {formatCurrency(stats.totalIncome)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-br from-red-50 to-red-100/50 border-red-200 dark:from-red-950/20 dark:to-red-900/10 dark:border-red-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-red-600 dark:text-red-400">Total Expenses</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <ArrowDownRight className="h-5 w-5 text-red-500 mr-2" />
            <span className="text-2xl font-bold text-red-600 dark:text-red-400">
              {formatCurrency(stats.totalExpenses)}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-br from-blue-50 to-blue-100/50 border-blue-200 dark:from-blue-950/20 dark:to-blue-900/10 dark:border-blue-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-blue-600 dark:text-blue-400">Net Amount</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            {stats.netAmount >= 0 ? (
              <ArrowUpRight className="h-5 w-5 text-emerald-500 mr-2" />
            ) : (
              <ArrowDownRight className="h-5 w-5 text-red-500 mr-2" />
            )}
            <span
              className={cn(
                'text-2xl font-bold',
                stats.netAmount >= 0 ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-600 dark:text-red-400',
              )}
            >
              {formatCurrency(Math.abs(stats.netAmount))}
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="border-0 shadow-md bg-gradient-to-br from-purple-50 to-purple-100/50 border-purple-200 dark:from-purple-950/20 dark:to-purple-900/10 dark:border-purple-800/30">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm font-medium text-purple-600 dark:text-purple-400">
            Total Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center">
            <TrendingUp className="h-5 w-5 text-purple-500 mr-2" />
            <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{stats.totalTransactions}</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}