'use client';

import { Card, CardContent } from '@/components/ui/card';
import { Search } from 'lucide-react';
import { Account } from '@/app/api/fetchAccounts';
import AccountCard from '@/components/accountPageComponents/AccountCard';

interface AccountListProps {
  accounts: Account[];
  handleViewDetails: (id: number) => void;
  handleEditAccount: (id: number) => void;
  handleDeleteAccount: (id: number) => void;
}

export default function AccountList({ accounts, handleViewDetails, handleEditAccount, handleDeleteAccount }: AccountListProps) {
  return (
    <Card className="bg-white dark:bg-slate-800 shadow-sm">
      <CardContent className="pt-6">
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {accounts.map((account) => {
            // Convert creditLimit to number if it's a string
            const fixedAccount = {
              ...account,
              creditLimit: account.creditLimit !== undefined ? Number(account.creditLimit) : undefined,
            };
            return (
              <AccountCard
                key={account.id}
                account={fixedAccount}
                onViewDetails={handleViewDetails}
                onEdit={handleEditAccount}
                onDelete={handleDeleteAccount}
              />
            );
          })}
        </div>
        {accounts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-12 text-slate-500 dark:text-slate-400">
            <Search className="h-12 w-12 mb-4 opacity-30" aria-hidden="true" />
            <h3 className="text-lg font-medium mb-2">No accounts found</h3>
            <p className="text-sm text-center">Try adjusting your search or filters</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}