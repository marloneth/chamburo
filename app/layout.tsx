import { ClerkProvider } from '@clerk/nextjs'
import React from 'react'
import './globals.css'

interface Props {
  children: React.ReactNode
}

export default function RootLayout({ children }: Props) {
  return (
    <ClerkProvider>
      <html lang="en">
        <head>
          <link
            rel="stylesheet"
            href="https://cdn.jsdelivr.net/npm/@tabler/icons-webfont@2.36.0/tabler-icons.min.css"
          />
          <title>Chamburo</title>
        </head>
        <body className="h-screen w-screen">{children}</body>
      </html>
    </ClerkProvider>
  )
}
