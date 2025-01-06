'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { AppSidebar } from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";
import Navbar from "@/components/NavBar";
const Metadata = {
  title: 'Expense Tracker - Master Your Finances',
  description: 'Track, analyze, and optimize your expenses with our powerful and intuitive system.',
}
import { Sidebar, SidebarProvider, Header } from "@/components/ui/sideBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname(); // Get the current path
  // List of paths where the sidebar should be hidden
  const excludedPaths = ["/home", "/register", "/login", "/overview"];

  // Check if the current route matches any of the excluded paths
  const hideSidebar = excludedPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={inter.className}>
        <SidebarProvider>
            {!hideSidebar && <AppSidebar /> }
            <main className="w-full h-full">
            {!hideSidebar && <Header />}
              <div className="container mx-auto">
                {children}
              </div>
            </main>
        </SidebarProvider>
      </body>
    </html>
  );
}
