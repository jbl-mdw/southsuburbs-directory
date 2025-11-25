import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navigation";
import Script from "next/script";

export const metadata: Metadata = {
  title: "South Suburbs Best",
  description: "Find the best local businesses in Chicago's South Suburbs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Navbar />
        {children}

        {/* KlirChat widget */}
        <Script
          src="/widget/klirchat-widget.js"
          strategy="afterInteractive"
          // 🔴 IMPORTANT: REPLACE THIS WITH YOUR REAL BACKEND ENDPOINT
          data-api-url="https://YOUR-BACKEND-DOMAIN-HERE/api/chat"
        />
      </body>
    </html>
  );
}
