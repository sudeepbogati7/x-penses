'use client';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { DollarSign, CreditCard, TrendingUp, TrendingDown } from 'lucide-react'
import { useExpenseContext } from "../ExpenseContext";
type ExpenseDataTypes= {
  id: string;
  expenseTitle: string;
  amount: number;
  category: string;
  created_at: string;
}

type DashboardStatsProps = {

  expenseData: ExpenseDataTypes[];

};


export const DashboardStats: React.FC<DashboardStatsProps> = ({ expenseData }) => {


  const totalExpense = expenseData.reduce((sum, expense) => sum + expense.amount, 0)
  const averageExpense = totalExpense / expenseData.length || 0


  const highestExpenseAmount = Math.max(
    ...expenseData.map((expense) => expense.amount)
  );

  // Find the expense with the highest amount
  const highestExpense = expenseData.find(
    (expense) => expense.amount === highestExpenseAmount
  );

  // Extract the title of the highest expense
  const highestExpenseTitle = highestExpense ? highestExpense.expenseTitle : null;

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {/* <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">$1,234.56</div>
          <p className="text-xs text-muted-foreground">+20.1% from last month</p>
        </CardContent>
      </Card> */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Average Daily Expense</CardTitle>
          <CreditCard className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs.  {averageExpense.toFixed(2)}</div>
          <p className="text-xs text-muted-foreground">-4.5% from last week</p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Highest Expense</CardTitle>
          <TrendingUp className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">Rs. {highestExpenseAmount.toFixed(2)} </div>
          <p className="text-xs text-muted-foreground"> {highestExpenseTitle} </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Budget Status</CardTitle>
          <TrendingDown className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">75%</div>
          <p className="text-xs text-muted-foreground">$1,234.56 / $1,500.00</p>
        </CardContent>
      </Card>
    </div>
  )
}

