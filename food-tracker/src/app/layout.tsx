import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import TabNav from "@/components/TabNav";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Food Cost Tracker",
  description: "Track ingredient prices and meal costs per portion",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-50 dark:bg-black text-zinc-900 dark:text-zinc-100">
        <main className="flex-1 pb-20 w-full max-w-2xl mx-auto px-4 pt-6">{children}</main>
        <TabNav />
      </body>
    </html>
  );
}
