"use client";

import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
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
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import {
  Download,
  Filter,
  FileJson,
  FileSpreadsheetIcon as FileCsv,
  Printer,
  ChevronDown,
} from "lucide-react";
import { format, isAfter, isBefore } from "date-fns";
import { StatsCards } from "@/components/dashboardUI/statsCards";
import { UploadSection } from "@/components/ReceiptPageComponents/UploadSection";
import { ReceiptList } from "@/components/ReceiptPageComponents/ReceiptList";
import { FilterPanel } from "@/components/ReceiptPageComponents/FilterPanel";
import { ReceiptDetailView } from "@/components/ReceiptPageComponents/ReceiptDetailView";
import { fetchReceipts, ReceiptType } from "@/app/api/fetchReceipts";
import { PAYMENT_METHODS, STATUS_OPTIONS } from "@/app/constant/receipts";
import { Badge } from "@/components/ui/badge";

interface FilterOptions {
  dateRange: { start: Date | null; end: Date | null };
  categories: string[];
  amountRange: { min: number; max: number };
  paymentMethods: string[];
  status: string[];
}

export default function ReceiptsPage() {
  const [receipts, setReceipts] = useState<ReceiptType[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [paymentMethods, setPaymentMethods] =
    useState<typeof PAYMENT_METHODS>(PAYMENT_METHODS);
  const [statusOptions, setStatusOptions] =
    useState<typeof STATUS_OPTIONS>(STATUS_OPTIONS);
  const [activeTab, setActiveTab] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedReceipts, setSelectedReceipts] = useState<number[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [sortConfig, setSortConfig] = useState<{
    key: keyof ReceiptType;
    direction: "asc" | "desc";
  } | null>(null);
  const [viewReceipt, setViewReceipt] = useState<ReceiptType | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    dateRange: { start: null, end: null },
    categories: [],
    amountRange: { min: 0, max: 1000 },
    paymentMethods: [],
    status: [],
  });

  useEffect(() => {
    async function loadReceipts() {
      const data = await fetchReceipts();
      setReceipts(data.receipts);
      setCategories(data.categories);
      setPaymentMethods(data.paymentMethods);
      setStatusOptions(data.statusOptions);
    }
    loadReceipts();
  }, []);

  const filteredReceipts = useMemo(() => {
    return receipts.filter((receipt) => {
      const matchesDateRange =
        (!filterOptions.dateRange.start ||
          isAfter(new Date(receipt.date), filterOptions.dateRange.start)) &&
        (!filterOptions.dateRange.end ||
          isBefore(new Date(receipt.date), filterOptions.dateRange.end));
      const matchesCategory =
        filterOptions.categories.length === 0 ||
        filterOptions.categories.includes(receipt.category);
      const matchesAmount =
        receipt.amount >= filterOptions.amountRange.min &&
        receipt.amount <= filterOptions.amountRange.max;
      const matchesPaymentMethod =
        filterOptions.paymentMethods.length === 0 ||
        filterOptions.paymentMethods.includes(receipt.paymentMethod);
      const matchesStatus =
        filterOptions.status.length === 0 ||
        filterOptions.status.includes(receipt.status);
      return (
        matchesDateRange &&
        matchesCategory &&
        matchesAmount &&
        matchesPaymentMethod &&
        matchesStatus
      );
    });
  }, [receipts, filterOptions]);

  const downloadAsJson = (data: ReceiptType[], filename: string) => {
    const blob = new Blob([JSON.stringify(data, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const downloadAsCsv = (data: ReceiptType[], filename: string) => {
    const headers = [
      "ID",
      "Merchant",
      "Date",
      "Amount",
      "Category",
      "Status",
      "Payment Method",
      "Tax Amount",
      "Confidence",
    ];
    const csvRows = [
      headers.join(","),
      ...data.map((receipt) =>
        [
          receipt.id,
          `"${receipt.merchant}"`,
          format(new Date(receipt.date), "yyyy-MM-dd"),
          receipt.amount,
          `"${receipt.category}"`,
          receipt.status,
          `"${receipt.paymentMethod}"`,
          receipt.taxAmount,
          receipt.confidence,
        ].join(",")
      ),
    ];
    const csvString = csvRows.join("\n");
    const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleExport = (exportFormat: "json" | "csv") => {
    const selectedData = receipts.filter((receipt) =>
      selectedReceipts.includes(receipt.id)
    );
    const filename = `receipts_export_${format(
      new Date(),
      "yyyyMMdd"
    )}.${exportFormat}`;
    if (exportFormat === "json") {
      downloadAsJson(selectedData, filename);
    } else {
      downloadAsCsv(selectedData, filename);
    }
  };

  const handleBulkDelete = () => {
    setReceipts((prev) =>
      prev.filter((receipt) => !selectedReceipts.includes(receipt.id))
    );
    setSelectedReceipts([]);
    setSelectAll(false);
    setShowDeleteDialog(false);
  };

  const handleFilterApply = () => {
    setShowFilterPanel(false);
  };

  const handleFilterReset = () => {};

  const activeFilterCount = useMemo(() => {
    let count = 0;
    if (filterOptions.dateRange.start || filterOptions.dateRange.end) count++;
    if (filterOptions.categories.length > 0) count++;
    if (
      filterOptions.amountRange.min > 0 ||
      filterOptions.amountRange.max < 1000
    )
      count++;
    if (filterOptions.paymentMethods.length > 0) count++;
    if (filterOptions.status.length > 0) count++;
    return count;
  }, [filterOptions]);

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-gradient-to-br from-background to-muted/20 min-h-screen">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-4xl font-bold tracking-tight bg-gradient-to-r from-foreground to-foreground/70 bg-clip-text text-transparent">
            Receipt Management
          </h1>
          <p className="text-muted-foreground text-lg mt-1">
            Upload, process, and organize your receipts efficiently
          </p>
        </div>
        <div className="flex gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2">
                <Download className="h-4 w-4" />
                Export
                <ChevronDown className="h-4 w-4 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Export Options</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={() => handleExport("json")}>
                  <FileJson className="h-4 w-4 mr-2" />
                  Export as JSON
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleExport("csv")}>
                  <FileCsv className="h-4 w-4 mr-2" />
                  Export as CSV
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Printer className="h-4 w-4 mr-2" />
                  Print Receipts
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <Popover open={showFilterPanel} onOpenChange={setShowFilterPanel}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="gap-2">
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
                categories={categories}
                paymentMethods={paymentMethods}
                statusOptions={statusOptions}
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>
      <UploadSection receipts={receipts} setReceipts={setReceipts} />
      <ReceiptList
        receipts={filteredReceipts}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedReceipts={selectedReceipts}
        setSelectedReceipts={setSelectedReceipts}
        selectAll={selectAll}
        setSelectAll={setSelectAll}
        sortConfig={sortConfig}
        setSortConfig={setSortConfig}
        setViewReceipt={setViewReceipt}
        setShowDeleteDialog={setShowDeleteDialog}
        handleExport={handleExport}
      />

      <Dialog
        open={!!viewReceipt}
        onOpenChange={(open) => !open && setViewReceipt(null)}
      >
        <DialogContent className="sm:max-w-[800px]">
          <ScrollArea className="max-h-[80vh]">
            <ReceiptDetailView
              receipt={viewReceipt}
              onClose={() => setViewReceipt(null)}
            />
          </ScrollArea>
        </DialogContent>
      </Dialog>

      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Delete {selectedReceipts.length > 1 ? "Receipts" : "Receipt"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete{" "}
              {selectedReceipts.length === 1
                ? "this receipt"
                : `these ${selectedReceipts.length} receipts`}
              ? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleBulkDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
