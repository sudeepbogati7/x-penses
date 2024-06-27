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
            <body
                className={`${inter.className} bg-gray-200 dark:bg-[#0d1119] `}
            >
                <ThemeProvider attribute="class">
                    <main>{children}</main>
                </ThemeProvider>
            </body>
        </html>
    );
}