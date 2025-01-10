import React from 'react'
import { User, Mail, Calendar, DollarSign, Edit, CreditCard, Wallet, PieChart, Settings } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface UserProfileProps {
  name: string
  email: string
  joinedDate: string
  totalExpenses: number
  monthlyBudget: number
  currentMonthExpenses: number
  preferredCurrency: string
  mostUsedCategory: string
  avatarUrl: string
}

export default function UserProfile({
  name,
  email,
  joinedDate,
  totalExpenses,
  monthlyBudget,
  currentMonthExpenses,
  preferredCurrency,
  mostUsedCategory,
  avatarUrl
}: UserProfileProps) {
  const budgetUsagePercentage = (currentMonthExpenses / monthlyBudget) * 100

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white ">
      <CardHeader className="flex flex-col items-center pb-6 pt-6 space-y-1">
        <Avatar className="w-24 h-24 border-2 border-gray-200 shadow">
          <AvatarImage src={avatarUrl} alt={name} />
          <AvatarFallback>{name.charAt(0)}</AvatarFallback>
        </Avatar>
        <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
        <p className="text-sm text-gray-500">Expense Tracker User</p>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center text-gray-600">
            <Mail className="w-5 h-5 mr-3 text-gray-400" />
            <span>{email}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-5 h-5 mr-3 text-gray-400" />
            <span>Joined {joinedDate}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <DollarSign className="w-5 h-5 mr-3 text-gray-400" />
            <span>Total Expenses: {preferredCurrency}{totalExpenses.toFixed(2)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <CreditCard className="w-5 h-5 mr-3 text-gray-400" />
            <span>Monthly Budget: {preferredCurrency}{monthlyBudget.toFixed(2)}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <Wallet className="w-5 h-5 mr-3 text-gray-400" />
            <span>Preferred Currency: {preferredCurrency}</span>
          </div>
          <div className="flex items-center text-gray-600">
            <PieChart className="w-5 h-5 mr-3 text-gray-400" />
            <span>Most Used Category: {mostUsedCategory}</span>
          </div>
        </div>
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Monthly Budget Usage</span>
            <span className="font-medium text-gray-800">{budgetUsagePercentage.toFixed(1)}%</span>
          </div>
          <Progress value={budgetUsagePercentage} className="w-full" />
          <p className="text-xs text-gray-500 text-right">
            {preferredCurrency}{currentMonthExpenses.toFixed(2)} / {preferredCurrency}{monthlyBudget.toFixed(2)}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-6">
        <Button variant="outline" className="flex items-center space-x-2">
          <Edit className="w-4 h-4" />
          <span>Edit Profile</span>
        </Button>
        <Button variant="outline" className="flex items-center space-x-2">
          <Settings className="w-4 h-4" />
          <span>Account Settings</span>
        </Button>
      </CardFooter>
    </Card>
  )
}

