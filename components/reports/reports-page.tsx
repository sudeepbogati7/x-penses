import ReportView from "@/components/reports/report-view"
import { useExpenseContext } from "@/components/ExpenseContext"

export default function ReportsPage() {
  const { expenseData } = useExpenseContext()
  const expenses = expenseData

  // Sample expensesByCategory data (replace with actual calculation if needed)
  const expensesByCategory = [
    { category: "Food", amount: 190 },
    { category: "Utilities", amount: 90 },
  ]

  return <ReportView expenses={expenses} expensesByCategory={expensesByCategory} />
}

