'use client';
import { Inter } from "next/font/google";
import "./globals.css";
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

  const pathname = usePathname(); // Get the current path
  const excludedPaths = ["/home", "/register", "/login", "/overview", '/register/verify'];
  const hideSidebar = excludedPaths.includes(pathname);

  return (
    <html lang="en">
      <body className={`${inter.className} w-full h-full`}>
      <SidebarProvider>
        {!hideSidebar && <AppSidebar />}
        <main className="w-full h-full">
          {!hideSidebar && <Header />}
          <div className="mx-auto">
            {children}
          </div>
        </main>
        <Toaster />
      </SidebarProvider>
    </body>
    </html >
  );
}
