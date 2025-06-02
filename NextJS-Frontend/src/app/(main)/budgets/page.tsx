"use client";

import { useState, useMemo, useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Budget } from "@/lib/budgetUtils";
import BudgetSummaryCards from "@/components/budgetPageComponents/BudgetSummaryCards";
import BudgetFilters from "@/components/budgetPageComponents/BudgetFilters";
import BudgetList from "@/components/budgetPageComponents/BudgetList";
import CreateBudgetDialog from "@/components/budgetPageComponents/CreateBudgetDialog";
import EditBudgetDialog from "@/components/budgetPageComponents/EditBudgetDialog";
import BudgetDetailsDialog from "@/components/budgetPageComponents/BudgetDetailsDialog";
import { fetchBudgets } from "@/app/api/fetchBudgets";

export default function BudgetsPage() {
  const [budgets, setBudgets] = useState<Budget[]>([]);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openDetailsDialog, setOpenDetailsDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedBudget, setSelectedBudget] = useState<number | null>(null);
  const [editingBudget, setEditingBudget] = useState<number | null>(null);

  // Fetch budgets on mount
  useEffect(() => {
    async function loadBudgets() {
      const budgetData = await fetchBudgets();
      setBudgets(budgetData);
    }
    loadBudgets();
  }, []);

  // Calculate summary statistics
  const totalBudget = budgets.reduce((sum, budget) => sum + budget.max, 0);
  const totalSpent = budgets.reduce((sum, budget) => sum + budget.current, 0);
  const overBudgetCount = budgets.filter(
    (budget) => budget.current > budget.max
  ).length;
  const onTrackCount = budgets.filter(
    (budget) => budget.current <= budget.max * 0.8
  ).length;

  // Filter budgets based on search and filters
  const filteredBudgets = useMemo(() => {
    return budgets.filter((budget) => {
      const matchesSearch = budget.name
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
      const matchesCategory =
        categoryFilter === "all" || budget.category === categoryFilter;
      const matchesStatus =
        statusFilter === "all" ||
        (statusFilter === "over" && budget.current > budget.max) ||
        (statusFilter === "warning" &&
          budget.current > budget.max * 0.8 &&
          budget.current <= budget.max) ||
        (statusFilter === "good" && budget.current <= budget.max * 0.8);
      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [budgets, searchQuery, categoryFilter, statusFilter]);

  const handleViewDetails = (id: number) => {
    setSelectedBudget(id);
    setOpenDetailsDialog(true);
  };

  const handleEditBudget = (id: number) => {
    setEditingBudget(id);
    setOpenEditDialog(true);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6  dark:bg-slate-900 min-h-screen">
      <Toaster
        reverseOrder={false}
        gutter={8}
        toastOptions={{
          className: "",
          duration: 4000,
          style: {
            background: "#363636",
            color: "#fff",
          },
          success: { duration: 3000 },
          error: { duration: 5000 },
        }}
      />
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent dark:from-slate-100 dark:to-slate-300">
            Budget Management
          </h2>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            Track and manage your spending across categories
          </p>
        </div>
        <CreateBudgetDialog
          open={openAddDialog}
          setOpen={setOpenAddDialog}
          setBudgets={setBudgets}
        />
      </div>
      <BudgetSummaryCards
        totalBudget={totalBudget}
        totalSpent={totalSpent}
        onTrackCount={onTrackCount}
        overBudgetCount={overBudgetCount}
      />
      <BudgetFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
      />
      <BudgetList
        budgets={filteredBudgets}
        handleViewDetails={handleViewDetails}
        handleEditBudget={handleEditBudget}
        setBudgets={setBudgets}
      />
      <EditBudgetDialog
        open={openEditDialog}
        setOpen={setOpenEditDialog}
        editingBudgetId={editingBudget}
        budgets={budgets}
        setBudgets={setBudgets}
        setEditingBudget={setEditingBudget}
      />
      <BudgetDetailsDialog
        open={openDetailsDialog}
        setOpen={setOpenDetailsDialog}
        selectedBudgetId={selectedBudget}
        budgets={budgets}
        handleEditBudget={handleEditBudget}
      />
    </div>
  );
}
