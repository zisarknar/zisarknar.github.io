import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './lib/LanguageContext'
import FirebaseAnalytics from './components/FirebaseAnalytics'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const firaCode = Fira_Code({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-fira-code',
})

export const metadata: Metadata = {
  title: 'ZISARKNAR.DEV - Software Engineer',
  description: 'Futuristic portfolio - Software Engineer in Tokyo specializing in Web Apps, APIs, and Mobile Development',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${firaCode.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon-16x16.png" type="image/png" sizes="16x16" />
        <link rel="icon" href="/favicon-32x32.png" type="image/png" sizes="32x32" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
      </head>
      <body className={inter.className}>
        <LanguageProvider>
          <FirebaseAnalytics />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
