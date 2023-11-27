import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Doc Sculptor',
  description: 'DocSculptor is a space where you can set up a document template, introduce a table, and effortlessly assign column names to generate a personalized document for each field.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
