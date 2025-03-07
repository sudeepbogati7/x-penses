"use client"

import { useState } from "react"
import Link from "next/link"
import {
  BarChart3,
  Bell,
  Calendar,
  CreditCard,
  FileText,
  Home,
  Menu,
  Package,
  PieChart,
  Plus,
  Search,
  Settings,
  User,
  X,
} from "lucide-react"
import Image from "next/image"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separater"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"

import ReportsPage from "@/components/reports/reports-page"

export default function Page() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 sm:px-6">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shrink-0 md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 sm:max-w-xs">
            <div className="flex h-full flex-col">
              <div className="flex items-center border-b px-2 py-4">
                <Link href="/" className="flex items-center gap-2 font-semibold">
                  <Package className="h-6 w-6" />
                  <span>ExpenseTracker</span>
                </Link>
                <Button variant="ghost" size="icon" className="ml-auto">
                  <X className="h-5 w-5" />
                </Button>
              </div>
              <nav className="grid gap-2 px-2 py-4">
                {[
                  { name: "Dashboard", href: "/", icon: Home },
                  { name: "Expenses", href: "/expenses", icon: CreditCard },
                  { name: "Calendar", href: "/calendar", icon: Calendar },
                  { name: "Reports", href: "/reports", icon: FileText, active: true },
                  { name: "Analytics", href: "/analytics", icon: BarChart3 },
                  { name: "Settings", href: "/settings", icon: Settings },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                      item.active ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    {item.name}
                    {item.active && (
                      <Badge variant="outline" className="ml-auto bg-primary-foreground text-primary">
                        Active
                      </Badge>
                    )}
                  </Link>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>
        <div className="flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2 font-semibold">
            <Package className="h-6 w-6" />
            <span className="hidden md:inline-block">ExpenseTracker</span>
          </Link>
          <Button
            variant="ghost"
            size="icon"
            className="hidden md:flex"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </div>
        <div className="relative ml-auto flex-1 md:grow-0 md:w-80">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input type="search" placeholder="Search..." className="w-full rounded-lg bg-background pl-8 md:w-80" />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
              3
            </span>
            <span className="sr-only">Notifications</span>
          </Button>
          <Button variant="outline" size="icon">
            <Plus className="h-5 w-5" />
            <span className="sr-only">New expense</span>
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Image src="/placeholder-user.jpg" alt="Avatar" width={32} height={32} className="rounded-full" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                Profile
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className={`${
            isSidebarOpen ? "w-64" : "w-[70px]"
          } hidden border-r bg-muted/40 transition-all duration-300 md:block`}
        >
          <div className="flex h-full flex-col gap-2 p-2">
            <nav className="grid gap-1 px-2 py-3">
              {[
                { name: "Dashboard", href: "/", icon: Home },
                { name: "Expenses", href: "/expenses", icon: CreditCard },
                { name: "Calendar", href: "/calendar", icon: Calendar },
                { name: "Reports", href: "/reports", icon: FileText, active: true },
                { name: "Analytics", href: "/analytics", icon: BarChart3 },
                { name: "Settings", href: "/settings", icon: Settings },
              ].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all ${
                    item.active
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className={isSidebarOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"}>
                    {item.name}
                  </span>
                  {item.active && isSidebarOpen && (
                    <Badge variant="outline" className="ml-auto bg-primary-foreground text-primary">
                      Active
                    </Badge>
                  )}
                </Link>
              ))}
            </nav>

            <Separator />

            <div className="px-2 py-3">
              <h3 className={`mb-2 px-3 text-xs font-medium ${isSidebarOpen ? "" : "sr-only"}`}>Reports</h3>
              <nav className="grid gap-1">
                {[
                  { name: "Expense Summary", href: "/reports/summary", icon: FileText, active: true },
                  { name: "Category Analysis", href: "/reports/category", icon: PieChart },
                  { name: "Monthly Trends", href: "/reports/trends", icon: BarChart3 },
                ].map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs transition-all ${
                      item.active
                        ? "bg-accent text-accent-foreground font-medium"
                        : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    }`}
                  >
                    <item.icon className="h-4 w-4" />
                    <span className={isSidebarOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"}>
                      {item.name}
                    </span>
                  </Link>
                ))}
              </nav>
            </div>

            <div className="mt-auto">
              <Separator className="mb-4" />
              <div className={`px-4 ${isSidebarOpen ? "" : "text-center"}`}>
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <Image src="/placeholder-user.jpg" alt="Avatar" width={36} height={36} className="rounded-full" />
                    <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-background bg-green-500"></div>
                  </div>
                  <div className={isSidebarOpen ? "opacity-100" : "opacity-0 w-0 h-0 overflow-hidden"}>
                    <div className="font-medium">John Doe</div>
                    <div className="text-xs text-muted-foreground">john@example.com</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </aside>

        {/* Main content */}
        <main className="flex-1 overflow-auto bg-muted/10">
          <ReportsPage />
        </main>
      </div>

      {/* Footer */}
      <footer className="border-t py-4 px-6">
        <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="text-sm text-muted-foreground">© 2023 ExpenseTracker. All rights reserved.</div>
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <Link href="#" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="#" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="#" className="hover:text-foreground">
              Help
            </Link>
          </div>
        </div>
      </footer>
    </div>
  )
}

