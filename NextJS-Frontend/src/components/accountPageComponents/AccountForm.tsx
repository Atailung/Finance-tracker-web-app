'use client';

import { useState, useCallback } from 'react';

import { AlertCircle } from 'lucide-react';
import { Account, FormErrors, getIconComponent, accountTypes, validateAccountForm } from '@/lib/accountUtils';
import { Alert, AlertDescription } from '../ui/alert';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Switch } from '../ui/switch';
import { Button } from '../ui/button';

interface AccountFormProps {
  account?: Account | null;
  onSubmit: (account: Partial<Account>) => void;
  onDelete?: (id: number) => void;
  onCancel: () => void;
  isSubmitting: boolean;
}

export default function AccountForm({ account, onSubmit, onDelete, onCancel, isSubmitting }: AccountFormProps) {
  const [formData, setFormData] = useState<Partial<Account>>({
    name: account?.name || '',
    institution: account?.institution || '',
    type: account?.type || 'checking',
    balance: account?.balance || 0,
    accountNumber: account?.accountNumber?.replace(/\*+/g, '') || '',
    isDefault: account?.isDefault || false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const handleChange = useCallback(
    (field: string, value: string | number | boolean) => {
      setFormData((prev) => ({ ...prev, [field]: value }));
      if (errors[field]) {
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[field];
          return newErrors;
        });
      }
    },
    [errors]
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAccountForm(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    const formattedData = {
      ...formData,
      id: account?.id,
      accountNumber: formData.accountNumber ? `****${formData.accountNumber}` : undefined,
    };
    onSubmit(formattedData);
  };

  const handleDelete = () => {
    if (deleteConfirm && account?.id && onDelete) {
      onDelete(account.id);
    } else {
      setDeleteConfirm(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {Object.keys(errors).length > 0 && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>Please correct the errors in the form before submitting.</AlertDescription>
        </Alert>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="grid gap-2">
          <Label htmlFor="name" className="text-sm font-medium">
            Account Name <span className="text-red-500">*</span>
          </Label>
          <Input
            id="name"
            placeholder="e.g., Chase Checking"
            className="h-10"
            value={formData.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-red-500" role="alert">
              {errors.name}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="institution" className="text-sm font-medium">
            Financial Institution
          </Label>
          <Input
            id="institution"
            placeholder="e.g., Chase Bank"
            className="h-10"
            value={formData.institution || ''}
            onChange={(e) => handleChange('institution', e.target.value)}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="type" className="text-sm font-medium">
            Account Type <span className="text-red-500">*</span>
          </Label>
          <Select value={formData.type || 'checking'} onValueChange={(value) => handleChange('type', value)}>
            <SelectTrigger
              id="type"
              className="h-10"
              aria-invalid={!!errors.type}
              aria-describedby={errors.type ? 'type-error' : undefined}
            >
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              {accountTypes.map((type) => {
                const Icon = getIconComponent(type.icon);
                return (
                  <SelectItem key={type.value} value={type.value}>
                    <div className="flex items-center">
                      <div className={`p-1 rounded-full ${type.color.replace('bg-', 'bg-opacity-20 bg-')}`}>
                        <Icon className={`h-4 w-4 ${type.color.replace('bg-', 'text-')}`} />
                      </div>
                      <span className="ml-2">{type.label}</span>
                    </div>
                  </SelectItem>
                );
              })}
            </SelectContent>
          </Select>
          {errors.type && (
            <p id="type-error" className="text-sm text-red-500" role="alert">
              {errors.type}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="balance" className="text-sm font-medium">
            Current Balance <span className="text-red-500">*</span>
          </Label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
            <Input
              id="balance"
              placeholder="0.00"
              type="number"
              step="0.01"
              className="pl-8 h-10"
              value={formData.balance?.toString() || ''}
              onChange={(e) => handleChange('balance', Number.parseFloat(e.target.value) || 0)}
              aria-invalid={!!errors.balance}
              aria-describedby={errors.balance ? 'balance-error' : undefined}
            />
          </div>
          {errors.balance && (
            <p id="balance-error" className="text-sm text-red-500" role="alert">
              {errors.balance}
            </p>
          )}
        </div>
        <div className="grid gap-2">
          <Label htmlFor="accountNumber" className="text-sm font-medium">
            Account Number (Last 4 digits)
          </Label>
          <Input
            id="accountNumber"
            placeholder="e.g., 1234"
            maxLength={4}
            className="h-10"
            value={formData.accountNumber || ''}
            onChange={(e) => handleChange('accountNumber', e.target.value)}
            aria-invalid={!!errors.accountNumber}
            aria-describedby={errors.accountNumber ? 'accountNumber-error' : undefined}
          />
          {errors.accountNumber && (
            <p id="accountNumber-error" className="text-sm text-red-500" role="alert">
              {errors.accountNumber}
            </p>
          )}
        </div>
        <div className="flex items-center space-x-2 pt-4">
          <Switch
            id="default-account"
            checked={formData.isDefault || false}
            onCheckedChange={(checked) => handleChange('isDefault', checked)}
          />
          <Label htmlFor="default-account">Set as default account</Label>
        </div>
      </div>
      {account && onDelete && (
        <div className="border-t pt-4 mt-6">
          <Button type="button" variant="destructive" onClick={handleDelete} className="w-full sm:w-auto">
            {deleteConfirm ? 'Confirm Delete' : 'Delete Account'}
          </Button>
          {deleteConfirm && (
            <p className="text-sm text-red-500 mt-2">This action cannot be undone. Click again to confirm.</p>
          )}
        </div>
      )}
      <div className="flex flex-col-reverse sm:flex-row gap-2 sm:justify-end pt-4 border-t">
        <Button type="button" variant="outline" onClick={onCancel} className="w-full sm:w-auto" disabled={isSubmitting}>
          Cancel
        </Button>
        <Button type="submit" className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700" disabled={isSubmitting}>
          {isSubmitting ? 'Saving...' : account ? 'Save Changes' : 'Add Account'}
        </Button>
      </div>
    </form>
  );
}