"use client"
import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

type ExpenseDataTypes= {
  createdAt: string | number | Date
  id: string;
  expenseTitle: string;
  amount: number;
  category: string;
  created_at: string;
}

type DashboardStatsProps = {

  expenseData: ExpenseDataTypes[];

};


export const ExpenseOverview: React.FC<DashboardStatsProps> = ( {expenseData}) => {
  const [formattedData, setFormattedData] = useState<{ date: string; amount: number }[]>([]);
  console.log("expese data =>", expenseData)
  useEffect(() => {
    if (expenseData.length > 0) {
      const transformedData = expenseData.map((expense) => {
        const dateObj = new Date(expense.createdAt); // Ensure correct field name
        console.log("date obj=>", dateObj, "real=> ", expense.created_at)
        if (isNaN(dateObj.getTime())) return null; // Handle invalid dates

        const formattedDate = `${String(dateObj.getDate()).padStart(2, "0")}/${String(
          dateObj.getMonth() + 1
        ).padStart(2, "0")}`;

        return { date: formattedDate, amount: expense.amount };
      }).filter(Boolean); // Remove null values

      setFormattedData(transformedData as { date: string; amount: number }[]);
    }
  }, [expenseData]);

  console.log("formatted data = ", formattedData)

  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Expense Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={formattedData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="date" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="amount" stroke="#2d98d6" strokeWidth={2} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
