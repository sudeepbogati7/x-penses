"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import dynamic from "next/dynamic";
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

type MonthlyComparison = {
  expenseData: ExpenseDataTypes[];
};

export const MonthlyComparison: FC<MonthlyComparison> = ({ expenseData }) => {
  // Aggregate data by month
  const aggregatedData = expenseData.reduce((acc, curr) => {
    const dateObj = new Date(curr.createdAt);
    const month = dateObj.toLocaleString("default", { month: "short" }); // Get abbreviated month name (e.g., "Jan")
    if (!acc[month]) {
      acc[month] = { month, totalExpenses: 0 };
    }
    acc[month].totalExpenses += curr.amount;
    return acc;
  }, {} as Record<string, { month: string; totalExpenses: number }>);

  // Convert aggregated data into an array and sort by month
  const monthlyData = Object.values(aggregatedData).sort((a, b) => {
    const monthsOrder = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return monthsOrder.indexOf(a.month) - monthsOrder.indexOf(b.month);
  });

  // Prepare data for ApexCharts
  const chartOptions = {
    chart: {
      type: "bar" as "bar",
      toolbar: {
        show: false, // Hide toolbar (download, etc.)
      },
    },
    xaxis: {
      categories: monthlyData.map((item) => item.month), // Extract months for the x-axis
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
    yaxis: {
      labels: {
        formatter: (value: number) => `$${value.toFixed(2)}`, // Format y-axis values as currency
      },
    },
    dataLabels: {
      enabled: false, // Disable data labels on the chart
    },
    tooltip: {
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`, // Format tooltip values as currency
      },
    },
    colors: ["#2d98d6"], // Custom color for the bars
    plotOptions: {
      bar: {
        borderRadius: 4, // Add rounded corners to the bars
        columnWidth: "50%", // Adjust bar width
      },
    },
  };

  const chartSeries = [
    {
      name: "Total Expenses",
      data: monthlyData.map((item) => item.totalExpenses), // Extract total expenses for the series
    },
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Monthly Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        {monthlyData.length > 0 ? (
          <div className="h-[300px]">
            <ReactApexChart
              options={chartOptions}
              series={chartSeries}
              type="bar"
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