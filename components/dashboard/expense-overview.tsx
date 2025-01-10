"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const data = [
  { date: '01/05', amount: 120 },
  { date: '02/05', amount: 85 },
  { date: '03/05', amount: 150 },
  { date: '04/05', amount: 90 },
  { date: '05/05', amount: 200 },
  { date: '06/05', amount: 110 },
  { date: '07/05', amount: 175 },
]

export function ExpenseOverview() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Expense Overview</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={data}>
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

