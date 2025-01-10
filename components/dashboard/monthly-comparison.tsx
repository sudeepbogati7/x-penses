"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts'

const data = [
  { name: 'Jan', expenses: 4000 },
  { name: 'Feb', expenses: 3000 },
  { name: 'Mar', expenses: 2000 },
  { name: 'Apr', expenses: 2780 },
  { name: 'May', expenses: 1890 },
  { name: 'Jun', expenses: 2390 },
]

export function MonthlyComparison() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Monthly Comparison</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="expenses" fill="#2d98d6" />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}

