
"use client"

import { AccountsWidget } from '@/components/ui/accountUi/accountWidget';
import { BudgetProgress } from '@/components/dashboardUI/budgetProgress';
import { CategoryBreakdown } from '@/components/dashboardUI/categoryBreakdown';
import { OverviewChart } from '@/components/dashboardUI/overviewChart';
import { RecentTransactions } from '@/components/dashboardUI/recentTransactions';
import { StatsCards } from '@/components/dashboardUI/statsCards';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function Dashboard() {
  return (
    <div className="flex-1 max-auto space-y-4 p-4 md:p-8 ">
      <h1 className='font-semibold text-black dark:text-white'>Welcome to dashboard </h1>
      <p className='text-sm text-black dark:text-white'>Tracker your money and manage it</p>
      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <StatsCards />
      </div>
      <div className="grid gap-4 grid-cols-4">
        <OverviewChart />
      </div>
      <Tabs defaultValue="Accounts & Category" >
        <TabsList>
          <TabsTrigger value="Accounts & Category">Accounts & Category</TabsTrigger>
          <TabsTrigger value="BudgetProgress">Budget Progress</TabsTrigger>
          <TabsTrigger value="RecentTransactions">Recent Transactions</TabsTrigger>

        </TabsList>
        
        <TabsContent value="Accounts & Category">
          <div className="grid gap-4 grid-cols-4">
            <AccountsWidget />
            <CategoryBreakdown />
          </div>
        </TabsContent>
        <TabsContent value="BudgetProgress">
          <div className="grid gap-4 grid-cols-4">
            <BudgetProgress />
          </div>
        </TabsContent>
        <TabsContent value="RecentTransactions">
          <div className="grid gap-4 grid-cols-4">
            <RecentTransactions />
          </div>
        </TabsContent>
      </Tabs>




    </div>
  );
}
