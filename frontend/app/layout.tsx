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

        {/* KlirTrak site binding */}
        <Script
          id="klirtrak-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              window.__KLIRTRAK_SITE__ = "southsuburbsbest.com";
            `,
          }}
        />

        {/* KlirTrak widget loader */}
        <Script
          src="/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
