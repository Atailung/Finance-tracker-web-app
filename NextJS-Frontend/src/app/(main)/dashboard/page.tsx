
"use client"

import { AccountsWidget } from "@/components/ui/accountUi/accountWidget"
import { BudgetProgress } from "@/components/dashboardUI/budgetProgress"
import { CategoryBreakdown } from "@/components/dashboardUI/categoryBreakdown"
import { OverviewChart } from "@/components/dashboardUI/overviewChart"
import { RecentTransactions } from "@/components/dashboardUI/recentTransactions"
import { StatsCards } from "@/components/dashboardUI/statsCards"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"

export default function Dashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold tracking-tight">Dashboard Overview</h1>
        <p className="text-muted-foreground">Track your finances and manage your money effectively.</p>
      </div>

      {/* Stats Cards Section */}
      <StatsCards />

      {/* Overview Chart Section */}
      <Card>
        <CardContent className="pt-6">
          <OverviewChart />
        </CardContent>
      </Card>

      {/* Tabbed Content Section */}
      <Tabs defaultValue="accounts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="accounts">Accounts & Categories</TabsTrigger>
          <TabsTrigger value="budget">Budget Progress</TabsTrigger>
          <TabsTrigger value="transactions">Recent Transactions</TabsTrigger>
        </TabsList>

        <TabsContent value="accounts" className="mt-4 space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardContent className="pt-6">
                <AccountsWidget />
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <CategoryBreakdown />
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="budget" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <BudgetProgress />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="transactions" className="mt-4">
          <Card>
            <CardContent className="pt-6">
              <RecentTransactions />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
