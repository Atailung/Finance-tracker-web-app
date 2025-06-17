"use client";

import { useState, useEffect, useMemo, useCallback } from "react";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Filter,
  ChevronDown,
  Plus,
  Download,
  FileJson,
  Printer,
  Loader2,
  FilesIcon,
} from "lucide-react";
import { format } from "date-fns";
import { isAfter, isBefore, startOfDay, endOfDay } from "date-fns";
import { fetchTransactions } from "@/app/api/fetchTransactions";
import { TransactionForm } from "@/components/transactionPageCompontents/TransactionFrom";
import { FilterPanel } from "@/components/transactionPageCompontents/FilterPanel";
import { TransactionDetails } from "@/components/transactionPageCompontents/TransactionDetails";
import { SummaryCards } from "@/components/transactionPageCompontents/SummaryCards";
import { TransactionTable } from "@/components/transactionPageCompontents/TransactionTable";
import { downloadAsJson, downloadAsCsv } from "@/lib/transactionUtils";
import { Button } from "@heroui/button";

interface Transaction {
  id: string | number;
  date: string | Date;
  description: string;
  category: string;
  amount: number;
  account: string;
  status: "completed" | "pending" | "failed";
  merchant?: string;
  notes?: string;
  tags?: string[];
  receiptId?: string;
  paymentMethod?: string;
}

interface FilterOptions {
  dateRange: {
    start: Date | null;
    end: Date | null;
  };
  categories: string[];
  accounts: string[];
  amountRange: {
    min: number;
    max: number;
  };
  status: string[];
  merchants: string[];
  paymentMethods: string[];
}

export default function TransactionsPage() {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedTransactions, setSelectedTransactions] = useState<number[]>(
    []
  );
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Transaction;
    direction: "asc" | "desc";
  } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [selectedTransaction, setSelectedTransaction] =
    useState<Transaction | null>(null);
  const [showFilterPanel, setShowFilterPanel] = useState(false);

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    dateRange: { start: null, end: null },
    categories: [],
    accounts: [],
    amountRange: { min: -5000, max: 5000 },
    status: [],
    merchants: [],
    paymentMethods: [],
  });
  


  // update code 
  useEffect(() => {
    async function loadTransactions() {
      try {
        const data = await fetchTransactions();
        const normalized = (data as Transaction[]).map((t) => ({
          ...t,
          status:
            typeof t.status === "string"
              ? ["completed", "pending", "failed"].includes(t.status.toLowerCase())
                ? (t.status.toLowerCase() as "completed" | "pending" | "failed")
                : "failed"
              : t.status,
        }));
        setTransactions(normalized);
      } catch (error) {
        console.error("Failed to load transactions:", error);
      }
    }
    loadTransactions();
  }, []);



  const stats = useMemo(() => {
    const totalIncome = transactions
      .filter((t) => t.amount > 0)
      .reduce((sum, t) => sum + t.amount, 0);
    const totalExpenses = transactions
      .filter((t) => t.amount < 0)
      .reduce((sum, t) => sum + Math.abs(t.amount), 0);
    const netAmount = totalIncome - totalExpenses;

    return {
      totalIncome,
      totalExpenses,
      netAmount,
      totalTransactions: transactions.length,
    };
  }, [transactions]);

  const filteredTransactions = useMemo(() => {
    return transactions.filter((transaction) => {
      const matchesDateRange =
        (!filterOptions.dateRange.start ||
          isAfter(
            startOfDay(new Date(transaction.date)),
            startOfDay(filterOptions.dateRange.start)
          )) &&
        (!filterOptions.dateRange.end ||
          isBefore(
            endOfDay(new Date(transaction.date)),
            endOfDay(filterOptions.dateRange.end)
          ));

      const matchesCategory =
        filterOptions.categories.length === 0 ||
        filterOptions.categories.includes(transaction.category);

      const matchesAccount =
        filterOptions.accounts.length === 0 ||
        filterOptions.accounts.includes(transaction.account);

      const matchesAmount =
        transaction.amount >= filterOptions.amountRange.min &&
        transaction.amount <= filterOptions.amountRange.max;

      const matchesStatus =
        filterOptions.status.length === 0 ||
        filterOptions.status.includes(transaction.status);

      return (
        matchesDateRange &&
        matchesCategory &&
        matchesAccount &&
        matchesAmount &&
        matchesStatus
      );
    });
  }, [transactions, filterOptions]);

  const handleAddTransaction = useCallback(
    async (newTransaction: Partial<Transaction>) => {
      setIsSubmitting(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        const maxId = transactions.reduce(
          (max, transaction) => Math.max(max, Number(transaction.id)),
          0
        );
        const transactionToAdd: Transaction = {
          id: maxId + 1,
          description: newTransaction.description || "",
          amount: newTransaction.amount || 0,
          category: newTransaction.category || "",
          account: newTransaction.account || "",
          date: newTransaction.date || new Date().toISOString(),
          status: newTransaction.status || "completed",
          merchant: newTransaction.merchant,
          notes: newTransaction.notes,
          paymentMethod: newTransaction.paymentMethod,
          tags: [],
        };

        setTransactions((prev) => [transactionToAdd, ...prev]);
        setOpenAddDialog(false);
      } catch (error) {
        console.error("Failed to add transaction:", error);
      } finally {
        setIsSubmitting(false);
      }
    },
    [transactions]
  );

  const handleUpdateTransaction = async (
    updatedTransaction: Partial<Transaction>
  ) => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (!updatedTransaction.id) return;

      setTransactions((prev) =>
        prev.map((transaction) =>
          transaction.id === updatedTransaction.id
            ? {
                ...transaction,
                ...updatedTransaction,
                date: String(updatedTransaction.date),
              }
            : transaction
        )
      );
      setOpenEditDialog(false);
      setSelectedTransaction(null);
    } catch (error) {
      console.error("Failed to update transaction:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleBulkDelete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setTransactions((prev) =>
        prev.filter(
          (transaction) =>
            !selectedTransactions.includes(Number(transaction.id))
        )
      );
      setSelectedTransactions([]);
      setSelectAll(false);
      setOpenDeleteDialog(false);
    } catch (error) {
      console.error("Failed to delete transactions:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelAdd = useCallback(() => {
    setOpenAddDialog(false);
  }, []);


  const handleExport = (exportFormat: "json" | "csv") => {
    const dataToExport =
      selectedTransactions.length > 0
        ? transactions.filter((t) =>
            selectedTransactions.includes(Number(t.id))
          )
        : filteredTransactions;

    const filename = `transactions_export_${format(
      new Date(),
      "yyyyMMdd"
    )}.${exportFormat}`;

    if (exportFormat === "json") {
      downloadAsJson(dataToExport, filename);
    } else {
      downloadAsCsv(
        dataToExport.map((t) => ({
          ...t,
          date: typeof t.date === "string" ? t.date : t.date.toISOString(),
        })),
        filename
      );
    }
  };

  const handleViewDetails = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenDetailsDialog(true);
  };

  const handleEditTransaction = (transaction: Transaction) => {
    setSelectedTransaction(transaction);
    setOpenEditDialog(true);
  };

  const handleFilterApply = () => {
    setShowFilterPanel(false);
  };

  const handleFilterReset = () => {
    setFilterOptions({
      dateRange: { start: null, end: null },
      categories: [],
      accounts: [],
      amountRange: { min: -5000, max: 5000 },
      status: [],
      merchants: [],
      paymentMethods: [],
    });
    setShowFilterPanel(false);
  };

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterOptions.dateRange.start || filterOptions.dateRange.end) count++;
    if (filterOptions.categories.length > 0) count++;
    if (filterOptions.accounts.length > 0) count++;
    if (
      filterOptions.amountRange.min > -5000 ||
      filterOptions.amountRange.max < 5000
    )
      count++;
    if (filterOptions.status.length > 0) count++;
    return count;
  }, [filterOptions]);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Transactions
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Manage and track your financial activities
          </p>
        </div>

        <div className="flex items-center gap-2">
          <Popover open={showFilterPanel} onOpenChange={setShowFilterPanel}>
            <PopoverTrigger asChild>
              <Button
                variant="bordered"
                size="sm"
                className="h-9 gap-2 shadow-md"
              >
                <Filter className="h-4 w-4" />
                Filters
                {activeFilterCount > 0 && (
                  <Badge className="ml-1 h-5 w-5 p-0 flex items-center justify-center rounded-full">
                    {activeFilterCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-4" align="end">
              <FilterPanel
                filterOptions={filterOptions}
                setFilterOptions={setFilterOptions}
                onApply={handleFilterApply}
                onReset={handleFilterReset}
              />
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="bordered"
                size="sm"
                className="h-9 gap-2 shadow-md"
              >
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="center" className="w-48">
              <DropdownMenuLabel>Export options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleExport("json")}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FilesIcon className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="h-4 w-4 mr-2" />
                  Print report
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>

          <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
            <DialogTrigger asChild>
              <Button
                size="md"
                color="primary"
                className="h-9 text-sm  hover:from-green-700 hover:to-green-700 shadow-md"
              >
                <Plus className="mr-2 h-4 w-4" />
                Add Transaction
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[600px]">
              <DialogHeader>
                <DialogTitle className="text-xl">Add Transaction</DialogTitle>
                <DialogDescription>
                  Enter the details of your transaction below.
                </DialogDescription>
              </DialogHeader>
              <ScrollArea className="max-h-[70vh]">
                <TransactionForm
                  onSubmit={handleAddTransaction}
                  // onCancel={() => setOpenAddDialog(false)}
                  isSubmitting={isSubmitting}
                  onCancel={handleCancelAdd }
                />
              </ScrollArea>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <SummaryCards stats={stats} />

      <TransactionTable
        transactions={filteredTransactions.map((t) => ({
          ...t,
          id: typeof t.id === "string" ? Number(t.id) : t.id,
          date: typeof t.date === "string" ? t.date : t.date.toISOString(),
        }))}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        selectedTransactions={selectedTransactions}
        setSelectedTransactions={setSelectedTransactions}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        onExport={handleExport}
        onDelete={() => setOpenDeleteDialog(true)}
        onViewDetails={handleViewDetails}
        onEdit={handleEditTransaction}
      />

      <Dialog open={openDetailsDialog} onOpenChange={setOpenDetailsDialog}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Transaction Details</DialogTitle>
            <DialogDescription>
              View detailed information about this transaction.
            </DialogDescription>
          </DialogHeader>
          <TransactionDetails
            transaction={
              selectedTransaction
                ? {
                    ...selectedTransaction,
                    id:
                      typeof selectedTransaction.id === "string"
                        ? Number(selectedTransaction.id)
                        : selectedTransaction.id,
                    date:
                      typeof selectedTransaction.date === "string"
                        ? selectedTransaction.date
                        : selectedTransaction.date.toISOString(),
                  }
                : null
            }
            onClose={() => {
              setOpenDetailsDialog(false);
              setSelectedTransaction(null);
            }}
            onEdit={() => {
              setOpenDetailsDialog(false);
              setOpenEditDialog(true);
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openEditDialog} onOpenChange={setOpenEditDialog}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle className="text-xl">Edit Transaction</DialogTitle>
            <DialogDescription>
              Update the details of your transaction below.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="max-h-[70vh]">
            <TransactionForm
              transaction={
                selectedTransaction
                  ? {
                      ...selectedTransaction,
                      id:
                        typeof selectedTransaction.id === "string"
                          ? Number(selectedTransaction.id)
                          : selectedTransaction.id,
                    }
                  : null
              }
              onSubmit={handleUpdateTransaction}
              onCancel={() => {
                setOpenEditDialog(false);
                setSelectedTransaction(null);
              }}
              isSubmitting={isSubmitting}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog open={openDeleteDialog} onOpenChange={setOpenDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Transactions</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete {selectedTransactions.length}{" "}
              {selectedTransactions.length === 1
                ? "transaction"
                : "transactions"}
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isSubmitting}>
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              disabled={isSubmitting}
              className="bg-destructive hover:bg-destructive/90"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Deleting...
                </>
              ) : (
                "Delete"
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
