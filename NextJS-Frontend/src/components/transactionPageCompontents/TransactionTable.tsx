'use client';

import {  useMemo, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Search, X, SlidersHorizontal, ChevronDown, Download, Trash2, Eye, Share2, CalendarIcon, ArrowUpDown, DollarSign, Tag, CheckCircle, Clock, AlertCircle, CreditCard, MoreHorizontal, Edit } from 'lucide-react';
import { format } from 'date-fns';
import { formatCurrency } from "@/lib/accountUtils";
import { statusColors, categoryIcons, accountIcons } from "@/components/common/CategoryIcons";
import { Badge } from '../ui/badge';
interface Transaction {
  id: number;
  date: string;
  description: string;
  category: string;
  amount: number;
  account: string;
  status: 'completed' | 'pending' | 'failed';
  merchant?: string;
  notes?: string;
  tags?: string[];
  receiptId?: string;
  paymentMethod?: string;
}

interface TransactionTableProps {
  transactions: Transaction[];
  activeTab: string;
  setActiveTab: (tab: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedTransactions: number[];
  setSelectedTransactions: (ids: number[] | ((prev: number[]) => number[])) => void;
  selectAll: boolean;
  setSelectAll: (value: boolean) => void;
  sortConfig: { key: keyof Transaction; direction: 'asc' | 'desc' } | null;
  setSortConfig: (config: { key: keyof Transaction; direction: 'asc' | 'desc' } | null) => void;
  onExport: (format: 'csv') => void;
  onDelete: () => void;
  onViewDetails: (transaction: Transaction) => void;
  onEdit: (transaction: Transaction) => void;
}

export function TransactionTable({
  transactions,
  activeTab,
  setActiveTab,
  searchQuery,
  setSearchQuery,
  selectedTransactions,
  setSelectedTransactions,
  selectAll,
  setSelectAll,
  sortConfig,
  setSortConfig,
  onExport,
  onDelete,
  onViewDetails,
  onEdit,
}: TransactionTableProps) {
  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesTab =
        activeTab === 'all' || (activeTab === 'income' && transaction.amount > 0) || (activeTab === 'expenses' && transaction.amount < 0);

      const matchesSearch =
        searchQuery === '' ||
        transaction.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        transaction.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (transaction.merchant && transaction.merchant.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (transaction.notes && transaction.notes.toLowerCase().includes(searchQuery.toLowerCase()));

      return matchesTab && matchesSearch;
    });
  }, [transactions, activeTab, searchQuery]);

  const sortedTransactions = useMemo(() => {
    if (!sortConfig) return filteredTransactions;

    return [...filteredTransactions].sort((a, b) => {
      const key = sortConfig.key;
      const aValue = key === 'date' ? new Date(a[key]).getTime() : a[key];
      const bValue = key === 'date' ? new Date(b[key]).getTime() : b[key];

      // Provide fallback values if undefined
      const aComp = aValue !== undefined ? aValue : '';
      const bComp = bValue !== undefined ? bValue : '';

      if (aComp < bComp) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aComp > bComp) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredTransactions, sortConfig]);

  const requestSort = (key: keyof Transaction) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleTransactionSelection = (id: number) => {
    setSelectedTransactions((prev: number[]) =>
      prev.includes(id) ? prev.filter((transactionId: number) => transactionId !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (selectAll) {
      setSelectedTransactions(sortedTransactions.map((t) => t.id));
    } else {
      setSelectedTransactions([]);
    }
  }, [selectAll, sortedTransactions, setSelectedTransactions]);

  useEffect(() => {
    setSelectedTransactions([]);
    setSelectAll(false);
  }, [activeTab, setSelectedTransactions, setSelectAll]);

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl">Transaction History</CardTitle>
            <CardDescription>View and manage all your financial transactions</CardDescription>
          </div>

          <Tabs defaultValue="all" className="w-full md:w-auto" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3 h-10">
              <TabsTrigger value="all" className="data-[state=active]:bg-background">
                All
              </TabsTrigger>
              <TabsTrigger value="income" className="text-emerald-600 data-[state=active]:bg-background">
                Income
              </TabsTrigger>
              <TabsTrigger value="expenses" className="text-red-600 data-[state=active]:bg-background">
                Expenses
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-2 pb-4">
          <div className="relative w-full md:w-auto flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search transactions..."
              className="pl-10 h-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
              >
                <X className="h-4 w-4 text-slate-500 hover:text-slate-700" />
              </button>
            )}
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="h-10">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Sort
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Sort By</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => requestSort('date')}>
                <CalendarIcon className="h-4 w-4 mr-2" />
                Date
                {sortConfig?.key === 'date' && <ArrowUpDown className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => requestSort('amount')}>
                <DollarSign className="h-4 w-4 mr-2" />
                Amount
                {sortConfig?.key === 'amount' && <ArrowUpDown className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => requestSort('description')}>
                <Tag className="h-4 w-4 mr-2" />
                Description
                {sortConfig?.key === 'description' && <ArrowUpDown className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => requestSort('category')}>
                <Tag className="h-4 w-4 mr-2" />
                Category
                {sortConfig?.key === 'category' && <ArrowUpDown className="h-4 w-4 ml-2" />}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>

        {selectedTransactions.length > 0 && (
          <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg mb-4">
            <div className="flex items-center gap-2">
              <Checkbox id="select-all" checked={selectAll} onCheckedChange={(checked) => setSelectAll(!!checked)} />
              <Label htmlFor="select-all" className="text-sm font-medium">
                {selectedTransactions.length} {selectedTransactions.length === 1 ? 'transaction' : 'transactions'} selected
              </Label>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => onExport('csv')}>
                <Download className="h-4 w-4 mr-2" />
                Export Selected
              </Button>
              <Button variant="destructive" size="sm" onClick={onDelete}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete Selected
              </Button>
            </div>
          </div>
        )}

        <div className="rounded-md border border-border overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="w-[50px]">
                  <Checkbox
                    checked={selectAll}
                    onCheckedChange={(checked) => setSelectAll(!!checked)}
                    aria-label="Select all transactions"
                  />
                </TableHead>
                <TableHead className="w-[120px] cursor-pointer" onClick={() => requestSort('date')}>
                  <div className="flex items-center">
                    Date
                    {sortConfig?.key === 'date' && <ArrowUpDown className="h-4 w-4 ml-1" />}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort('description')}>
                  <div className="flex items-center">
                    Description
                    {sortConfig?.key === 'description' && <ArrowUpDown className="h-4 w-4 ml-1" />}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => requestSort('category')}>
                  <div className="flex items-center">
                    Category
                    {sortConfig?.key === 'category' && <ArrowUpDown className="h-4 w-4 ml-1" />}
                  </div>
                </TableHead>
                <TableHead>Account</TableHead>
                <TableHead className="text-right cursor-pointer" onClick={() => requestSort('amount')}>
                  <div className="flex items-center justify-end">
                    Amount
                    {sortConfig?.key === 'amount' && <ArrowUpDown className="h-4 w-4 ml-1" />}
                  </div>
                </TableHead>
                <TableHead className="w-[80px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedTransactions.length > 0 ? (
                sortedTransactions.map((transaction) => (
                  <TableRow
                    key={transaction.id}
                    className={cn(
                      'hover:bg-muted/50 cursor-pointer transition-colors',
                      selectedTransactions.includes(transaction.id) && 'bg-muted/30',
                    )}
                    onClick={() => onViewDetails(transaction)}
                  >
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Checkbox
                        checked={selectedTransactions.includes(transaction.id)}
                        onCheckedChange={() => toggleTransactionSelection(transaction.id)}
                        aria-label={`Select transaction ${transaction.description}`}
                      />
                    </TableCell>
                    <TableCell className="font-medium">{format(new Date(transaction.date), 'MMM dd, yyyy')}</TableCell>
                    <TableCell>
                      <div className="space-y-1">
                        <div className="font-medium">{transaction.description}</div>
                        {transaction.merchant && (
                          <div className="text-sm text-muted-foreground">{transaction.merchant}</div>
                        )}
                        <Badge variant="outline" className={`${statusColors[transaction.status]} text-xs w-fit`}>
                          {transaction.status === 'completed' ? (
                            <>
                              <CheckCircle className="h-3 w-3 mr-1" />
                              Completed
                            </>
                          ) : transaction.status === 'pending' ? (
                            <>
                              <Clock className="h-3 w-3 mr-1" />
                              Pending
                            </>
                          ) : (
                            <>
                              <AlertCircle className="h-3 w-3 mr-1" />
                              Failed
                            </>
                          )}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge
                        variant="outline"
                        className={cn(
                          'flex items-center w-fit gap-1 py-1',
                          transaction.amount > 0
                            ? 'text-emerald-700 border-emerald-200 bg-emerald-50 dark:bg-emerald-950 dark:border-emerald-800 dark:text-emerald-400'
                            : 'text-slate-700 border-slate-200 bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:text-slate-300',
                        )}
                      >
                        {categoryIcons[transaction.category] || <Tag className="h-4 w-4" />}
                        {transaction.category}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        {accountIcons[transaction.account] || <CreditCard className="h-4 w-4" />}
                        <span>{transaction.account}</span>
                      </div>
                    </TableCell>
                    <TableCell
                      className={cn(
                        'text-right font-medium',
                        transaction.amount > 0
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-slate-900 dark:text-slate-200',
                      )}
                    >
                      {transaction.amount > 0 ? '+' : ''}{formatCurrency(Math.abs(transaction.amount))}
                    </TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-8 w-8">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => onViewDetails(transaction)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => onEdit(transaction)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Share2 className="mr-2 h-4 w-4" />
                            Share
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            onClick={() => {
                              setSelectedTransactions([transaction.id]);
                              onDelete();
                            }}
                            className="text-red-600 dark:text-red-400"
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="h-24 text-center">
                    <div className="flex flex-col items-center justify-center text-slate-500 dark:text-slate-400">
                      <Search className="h-8 w-8 mb-2 opacity-30" />
                      <p className="font-medium">No transactions found</p>
                      <p className="text-sm">Try adjusting your search or filters</p>
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          Showing {sortedTransactions.length} of {transactions.length} transactions
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}