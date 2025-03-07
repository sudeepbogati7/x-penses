"use client"

import Link from "next/link"

import { CardDescription } from "@/components/ui/card"

import { CalendarIcon, Download, Filter, Printer } from "lucide-react"
import { format } from "date-fns"
import { useState, useMemo } from "react"

import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"

import { Calendar, FileText, Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useExpenseContext } from "@/components/ExpenseContext"

import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

export default function Page() {
  const { expenseData } = useExpenseContext()

  const [date, setDate] = useState<Date>()
  const [endDate, setEndDate] = useState<Date>()
  const [selectedTab, setSelectedTab] = useState("generate")
  const [categoryFilter, setCategoryFilter] = useState<string | null>(null)

  // If no expense data is provided, use this sample data
  const sampleExpenseData = [
    {
      expenseId: 1,
      expenseTitle: "Masu Roti",
      amount: 100,
      category: "Food",
      userId: 1,
      createdAt: "2025-03-07T17:48:12.103Z",
      updatedAt: "2025-03-07T17:48:12.103Z",
    },
    {
      expenseId: 2,
      expenseTitle: "Vegetable",
      amount: 90,
      category: "Utilities",
      userId: 1,
      createdAt: "2025-03-07T17:48:34.794Z",
      updatedAt: "2025-03-07T17:48:34.794Z",
    },
  ]

  // Use provided data or fallback to sample data
  const expenses = expenseData?.length ? expenseData : sampleExpenseData

  // Get unique categories for the filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = new Set(expenses.map((expense) => expense.category))
    return Array.from(uniqueCategories)
  }, [expenses])

  // Filter expenses based on selected date range and category
  const filteredExpenses = useMemo(() => {
    return expenses.filter((expense) => {
      const expenseDate = new Date(expense.createdAt)

      // Filter by date range if both dates are selected
      const dateInRange = !date || !endDate || (expenseDate >= date && expenseDate <= endDate)

      // Filter by category if selected
      const matchesCategory = !categoryFilter || expense.category === categoryFilter

      return dateInRange && matchesCategory
    })
  }, [expenses, date, endDate, categoryFilter])

  // Calculate total amount
  const totalAmount = useMemo(() => {
    return filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  }, [filteredExpenses])

  // Calculate expenses by category for the chart
  const expensesByCategory = useMemo(() => {
    const categoryMap = new Map()

    filteredExpenses.forEach((expense) => {
      const current = categoryMap.get(expense.category) || 0
      categoryMap.set(expense.category, current + expense.amount)
    })

    return Array.from(categoryMap.entries()).map(([category, amount]) => ({
      category,
      amount,
    }))
  }, [filteredExpenses])

  return (
    <div className="flex min-h-screen w-full flex-col">
      <main className="flex-1 w-full overflow-auto bg-muted/10">
        <div className=" mx-auto py-8 container px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Reports</h1>
              <p className="text-muted-foreground mt-1">Generate and manage your expense reports</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Printer className="mr-2 h-4 w-4" />
                Print
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button>
                    <Download className="mr-2 h-4 w-4" />
                    Export
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>Export as PDF</DropdownMenuItem>
                  <DropdownMenuItem>Export as CSV</DropdownMenuItem>
                  <DropdownMenuItem>Export as Excel</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <Tabs defaultValue="generate" className="w-full" onValueChange={setSelectedTab}>
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="generate">Generate Reports</TabsTrigger>
              <TabsTrigger value="saved">Saved Reports</TabsTrigger>
              <TabsTrigger value="scheduled">Scheduled Reports</TabsTrigger>
            </TabsList>

            <TabsContent value="generate" className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="md:col-span-1">
                  <CardHeader>
                    <CardTitle>Report Options</CardTitle>
                    <CardDescription>Configure your report parameters</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="report-type">Report Type</Label>
                      <Select defaultValue="expense-summary">
                        <SelectTrigger id="report-type">
                          <SelectValue placeholder="Select report type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectGroup>
                            <SelectLabel>Expenses</SelectLabel>
                            <SelectItem value="expense-summary">Expense Summary</SelectItem>
                            <SelectItem value="expense-category">Expense by Category</SelectItem>
                            <SelectItem value="expense-vendor">Expense by Vendor</SelectItem>
                          </SelectGroup>
                          <SelectGroup>
                            <SelectLabel>Analysis</SelectLabel>
                            <SelectItem value="monthly-trend">Monthly Trend</SelectItem>
                            <SelectItem value="budget-variance">Budget Variance</SelectItem>
                          </SelectGroup>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Date Range</Label>
                      <div className="grid grid-cols-2 gap-2">
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {date ? format(date, "PPP") : "Start date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar
                              mode="single"
                              selected={date}
                              onSelect={(selectedDate: Date | undefined) => setDate(selectedDate)}
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                        <Popover>
                          <PopoverTrigger asChild>
                            <Button variant="outline" className="w-full justify-start text-left font-normal">
                              <CalendarIcon className="mr-2 h-4 w-4" />
                              {endDate ? format(endDate, "PPP") : "End date"}
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0">
                            <Calendar mode="single" selected={endDate} onSelect={setEndDate} initialFocus />
                          </PopoverContent>
                        </Popover>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="format">Export Format</Label>
                      <Select defaultValue="pdf">
                        <SelectTrigger id="format">
                          <SelectValue placeholder="Select format" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pdf">PDF Document</SelectItem>
                          <SelectItem value="csv">CSV Spreadsheet</SelectItem>
                          <SelectItem value="xlsx">Excel Spreadsheet</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="grouping">Group By</Label>
                      <Select defaultValue="category">
                        <SelectTrigger id="grouping">
                          <SelectValue placeholder="Select grouping" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="category">Category</SelectItem>
                          <SelectItem value="date">Date</SelectItem>
                          <SelectItem value="vendor">Vendor</SelectItem>
                          <SelectItem value="project">Project</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="category-filter">Category Filter</Label>
                      <Select
                        value={categoryFilter || "all"}
                        onValueChange={(value) => setCategoryFilter(value === "all" ? null : value)}
                      >
                        <SelectTrigger id="category-filter">
                          <SelectValue placeholder="All Categories" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          {categories.map((category) => (
                            <SelectItem key={category} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="pt-2">
                      <Button
                        className="w-full"
                        onClick={() => {
                          // This would typically trigger the report generation
                          console.log("Generating report with filters:", {
                            dateRange: { start: date, end: endDate },
                            category: categoryFilter,
                            expenses: filteredExpenses,
                          })
                        }}
                      >
                        Generate Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="md:col-span-2">
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <div>
                      <CardTitle>Report Preview</CardTitle>
                      <CardDescription>Expense Summary Report</CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="font-normal">
                        {date ? format(date, "MMM d") : "Jan 1"} -{" "}
                        {endDate ? format(endDate, "MMM d, yyyy") : "Jan 31, 2023"}
                      </Badge>
                      <Badge variant="secondary" className="font-normal">
                        {filteredExpenses.length} expenses
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="px-2 py-0">
                    <div className="overflow-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b">
                            <th className="text-left p-2">Expense Title</th>
                            <th className="text-left p-2">Amount</th>
                            <th className="text-left p-2">Category</th>
                            <th className="text-left p-2">Date</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredExpenses.map((expense) => (
                            <tr key={expense.expenseId} className="border-b hover:bg-muted/50">
                              <td className="p-2">{expense.expenseTitle}</td>
                              <td className="p-2">${expense.amount.toFixed(2)}</td>
                              <td className="p-2">
                                <Badge variant="outline">{expense.category}</Badge>
                              </td>
                              <td className="p-2">{format(new Date(expense.createdAt), "MMM d, yyyy")}</td>
                            </tr>
                          ))}
                          <tr className="font-medium">
                            <td className="p-2">Total</td>
                            <td className="p-2">${totalAmount.toFixed(2)}</td>
                            <td colSpan={2}></td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                  <CardFooter className="flex justify-between border-t pt-4 mt-4">
                    <Button variant="outline" size="sm">
                      <Printer className="mr-2 h-4 w-4" />
                      Print Preview
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button size="sm">
                          <Download className="mr-2 h-4 w-4" />
                          Download
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Download as PDF</DropdownMenuItem>
                        <DropdownMenuItem>Download as CSV</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </CardFooter>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="saved" className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="relative w-full max-w-sm">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input type="search" placeholder="Search saved reports..." className="w-full pl-8" />
                </div>
                <Button variant="outline" size="icon">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {[
                  { title: "Monthly Expense Summary", date: "Jan 1 - Jan 31, 2023", type: "PDF" },
                  { title: "Q4 Budget Analysis", date: "Oct 1 - Dec 31, 2022", type: "CSV" },
                  { title: "Annual Category Breakdown", date: "Jan 1 - Dec 31, 2022", type: "PDF" },
                  { title: "Project Expenses Q1", date: "Jan 1 - Mar 31, 2023", type: "PDF" },
                  { title: "Vendor Payment Summary", date: "Feb 1 - Feb 28, 2023", type: "CSV" },
                ].map((report, i) => (
                  <Card key={i} className="overflow-hidden">
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle className="text-base">{report.title}</CardTitle>
                        <Badge variant={report.type === "PDF" ? "default" : "secondary"} className="ml-2">
                          {report.type}
                        </Badge>
                      </div>
                      <CardDescription>{report.date}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="h-24 bg-muted rounded-md flex items-center justify-center">
                        <FileText className="h-10 w-10 text-muted-foreground/60" />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="ghost" size="sm">
                        View
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Download
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="scheduled" className="space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-medium">Scheduled Reports</h3>
                <Button>Schedule New Report</Button>
              </div>

              <div className="space-y-4">
                {[
                  {
                    title: "Weekly Expense Summary",
                    schedule: "Every Monday at 9:00 AM",
                    format: "PDF",
                    recipients: 3,
                  },
                  {
                    title: "Monthly Budget Analysis",
                    schedule: "1st of every month at 8:00 AM",
                    format: "CSV",
                    recipients: 5,
                  },
                  {
                    title: "Quarterly Project Report",
                    schedule: "Every 3 months on the 1st at 9:00 AM",
                    format: "PDF",
                    recipients: 2,
                  },
                ].map((report, i) => (
                  <Card key={i}>
                    <CardHeader className="pb-2">
                      <div className="flex items-start justify-between">
                        <CardTitle>{report.title}</CardTitle>
                        <Badge variant="outline">{report.format}</Badge>
                      </div>
                      <CardDescription>{report.schedule}</CardDescription>
                    </CardHeader>
                    <CardContent className="pb-2">
                      <div className="flex items-center text-sm">
                        <span className="text-muted-foreground">Sent to {report.recipients} recipients</span>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between pt-2">
                      <Button variant="outline" size="sm">
                        Edit Schedule
                      </Button>
                      <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                        Disable
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {selectedTab === "generate" && <div className="mt-12">{/* <FeaturesSection /> */}</div>}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t py-4 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-sm text-muted-foreground">© 2023 ExpenseTracker. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

