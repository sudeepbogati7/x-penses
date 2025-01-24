import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DollarSign, TrendingUp, TrendingDown, Plus } from "lucide-react"

export function ExpenseTrackerSkeleton() {
  return (
    <div className="container mx-auto p-4">
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-6">
        {[
          { title: "Total Expenses", icon: DollarSign, color: "from-sky-700 to-sky-800" },
          { title: "Average Expense", icon: TrendingUp, color: "from-green-600 to-green-700" },
          { title: "Highest Expense", icon: TrendingDown, color: "from-red-600 to-red-800" },
        ].map((card, index) => (
          <Card key={index} className={`bg-gradient-to-br ${card.color} text-white`}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{card.title}</CardTitle>
              <card.icon className="h-4 w-4 text-white/70" />
            </CardHeader>
            <CardContent>
              <div className="h-8 bg-white/20 rounded animate-pulse mb-1"></div>
              <div className="h-4 w-24 bg-white/20 rounded animate-pulse"></div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-6">
        <Button className="mb-4 w-full md:w-auto bg-sky-500 hover:bg-sky-700">
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold text-gray-800">Expenses List</h2>
          <div className="w-[180px] h-10 bg-gray-200 rounded animate-pulse"></div>
        </div>

        <Card>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Expense Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Date Added</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Array.from({ length: 5 }).map((_, index) => (
                  <TableRow key={`skeleton-${index}`}>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-6 bg-gray-200 rounded w-1/2 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-1/4 animate-pulse"></div>
                    </TableCell>
                    <TableCell>
                      <div className="h-4 bg-gray-200 rounded w-1/3 animate-pulse"></div>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                        <div className="h-8 w-8 bg-gray-200 rounded animate-pulse"></div>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

