"use client";

import {
  Card,
  CardHeader,
  CardContent,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

import { Search, Filter, X, ChevronDown } from "lucide-react";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Input } from "../ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "@heroui/button";

interface AccountFiltersProps {
  accountFilter: string;
  setAccountFilter: (filter: string) => void;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  sortOrder: string;
  setSortOrder: (order: string) => void;
}

export default function AccountFilters({
  accountFilter,
  setAccountFilter,
  searchQuery,
  setSearchQuery,
  setSortOrder,
}: AccountFiltersProps) {
  return (
    <Card className="bg-white dark:bg-slate-800 shadow-sm">
      <CardHeader className="pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <CardTitle>Account Overview</CardTitle>
            <CardDescription>
              Manage and track all your financial accounts
            </CardDescription>
          </div>
          <Tabs
            defaultValue="all"
            className="w-full md:w-auto "
            value={accountFilter}
            onValueChange={setAccountFilter}
          >
            <TabsList className="grid w-full grid-cols-6 bg-primary-50">
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="checking">Checking</TabsTrigger>
              <TabsTrigger value="savings">Savings</TabsTrigger>
              <TabsTrigger value="credit">Credit</TabsTrigger>
              <TabsTrigger value="cash">Cash</TabsTrigger>
              <TabsTrigger value="investment">Investment</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-2 pb-6">
          <div className="relative w-full md:w-auto flex-1 max-w-sm">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500"
              aria-hidden="true"
            />
            <Input
              placeholder="Search accounts..."
              className="pl-10 h-10 border-green-700 shadow-md rounded-lg"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              aria-label="Search accounts"
            />
            {searchQuery && (
              <button
                className="absolute right-3 top-1/2 -translate-y-1/2"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
              >
                <X
                  className="h-4 w-4 text-slate-500 hover:text-slate-700"
                  aria-hidden="true"
                />
              </button>
            )}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="bordered" size="sm" className="h-9">
                <Filter className="mr-2 h-4 w-4" aria-hidden="true" />
                <span>Sort By</span>
                <ChevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[200px]">
              <DropdownMenuLabel>Sort Accounts</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => setSortOrder("default")}>
                Default Order
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("highest-balance")}>
                Highest Balance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("lowest-balance")}>
                Lowest Balance
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => setSortOrder("recently-updated")}
              >
                Recently Updated
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortOrder("alphabetical")}>
                Alphabetical
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );
}
