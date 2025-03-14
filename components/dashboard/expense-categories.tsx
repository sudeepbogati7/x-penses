"use client";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
import { FC } from "react";

type ExpenseDataTypes = {
  createdAt: string | number | Date;
  id: string;
  expenseTitle: string;
  amount: number;
  category: string;
  created_at: string;
};

type DashboardStatsProps = {  
  expenseData: ExpenseDataTypes[];
};

export const ExpenseCategories: FC<DashboardStatsProps> = ({ expenseData }) => {
  // Aggregate data by unique categories
  const aggregatedData = expenseData.reduce((acc, curr) => {
    if (!acc[curr.category]) {
      acc[curr.category] = { category: curr.category, totalAmount: 0 };
    }
    acc[curr.category].totalAmount += curr.amount;
    return acc;
  }, {} as Record<string, { category: string; totalAmount: number }>);

  // Convert aggregated data into an array
  const uniqueCategories = Object.values(aggregatedData);

  // Prepare data for ApexCharts
  const chartOptions = {
    chart: {
      type: "pie" as const,
      toolbar: {
        show: false, // Hide toolbar (download, etc.)
      },
    },
    labels: uniqueCategories.map((item) => item.category), // Extract unique categories as labels
    colors: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"], // Use custom colors
    legend: {
      position: "bottom" as const, // Position the legend at the bottom
      fontSize: "14px",
      markers: {
        size: 12,
      },
    },
    dataLabels: {
      enabled: true, // Show percentage values on the chart
      formatter: (val: number) => `${val.toFixed(1)}%`, // Format percentage
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            width: 200,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = uniqueCategories.map((item) => item.totalAmount); // Extract aggregated amounts for the series

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Expense Categories</CardTitle>
      </CardHeader>
      <CardContent>
        {uniqueCategories.length > 0 ? (
          <div className="h-[300px]">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="pie"
              height="100%"
            />
          </div>
        ) : (
          <p className="text-center text-gray-500">No expense data available.</p>
        )}
      </CardContent>
    </Card>
  );
};