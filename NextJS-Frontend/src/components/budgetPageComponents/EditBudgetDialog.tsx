'use client';

import { useState, useEffect } from 'react';

import { Home, Utensils, Car, Gamepad2, ShoppingBag, Zap, Heart, Sparkles, Save, Loader2, AlertCircle, Edit } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Budget, EditFormData, EditFormErrors, validateEditForm,  getIconColor } from '@/lib/budgetUtils';
import { updateBudget } from '@/app/api/fetchBudgets';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';
import { Alert, AlertDescription } from '../ui/alert';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Button } from '@heroui/button';

interface EditBudgetDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void; 
  editingBudgetId: number | null;
  budgets: Budget[];
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
  setEditingBudget: (id: number | null) => void;
}

export default function EditBudgetDialog({ open, setOpen, editingBudgetId, budgets, setBudgets, setEditingBudget }: EditBudgetDialogProps) {
  const [formData, setFormData] = useState<EditFormData>({ name: '', amount: '', period: '', icon: '', description: '' });
  const [formErrors, setFormErrors] = useState<EditFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (editingBudgetId) {
      const budget = budgets.find((b) => b.id === editingBudgetId);
      if (budget) {
        setFormData({
          name: budget.name,
          amount: budget.max.toString(),
          period: budget.period,
          icon: budget.icon,
          description: '',
        });
        setFormErrors({});
      }
    }
  }, [editingBudgetId, budgets]);

  const handleSaveEdit = async () => {
    const errors = validateEditForm(formData, budgets, editingBudgetId);
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    const loadingToast = toast.loading('Updating budget...', {
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });

    try {
      const updatedBudget = {
        id: editingBudgetId!,
        name: formData.name.trim(),
        current: budgets.find((b) => b.id === editingBudgetId)!.current,
        max: Number.parseFloat(formData.amount),
        color: getIconColor(formData.icon),
        icon: formData.icon,
        period: formData.period,
        lastUpdated: 'just now',
        trend: budgets.find((b) => b.id === editingBudgetId)!.trend,
        category: ['housing', 'food', 'transportation', 'utilities', 'healthcare'].includes(formData.icon) ? 'essential' : 'lifestyle',
      };
      await updateBudget(updatedBudget);
      setBudgets((prev) => prev.map((b) => (b.id === editingBudgetId ? updatedBudget : b)));
      toast.dismiss(loadingToast);
      toast.success('Budget updated successfully!', {
        duration: 4000,
        style: { borderRadius: '10px', background: '#10b981', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#10b981' },
      });
      setOpen(false);
      setEditingBudget(null);
      setFormData({ name: '', amount: '', period: '', icon: '', description: '' });
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(error instanceof Error ? error.message : 'An unexpected error occurred', {
        duration: 5000,
        style: { borderRadius: '10px', background: '#ef4444', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#ef4444' },
      });
      setFormErrors({ general: error instanceof Error ? error.message : 'An unexpected error occurred' });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setOpen(false);
    setEditingBudget(null);
    setFormData({ name: '', amount: '', period: '', icon: '', description: '' });
    setFormErrors({});
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl flex items-center gap-2">
            <Edit className="h-5 w-5" />
            Edit Budget
          </DialogTitle>
          <DialogDescription>Update the details of your budget. Changes will be saved immediately.</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          {formErrors.general && (
            <Alert className="mb-4" variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertDescription>{formErrors.general}</AlertDescription>
            </Alert>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="edit-category" className="text-sm font-medium">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="edit-category"
                placeholder="e.g., Groceries, Gas"
                className={cn('h-10 border border-green-600 hover:border-2 hover:border-green-700', formErrors.name && 'border-red-300 focus:border-red-500')}
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (formErrors.name) setFormErrors({ ...formErrors, name: undefined });
                }}
                disabled={isSubmitting}
              />
              {formErrors.name && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formErrors.name}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-amount" className="text-sm font-medium">
                Budget Amount <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <Input
                  id="edit-amount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  min="0"
                  max="1000000"
                  className={cn('pl-8 h-10 border border-green-600 hover:border-2 hover:border-green-700', formErrors.amount && 'border-red-300 focus:border-red-500')}
                  value={formData.amount}
                  onChange={(e) => {
                    setFormData({ ...formData, amount: e.target.value });
                    if (formErrors.amount) setFormErrors({ ...formErrors, amount: undefined });
                  }}
                  disabled={isSubmitting}
                />
              </div>
              {formErrors.amount && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formErrors.amount}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-period" className="text-sm font-medium">
                Budget Period <span className="text-red-500">*</span>
              </Label>
              <Select
                value={formData.period}
                onValueChange={(value) => {
                  setFormData({ ...formData, period: value });
                  if (formErrors.period) setFormErrors({ ...formErrors, period: undefined });
                }}
                disabled={isSubmitting}
              >
                <SelectTrigger id="edit-period" className={cn('h-10 border border-green-600 hover:border-2 hover:border-green-700', formErrors.period && 'border-red-300 focus:border-red-500')}>
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
              {formErrors.period && (
                <p className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="h-3 w-3" />
                  {formErrors.period}
                </p>
              )}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="edit-icon" className="text-sm font-medium">
                Category Icon
              </Label>
              <Select value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })} disabled={isSubmitting}>
                <SelectTrigger id="edit-icon" className="h-10 border border-green-600 hover:border-2 hover:border-green-700">
                  <SelectValue placeholder="Choose icon" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="housing"><div className="flex items-center"><Home className="mr-2 h-4 w-4" />Housing</div></SelectItem>
                  <SelectItem value="food"><div className="flex items-center"><Utensils className="mr-2 h-4 w-4" />Food & Dining</div></SelectItem>
                  <SelectItem value="transportation"><div className="flex items-center"><Car className="mr-2 h-4 w-4" />Transportation</div></SelectItem>
                  <SelectItem value="entertainment"><div className="flex items-center"><Gamepad2 className="mr-2 h-4 w-4" />Entertainment</div></SelectItem>
                  <SelectItem value="shopping"><div className="flex items-center"><ShoppingBag className="mr-2 h-4 w-4" />Shopping</div></SelectItem>
                  <SelectItem value="utilities"><div className="flex items-center"><Zap className="mr-2 h-4 w-4" />Utilities</div></SelectItem>
                  <SelectItem value="healthcare"><div className="flex items-center"><Heart className="mr-2 h-4 w-4" />Healthcare</div></SelectItem>
                  <SelectItem value="personal"><div className="flex items-center"><Sparkles className="mr-2 h-4 w-4" />Personal Care</div></SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2 md:col-span-2">
              <Label htmlFor="edit-description" className="text-sm font-medium">
                Description <span className="text-slate-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="edit-description"
                placeholder="Add notes about this budget..."
                className="h-10 border border-green-600 hover:border-2 hover:border-green-700"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                disabled={isSubmitting}
              />
            </div>
          </div>
        </div>
        <DialogFooter className="flex gap-2">
          <Button variant="bordered" onClick={handleCancelEdit} disabled={isSubmitting} className="flex-1 w-full text-balck dark:text-white font-semibold py-3 rounded-lg disabled:opacity-50 text-md">
            Cancel
          </Button>
          <Button
            onClick={handleSaveEdit}
            disabled={isSubmitting}
            color="primary"
            size = "md"
            className="flex-1 w-full text-white font-semibold py-3 rounded-lg hover:bg-lime-950 focus:ring-2 focus:ring-lime-950 transition-all disabled:opacity-50 text-md"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Saving...
              </>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}