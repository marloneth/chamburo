import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { ClerkProvider } from '@clerk/nextjs'
import { getCurrentUserData } from '@/services/user'
import { Locale, i18n } from '@/i18n.config'
import React from 'react'

interface Props {
  children: React.ReactNode
  params: { lang: Locale }
}

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Chamburo',
  description: 'A platform to connect jobs',
}

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ lang: locale }))
}

export default async function RootLayout({ children, params }: Props) {
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
      <html lang={params.lang}>
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.36.0/tabler-icons.min.css"
          />
        </head>
        <body className={`${inter.className} h-screen`}>
          <Header links={navLinks} lang={params.lang} />
          <div className="h-[calc(100%-180px)] overflow-auto">{children}</div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  )
}
