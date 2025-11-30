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

        {/* LGR Voice Agent widget */}
        <Script id="lgr-widget-config" strategy="afterInteractive">
          {`
            window.LGR_AGENT_CONFIG = {
              apiUrl: 'https://agent.klirtrak.com',
              agentId: '419aa1cc-6b80-4a69-95cb-7a688536bc29'
            };
          `}
        </Script>
        <Script
          src="https://agent.klirtrak.com/widget.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
