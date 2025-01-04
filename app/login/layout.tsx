'use client';
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"] });

import { ResponseDataProvider } from "@/components/ResponseData";
export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body
                className={`${inter.className} bg-gray-200 dark:bg-[#0d1117] `}
            >
                <main>{children}</main>
            </body>
        </html>
    );
}