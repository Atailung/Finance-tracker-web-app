'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';
import { Badge } from '@/components/ui/badge';
import { CalendarIcon, DollarSign, Tag, CreditCard, CheckCircle } from 'lucide-react';
import { format } from 'date-fns';
import { formatCurrency } from "@/lib/accountUtils";
import { ACCOUNTS, CATEGORIES, STATUS_OPTIONS } from '@/app/constant/receipts';

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

interface FilterPanelProps {
  filterOptions: FilterOptions;
  setFilterOptions: (options: FilterOptions) => void;
  onApply: () => void;
  onReset: () => void;
}

export function FilterPanel({ filterOptions, setFilterOptions, onApply, onReset }: FilterPanelProps) {
  const [localFilters, setLocalFilters] = useState<FilterOptions>(filterOptions);

  const handleCategoryToggle = (category: string) => {
    setLocalFilters((prev) => {
      const categories = prev.categories.includes(category)
        ? prev.categories.filter((c) => c !== category)
        : [...prev.categories, category];
      return { ...prev, categories };
    });
  };

  const handleAccountToggle = (account: string) => {
    setLocalFilters((prev) => {
      const accounts = prev.accounts.includes(account)
        ? prev.accounts.filter((a) => a !== account)
        : [...prev.accounts, account];
      return { ...prev, accounts };
    });
  };

  const handleStatusToggle = (status: string) => {
    setLocalFilters((prev) => {
      const statuses = prev.status.includes(status)
        ? prev.status.filter((s) => s !== status)
        : [...prev.status, status];
      return { ...prev, status: statuses };
    });
  };

  const handleApply = () => {
    setFilterOptions(localFilters);
    onApply();
  };

  const handleReset = () => {
    const resetFilters: FilterOptions = {
      dateRange: { start: null, end: null },
      categories: [],
      accounts: [],
      amountRange: { min: -5000, max: 5000 },
      status: [],
      merchants: [],
      paymentMethods: [],
    };
    setLocalFilters(resetFilters);
    setFilterOptions(resetFilters);
    onReset();
  };

  return (
    <div className="space-y-6 p-1">
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <CalendarIcon className="h-4 w-4 mr-2" />
            Date Range
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-1">
              <Label htmlFor="start-date" className="text-xs">
                Start Date
              </Label>
              <Input
                id="start-date"
                type="date"
                value={localFilters.dateRange.start ? format(localFilters.dateRange.start, 'yyyy-MM-dd') : ''}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange,
                      start: e.target.value ? new Date(e.target.value) : null,
                    },
                  }))
                }
                className="h-8"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="end-date" className="text-xs">
                End Date
              </Label>
              <Input
                id="end-date"
                type="date"
                value={localFilters.dateRange.end ? format(localFilters.dateRange.end, 'yyyy-MM-dd') : ''}
                onChange={(e) =>
                  setLocalFilters((prev) => ({
                    ...prev,
                    dateRange: {
                      ...prev.dateRange,
                      end: e.target.value ? new Date(e.target.value) : null,
                    },
                  }))
                }
                className="h-8"
              />
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <Tag className="h-4 w-4 mr-2" />
            Categories
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {CATEGORIES.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={localFilters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryToggle(category)}
                />
                <Label htmlFor={`category-${category}`} className="text-sm cursor-pointer">
                  {category}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <CreditCard className="h-4 w-4 mr-2" />
            Accounts
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {ACCOUNTS.map((account) => (
              <div key={account} className="flex items-center space-x-2">
                <Checkbox
                  id={`account-${account}`}
                  checked={localFilters.accounts.includes(account)}
                  onCheckedChange={() => handleAccountToggle(account)}
                />
                <Label htmlFor={`account-${account}`} className="text-sm cursor-pointer">
                  {account}
                </Label>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <DollarSign className="h-4 w-4 mr-2" />
            Amount Range
          </h3>
          <div className="space-y-4">
            <Slider
              defaultValue={[localFilters.amountRange.min, localFilters.amountRange.max]}
              min={-5000}
              max={5000}
              step={50}
              onValueChange={(value) =>
                setLocalFilters((prev) => ({
                  ...prev,
                  amountRange: { min: value[0], max: value[1] },
                }))
              }
            />
            <div className="flex items-center justify-between">
              <span className="text-sm">{formatCurrency(localFilters.amountRange.min)}</span>
              <span className="text-sm">{formatCurrency(localFilters.amountRange.max)}</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2 flex items-center">
            <CheckCircle className="h-4 w-4 mr-2" />
            Status
          </h3>
          <div className="flex flex-wrap gap-2">
            {STATUS_OPTIONS.map((status) => (
              <Badge
                key={status}
                variant={localFilters.status.includes(status) ? 'default' : 'outline'}
                className="cursor-pointer capitalize"
                onClick={() => handleStatusToggle(status)}
              >
                {status}
              </Badge>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-between pt-4 border-t">
        <Button variant="ghost" size="sm" onClick={handleReset}>
          Reset Filters
        </Button>
        <Button size="sm" onClick={handleApply}>
          Apply Filters
        </Button>
      </div>
    </div>
  );
}