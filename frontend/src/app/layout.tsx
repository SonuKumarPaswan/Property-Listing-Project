import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Mishti Houses",
  description: "A modern real estate platform",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
      
        <meta name="color-scheme" content="light only" />
      </head>

      <body className="min-h-full flex flex-col bg-[#020617] text-white">
        
        {/* Navbar missing tha */}
        <Navbar />

        {children}

        <Footer />
      </body>
    </html>
  );
}