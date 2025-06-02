'use client';


import { ArrowUpRight, ArrowDownRight, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Account, getIconComponent, getAccountTypeConfig, formatCurrency } from '@/lib/accountUtils';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Badge } from '../ui/badge';
import { Card, CardContent } from '../ui/card';
import { Progress } from '../ui/progress';
import { Button } from '../ui/button';


interface AccountDetailsDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  selectedAccount: Account | null;
  handleEditAccount: (id: number) => void;
}

export default function AccountDetailsDialog({ open, setOpen, selectedAccount, handleEditAccount }: AccountDetailsDialogProps) {
  if (!selectedAccount) return null;

  const typeConfig = getAccountTypeConfig(selectedAccount.type);
  const Icon = getIconComponent(selectedAccount.icon);
  const isNegative = selectedAccount.balance < 0;
  const isCreditCard = selectedAccount.type === 'credit';
  const creditUtilization = isCreditCard && selectedAccount.creditLimit ? (Math.abs(selectedAccount.balance) / selectedAccount.creditLimit) * 100 : 0;

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[600px]" aria-describedby="account-details-description">
        <DialogHeader>
          <DialogTitle className="text-xl">Account Details</DialogTitle>
          <DialogDescription id="account-details-description">
            View detailed information about your account
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="space-y-6">
            <div className="flex items-center gap-4">
              <div className={`p-4 rounded-xl ${typeConfig.color.replace('bg-', 'bg-opacity-10 bg-')}`}>
                <Icon className={`h-8 w-8 ${typeConfig.color.replace('bg-', 'text-')}`} aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-2xl font-bold">{selectedAccount.name}</h3>
                  {selectedAccount.isDefault && (
                    <Badge
                      variant="outline"
                      className="bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-800"
                    >
                      Default
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400">
                  <span className="capitalize">{typeConfig.label}</span>
                  {selectedAccount.institution && (
                    <>
                      <span>•</span>
                      <span>{selectedAccount.institution}</span>
                    </>
                  )}
                </div>
              </div>
            </div>
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center gap-2 mb-2">
                  {isNegative ? (
                    <ArrowDownRight className="h-6 w-6 text-red-500" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="h-6 w-6 text-emerald-500" aria-hidden="true" />
                  )}
                  <div
                    className={cn(
                      'text-3xl font-bold',
                      isNegative ? 'text-red-600 dark:text-red-400' : 'text-slate-900 dark:text-slate-100'
                    )}
                  >
                    {formatCurrency(Math.abs(selectedAccount.balance))}
                  </div>
                </div>
                {isCreditCard && selectedAccount.creditLimit && (
                  <div className="mt-4">
                    <div className="flex justify-between items-center text-sm mb-1">
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
                      className="h-2"
                      aria-label={`Credit utilization: ${Math.round(creditUtilization)}%`}
                    />
                    <div className="flex justify-between text-xs text-slate-500 dark:text-slate-400 mt-1">
                      <span>Current: {formatCurrency(Math.abs(selectedAccount.balance))}</span>
                      <span>Limit: {formatCurrency(selectedAccount.creditLimit)}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
            <div className="grid grid-cols-2 gap-4">
              {selectedAccount.accountNumber && (
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Account Number:</span>
                  <p className="font-medium">{selectedAccount.accountNumber}</p>
                </div>
              )}
              <div>
                <span className="text-sm text-slate-500 dark:text-slate-400">Last Updated:</span>
                <p className="font-medium">{selectedAccount.lastUpdated}</p>
              </div>
              {isCreditCard && selectedAccount.dueDate && (
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Payment Due:</span>
                  <p className="font-medium text-amber-600 dark:text-amber-400">{selectedAccount.dueDate}</p>
                </div>
              )}
              {selectedAccount.type === 'investment' && selectedAccount.performance && (
                <div>
                  <span className="text-sm text-slate-500 dark:text-slate-400">Performance:</span>
                  <p className="font-medium text-emerald-600 dark:text-emerald-400">{selectedAccount.performance}</p>
                </div>
              )}
            </div>
            <div>
              <h4 className="font-medium mb-3">Recent Activity</h4>
              {selectedAccount.recentActivity && selectedAccount.recentActivity.length > 0 ? (
                <div className="space-y-2">
                  {selectedAccount.recentActivity.map((activity, index) => (
                    <div
                      key={index}
                      className="flex justify-between items-center p-3 bg-slate-50 dark:bg-slate-800 rounded-lg"
                    >
                      <span>{activity.description}</span>
                      <span
                        className={activity.amount < 0 ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}
                      >
                        {activity.amount < 0 ? '-' : '+'}
                        {formatCurrency(Math.abs(activity.amount))}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                  <p className="text-slate-500 dark:text-slate-400">No recent activity</p>
                </div>
              )}
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="outline" onClick={() => setOpen(false)} className="flex-1">Close</Button>
          <Button
            variant="outline"
            className="flex-1"
            onClick={() => {
              handleEditAccount(selectedAccount.id);
              setOpen(false);
            }}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Account
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}