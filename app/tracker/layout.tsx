'use client';
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/SideBar";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

import { ExpenseProvider } from "@/components/ExpenseContext";
const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

import { InitialLoadingWrapper } from "@/components/InitialLoadingWrapper";

const Metadata = {
    title: "Expense Tracker - Master Your Finances",
    description: "Track, analyze, and optimize your expenses with our powerful and intuitive system.",
};

import { Sidebar, SidebarProvider, Header } from "@/components/ui/sideBar";
import { Toaster } from "@/components/ui/toaster";

export default function RootLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();

    useEffect(() => {
        if (!Cookies.get("kharcha_token")) {
            router.push("/auth/login");
        }
    }, []);

    return (
        <div className="w-full h-full">
            <ExpenseProvider>
                <SidebarProvider>
                    <AppSidebar />
                    <Header />
                    <main className="w-full md:pl-64 h-full"><InitialLoadingWrapper>{children}</InitialLoadingWrapper></main>
                    <Toaster />
                </SidebarProvider>
            </ExpenseProvider>
        </div>
    );
}
