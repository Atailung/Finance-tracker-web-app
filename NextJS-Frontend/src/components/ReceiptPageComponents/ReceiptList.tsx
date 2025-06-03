'use client';

import {  useEffect, useMemo } from 'react';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Receipt,
  Calendar,
  DollarSign,
  Tag,
  FileText,
  Eye,
  Download,
  Edit,
  Share2,
  Trash2,
  SlidersHorizontal,
  CheckCircle,
  Clock,
  AlertCircle,
  Search,
  TrendingUp,
  ArrowUpDown,
  MoreHorizontal,
} from 'lucide-react';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';
import { ReceiptType } from '@/app/api/fetchReceipts';
import { Button } from '@heroui/button';

interface ReceiptListProps {
  receipts: ReceiptType[];
  activeTab: string;
  setActiveTab: (value: string) => void;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedReceipts: number[];
  setSelectedReceipts: (value: number[] | ((prev: number[]) => number[])) => void;
  selectAll: boolean;
  setSelectAll: (value: boolean) => void;
  sortConfig: { key: keyof ReceiptType; direction: 'asc' | 'desc' } | null;
  setSortConfig: (value: { key: keyof ReceiptType; direction: 'asc' | 'desc' } | null) => void;
  setViewReceipt: (receipt: ReceiptType | null) => void;
  setShowDeleteDialog: (value: boolean) => void;
  handleExport: (format: 'json' | 'csv') => void;
}

export function ReceiptList({
  receipts,
  activeTab,
  setActiveTab,
  searchTerm,
  setSearchTerm,
  selectedReceipts,
  setSelectedReceipts,
  selectAll,
  setSelectAll,
  sortConfig,
  setSortConfig,
  setViewReceipt,
  setShowDeleteDialog,
  handleExport,
}: ReceiptListProps) {
  const stats = useMemo(
    () => ({
      totalReceipts: receipts.length,
      processedReceipts: receipts.filter((r) => r.status === 'processed').length,
      pendingReceipts: receipts.filter((r) => r.status === 'pending').length,
    }),
    [receipts],
  );

  const filteredReceipts = useMemo(() => {
    return receipts.filter((receipt) => {
      const matchesTab = activeTab === 'all' || receipt.status === activeTab;
      const matchesSearch =
        receipt.merchant.toLowerCase().includes(searchTerm.toLowerCase()) ||
        receipt.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (receipt.notes && receipt.notes.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (receipt.tags &&
          (Array.isArray(receipt.tags)
            ? receipt.tags.some((tag) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
            : receipt.tags.toLowerCase().includes(searchTerm.toLowerCase())));
      return matchesTab && matchesSearch;
    });
  }, [receipts, activeTab, searchTerm]);

  const sortedReceipts = useMemo(() => {
    if (!sortConfig) return filteredReceipts;
    return [...filteredReceipts].sort((a, b) => {
      if (!sortConfig) return 0;
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue === undefined || bValue === undefined) return 0;

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredReceipts, sortConfig]);

  const requestSort = (key: keyof ReceiptType) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  const toggleReceiptSelection = (id: number) => {
    setSelectedReceipts((prev: number[]) =>
      prev.includes(id) ? prev.filter((receiptId: number) => receiptId !== id) : [...prev, id],
    );
  };

  useEffect(() => {
    if (selectAll) {
      setSelectedReceipts(sortedReceipts.map((r) => r.id));
    } else {
      setSelectedReceipts([]);
    }
  }, [selectAll, sortedReceipts, setSelectedReceipts]);

  useEffect(() => {
    setSelectedReceipts([]);
    setSelectAll(false);
  }, [activeTab, setSelectAll, setSelectedReceipts]);

  const categoryClasses = (category: string): string => {
    const normalizedCategory = category.toLowerCase();
    return `bg-category-${normalizedCategory}-light-bg text-category-${normalizedCategory}-light-text border-category-${normalizedCategory}-light-border dark:bg-category-${normalizedCategory}-dark-bg dark:text-category-${normalizedCategory}-dark-text`;
  };

  return (
    <Card className="border-0 shadow-lg">
      <CardHeader className="pb-4">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle className="text-xl flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Receipt History
            </CardTitle>
            <CardDescription className="text-base">
              View and manage your uploaded receipts with advanced filtering
            </CardDescription>
          </div>
          <div className="flex gap-3">
            <div className="relative  ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Search receipts..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 border-green-950 shadow-green-950 rounded-xl dark:text-white"
              />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="bordered" size="sm">
                  <SlidersHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Sort By</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => requestSort('date')}>
                  <Calendar className="h-4 w-4 mr-2" />
                  Date
                  {sortConfig?.key === 'date' && <ArrowUpDown className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => requestSort('amount')}>
                  <DollarSign className="h-4 w-4 mr-2" />
                  Amount
                  {sortConfig?.key === 'amount' && <ArrowUpDown className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => requestSort('merchant')}>
                  <FileText className="h-4 w-4 mr-2" />
                  Merchant
                  {sortConfig?.key === 'merchant' && <ArrowUpDown className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => requestSort('category')}>
                  <Tag className="h-4 w-4 mr-2" />
                  Category
                  {sortConfig?.key === 'category' && <ArrowUpDown className="h-4 w-4 ml-2" />}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="all" className="w-full" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3 mb-6 h-12 bg-primary-50  ">
            <TabsTrigger value="all" className="text-base font-medium data-[state=active]:bg-background">
              All ({receipts.length})
            </TabsTrigger>
            <TabsTrigger value="processed" className="text-base font-medium data-[state=active]:bg-background">
              Processed ({stats.processedReceipts})
            </TabsTrigger>
            <TabsTrigger value="pending" className="text-base font-medium data-[state=active]:bg-background">
              Pending ({stats.pendingReceipts})
            </TabsTrigger>
          </TabsList>

          {selectedReceipts.length > 0 && (
            <div className="flex items-center justify-between bg-muted/30 p-3 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="select-all"
                  checked={selectAll}
                  onCheckedChange={(checked) => setSelectAll(!!checked)}
                />
                <Label htmlFor="select-all" className="text-sm font-medium">
                  {selectedReceipts.length} {selectedReceipts.length === 1 ? 'receipt' : 'receipts'} selected
                </Label>
              </div>
              <div className="flex gap-2">
                <Button variant="bordered" size="sm" onClick={() => handleExport('csv')}>
                  <Download className="h-4 w-4 mr-2" />
                  Export Selected
                </Button>
                <Button color="danger" size="sm" onClick={() => setShowDeleteDialog(true)}>
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Selected
                </Button>
              </div>
            </div>
          )}

          <TabsContent value={activeTab} className="mt-0">
            <div className="space-y-3">
              {sortedReceipts.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-60 rounded-lg border-2 border-dashed border-muted bg-muted/20">
                  <Receipt className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-lg font-medium text-muted-foreground">No receipts found</p>
                  <p className="text-sm text-muted-foreground">Try adjusting your search or upload new receipts</p>
                </div>
              ) : (
                sortedReceipts.map((receipt) => (
                  <Card
                    key={receipt.id}
                    className={cn(
                      'border hover:border-primary/20 transition-all duration-200 hover:shadow-md bg-background/50',
                      selectedReceipts.includes(receipt.id) && 'border-primary bg-primary/5',
                    )}
                  >
                    <CardContent className="p-5">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <Checkbox
                            checked={selectedReceipts.includes(receipt.id)}
                            onCheckedChange={() => toggleReceiptSelection(receipt.id)}
                            className="mr-1"
                            aria-label={`Select receipt from ${receipt.merchant}`}
                          />
                          <div className="p-3 rounded-lg bg-primary/10">
                            <Receipt className="h-5 w-5 text-primary" />
                          </div>
                          <div className="space-y-2">
                            <div className="flex items-center gap-3 flex-wrap">
                              <h3 className="font-semibold text-lg">{receipt.merchant}</h3>
                              <Badge
                                variant="outline"
                                className={`${categoryClasses(receipt.category)} text-xs font-medium`}
                              >
                                {receipt.category}
                              </Badge>
                              <Badge
                                variant={
                                  receipt.status === 'processed'
                                    ? 'default'
                                    : receipt.status === 'pending'
                                    ? 'secondary'
                                    : 'destructive'
                                }
                                className="text-xs"
                              >
                                {receipt.status === 'processed' ? (
                                  <>
                                    <CheckCircle className="h-3 w-3 mr-1" /> Processed
                                  </>
                                ) : receipt.status === 'pending' ? (
                                  <>
                                    <Clock className="h-3 w-3 mr-1" /> Pending
                                  </>
                                ) : (
                                  <>
                                    <AlertCircle className="h-3 w-3 mr-1" /> Rejected
                                  </>
                                )}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground flex-wrap">
                              <span className="flex items-center gap-1">
                                <Calendar className="h-3 w-3" />
                                {format(new Date(receipt.date), 'MMM dd, yyyy')}
                              </span>
                              <span>•</span>
                              <span>{receipt.paymentMethod}</span>
                              <span>•</span>
                              <span className="flex items-center gap-1">
                                <TrendingUp className="h-3 w-3" />
                                {receipt.confidence}% confidence
                              </span>
                            </div>
                            {receipt.tags && (Array.isArray(receipt.tags) ? receipt.tags.length > 0 : !!receipt.tags) && (
                              <div className="flex flex-wrap gap-1">
                                {(Array.isArray(receipt.tags) ? receipt.tags : [receipt.tags]).map((tag, index) => (
                                  <Badge key={index} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>

                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="text-2xl font-bold text-foreground">
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'USD',
                                minimumFractionDigits: 2,
                              }).format(receipt.amount)}
                            </div>
                            <div className="text-sm text-muted-foreground">
                              Tax:{' '}
                              {new Intl.NumberFormat('en-US', {
                                style: 'currency',
                                currency: 'NRP',
                                minimumFractionDigits: 2,
                              }).format(receipt.taxAmount)}
                            </div>
                          </div>

                          <div className="flex gap-2">
                            <Button
                              variant="bordered"
                              size="sm"
                              className="gap-2"
                              onClick={() => setViewReceipt(receipt)}
                            >
                              <Eye className="h-4 w-4" />
                              View
                            </Button>
                            {receipt.status === 'pending' && (
                              <Button size="sm" className="gap-2">
                                <CheckCircle className="h-4 w-4" />
                                Process
                              </Button>
                            )}
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => setViewReceipt(receipt)}>
                                  <Eye className="h-4 w-4 mr-2" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Download className="h-4 w-4 mr-2" />
                                  Download
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Edit className="h-4 w-4 mr-2" />
                                  Edit Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <Share2 className="h-4 w-4 mr-2" />
                                  Share Receipt
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                  className="text-destructive focus:text-destructive"
                                  onClick={() => {
                                    setSelectedReceipts([receipt.id]);
                                    setShowDeleteDialog(true);
                                  }}
                                >
                                  <Trash2 className="h-4 w-4 mr-2" />
                                  Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))
              )}
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <div className="text-sm text-muted-foreground">
          Showing {sortedReceipts.length} of {receipts.length} receipts
        </div>
        <div className="flex items-center gap-2">
          <Button variant="bordered" size="sm" disabled>
            Previous
          </Button>
          <Button variant="bordered" size="sm" disabled>
            Next
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}