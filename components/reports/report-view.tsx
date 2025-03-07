"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"

type ExpenseData = {
  expenseId: number
  expenseTitle: string
  amount: number
  category: string
  userId: number
  createdAt: string
  updatedAt: string
}

type CategoryData = {
  category: string
  amount: number
  color?: string
}

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D"]

export default function ReportView({
  expenses = [],
  expensesByCategory = [],
}: {
  expenses?: ExpenseData[]
  expensesByCategory?: CategoryData[]
}) {
  // Add colors to the category data for the pie chart
  const categoryDataWithColors = expensesByCategory.map((item, index) => ({
    ...item,
    color: COLORS[index % COLORS.length],
  }))

  return (
    <div className="space-y-4">
      <Tabs defaultValue="table" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="table">Table</TabsTrigger>
          <TabsTrigger value="pie">Pie Chart</TabsTrigger>
          <TabsTrigger value="bar">Bar Chart</TabsTrigger>
        </TabsList>

        <TabsContent value="table" className="pt-4">
          <div className="rounded-md border">
            <div className="overflow-auto max-h-[400px]">
              <table className="w-full border-collapse">
                <thead className="sticky top-0 bg-background">
                  <tr className="border-b">
                    <th className="text-left p-2">Expense Title</th>
                    <th className="text-left p-2">Amount</th>
                    <th className="text-left p-2">Category</th>
                    <th className="text-left p-2">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {expenses.length > 0 ? (
                    expenses.map((expense) => (
                      <tr key={expense.expenseId} className="border-b hover:bg-muted/50">
                        <td className="p-2">{expense.expenseTitle}</td>
                        <td className="p-2">${expense.amount.toFixed(2)}</td>
                        <td className="p-2">
                          <Badge variant="outline">{expense.category}</Badge>
                        </td>
                        <td className="p-2">{new Date(expense.createdAt).toLocaleDateString()}</td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={4} className="p-4 text-center text-muted-foreground">
                        No expense data available
                      </td>
                    </tr>
                  )}
                </tbody>
                {expenses.length > 0 && (
                  <tfoot className="sticky bottom-0 bg-background border-t">
                    <tr className="font-medium">
                      <td className="p-2">Total</td>
                      <td className="p-2">${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}</td>
                      <td colSpan={2}></td>
                    </tr>
                  </tfoot>
                )}
              </table>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="pie" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Expenses by Category</CardTitle>
              <CardDescription>Distribution of expenses across categories</CardDescription>
            </CardHeader>
            <CardContent>
              {categoryDataWithColors.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryDataWithColors}
                        cx="50%"
                        cy="50%"
                        labelLine={true}
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="amount"
                        nameKey="category"
                      >
                        {categoryDataWithColors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
                  No data available to display
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="bar" className="pt-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-base">Expenses by Category</CardTitle>
              <CardDescription>Amount spent in each category</CardDescription>
            </CardHeader>
            <CardContent>
              {categoryDataWithColors.length > 0 ? (
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={categoryDataWithColors}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="category" />
                      <YAxis tickFormatter={(value) => `$${value}`} />
                      <Tooltip formatter={(value: number) => [`$${value.toFixed(2)}`, "Amount"]} />
                      <Legend />
                      <Bar dataKey="amount" name="Amount">
                        {categoryDataWithColors.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              ) : (
                <div className="h-[300px] w-full flex items-center justify-center text-muted-foreground">
                  No data available to display
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Total Expenses</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${expenses.reduce((sum, expense) => sum + expense.amount, 0).toFixed(2)}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Average Expense</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              $
              {expenses.length
                ? (expenses.reduce((sum, expense) => sum + expense.amount, 0) / expenses.length).toFixed(2)
                : "0.00"}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Categories</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{categoryDataWithColors.length}</div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

