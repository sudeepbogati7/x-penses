'use client';
import { Inter } from "next/font/google";
import { ThemeProvider } from '../theme-provider';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <head>
                <title> Expense Dashboard </title>
            </head>
            <body
                className={`${inter.className} bg-gray-100 dark:bg-[#0d1117] `}
            >
                <ThemeProvider attribute="class">
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}