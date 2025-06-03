'use client';


import { Search, Filter, X } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Tabs, TabsList, TabsTrigger } from '../ui/tabs';
import { Input } from '../ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { Button } from '@heroui/button';

interface BudgetFiltersProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  categoryFilter: string;
  setCategoryFilter: (filter: string) => void;
  statusFilter: string;
  setStatusFilter: (filter: string) => void;
}

export default function BudgetFilters({
  searchQuery,
  setSearchQuery,
  categoryFilter,
  setCategoryFilter,
  setStatusFilter,
}: BudgetFiltersProps) {
  return (
    <Card className="bg-white dark:bg-slate-800 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Budget Overview</CardTitle>
            <CardDescription>Monitor your spending across all categories</CardDescription>
          </div>
          <Tabs defaultValue="all" className="w-full md:w-auto" value={categoryFilter} onValueChange={setCategoryFilter}>
            <TabsList className="grid w-full grid-cols-3 bg-primary-50 ">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="essential">Essential</TabsTrigger>
              <TabsTrigger value="lifestyle">Lifestyle</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex  flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-2 pb-6">
          <div className="relative w-full md:w-auto flex-1 max-w-sm border-2 border-green-600 rounded-lg ">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
            <Input
              placeholder="Search budgets..."
              className="pl-10 h-10 "
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
              <Button variant="bordered" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" />
                Filter
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Filter by Status</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setStatusFilter('all')}>All Budgets</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('good')}>On Track</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('warning')}>Near Limit</DropdownMenuItem>
              <DropdownMenuItem onClick={() => setStatusFilter('over')}>Over Budget</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}