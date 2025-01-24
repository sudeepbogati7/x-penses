'use client';
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/SideBar";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { ExpenseProvider } from "@/components/ExpenseContext";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

const Metadata = {
    title: 'Expense Tracker - Master Your Finances',
    description: 'Track, analyze, and optimize your expenses with our powerful and intuitive system.',
}
import { Sidebar, SidebarProvider, Header } from "@/components/ui/sideBar";


import { Toaster } from "@/components/ui/toaster";
const API_URL = process.env.NEXT_PUBLIC_API_URL;
import { useToast } from "@/hooks/use-toast";

export default function RootLayout({ children, }: Readonly<{ children: React.ReactNode; }>) {

    const [expenseData, setExpenseData] = useState([]);
    // fet expense data 
    const { toast } = useToast();
    const getExpenses = async () => {
        try {
            const response = await fetch(`${API_URL}expenses/my-expenses`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${Cookies.get('kharcha_token')}`
                }
            })
            const data = await response.json()
            if (response.ok) {
                setExpenseData(data.data);
            } else {
                toast({ title: 'Error', description: 'Failed to fetch expenses. Please try again in a moment.', variant: 'destructive' });
                console.log("error fetching expenses, ", data.error);
            }
        }
        catch (error) {
            console.error('Error fetching expenses:', error)
            toast({ title: 'Error', description: 'Failed to fetch expenses. Please try again in a moment.', variant: 'destructive' })

        }
    }
    const router = useRouter();
    useEffect(() => {
        if (!Cookies.get('kharcha_token')) {
            router.replace('/auth/login');
        }

        getExpenses()
    }, []);
    return (
        <div className="w-full h-full">
            <ExpenseProvider expenseData={expenseData} getExpenses={getExpenses}>
                <SidebarProvider>
                    <AppSidebar />
                    <Header />
                    <main className="w-full md:pl-64 h-full">{children}</main>
                    <Toaster />
                </SidebarProvider>
            </ExpenseProvider>
        </div>
    );
}
