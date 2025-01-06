'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LayoutDashboard, BarChart2, FileText, Settings, X, ViewIcon } from 'lucide-react'
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
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sideBar"

const menuItems = [
  { icon: ViewIcon, label: "Overview", href: '/' },
  { icon: LayoutDashboard, label: 'Dashboard', href: '/dashboard' },
  { icon: BarChart2, label: 'Analytics', href: '/analytics' },
  { icon: FileText, label: 'Reports', href: '/reports' },
  { icon: Settings, label: 'Settings', href: '/settings' },
]

export function AppSidebar() {
  const pathname = usePathname()
  const { setIsOpen } = useSidebar()

  // Function to handle link clicks in mobile view
  const handleLinkClick = () => {
    setIsOpen(false) // Close the sidebar
  }

  return (
    <div className='h-screen z-50 overflow-hidden fixed top-0 left-0'>
      <Sidebar className="border-r bg-gradient-to-br from-gray-100 px-3 via-indigo-100 to-white h-screen flex flex-col bg-background">
        <SidebarHeader className="flex h-14 items-center justify-between border-b px-6">
          <Link href="/" className="flex items-center space-x-2" onClick={handleLinkClick}>
            <span className="text-xl font-bold">ExpenseTracker</span>
          </Link>
          <SidebarTrigger className="md:hidden" onClick={() => setIsOpen(false)}>
            <X className="h-6 w-6" />
          </SidebarTrigger>
        </SidebarHeader>
        <SidebarContent className="flex flex-col py-2">
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <Link href={item.href} className="w-full" onClick={handleLinkClick}>
                  <SidebarMenuButton active={pathname === item.href}>
                    <item.icon className="h-5 w-5 mr-2" />
                    <span>{item.label}</span>
                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarContent>
        <SidebarFooter className="border-t p-4">
          <div className="flex items-center space-x-3">
            <UserIcon className="h-8 w-8 rounded-full bg-muted p-2" />
            <div>
              <p className="text-sm font-medium">Sudeep Bogati </p>
              <p className="text-xs text-muted-foreground">hello@sudipbogati.com.np</p>
            </div>
          </div>
        </SidebarFooter>
      </Sidebar>
    </div>
  )
}
