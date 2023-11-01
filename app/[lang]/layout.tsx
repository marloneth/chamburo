import Header from '@/components/organisms/Header'
import Footer from '@/components/organisms/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { getCurrentUserData } from '@/services/user'
import { Locale, i18n } from '@/i18n.config'
import React from 'react'
import { getDictionary } from '../../lib/dictionary'

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

export default async function LangLayout({ children, params }: Props) {
  const { lang } = params
  if (!i18n.locales.includes(lang)) return

  const { navigation } = await getDictionary(lang)
  const currentUser = await getCurrentUserData()
  const navLinks = [
    {
      label: navigation.jobs,
      url: `/${lang}/jobs`,
      show: !currentUser || currentUser.role === 'CLIENT',
    },
    {
      label: navigation.workerDashboard,
      url: `/${lang}/worker/dashboard`,
      show: !currentUser || currentUser.role === 'WORKER',
    },
    { label: navigation.about, url: `/${lang}/about`, show: true },
  ]

  return (
    <div className="h-full">
      <Header links={navLinks} />
      <div className="h-[calc(100%-180px)] overflow-auto">{children}</div>
      <Footer />
    </div>
  )
}
