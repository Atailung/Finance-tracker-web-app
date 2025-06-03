'use client';

import { useState, useEffect, useCallback } from 'react';

import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import {
  CalendarIcon,
  ArrowUpRight,
  ArrowDownRight,
  Tag,
  CreditCard,
  CheckCircle,
  Clock,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { format } from 'date-fns';
import {
  CATEGORIES,
 
  ACCOUNTS,
  PAYMENT_METHODS,
} from "@/app//constant/receipts";
import {  categoryIcons, accountIcons } from "@/components/common/CategoryIcons";
import { Button } from '@heroui/button';
interface Transaction {
  id?: number;
  date: string | Date;
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

interface TransactionFormProps {
  transaction?: Transaction | null;
  onSubmit: (transaction: Partial<Transaction>) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export function TransactionForm({ transaction, onSubmit, onCancel, isSubmitting }: TransactionFormProps) {
  const [formData, setFormData] = useState<Partial<Transaction>>({
    description: '',
    amount: 0,
    category: '',
    account: '',
    date: new Date(),
    status: 'completed',
    merchant: '',
    notes: '',
    paymentMethod: '',
  });
  const [transactionType, setTransactionType] = useState<'income' | 'expense'>('expense');
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (transaction) {
      setFormData({
        id: transaction.id,
        description: transaction.description,
        amount: Math.abs(transaction.amount),
        category: transaction.category,
        account: transaction.account,
        date: new Date(transaction.date),
        status: transaction.status,
        merchant: transaction.merchant || '',
        notes: transaction.notes || '',
        paymentMethod: transaction.paymentMethod || '',
      });
      setTransactionType(transaction.amount > 0 ? 'income' : 'expense');
    }
  }, [transaction]);

  const handleChange = useCallback(
    (field: string, value: string | number | Date) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors],
  );

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.description?.trim()) {
      newErrors.description = 'Description is required';
    }

    if (!formData.amount || formData.amount <= 0) {
      newErrors.amount = 'Amount must be greater than 0';
    }

    if (!formData.category) {
      newErrors.category = 'Category is required';
    }

    if (!formData.account) {
      newErrors.account = 'Account is required';
    }

    if (!formData.date) {
      newErrors.date = 'Date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const finalAmount = transactionType === 'income' ? formData.amount! : -Math.abs(formData.amount!);

    onSubmit({
      ...formData,
      amount: finalAmount,
      date: formData.date instanceof Date ? formData.date.toISOString() : formData.date,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="flex justify-center">
        <RadioGroup
          value={transactionType}
          onValueChange={(value: 'income' | 'expense') => setTransactionType(value)}
          className="flex space-x-6"
        >
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="expense" id="expense" className="text-red-500" />
            <Label htmlFor="expense" className="flex items-center cursor-pointer">
              <ArrowDownRight className="mr-1 h-4 w-4 text-red-500" />
              Expense
            </Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="income" id="income" className="text-emerald-500" />
            <Label htmlFor="income" className="flex items-center cursor-pointer">
              <ArrowUpRight className="mr-1 h-4 w-4 text-emerald-500" />
              Income
            </Label>
          </div>
        </RadioGroup>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="description" className="text-sm font-medium">
            Description <span className="text-red-500">*</span>
          </Label>
          <Input
            id="description"
            placeholder="e.g., Grocery Shopping"
            className="h-10"
            value={formData.description || ''}
            onChange={(e) => handleChange('description', e.target.value)}
            aria-invalid={!!errors.description}
          />
          {errors.description && <p className="text-sm text-red-500">{errors.description}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="amount" className="text-sm font-medium">
            Amount <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <Input
              id="amount"
              placeholder="0.00"
              type="number"
              step="0.01"
              className="pl-8 h-10"
              value={formData.amount?.toString() || ''}
              onChange={(e) => handleChange('amount', Number.parseFloat(e.target.value) || 0)}
              aria-invalid={!!errors.amount}
            />
          </div>
          {errors.amount && <p className="text-sm text-red-500">{errors.amount}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="date" className="text-sm font-medium">
            Date <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="bordered"
                className={cn(
                  'w-full justify-start text-left font-normal h-10',
                  !formData.date && 'text-muted-foreground',
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.date ? format(new Date(formData.date), 'MMM dd, yyyy') : 'Pick a date'}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0">
              <Calendar
                mode="single"
                selected={formData.date ? new Date(formData.date) : undefined}
                onSelect={(date) => { if (date) handleChange('date', date); }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          {errors.date && <p className="text-sm text-red-500">{errors.date}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="category" className="text-sm font-medium">
            Category <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.category || ''} onValueChange={(value) => handleChange('category', value)}>
            <SelectTrigger id="category" className="h-10" aria-invalid={!!errors.category}>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              {CATEGORIES.map((category) => (
                <SelectItem key={category} value={category}>
                  <div className="flex items-center">
                    {categoryIcons[category] || <Tag className="mr-2 h-4 w-4" />}
                    <span className="ml-2">{category}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.category && <p className="text-sm text-red-500">{errors.category}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="account" className="text-sm font-medium">
            Account <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.account || ''} onValueChange={(value) => handleChange('account', value)}>
            <SelectTrigger id="account" className="h-10" aria-invalid={!!errors.account}>
              <SelectValue placeholder="Select account" />
            </SelectTrigger>
            <SelectContent>
              {ACCOUNTS.map((account) => (
                <SelectItem key={account} value={account}>
                  <div className="flex items-center">
                    {accountIcons[account] || <CreditCard className="mr-2 h-4 w-4" />}
                    <span className="ml-2">{account}</span>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.account && <p className="text-sm text-red-500">{errors.account}</p>}
        </div>

        <div className="grid gap-2">
          <Label htmlFor="merchant" className="text-sm font-medium">
            Merchant
          </Label>
          <Input
            id="merchant"
            placeholder="e.g., Walmart"
            className="h-10"
            value={formData.merchant || ''}
            onChange={(e) => handleChange('merchant', e.target.value)}
          />
        </div>

        <div className="grid gap-2">
          <Label htmlFor="paymentMethod" className="text-sm font-medium">
            Payment Method
          </Label>
          <Select value={formData.paymentMethod || ''} onValueChange={(value) => handleChange('paymentMethod', value)}>
            <SelectTrigger id="paymentMethod" className="h-10">
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((method) => (
                <SelectItem key={method} value={method}>
                  {method}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label htmlFor="status" className="text-sm font-medium">
            Status
          </Label>
          <Select value={formData.status || 'completed'} onValueChange={(value) => handleChange('status', value)}>
            <SelectTrigger id="status" className="h-10">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="completed">
                <div className="flex items-center">
                  <CheckCircle className="mr-2 h-4 w-4 text-emerald-500" />
                  Completed
                </div>
              </SelectItem>
              <SelectItem value="pending">
                <div className="flex items-center">
                  <Clock className="mr-2 h-4 w-4 text-amber-500" />
                  Pending
                </div>
              </SelectItem>
              <SelectItem value="failed">
                <div className="flex items-center">
                  <AlertCircle className="mr-2 h-4 w-4 text-red-500" />
                  Failed
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-2 md:col-span-2">
          <Label htmlFor="notes" className="text-sm font-medium">
            Notes
          </Label>
          <Textarea
            id="notes"
            placeholder="Add any additional details..."
            className="min-h-[80px]"
            value={formData.notes || ''}
            onChange={(e) => handleChange('notes', e.target.value)}
          />
        </div>
      </div>

      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-4 border-t">
        <Button type="button" variant="bordered" onClick={onCancel} className="w-full sm:w-auto" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button
          type="submit"
          className={cn(
            'w-full sm:w-auto',
            transactionType === 'income' ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-blue-600 hover:bg-blue-700',
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Saving...
            </>
          ) : transaction ? (
            'Update Transaction'
          ) : (
            'Save Transaction'
          )}
        </Button>
      </div>
    </form>
  );
}