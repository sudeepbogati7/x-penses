import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { MetricCardSkeleton } from "@/components/skeletons/metric-card-skeleton"
import { TableSkeleton } from "@/components/skeletons/table-skeleton"
import { ChartSkeleton } from "@/components/skeletons/chart-skeleton"

export function ExpensePageLoading() {
  return (
    <div className="space-y-6">
      {/* Header Card */}
      <Card className="bg-muted/5">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Skeleton className="h-5 w-5" />
                <Skeleton className="h-5 w-24" />
              </div>
              <Skeleton className="h-10 w-32" />
            </div>
            <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
              <Skeleton className="h-10 w-full md:w-[200px]" />
              <Skeleton className="h-10 w-full md:w-[200px]" />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Metric Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[...Array(4)].map((_, i) => (
          <MetricCardSkeleton key={i} />
        ))}
      </div>

      {/* Chart */}
      <ChartSkeleton />

      {/* Table */}
      <TableSkeleton />
    </div>
  )
}

