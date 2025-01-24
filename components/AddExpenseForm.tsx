"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { PlusCircle, DollarSign, Tag, X } from "lucide-react"
export type ExpenseCategory = {
    name: string
    emoji: string
  }
import Cookies from 'js-cookie';
export const expenseCategories: ExpenseCategory[] = [
  { name: "Food", emoji: "🍔" },
  { name: "Transportation", emoji: "🚗" },
  { name: "Housing", emoji: "🏠" },
  { name: "Utilities", emoji: "💡" },
  { name: "Entertainment", emoji: "🎭" },
  { name: "Healthcare", emoji: "🏥" },
  { name: "Education", emoji: "📚" },
  { name: "Personal", emoji: "👤" },
  { name: "Debt", emoji: "💳" },
  { name: "Savings", emoji: "💰" },
  { name: "Gifts", emoji: "🎁" },
  { name: "Travel", emoji: "✈️" },
  { name: "Clothing", emoji: "👕" },
  { name: "Technology", emoji: "💻" },
  { name: "Home Improvement", emoji: "🔨" },
  { name: "Subscriptions", emoji: "📅" },
  { name: "Miscellaneous", emoji: "🔮" },
]


// Load API URL from environment variable
const API_URL = process.env.NEXT_PUBLIC_API_URL
import { useToast } from "@/hooks/use-toast"

export function AddExpenseForm({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) {
  const [title, setTitle] = useState("")
  const [amount, setAmount] = useState("")
  const [category, setCategory] = useState<ExpenseCategory>(expenseCategories[0])
  const [loading, setLoading] = useState(false);


  // retrieve jwt token from cookie 
  const kharcha_token = Cookies.get('kharcha_token');
  
  const { toast } = useToast()
  

  const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    // Send data to API
    try{
        setLoading(true);
        const response = await fetch (`${API_URL}expenses/add`,{
            method : 'POST',
            headers: {
              "Authorization": `Bearer ${kharcha_token}`,
              'Content-Type': 'application/json'  ,
            },
            body: JSON.stringify({
                expenseTitle: title,
                amount,
                category: category.name 
            })
        })
        const data = await response.json()
        console.log("Response from adding expense ==> ", data)
        setLoading(false);
        if (response.ok){
            toast({ title: "Success", description: "Expense added successfully", variant: "default" })
        }else{
            toast({ title: "Error", description: data.error, variant: "destructive" })
        }
    }catch(error){
      console.error('Error adding expense:', error)
      toast({ title: "Error", description: "Something went wrong. Please try again ", variant: "destructive", })

    }

    setOpen(false)
    // Reset form
    setTitle("")
    setAmount("")
    setCategory(expenseCategories[0])
  }

  console.log("Form data for new expense ==> ", title, amount, category)
  const handleClose = () => {
    setOpen(false)
    // Reset form when closing
    setTitle("")
    setAmount("")
    setCategory(expenseCategories[0])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New Expense</DialogTitle>
          <Button variant="ghost" size="icon" className="absolute right-4 top-4" onClick={handleClose}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="title" className="text-right">
              Title
            </Label>
            <div className="col-span-3 relative">
              <Input placeholder="eg. Lunch" id="title" value={title} onChange={(e) => setTitle(e.target.value)} className="pl-8" required />
              <Tag className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="amount" className="text-right">
              Amount
            </Label>
            <div className="col-span-3 relative">
              <Input
                id="amount"
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                className="pl-8"
                required
                min="0"
                step="0.01"
              />
              <DollarSign className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="category" className="text-right">
              Category
            </Label>
            <Select
              value={category.name}
              onValueChange={(value) =>
                setCategory(expenseCategories.find((cat) => cat.name === value) || expenseCategories[0])
              }
            >
              <SelectTrigger className="col-span-3">
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent className="max-h-[200px] overflow-y-auto">
                {expenseCategories.map((cat) => (
                  <SelectItem key={cat.name} value={cat.name}>
                    <span className="mr-2">{cat.emoji}</span>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Button type="submit" className="ml-auto">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Expense
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}

