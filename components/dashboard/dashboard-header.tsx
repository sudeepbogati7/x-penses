"use client"
import * as React from "react"
import { useState } from "react"
import { CalendarIcon } from 'lucide-react'
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


export function DashboardHeader() {
  const { expenseData, getExpenses, loading } = useExpenseContext()

  const [date, setDate] = React.useState<DateRange | undefined>(undefined)


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
            <div className={cn("grid gap-2")}>
              <Popover >
                <PopoverTrigger asChild>
                  <Button
                    id="date"
                    variant={"outline"}
                    className={cn(
                      "w-[300px] justify-start text-left font-normal",
                      !date && "text-sky-700"
                    )}
                  >
                    <CalendarIcon className="text-sky-700" />
                    {date?.from ? (
                      date.to ? (
                        <span className="text-sky-700">
                          {format(date.from, "LLL dd, y")} -{" "}
                          {format(date.to, "LLL dd, y")}
                        </span>
                      ) : (
                        format(date.from, "LLL dd, y")
                      )
                    ) : (
                      <span>Pick a date</span>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={date?.from}
                    selected={date}
                    onSelect={setDate}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
            </div>
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

