'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Suspense } from "react";
import Loading from "./loading";
import { ResponseDataProvider } from "@/components/ResponseData";

const inter = Inter({ subsets: ["latin"] });
import { ThemeProvider } from "./theme-provider";

// export const metadata: Metadata = {
//   title: "Create Next App",
//   description: "Generated by create next app",
// };



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <title> X-pense Tracker </title>
      <Suspense fallback={<Loading />}>
        <body
          className={`${inter.className} bg-gray-100 dark:bg-[#0d1117]`}
        >
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem storageKey="theme">
            <ResponseDataProvider><main> {children} </main></ResponseDataProvider>
          </ThemeProvider>
        </body>
      </Suspense>
    </html>
  );
}
