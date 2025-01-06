'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";
import { Mail, Lock, DollarSign, PieChart, CreditCard, TrendingUp } from 'lucide-react'

import { Sidebar, SidebarProvider, Header } from "@/components/ui/sideBar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const pathname = usePathname(); // Get the current path
  // List of paths where the sidebar should be hidden
  const excludedPaths = ["/home", "/register/", "/login", "/overview", '/register/verify'];

  // Check if the current route matches any of the excluded paths
  const hideSidebar = excludedPaths.includes(pathname);

  return (
    <div className="min-h-screen flex flex-col justify-center md:flex-row ">
    {/* Illustration Side */}
    <div className='w-full md:w-3/4 '
        style={{ backgroundImage: 'url(/epense_ai.webp)' }}
    >   
        <div
            className="w-full h-full flex items-center card justify-center p-8"
        >
            <div className=''>
                <div className="text-white ">
                    <h1 className="text-4xl font-bold mb-3">Track Your <span className='text-red-600'>Expenses</span></h1>
                    <p className="mb-8 text-gray-100">Gain control of your finances with our powerful expense tracking system.</p>
                    <div className="grid grid-cols-2 gap-4">
                        <FeatureIcon Icon={DollarSign} text="Budget Management" />
                        <FeatureIcon Icon={PieChart} text="Expense Analytics" />
                        <FeatureIcon Icon={CreditCard} text="Bill Tracking" />
                        <FeatureIcon Icon={TrendingUp} text="Financial Goals" />
                    </div>
                </div>
            </div>
        </div>
    </div>

    {/* Login Form Side */}
    <div className="md:w-1/2 w-full  bg-gradient-to-br from-white via-indigo-100 to-white py-8 px-4">
        {children}
    </div>
</div>
  );
}


function FeatureIcon({ Icon, text }: { Icon: React.ElementType, text: string }) {
    return (
        <div className="flex items-center space-x-2">
            <Icon className="h-5 w-5" />
            <span>{text}</span>
        </div>
    )
}
