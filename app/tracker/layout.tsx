'use client';
import { Inter } from "next/font/google";
import { AppSidebar } from "@/components/SideBar";

const inter = Inter({ subsets: ["latin"] });
import { usePathname } from "next/navigation";

const Metadata = {
    title: 'Expense Tracker - Master Your Finances',
    description: 'Track, analyze, and optimize your expenses with our powerful and intuitive system.',
}
import { Sidebar, SidebarProvider, Header } from "@/components/ui/sideBar";


import { Toaster } from "@/components/ui/toaster";


export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {

    return (
        <div className={` w-full h-full`}>
            <SidebarProvider>
                <AppSidebar />
                <Header />
                <main className="w-full md:pl-64 h-full">
                    {children}
                </main>
                <Toaster />
            </SidebarProvider>
        </div>
    );
}
