import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/navbar/Navbar";
import Footer from "@/components/Footer";

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
        <Footer />
<Script
  src="https://connect.leads2scale.com/v2/widget.js?v=20260508-4"
  data-client-id="SSB_PROD"
  strategy="afterInteractive"
/>

      </body>
    </html>
  );
}
