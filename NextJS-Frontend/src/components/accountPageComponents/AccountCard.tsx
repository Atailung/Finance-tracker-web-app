'use client';


import { ArrowUpRight, ArrowDownRight, MoreHorizontal, Eye, Edit, Trash2, Clock, TrendingUp, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Account, getIconComponent, getAccountTypeConfig, formatCurrency } from '@/lib/accountUtils';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Progress } from '../ui/progress';

interface AccountCardProps {
  account: Account;
  onViewDetails: (id: number) => void;
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

export default function AccountCard({ account, onViewDetails, onEdit, onDelete }: AccountCardProps) {
  const typeConfig = getAccountTypeConfig(account.type);
  const Icon = getIconComponent(account.icon);
  const isNegative = account.balance < 0;
  const isCreditCard = account.type === 'credit';
  const creditUtilization = isCreditCard && account.creditLimit ? (Math.abs(account.balance) / account.creditLimit) * 100 : 0;

  return (
    <Card
      className={cn(
        'overflow-hidden transition-all duration-200 hover:shadow-md cursor-pointer border-2',
        account.isDefault ? 'border-blue-200 dark:border-blue-900' : 'border-transparent',
        'dark:bg-slate-800'
      )}
      onClick={() => onViewDetails(account.id)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onViewDetails(account.id);
        }
      }}
      aria-label={`View details for ${account.name} account`}
    >
      <CardHeader className="p-4 pb-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`rounded-lg p-2 ${typeConfig.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
              <Icon className={`h-5 w-5 ${typeConfig.color.replace('bg-', 'text-')}`} aria-hidden="true" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <CardTitle className="text-base">{account.name}</CardTitle>
                {account.isDefault && (
                  <Badge
                    variant="outline"
                    className="text-xs bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
                  >
                    Default
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-1">
                <CardDescription className="text-xs capitalize">{typeConfig.label}</CardDescription>
                {account.institution && (
                  <>
                    <span className="text-xs text-slate-400">•</span>
                    <CardDescription className="text-xs">{account.institution}</CardDescription>
                  </>
                )}
              </div>
            </div>
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={(e) => e.stopPropagation()}
                aria-label={`Options for ${account.name}`}
              >
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onViewDetails(account.id);
                }}
              >
                <Eye className="mr-2 h-4 w-4" />
                View Details
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit(account.id);
                }}
              >
                <Edit className="mr-2 h-4 w-4" />
                Edit Account
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(account.id);
                }}
                className="text-red-600 dark:text-red-400"
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <div className="flex items-center gap-1 mb-2">
          {isNegative ? (
            <ArrowDownRight className="h-4 w-4 text-red-500" aria-hidden="true" />
          ) : (
            <ArrowUpRight className="h-4 w-4 text-emerald-500" aria-hidden="true" />
          )}
          <div
            className={cn(
              'text-2xl font-bold',
              isNegative ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'
            )}
          >
            {formatCurrency(Math.abs(account.balance))}
          </div>
        </div>
        {isCreditCard && account.creditLimit && (
          <div className="mb-2">
            <div className="flex justify-between items-center text-xs mb-1">
              <span className="text-slate-500 dark:text-slate-400">Credit Utilization</span>
              <span
                className={cn(
                  'font-medium',
                  creditUtilization > 80 ? 'text-red-600' : creditUtilization > 30 ? 'text-amber-600' : 'text-emerald-600'
                )}
              >
                {Math.round(creditUtilization)}%
              </span>
            </div>
            <Progress
              value={creditUtilization}
              className="h-1"
              aria-label={`Credit utilization: ${Math.round(creditUtilization)}%`}
            />
          </div>
        )}
        {account.accountNumber && (
          <div className="text-xs text-slate-500 dark:text-slate-400 mb-2">Account: {account.accountNumber}</div>
        )}
        {isCreditCard && account.dueDate && (
          <div className="text-xs flex items-center gap-1 mb-2">
            <Clock className="h-3 w-3 text-amber-500" aria-hidden="true" />
            <span className="text-amber-600 dark:text-amber-400">Payment due {account.dueDate}</span>
          </div>
        )}
        {account.type === 'investment' && account.performance && (
          <div className="text-xs flex items-center gap-1 mb-2">
            <TrendingUp className="h-3 w-3 text-emerald-500" aria-hidden="true" />
            <span className="text-emerald-600 dark:text-emerald-400">{account.performance} this month</span>
          </div>
        )}
        <div className="text-xs text-slate-500 dark:text-slate-400 flex justify-between">
          <span className="flex items-center gap-1">
            <RefreshCw className="h-3 w-3" aria-hidden="true" />
            Updated {account.lastUpdated}
          </span>
          <span>{account.transactions} transactions</span>
        </div>
      </CardContent>
      <CardFooter className="border-t bg-slate-50 dark:bg-slate-800/50 p-3">
        <div className="flex justify-between w-full">
          <Button
            variant="ghost"
            size="sm"
            className="text-blue-600 dark:text-blue-400"
            onClick={(e) => {
              e.stopPropagation();
              onViewDetails(account.id);
            }}
          >
            View Transactions
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={(e) => {
              e.stopPropagation();
              onEdit(account.id);
            }}
          >
            Edit
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}