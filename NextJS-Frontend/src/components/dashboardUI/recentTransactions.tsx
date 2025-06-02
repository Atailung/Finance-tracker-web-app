'use client';

import { useEffect, useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { fetchTransactions, Transaction } from '@/app/api/fetchTransactions';

export function RecentTransactions() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    async function loadTransactions() {
      const transactionData = await fetchTransactions();
      setTransactions(transactionData);
    }
    loadTransactions();
  }, []);

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
        <CardDescription>Your latest financial activities</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-4 transition-all hover:bg-accent"
            >
              <div className="flex items-center space-x-4">
                <Avatar className="h-10 w-10">
                  <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
                    {transaction.name.charAt(0)}
                  </div>
                </Avatar>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {transaction.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {format(new Date(transaction.date), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
              <div className="flex items-center space-x-4">
                <Badge
                  variant={transaction.amount > 0 ? 'outline' : 'secondary'}
                  className={
                    transaction.amount > 0 ? 'text-green-500' : 'text-muted-foreground'
                  }
                >
                  {transaction.category}
                </Badge>
                <p
                  className={`text-sm font-medium ${
                    transaction.amount > 0 ? 'text-green-500' : ''
                  }`}
                >
                  {transaction.amount > 0 ? '+' : ''}
                  ${Math.abs(transaction.amount).toLocaleString('en-US', {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
