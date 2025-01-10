import { DashboardHeader } from "@/components/dashboard/dashboard-header"
import { DashboardStats } from "@/components/dashboard/dashboard-stats"
import { ExpenseOverview } from "@/components/dashboard/expense-overview"
import { ExpenseCategories } from "@/components/dashboard/expense-categories"
import { MonthlyComparison } from "@/components/dashboard/monthly-comparison"
import { RecentTransactions } from "@/components/dashboard/recent-transactions"

export default function DashboardPage() {
  return (
    <div className="container mx-auto p-4 space-y-6">
      <DashboardHeader />
      <DashboardStats />
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseOverview />
        <ExpenseCategories />
      </div>
      <MonthlyComparison />
      <RecentTransactions />
    </div>
  )
}

