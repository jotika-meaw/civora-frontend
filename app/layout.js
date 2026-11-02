import { Space_Grotesk, Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import Providers from "@/components/providers";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "CIVORA — Turn Local Care Into Collective Action",
  description: "Discover opportunities, organize initiatives and create meaningful community impact.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} min-h-full flex flex-col`}>
        <Providers>
          <Suspense fallback={<div className="h-16 border-b" />}>
            <Navbar />
          </Suspense>
          <main className="flex-1">{children}</main>
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
