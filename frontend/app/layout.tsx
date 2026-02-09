import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';

export const metadata: Metadata = {
  title: 'SouthSuburbsBest',
  description: 'SouthSuburbsBest',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-white">
        {/* Fixes the syntax error and connects to the Brain */}
        <script 
          src="https://southsuburbsbest.com/v1/public/widget-loader.js" 
          data-client-id="SSB_PROD" 
          defer 
        />
        <Navbar />
        {children}
      </body>
    </html>
  );
}
