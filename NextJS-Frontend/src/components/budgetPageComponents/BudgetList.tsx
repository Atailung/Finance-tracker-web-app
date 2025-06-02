'use client';


import { MoreHorizontal, Eye, Edit, Trash2, AlertTriangle, CheckCircle, Calendar, TrendingUp, TrendingDown, Search } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Budget, getBudgetStatus, getIconComponent } from '@/lib/budgetUtils';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';
import toast from 'react-hot-toast';
import { deleteBudget } from '@/app/api/fetchBudgets';

interface BudgetListProps {
  budgets: Budget[];
  handleViewDetails: (id: number) => void;
  handleEditBudget: (id: number) => void;
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

export default function BudgetList({ budgets, handleViewDetails, handleEditBudget, setBudgets }: BudgetListProps) {
  const handleDeleteBudget = async (id: number) => {
    try {
      await deleteBudget(id);
      setBudgets((prevBudgets) => prevBudgets.filter((budget) => budget.id !== id));
      toast.success(`Budget deleted successfully!`, {
        duration: 4000,
        style: { borderRadius: '10px', background: '#10b981', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#10b981' },
      });
    } catch (error) {
      console.error('Failed to delete budget:', error);
      toast.error('Failed to delete budget. Please try again.', {
        duration: 5000,
        style: { borderRadius: '10px', background: '#ef4444', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#ef4444' },
      });
    }
  };

  return (
    <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {budgets.map((budget) => {
        const percentage = Math.min(Math.round((budget.current / budget.max) * 100), 100);
        const isOverBudget = budget.current > budget.max;
        const status = getBudgetStatus(budget.current, budget.max);
        const Icon = getIconComponent(budget.icon);

        return (
          <Card
            key={budget.id}
            className={cn('transition-all duration-200 hover:shadow-md cursor-pointer border-2', status.bgColor, 'dark:bg-slate-800 dark:border-slate-700')}
            onClick={() => handleViewDetails(budget.id)}
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-2">
                  <div className={cn('p-2 rounded-lg', budget.color.replace('bg-', 'bg-opacity-10 bg-'))}>
                    <Icon className={cn('h-5 w-5', budget.color.replace('bg-', 'text-'))} />
                  </div>
                  <div>
                    <CardTitle className="text-base">{budget.name}</CardTitle>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        variant="outline"
                        className={cn(
                          'text-xs',
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
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={(e) => e.stopPropagation()}>
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleViewDetails(budget.id); }}>
                      <Eye className="mr-2 h-4 w-4" /> View Details
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEditBudget(budget.id); }}>
                      <Edit className="mr-2 h-4 w-4" /> Edit Budget
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={(e) => { e.stopPropagation(); handleDeleteBudget(budget.id); }}
                      className="text-red-600 dark:text-red-400"
                    >
                      <Trash2 className="mr-2 h-4 w-4" /> Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-sm text-slate-600 dark:text-slate-400">Progress</span>
                  <span className={cn('text-sm font-medium', status.color)}>{percentage}%</span>
                </div>
                <Progress
                  value={percentage}
                  className={cn('h-2', isOverBudget ? 'bg-red-500' : percentage > 80 ? 'bg-amber-500' : 'bg-emerald-500')}
                />
                <div className="flex justify-between items-center text-sm">
                  <span className="font-medium">
                    ${budget.current.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-slate-500 dark:text-slate-400">
                    of ${budget.max.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-400">
                  {isOverBudget ? (
                    <span className="text-red-600 dark:text-red-400 flex items-center">
                      <AlertTriangle className="h-3 w-3 mr-1" />
                      Over by ${(budget.current - budget.max).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                    </span>
                  ) : (
                    <span className="flex items-center">
                      <CheckCircle className="h-3 w-3 mr-1 text-emerald-500" />
                      ${(budget.max - budget.current).toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 })} remaining
                    </span>
                  )}
                </div>
              </div>
            </CardContent>
            <CardFooter className="pt-0">
              <div className="flex items-center justify-between w-full text-xs text-slate-500 dark:text-slate-400">
                <div className="flex items-center">
                  <Calendar className="h-3 w-3 mr-1" />
                  {budget.period}
                </div>
                <div className="flex items-center">
                  {budget.trend === 'increasing' ? (
                    <TrendingUp className="h-3 w-3 mr-1 text-red-500" />
                  ) : budget.trend === 'decreasing' ? (
                    <TrendingDown className="h-3 w-3 mr-1 text-emerald-500" />
                  ) : (
                    <div className="h-3 w-3 mr-1 rounded-full bg-slate-300" />
                  )}
                  {budget.lastUpdated}
                </div>
              </div>
            </CardFooter>
          </Card>
        );
      })}
      {budgets.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
          <Search className="h-12 w-12 mb-4 opacity-30" />
          <h3 className="text-lg font-medium mb-2">No budgets found</h3>
          <p className="text-sm text-center">Try adjusting your search or filters</p>
        </div>
      )}
    </div>
  );
}