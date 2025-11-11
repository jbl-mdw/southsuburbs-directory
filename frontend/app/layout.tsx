import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import Navbar from "@/components/Navbar";

export const metadata: Metadata = {
  title: "South Suburbs Best",
  description: "Find the best local businesses in Chicago's South Suburbs",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        <Navbar />
        {children}
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>© 2025 South Suburbs Best. All rights reserved.</p>
          </div>
        </footer>
        <Script
          src="https://southsuburbsbest.com/widget-api/widget/connectboss-widget.js"
          strategy="afterInteractive"
          data-business="South Suburbs Best"
          data-color="#3366FF"
          data-chat="true"
          data-call="true"
          data-sms="true"
          data-email-contact="true"
          data-booking="true"
          data-phone="(708) 847-6570"
          data-email="hello@southsuburbsbest.com"
        />
        <Script
          src="https://southsuburbsbest.com/widget-api/widget/connectboss-widget.js"
          strategy="afterInteractive"
          data-business="South Suburbs Best"
          data-color="#3366FF"
          data-chat="true"
          data-call="true"
          data-sms="true"
          data-email-contact="true"
          data-booking="true"
          data-phone="(708) 847-6570"
          data-email="hello@southsuburbsbest.com"
        />
      </body>
    </html>
  );
}
