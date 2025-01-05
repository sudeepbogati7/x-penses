'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });
import { SidebarProvider } from "@/components/ui/sideBar";
export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
        <SidebarProvider >
            <main> {children} </main>
        </SidebarProvider>
  );
}
