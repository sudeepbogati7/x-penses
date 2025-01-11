"use client"

import { useState } from "react"
import { CalendarIcon } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calender"

export function DashboardHeader() {
  const [date, setDate] = useState<Date | undefined>(new Date())

  return (
    <Card className="bg-[#2d98d6]">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <h1 className="text-2xl font-bold text-white">Expense Dashboard</h1>
          <div className="flex flex-col md:flex-row gap-3  items-center md:space-x-4">
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" className="md:w-full w-fit pl-3 text-left font-normal bg-white text-[#2d98d6]">
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {date ? date.toDateString() : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={date}
                  onSelect={setDate}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
            <Select>
              <SelectTrigger className="w-full bg-white text-[#2d98d6]">
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
      </CardContent>
    </Card>
  )
}

