'use client';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Ban as Bank, CreditCard, Wallet } from 'lucide-react';

// Mock data
const accounts = [
  {
    id: 1,
    name: 'Main Checking',
    balance: 5400.83,
    type: 'checking',
    icon: Bank,
  },
  {
    id: 2,
    name: 'Savings',
    balance: 12750.32,
    type: 'savings',
    icon: Bank,
  },
  {
    id: 3,
    name: 'Credit Card',
    balance: -1250.19,
    type: 'credit',
    icon: CreditCard,
  },
  {
    id: 4,
    name: 'Cash',
    balance: 345.25,
    type: 'cash',
    icon: Wallet,
  },
];

export function AccountsWidget() {
  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0);

  return (
    <Card className="col-span-4 md:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Accounts</CardTitle>
          <Badge variant="outline">
            ${totalBalance.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </Badge>
        </div>
        <CardDescription>View and manage your accounts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {accounts.map((account) => (
            <div
              key={account.id}
              className="flex items-center justify-between space-x-4 rounded-lg border p-3 transition-all hover:bg-accent"
            >
              <div className="flex items-center space-x-3">
                <div className="rounded-lg bg-muted p-2">
                  <account.icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-medium leading-none">
                    {account.name}
                  </p>
                  <p className="text-xs text-muted-foreground capitalize">
                    {account.type}
                  </p>
                </div>
              </div>
              <p
                className={`text-sm font-medium ${
                  account.balance < 0 ? 'text-destructive' : ''
                }`}
              >
                $
                {account.balance.toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}