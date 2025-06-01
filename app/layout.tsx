import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'sweet-sweet-home',
  description: 'Portfolio of aenig - Data Engineer specializing in Big Data, Cloud Technologies, and IoT solutions',
  keywords: 'data engineer, big data, aws, azure, python, portfolio, aenig',
  authors: [{ name: 'aenig' }],
  creator: 'aenig',
  openGraph: {
    title: 'sweet-sweet-home',
    description: 'Portfolio of aenig - Data Engineer specializing in Big Data, Cloud Technologies, and IoT solutions',
    url: 'https://aenig.in',
    siteName: 'aenig portfolio',
    locale: 'en_IN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'sweet-sweet-home',
    description: 'Portfolio of aenig - Data Engineer specializing in Big Data, Cloud Technologies, and IoT solutions',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link 
          rel="stylesheet" 
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
          integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
          crossOrigin="anonymous"
          referrerPolicy="no-referrer"
        />
      </head>
      <body className={`${inter.className} bg-black text-white overflow-x-hidden`}>
        {children}
      </body>
    </html>
  )
} 