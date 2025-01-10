import * as React from "react"
import { cn } from "@/lib/utils"
import { Menu } from 'lucide-react'
import { request } from "http"
const SidebarContext = React.createContext<{
  isOpen: boolean
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
} | null>(null)

export const SidebarProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = React.useState(false)
  return (
    <SidebarContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </SidebarContext.Provider>
  )
}

export const useSidebar = () => {
  const context = React.useContext(SidebarContext)
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider")
  }
  return context
}

export const Sidebar = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const { isOpen } = useSidebar()
  return (
    <div
      ref={ref}
      className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 transform transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        "md:relative md:translate-x-0",
        className
      )}
      {...props}
    />
  )
})
Sidebar.displayName = "Sidebar"

export const SidebarHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-b border-gray-200 dark:border-gray-700", className)}
    {...props}
  />
))
SidebarHeader.displayName = "SidebarHeader"

export const SidebarContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("flex-grow overflow-y-auto", className)}
    {...props}
  />
))
SidebarContent.displayName = "SidebarContent"

export const SidebarFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("p-4 border-t border-gray-200 dark:border-gray-700", className)}
    {...props}
  />
))
SidebarFooter.displayName = "SidebarFooter"

export const SidebarMenu = React.forwardRef<
  HTMLUListElement,
  React.HTMLAttributes<HTMLUListElement>
>(({ className, ...props }, ref) => (
  <ul ref={ref} className={cn("space-y-2", className)} {...props} />
))
SidebarMenu.displayName = "SidebarMenu"

export const SidebarMenuItem = React.forwardRef<
  HTMLLIElement,
  React.HTMLAttributes<HTMLLIElement>
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("", className)} {...props} />
))
SidebarMenuItem.displayName = "SidebarMenuItem"

export const SidebarMenuButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & { 
    active?: boolean
  }
>(({ className, active, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        "flex items-center w-full px-2 py-2  text-sm font-medium rounded-md",
        "hover:bg-blue-200 dark:hover:bg-gray-800",
        "focus:outline-none  transition-all duration-300  dark:focus:ring-offset-gray-900",
        active && "bg-blue-300 border-l-4 border-blue-600 dark:bg-gray-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  )
})
SidebarMenuButton.displayName = "SidebarMenuButton"

export const SidebarTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, ...props }, ref) => {
  const { setIsOpen } = useSidebar()
  return (
    <button
      ref={ref}
      onClick={() => setIsOpen(prev => !prev)}
      className={cn(
        "p-2 rounded-md text-gray-500 hover:text-gray-600 focus:outline-none ",
        className
      )}
      {...props}
    />
  )
})
SidebarTrigger.displayName = "SidebarTrigger"

export function Header() {
  const { setIsOpen } = useSidebar()

  return (
    <header className="sticky top-0 z-40 md:pl-64 border-b bg-background">
      <div className="md:hidden flex h-14 items-center px-4">
        <button className="md:hidden" onClick={() => setIsOpen(true)}>
          <Menu className="h-6 w-6" />
          <span className="sr-only">Open Sidebar</span>
        </button>
        <h1 className="ml-4 text-lg font-semibold"> Overview </h1>
      </div>
    </header>
  )
}
