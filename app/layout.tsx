'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { ResponseDataProvider } from "@/components/ResponseData";

const inter = Inter({ subsets: ["latin"] });

const Metadata = {
  title: 'Expense Tracker - Master Your Finances',
  description: 'Track, analyze, and optimize your expenses with our powerful and intuitive system.',
}
export default function RootLayout({
  children,
}: Readonly<{ 
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title> X-pense Tracker </title>
      <body className={`${inter.className} bg-gray-100 `}>   
        <main> {children} </main>
      </body>
    </html>
  );
}
