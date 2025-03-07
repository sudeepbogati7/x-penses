'use client';
import * as React from "react";
import { DashboardStats } from "@/components/dashboard/dashboard-stats";
import { ExpenseOverview } from "@/components/dashboard/expense-overview";
import { ExpenseCategories } from "@/components/dashboard/expense-categories";
import { MonthlyComparison } from "@/components/dashboard/monthly-comparison";
import { useState } from "react";
import { CalendarIcon, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Banknote } from "lucide-react";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { useExpenseContext } from "@/components/ExpenseContext";
import { DateRange } from "react-day-picker";

export default function DashboardPage() {
  const { expenseData } = useExpenseContext();
  const [date, setDate] = React.useState<DateRange | undefined>(undefined);
  const [activeFilter, setActiveFilter] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [filteredExpenses, setFilteredExpenses] = useState(expenseData);

  const handleCategorySelect = (category : any) => {
    setSelectedCategory(category);
  };

  React.useEffect(() => {
    let filtered = expenseData;

    if (date?.from && date?.to) {
      const { from, to } = date;
      filtered = filtered.filter((expense) => {
        const expenseDate = new Date(expense.createdAt);
        return expenseDate >= from && expenseDate <= to;
      });
    }

    if (selectedCategory !== "all") {
      filtered = filtered.filter((expense) => expense.category === selectedCategory);
    }

    setFilteredExpenses(filtered);
  }, [date, selectedCategory, expenseData]);

  const totalExpense = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0);
  const uniqueCategories = [...new Set(expenseData.map((expense) => expense.category))];

  return (
    <div className="container mx-auto p-4 space-y-6">
      <Card className="bg-[#2d98d6]">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-white">
              <div className="flex items-center gap-1">
                <Banknote />
                Total Spent
              </div>
              <div className="text-4xl font-extrabold">Rs. {totalExpense}</div>
            </div>
            <div className="flex gap-3 items-center md:items-end">
              <div className="w-full md:w-[280px]">
                <Select onValueChange={handleCategorySelect}>
                  <SelectTrigger id="category" className="w-full bg-white text-sky-700">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {uniqueCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <DashboardStats expenseData={filteredExpenses} />
      <div className="grid gap-6 md:grid-cols-2">
        <ExpenseOverview expenseData={filteredExpenses} />
        <ExpenseCategories expenseData={filteredExpenses} />
      </div>
      <MonthlyComparison expenseData={filteredExpenses} />
    </div>
  );
}
