'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, Info, BarChart2, FileText, User, Menu } from 'lucide-react'
import { cn } from "@/lib/utils"
import { UserIcon } from '@heroicons/react/24/outline'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sideBar"

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Info, label: 'About', href: '/about' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: FileText, label: 'Reports', href: '/reports' },
//   { icon: User, label: 'Profile', href: '/profile' },
]

export function AppSidebar() {
  const pathname = usePathname()

  return (
    <SidebarProvider>
      <div className='h-screen overflow-hidden fixed top-0 left-0'>
      <Sidebar className="bg-white  dark:bg-gray-800 flex flex-col h-screen">
        <SidebarHeader>
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl text-gray-600 font-bold">ExpenseTracker</span>
          </Link>
          <SidebarTrigger className="md:hidden">
            <Menu className="h-6 w-6" />
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent className="flex mt-4  flex-col flex-grow">
          <SidebarMenu className="flex-grow">
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton active={pathname === item.href}>
                  <Link href={item.href} className="flex items-center space-x-2">
                    <item.icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter>
          <div className="flex  items-center space-x-4 px-4 py-2">
            <UserIcon className='w-6' />
            <div>
              <p className="font-medium">John Doe</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">john.doe@example.com</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
      </div>
    </SidebarProvider>
  )
}

