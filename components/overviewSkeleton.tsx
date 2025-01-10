import { Skeleton } from "@/components/ui/skeleton"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Plus } from 'lucide-react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function OvercviewSkeleton() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Expense Tracker</h1>
        <Button className="bg-green-500 hover:bg-green-600">
          <Plus className="mr-2 h-4 w-4" /> Add Expense
        </Button>
      </div>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        {/* Total Expenses Card */}
        <Card className="bg-[#4285f4] text-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-blue-100">Total Expenses</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">$</span>
                <Skeleton className="h-9 w-24 bg-blue-400/50" />
              </div>
              <Skeleton className="h-4 w-20 bg-blue-400/50" />
            </div>
          </CardContent>
        </Card>

        {/* Average Expense Card */}
        <Card className="bg-[#34a853] text-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-green-100">Average Expense</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">$</span>
                <Skeleton className="h-9 w-24 bg-green-400/50" />
              </div>
              <Skeleton className="h-4 w-28 bg-green-400/50" />
            </div>
          </CardContent>
        </Card>

        {/* Highest Expense Card */}
        <Card className="bg-[#ea4335] text-white">
          <CardContent className="p-6">
            <div className="space-y-2">
              <p className="text-sm font-medium text-red-100">Highest Expense</p>
              <div className="flex items-baseline space-x-2">
                <span className="text-2xl font-bold">$</span>
                <Skeleton className="h-9 w-24 bg-red-400/50" />
              </div>
              <Skeleton className="h-4 w-32 bg-red-400/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Expenses List */}
      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">Expenses List</h2>
          <Skeleton className="h-10 w-[100px]" />
        </div>

        <Card>
          <CardContent className="p-0">
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
                {[...Array(5)].map((_, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Skeleton className="h-4 w-[150px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-6 w-[100px] rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[80px]" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-[100px]" />
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end space-x-2">
                        <Skeleton className="h-8 w-8 rounded-md" />
                        <Skeleton className="h-8 w-8 rounded-md" />
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

