import type { Metadata } from 'next'
import { Inter, Fira_Code } from 'next/font/google'
import './globals.css'
import { LanguageProvider } from './lib/LanguageContext'

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
      <body className={inter.className}>
        <LanguageProvider>
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
