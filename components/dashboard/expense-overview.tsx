"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
const ReactApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });

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

export const ExpenseOverview: React.FC<DashboardStatsProps> = ({ expenseData }) => {
  const [formattedData, setFormattedData] = useState<{ date: string; amount: number }[]>([]);

  useEffect(() => {
    if (expenseData.length > 0) {
      const transformedData = expenseData.map((expense) => {
        const dateObj = new Date(expense.createdAt); // Ensure correct field name
        if (isNaN(dateObj.getTime())) return null; // Handle invalid dates
        const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}/${String(
          dateObj.getMonth() + 1
        ).padStart(2, "0")}`;
        return { date: formattedDate, amount: expense.amount };
      }).filter(Boolean); // Remove null values
      setFormattedData(transformedData as { date: string; amount: number }[]);
    }
  }, [expenseData]);

  console.log("Formatted data:", formattedData);

  // ApexCharts configuration
  const chartOptions = {
    chart: {
      type: "area" as "area",
      toolbar: {
        show: false, // Hide toolbar (download, etc.)
      },
    },
    xaxis: {
      categories: formattedData.map((item) => item.date), // Extract dates for the x-axis
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
    stroke: {
      curve: "smooth" as "smooth", // Smooth curve for the area chart
    },
    tooltip: {
      y: {
        formatter: (value: number) => `$${value.toFixed(2)}`, // Format tooltip values as currency
      },
    },
    colors: ["#2d98d6"], // Custom color for the area chart
    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 1,
        opacityFrom: 0.7,
        opacityTo: 0.4,
      },
    },
  };

  const chartSeries = [
    {
      name: "Expense Amount",
      data: formattedData.map((item) => item.amount), // Extract amounts for the series
    },
  ];

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Expense Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <div className="h-[300px]">
          <ReactApexChart
            options={chartOptions}
            series={chartSeries}
            type="area"
            height="100%"
          />
        </div>
      </CardContent>
    </Card>
  );
};