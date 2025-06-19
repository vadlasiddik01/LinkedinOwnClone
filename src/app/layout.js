import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'LinkedIn Clone',
  description: 'A modern LinkedIn clone built with Next.js and Tailwind CSS',
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0a66c2'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  )
}
