import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'South Suburbs Best - Local Business Directory',
  description: 'Find the best local businesses in Chicago South Suburbs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <h1 className="text-2xl font-bold text-blue-600">
              South Suburbs Best
            </h1>
          </div>
        </nav>
        {children}
        <footer className="bg-gray-800 text-white py-8 mt-16">
          <div className="container mx-auto px-4 text-center">
            <p>&copy; 2025 South Suburbs Best. All rights reserved.</p>
          </div>
        </footer>
      </body>
    </html>
  )
}
