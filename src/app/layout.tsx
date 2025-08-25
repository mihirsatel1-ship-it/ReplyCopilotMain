import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { Toaster } from 'react-hot-toast'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'ReplyPilot - FREE AI Review Reply Generator for Small Businesses',
  description: 'Generate professional, on-brand replies to customer reviews in seconds. FREE AI-powered tool trusted by 300+ small businesses to maintain their online reputation.',
  keywords: 'review reply, customer service, AI response generator, business reviews, ReplyPilot, free review response, small business',
  authors: [{ name: 'ReplyPilot' }],
  creator: 'ReplyPilot',
  publisher: 'ReplyPilot',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://replypilot.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'ReplyPilot - FREE AI Review Reply Generator',
    description: 'Generate professional, on-brand replies to customer reviews in seconds. FREE AI-powered tool for small businesses.',
    url: 'https://replypilot.com',
    siteName: 'ReplyPilot',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ReplyPilot - AI Review Reply Generator',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ReplyPilot - FREE AI Review Reply Generator',
    description: 'Generate professional, on-brand replies to customer reviews in seconds. FREE AI-powered tool for small businesses.',
    images: ['/og-image.png'],
  },
  icons: {
    icon: '/favicon.svg',
    shortcut: '/favicon.svg',
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen flex flex-col">
          <Header />
          <main className="flex-1">
            {children}
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" />
      </body>
    </html>
  )
}
