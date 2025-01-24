'use client'

import { useEffect, useState } from 'react'
import { CalendarIcon, Edit2Icon, PlusIcon, TrashIcon, DollarSignIcon, TrendingUpIcon, TrendingDownIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';

import Cookies from 'js-cookie';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Suspense } from 'react';
import { Badge } from '@/components/ui/badge'
import OvercviewSkeleton from '@/components/overviewSkeleton';
import { AddExpenseForm } from '@/components/AddExpenseForm';
import { useRouter } from 'next/navigation';
import { useToast } from '@/hooks/use-toast';
// Mock data for demonstration
const mockExpenses = [
  { id: 1, name: 'Groceries', category: 'Food', amount: 150, date: '2023-06-15' },
  { id: 2, name: 'Electricity Bill', category: 'Utilities', amount: 80, date: '2023-06-10' },
  { id: 3, name: 'Movie Tickets', category: 'Entertainment', amount: 30, date: '2023-06-20' },
  { id: 4, name: 'Gas', category: 'Transportation', amount: 45, date: '2023-06-18' },
  { id: 5, name: 'Internet Bill', category: 'Utilities', amount: 60, date: '2023-06-05' },
]

const categories = ['All', 'Food', 'Utilities', 'Entertainment', 'Transportation', 'Other']

const categoryColors: any = {
  Food: 'bg-green-100 text-green-800',
  Utilities: 'bg-blue-100 text-blue-800',
  Entertainment: 'bg-purple-100 text-purple-800',
  Transportation: 'bg-yellow-100 text-yellow-800',
  Other: 'bg-gray-100 text-gray-800',
}

const API_URL = process.env.NEXT_PUBLIC_API_URL;

import { useExpenseContext } from "@/components/ExpenseContext";



export default function ExpenseTrackerOverview() {
  const { expenseData, getExpenses } = useExpenseContext();

  // states 
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [openAddExpenseForm, setOpenAddExpenseForm] = useState(false)
  const toggleAddExpenseForm = () => setOpenAddExpenseForm(!openAddExpenseForm);



  const filteredExpenses = selectedCategory === 'All'
    ? expenseData
    : expenseData.filter(expense => expense.category === selectedCategory)


  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)
  const averageExpense = totalExpense / filteredExpenses.length || 0
  const highestExpense = Math.max(...filteredExpenses.map(expense => expense.amount))

  const currentDate = new Date()
  const monthYear = currentDate.toLocaleString('default', { month: 'long', year: 'numeric' })

  const { toast } = useToast();

  return (
    <Suspense fallback={<OvercviewSkeleton />}>
      <div className="container mx-auto p-4">
        {/* <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <h1 className="text-xl font-bold mb-4 md:mb-0 text-gray-800"> </h1>
          
        </div> */}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <Card className="bg-gradient-to-br from-sky-700 to-sky-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Expenses</CardTitle>
              <DollarSignIcon className="h-4 w-4 text-blue-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${totalExpense.toFixed(2)}</div>
              <p className="text-xs text-blue-100">{monthYear}</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-green-600 to-green-700 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Expense</CardTitle>
              <TrendingUpIcon className="h-4 w-4 text-green-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${averageExpense.toFixed(2)}</div>
              <p className="text-xs text-green-100">Per transaction</p>
            </CardContent>
          </Card>
          <Card className="bg-gradient-to-br from-red-600 to-red-800 text-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Highest Expense</CardTitle>
              <TrendingDownIcon className="h-4 w-4 text-red-100" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">${highestExpense.toFixed(2)}</div>
              <p className="text-xs text-red-100">Single transaction</p>
            </CardContent>
          </Card>
        </div>

        <AddExpenseForm open={openAddExpenseForm} setOpen={setOpenAddExpenseForm} />
        <div className="mt-6">
          <Button onClick={toggleAddExpenseForm} className="mb-4 w-full md:w-auto bg-sky-500 hover:bg-sky-700">
            <PlusIcon className="mr-2 h-4 w-4" /> Add Expense
          </Button>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-800">Expenses List</h2>
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
                  {filteredExpenses.map((expense: any) => {
                    // Format the createdAt date
                    const formattedDate = new Intl.DateTimeFormat('en-US', {
                      month: 'short',
                      day: '2-digit',
                      year: 'numeric',
                    }).format(new Date(expense.createdAt));

                    return (
                      <TableRow key={expense.expenseId}>
                        <TableCell className="font-medium">{expense.expenseTitle}</TableCell>
                        <TableCell>
                          <Badge className={categoryColors[expense.category] || categoryColors.Other}>
                            {expense.category}
                          </Badge>
                        </TableCell>
                        <TableCell>Rs.{expense.amount.toFixed(2)}</TableCell>
                        <TableCell>{formattedDate}</TableCell>
                        <TableCell className="text-right">
                          <Button variant="ghost" size="icon" className="text-blue-600 hover:text-blue-800">
                            <Edit2Icon className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-800">
                            <TrashIcon className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>

              </Table>
            </CardContent>
          </Card>
        </div>
      </div>
    </Suspense>
  )
}

