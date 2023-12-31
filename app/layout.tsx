import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { getCurrentUserData } from '@/services/user'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chamburo',
  description: 'A platform to connect jobs',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const currentUser = await getCurrentUserData()
  const navLinks = [
    {
      label: 'I have a job',
      url: '/jobs',
      show: !currentUser || currentUser.role === 'CLIENT',
    },
    {
      label: 'I do a job',
      url: '/worker/dashboard',
      show: !currentUser || currentUser.role === 'WORKER',
    },
    { label: 'About', url: '/about', show: true },
  ]

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
          <Header links={navLinks} />
          <div className="h-[calc(100%-120px)] overflow-auto">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
