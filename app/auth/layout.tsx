'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/SideBar";

import "@/app/page.css"
import "@/app/globals.css"

const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";
import { Mail, Lock, DollarSign, PieChart, CreditCard, TrendingUp } from 'lucide-react'
import { Suspense } from "react";
import { Sidebar, SidebarProvider, Header } from "@/components/ui/sideBar";
import LoadingSkeleton from "@/components/RegisterLoadingSkeleton";
import Navbar from "@/components/NavBar";
export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    const pathname = usePathname(); // Get the current path
    // List of paths where the sidebar should be hidden

    // Check if the current route matches any of the excluded paths

    return (
        <>
            <div className="min-h-screen overflow-y-auto flex flex-col justify-center md:flex-row ">
                {/* Illustration Side */}
                <div className='w-full md:w-3/4 ' style={{ backgroundImage: 'url(/epense_ai.webp)' }} >
                    <div className="w-full h-full flex items-center card justify-center p-8" >
                        <div className=''>
                            <div className="text-white ">
                                <h1 className="text-4xl font-bold mb-3">Track Your <span className='text-[#3d9ce3]'>Expenses</span></h1>
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
                <div className="md:w-1/2 w-full  bg-gradient-to-br from-white via-[#e8f5ff] to-white py-8 px-4">
                    <Suspense fallback={<LoadingSkeleton />}>
                        {children}
                    </Suspense>
                </div>
            </div>
        </>
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
