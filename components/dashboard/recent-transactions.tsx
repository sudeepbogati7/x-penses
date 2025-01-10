import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

const transactions = [
  { id: 1, date: "2023-05-01", description: "Grocery Shopping", amount: 85.20, category: "Food" },
  { id: 2, date: "2023-05-02", description: "Electric Bill", amount: 120.50, category: "Utilities" },
  { id: 3, date: "2023-05-03", description: "Movie Tickets", amount: 30.00, category: "Entertainment" },
  { id: 4, date: "2023-05-04", description: "Gas Station", amount: 45.00, category: "Transport" },
  { id: 5, date: "2023-05-05", description: "Restaurant Dinner", amount: 75.30, category: "Food" },
]

export function RecentTransactions() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Recent Transactions</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Category</TableHead>
              <TableHead className="text-right">Amount</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>{transaction.description}</TableCell>
                <TableCell>{transaction.category}</TableCell>
                <TableCell className="text-right">${transaction.amount.toFixed(2)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

