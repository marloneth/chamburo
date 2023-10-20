import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import Auth from '@/components/atoms/Auth'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chamburo',
  description: 'A platform to connect jobs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.36.0/tabler-icons.min.css"
          />
        </head>
        <body className={`${inter.className} h-screen`}>
          <Header>
            <Auth />
          </Header>
          <div className="h-[calc(100%-120px)] overflow-auto">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
