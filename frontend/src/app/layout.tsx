import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Footer from "@/components/layout/Footer";
import Navbar from "@/components/layout/Navbar";
import MotionProvider from "./providers/MotionProvider"; 

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

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
<<<<<<< HEAD
      <body className="min-h-full flex flex-col">
        {children}
=======

      <body className="min-h-full flex flex-col bg-[#020617] text-white">

        {/* 🔥 Motion wrapper (smooth UI fix) */}
        <MotionProvider>

>>>>>>> 58003639c5c222649ab8c0f46a16d6e67d76b6dd

        <MotionProvider>
          <Navbar />
          <main className="flex-1 smooth-ui">{children}</main>

          {/* Footer */}
          <Footer />
        </MotionProvider>
      </body>
    </html>
  );
}
