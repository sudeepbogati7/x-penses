"use client"

import { useState } from "react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts"
import { ArrowUpDown, ChevronDown, Download, Filter } from "lucide-react"

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

const expenseData = [
  { category: "Office Supplies", amount: 1250, percentage: 12.5 },
  { category: "Travel", amount: 2340, percentage: 23.4 },
  { category: "Meals", amount: 1830, percentage: 18.3 },
  { category: "Software", amount: 2760, percentage: 27.6 },
  { category: "Hardware", amount: 980, percentage: 9.8 },
  { category: "Miscellaneous", amount: 840, percentage: 8.4 },
]

const monthlyData = [
  { name: "Jan", amount: 4000 },
  { name: "Feb", amount: 3000 },
  { name: "Mar", amount: 2000 },
  { name: "Apr", amount: 2780 },
  { name: "May", amount: 1890 },
  { name: "Jun", amount: 2390 },
]

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82ca9d"]

export default function ReportView() {
  const [view, setView] = useState("table")

  return (
    <div className="w-full">
      <Tabs defaultValue="table" className="w-full" onValueChange={setView}>
        <div className="flex justify-between items-center mb-4 px-6 pt-4">
          <TabsList>
            <TabsTrigger value="table">Table</TabsTrigger>
            <TabsTrigger value="chart">Charts</TabsTrigger>
            <TabsTrigger value="summary">Summary</TabsTrigger>
          </TabsList>

          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Filter className="h-3.5 w-3.5 mr-1" />
              Filter
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm">
                  <Download className="h-3.5 w-3.5 mr-1" />
                  Export
                  <ChevronDown className="h-3.5 w-3.5 ml-1" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>PDF</DropdownMenuItem>
                <DropdownMenuItem>CSV</DropdownMenuItem>
                <DropdownMenuItem>Excel</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>

        <TabsContent value="table" className="mt-0">
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[180px]">Category</TableHead>
                  <TableHead className="text-right">
                    <div className="flex items-center justify-end">
                      Amount
                      <ArrowUpDown className="ml-2 h-4 w-4" />
                    </div>
                  </TableHead>
                  <TableHead className="text-right">Percentage</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {expenseData.map((expense) => (
                  <TableRow key={expense.category}>
                    <TableCell className="font-medium">{expense.category}</TableCell>
                    <TableCell className="text-right">${expense.amount.toLocaleString()}</TableCell>
                    <TableCell className="text-right">{expense.percentage}%</TableCell>
                  </TableRow>
                ))}
                <TableRow className="bg-muted/50">
                  <TableCell className="font-bold">Total</TableCell>
                  <TableCell className="text-right font-bold">
                    ${expenseData.reduce((sum, item) => sum + item.amount, 0).toLocaleString()}
                  </TableCell>
                  <TableCell className="text-right font-bold">100%</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
        </TabsContent>

        <TabsContent value="chart" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-4">
            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-sm font-medium mb-4">Expenses by Category</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={expenseData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="amount"
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                    >
                      {expenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-sm font-medium mb-4">Monthly Expense Trend</h3>
              <div className="h-[300px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={monthlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip formatter={(value) => `$${value}`} />
                    <Bar dataKey="amount" fill="#8884d8" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="summary" className="mt-0">
          <div className="p-6 space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-sm font-medium text-muted-foreground">Total Expenses</h3>
                <p className="text-2xl font-bold mt-2">$10,000.00</p>
                <p className="text-xs text-muted-foreground mt-1">Jan 1 - Jan 31, 2023</p>
              </div>

              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-sm font-medium text-muted-foreground">Highest Category</h3>
                <p className="text-2xl font-bold mt-2">Software</p>
                <p className="text-xs text-muted-foreground mt-1">$2,760.00 (27.6%)</p>
              </div>

              <div className="bg-card rounded-lg p-4 border">
                <h3 className="text-sm font-medium text-muted-foreground">Average Daily Spend</h3>
                <p className="text-2xl font-bold mt-2">$322.58</p>
                <p className="text-xs text-muted-foreground mt-1">31 days in period</p>
              </div>
            </div>

            <div className="bg-card rounded-lg p-4 border">
              <h3 className="text-sm font-medium mb-2">Key Insights</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 mr-2"></div>
                  <span>Software expenses represent the largest category at 27.6% of total spend.</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-green-500 mt-1.5 mr-2"></div>
                  <span>Travel expenses increased by 15% compared to the previous month.</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-yellow-500 mt-1.5 mr-2"></div>
                  <span>Office supplies spending is under budget by 8%.</span>
                </li>
                <li className="flex items-start">
                  <div className="h-2 w-2 rounded-full bg-red-500 mt-1.5 mr-2"></div>
                  <span>Three expense categories exceeded their monthly budget allocation.</span>
                </li>
              </ul>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

