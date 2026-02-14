import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

import { Navbar } from "@/components/marketing/Navbar";
import { Footer } from "@/components/marketing/Footer";

export const metadata: Metadata = {
  title: {
    default: "AI Kanban | AI-Powered Kanban that Builds with You",
    template: "%s | AI Kanban"
  },
  description: "Integrated with OpenAgent, not only tracks tasks but can also clone code, run tests, and search for solutions in a secure sandbox.",
  keywords: ["AI Kanban", "AI Agent", "Project Management", "OpenAgent", "Vercel Sandbox", "Next.js"],
  authors: [{ name: "AI Kanban Team" }],
  openGraph: {
    type: "website",
    locale: "zh_CN",
    url: "https://aikanban.com",
    title: "AI Kanban | AI-Powered Kanban that Builds with You",
    description: "The next-generation project management tool powered by AI agents.",
    siteName: "AI Kanban",
  },
  twitter: {
    card: "summary_large_image",
    title: "AI Kanban | AI-Powered Kanban that Builds with You",
    description: "The next-generation project management tool powered by AI agents.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col`}
      >
        <Navbar />
        <main className="flex-grow pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
