'use client';

import { useState, useEffect, useMemo } from 'react';
import { Toaster } from 'react-hot-toast';
import toast from 'react-hot-toast';
import { Plus, Loader2, RefreshCw } from 'lucide-react';
import { fetchAccounts, createAccount, updateAccount, deleteAccount, Account } from '@/app/api/fetchAccounts';
import AccountSummaryCards from '@/components/accountPageComponents/AccountSummaryCards';
import AccountFilters from '@/components/accountPageComponents/AccountFilters';
import AccountList from '@/components/accountPageComponents/AccountList';
import AccountForm from '@/components/accountPageComponents/AccountForm';
import AccountDetailsDialog from '@/components/accountPageComponents/AccountDetailsDialog';
// import { formatCurrency } from '@/lib/accountUtils';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { AlertDialog } from '@radix-ui/react-alert-dialog';
import { AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<Account[]>([]);
  const [accountFilter, setAccountFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [sortOrder, setSortOrder] = useState<string>('default');
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState<Account | null>(null);
  const [accountToDelete, setAccountToDelete] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Fetch accounts on mount
  useEffect(() => {
    async function loadAccounts() {
      const accountData = await fetchAccounts();
      setAccounts(accountData);
    }
    loadAccounts();
  }, []);

  // Calculate financial summary
  const totalAssets = accounts
    .filter((account) => account.balance > 0)
    .reduce((sum, account) => sum + account.balance, 0);
  const totalLiabilities = accounts
    .filter((account) => account.balance < 0)
    .reduce((sum, account) => sum + Math.abs(account.balance), 0);
  const netWorth = totalAssets - totalLiabilities;

  // Filter and sort accounts
  const filteredAccounts = useMemo(() => {
    const filtered = accounts.filter((account) => {
      const matchesType = accountFilter === 'all' || account.type === accountFilter;
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch =
        searchQuery === '' ||
        account.name.toLowerCase().includes(searchLower) ||
        (account.institution && account.institution.toLowerCase().includes(searchLower)) ||
        account.type.toLowerCase().includes(searchLower);
      return matchesType && matchesSearch;
    });

    switch (sortOrder) {
      case 'highest-balance':
        return [...filtered].sort((a, b) => b.balance - a.balance);
      case 'lowest-balance':
        return [...filtered].sort((a, b) => a.balance - b.balance);
      case 'recently-updated':
        return [...filtered].sort((a, b) => {
          if (a.lastUpdated === 'Today' && b.lastUpdated !== 'Today') return -1;
          if (a.lastUpdated !== 'Today' && b.lastUpdated === 'Today') return 1;
          if (a.lastUpdated === 'Yesterday' && b.lastUpdated !== 'Yesterday' && b.lastUpdated !== 'Today') return -1;
          if (a.lastUpdated !== 'Yesterday' && a.lastUpdated !== 'Today' && b.lastUpdated === 'Yesterday') return 1;
          return 0;
        });
      case 'alphabetical':
        return [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      default:
        return [...filtered].sort((a, b) => {
          if (a.isDefault && !b.isDefault) return -1;
          if (!a.isDefault && b.isDefault) return 1;
          return a.id - b.id;
        });
    }
  }, [accounts, accountFilter, searchQuery, sortOrder]);

  // Event handlers
  const handleRefreshAccounts = async () => {
    setIsRefreshing(true);
    const accountData = await fetchAccounts();
    setAccounts(accountData);
    setIsRefreshing(false);
  };

  const handleViewDetails = (id: number) => {
    const account = accounts.find((a) => a.id === id);
    if (account) {
      setSelectedAccount(account);
      setOpenEditDialog(true);
    }
  };

  const handleEditAccount = (id: number) => {
    const account = accounts.find((a) => a.id === id);
    if (account) {
      setSelectedAccount(account);
      setOpenEditDialog(true);
    }
  };

  const handleDeleteAccount = (id: number) => {
    setAccountToDelete(id);
    setOpenDeleteDialog(true);
  };

  const handleAddAccount = async (newAccount: Partial<Account>) => {
    setIsSubmitting(true);
    try {
      const accountType = newAccount.type || 'checking';
      // Replace ACCOUNT_TYPES with your actual array of account type configs
      const ACCOUNT_TYPES = [
        { value: 'checking', icon: 'bank', color: 'bg-green-500' },
        { value: 'savings', icon: 'piggy-bank', color: 'bg-green-500' },
        // ...add other account types as needed
      ];
      const typeConfig = ACCOUNT_TYPES.find((t) => t.value === accountType) || ACCOUNT_TYPES[0];
      const accountToAdd: Omit<Account, 'id'> = {
        name: newAccount.name || 'New Account',
        balance: newAccount.balance || 0,
        type: accountType,
        icon: typeConfig.icon,
        transactions: 0,
        lastUpdated: 'Just now',
        institution: newAccount.institution ?? '',
        accountNumber: newAccount.accountNumber ?? '',
        color: typeConfig.color.replace('bg-', '').replace('-500', ''),
        isDefault: newAccount.isDefault || false,
        recentActivity: [],
      };

      const createdAccount = await createAccount(accountToAdd);
      if (accountToAdd.isDefault) {
        setAccounts((prev) =>
          prev.map((acc) => ({ ...acc, isDefault: acc.id === createdAccount.id ? true : false }))
            .concat(createdAccount),
        );
      } else {
        setAccounts((prev) => [...prev, createdAccount]);
      }
      toast.success('Account added successfully!');
      setOpenAddDialog(false);
    } catch (error) {
      toast.error('Failed to add account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleUpdateAccount = async (updatedAccount: Partial<Account>) => {
    setIsSubmitting(true);
    try {
      if (!updatedAccount.id) return;
      await updateAccount({ ...updatedAccount, id: updatedAccount.id } as Account);
      if (updatedAccount.isDefault) {
        setAccounts((prev) =>
          prev.map((acc) => ({
            ...acc,
            isDefault: acc.id === updatedAccount.id ? true : false,
            ...(acc.id === updatedAccount.id ? updatedAccount : {}),
          })),
        );
      } else {
        setAccounts((prev) =>
          prev.map((acc) => (acc.id === updatedAccount.id ? { ...acc, ...updatedAccount } : acc)),
        );
      }
      toast.success('Account updated successfully!');
      setOpenEditDialog(false);
    } catch (error) {
      toast.error('Failed to update account');
    } finally {
      setIsSubmitting(false);
    }
  };

  const confirmDeleteAccount = async () => {
    if (accountToDelete === null) return;
    setIsSubmitting(true);
    try {
      await deleteAccount(accountToDelete);
      setAccounts((prev) => prev.filter((account) => account.id !== accountToDelete));
      toast.success('Account deleted successfully!');
      setAccountToDelete(null);
      setOpenDeleteDialog(false);
    } catch (error) {
      toast.error('Failed to delete account');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-slate-50 dark:bg-slate-900 min-h-screen">
      <Toaster />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
            Financial Accounts
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Manage and track all your financial accounts in one place
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            className="h-9"
            onClick={handleRefreshAccounts}
            disabled={isRefreshing}
            aria-label="Refresh accounts"
          >
            {isRefreshing ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden="true" />
                Refreshing...
              </>
            ) : (
              <>
                <RefreshCw className="mr-2 h-4 w-4" aria-hidden="true" />
                Refresh
              </>
            )}
          </Button>
          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button
                size="sm"
                className="h-9 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Account
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]" aria-describedby="add-account-description">
              <DialogHeader>
                <DialogTitle className="text-xl">Add New Account</DialogTitle>
                <DialogDescription id="add-account-description">
                  Add a new financial account to track your finances
                </DialogDescription>
              </DialogHeader>
              <AccountForm
                onSubmit={handleAddAccount}
                onCancel={() => setOpenAddDialog(false)}
                isSubmitting={isSubmitting}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>
      <AccountSummaryCards totalAssets={totalAssets} totalLiabilities={totalLiabilities} netWorth={netWorth} />
      <AccountFilters
        accountFilter={accountFilter}
        setAccountFilter={setAccountFilter}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
      />
      <AccountList
        accounts={filteredAccounts}
        handleViewDetails={handleViewDetails}
        handleEditAccount={handleEditAccount}
        handleDeleteAccount={handleDeleteAccount}
      />
      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[500px]" aria-describedby="edit-account-description">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Account</DialogTitle>
            <DialogDescription id="edit-account-description">
              Modify your account details and settings
            </DialogDescription>
          </DialogHeader>
          <AccountForm
            account={
              selectedAccount
                ? {
                    ...selectedAccount,
                    creditLimit:
                      typeof selectedAccount.creditLimit === 'string'
                        ? Number(selectedAccount.creditLimit)
                        : selectedAccount.creditLimit,
                  }
                : null
            }
            onSubmit={handleUpdateAccount}
            onDelete={handleDeleteAccount}
            onCancel={() => setOpenEditDialog(false)}
            isSubmitting={isSubmitting}
          />
        </DialogContent>
      </Dialog>
      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Account</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete this account? This action cannot be undone and will permanently remove all
              account data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmDeleteAccount}
              className="bg-red-600 hover:bg-red-700"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Deleting...' : 'Delete'}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      <AccountDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        selectedAccount={
          selectedAccount
            ? {
                ...selectedAccount,
                creditLimit:
                  typeof selectedAccount.creditLimit === 'string'
                    ? Number(selectedAccount.creditLimit)
                    : selectedAccount.creditLimit,
              }
            : null
        }
        handleEditAccount={handleEditAccount}
      />
    </div>
  );
}