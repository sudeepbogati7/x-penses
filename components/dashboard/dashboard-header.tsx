"use client"
import * as React from "react"
import { useState } from "react"
import { CalendarIcon, Filter } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar";
import { Banknote } from 'lucide-react';
import { Label } from "../ui/label"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { useExpenseContext } from "../ExpenseContext"
import { DateRange } from "react-day-picker";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/timeFilters"

export function DashboardHeader() {
  const { expenseData, setExpenseData, getExpenses, loading } = useExpenseContext()

  const [date, setDate] = React.useState<DateRange | undefined>(undefined)
  const [activeFilter, setActiveFilter] = useState<string>("")

  const handleFilterSelect = (filterType: string) => {
    const today = new Date()
    let fromDate = new Date()

    switch (filterType) {
      case "today":
        setDate({ from: today, to: today })
        setActiveFilter("Today")
        break
      case "7days":
        fromDate.setDate(today.getDate() - 7)
        setDate({ from: fromDate, to: today })
        setActiveFilter("Last 7 days")
        break
      case "15days":
        fromDate.setDate(today.getDate() - 15)
        setDate({ from: fromDate, to: today })
        setActiveFilter("Last 15 days")
        break
      case "month":
        fromDate = new Date(today.getFullYear(), today.getMonth(), 1)
        setDate({ from: fromDate, to: today })
        setActiveFilter("This month")
        break
      default:
        setActiveFilter("")
        break
    }
  }

  const handleCustomDateSelect = (selectedDate: DateRange | undefined) => {
    setDate(selectedDate)
    if (selectedDate?.from && selectedDate?.to) {
      setActiveFilter("Custom")
    } else {
      setActiveFilter("")
    }
  }


  React.useEffect(() => {
    if (!date) {
      getExpenses();
      return;
    }

    const { from, to } = date;

    console.log("from __, ", from , "to __", to)  
    if (from && to) {
      const filteredExpenses = expenseData.filter((expense) => {
        const expenseDate = new Date(expense.created_at); // Assuming `expense.date` is a valid date string
        return expenseDate >= from && expenseDate <= to;
      });

      setExpenseData(filteredExpenses);
    }
  }, [date, setExpenseData]);


  return (
    <Card className="bg-[#2d98d6]">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          {/* total spend header */}
          <div className="text-white">
            <div className="flex items-center gap-1">
              <Banknote />
              Total Spent
            </div>
            <div className="text-4xl font-extrabold "> Rs. 54,320 </div>
          </div>
          <div className="flex gap-3 items-center md:items-end">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "bg-white text-[#2d98d6] hover:text-[#2d98d6] hover:bg-white/90",
                    activeFilter && "px-3",
                  )}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {activeFilter && <span className="hidden sm:inline">{activeFilter}</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80" align="end">
                <div className="space-y-2">
                  <h4 className="font-medium leading-none mb-3">Date Filters</h4>
                  <div className="grid gap-2">
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => handleFilterSelect("today")}
                    >
                      Today
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => handleFilterSelect("7days")}
                    >
                      Last 7 days
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => handleFilterSelect("15days")}
                    >
                      Last 15 days
                    </Button>
                    <Button
                      variant="ghost"
                      className="justify-start font-normal"
                      onClick={() => handleFilterSelect("month")}
                    >
                      This month
                    </Button>
                    <div className="pt-2 border-t">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !date && "text-muted-foreground",
                            )}
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {date?.from ? (
                              date.to ? (
                                <>
                                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </>
                              ) : (
                                format(date.from, "LLL dd, y")
                              )
                            ) : (
                              <span>Custom range</span>
                            )}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            initialFocus
                            mode="range"
                            defaultMonth={date?.from}
                            selected={date}
                            onSelect={handleCustomDateSelect}
                            numberOfMonths={2}
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
            <div className="w-full md:w-[280px]">
              <Select>
                <SelectTrigger id="category" className="w-full  bg-white text-sky-700">
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="transport">Transport</SelectItem>
                  <SelectItem value="utilities">Utilities</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

