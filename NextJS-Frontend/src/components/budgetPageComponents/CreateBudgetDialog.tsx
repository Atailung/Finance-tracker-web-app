'use client';

import { useState } from 'react';

import { Home, Utensils, Car, Gamepad2, ShoppingBag, Zap, Heart, Sparkles, Plus } from 'lucide-react';
import { createBudget } from '@/app/api/fetchBudgets';
import { Budget, getIconColor } from '@/lib/budgetUtils';
import toast from 'react-hot-toast';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Button } from '@heroui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';

interface CreateBudgetDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  setBudgets: React.Dispatch<React.SetStateAction<Budget[]>>;
}

export default function CreateBudgetDialog({ open, setOpen, setBudgets }: CreateBudgetDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    amount: '',
    period: '',
    icon: '',
    description: '',
  });

  const handleCreateBudget = async () => {
    const loadingToast = toast.loading('Creating budget...', {
      style: { borderRadius: '10px', background: '#333', color: '#fff' },
    });
    try {
      const newBudget = {
        name: formData.name.trim(),
        current: 0,
        max: Number.parseFloat(formData.amount),
        color: getIconColor(formData.icon),
        icon: formData.icon || 'housing',
        period: formData.period,
        trend: 'stable',
        category: ['housing', 'food', 'transportation', 'utilities', 'healthcare'].includes(formData.icon) ? 'essential' : 'lifestyle',
      };
      await createBudget(newBudget);
      setBudgets((prev) => [...prev, { ...newBudget, id: prev.length + 1, lastUpdated: 'just now' }]);
      toast.dismiss(loadingToast);
      toast.success('Budget created successfully!', {
        duration: 4000,
        style: { borderRadius: '10px', background: '#10b981', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#10b981' },
      });
      setOpen(false);
      setFormData({ name: '', amount: '', period: '', icon: '', description: '' });
    } catch (error) {
      console.log("failed to create budget:", error)
      toast.dismiss(loadingToast);
      toast.error('Failed to create budget. Please try again.', {
        duration: 5000,
        style: { borderRadius: '10px', background: '#ef4444', color: '#fff' },
        iconTheme: { primary: '#fff', secondary: '#ef4444' },
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button color = "primary" size="sm" className="h-9 text-md dark:text-white ">
          <Plus className="mr-2 h-4 w-4" />
          Create Budget
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-xl">Create New Budget</DialogTitle>
          <DialogDescription>Set up a budget to track your spending in a specific category</DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="category" className="text-sm font-medium">
                Category Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="category"
                placeholder="e.g., Groceries, Gas"
                className="h-10 border border-green-600 hover:border-2 hover:border-green-700"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amount" className="text-sm font-medium">
                Budget Amount <span className="text-red-500">*</span>
              </Label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500">$</span>
                <Input
                  id="amount"
                  placeholder="0.00"
                  type="number"
                  step="0.01"
                  className="pl-8 h-10 border border-green-600 hover:border-2 hover:border-green-700 bg-gray-100"
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="period" className="text-sm font-medium">
                Budget Period <span className="text-red-500">*</span>
              </Label>
              <Select value={formData.period} onValueChange={(value) => setFormData({ ...formData, period: value })}>
                <SelectTrigger id="period" className="h-10 border border-green-600 hover:border-2 hover:border-green-700">
                  <SelectValue placeholder="Select period" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="weekly">Weekly</SelectItem>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="quarterly">Quarterly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="icon" className="text-sm font-medium">
                Category Icon
              </Label>
              <Select  value={formData.icon} onValueChange={(value) => setFormData({ ...formData, icon: value })}>
                <SelectTrigger id="icon" className="h-10 border border-green-600 hover:border-2 hover:border-green-700">
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
              <Label htmlFor="description" className="text-sm font-medium">
                Description <span className="text-slate-400 font-normal">(optional)</span>
              </Label>
              <Input
                id="description"
                placeholder="Add notes about this budget..."
                className="h-10 border border-green-600 hover:border-2 hover:border-green-700"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              />
            </div>
          </div>
        </div>
        <DialogFooter className='gap-2'>
          <Button variant="bordered" onClick={() => setOpen(false)} className="flex-1 w-full dark:text-white text-black font-semibold py-3 rounded-lg disabled:opacity-50 text-md">Cancel</Button>
          <Button onClick={handleCreateBudget} color = "primary" className="flex-1 w-full text-white font-semibold py-3 rounded-lg hover:bg-lime-950 focus:ring-2 focus:ring-lime-950 transition-all disabled:opacity-50 text-md">Create Budget</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}