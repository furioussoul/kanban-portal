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

export const metadata: Metadata = {
  title: "AI Kanban | AI-Powered Kanban that Builds with You",
  description: "Integrated with OpenAgent, not only tracks tasks but can also clone code, run tests, and search for solutions in a secure sandbox.",
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
        {/* Navbar placeholder */}
        <main className="flex-grow">
          {children}
        </main>
        {/* Footer placeholder */}
      </body>
    </html>
  );
}
