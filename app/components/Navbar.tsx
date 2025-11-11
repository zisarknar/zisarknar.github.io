'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { useLanguage } from '../lib/LanguageContext'

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-black/80 backdrop-blur-md border-b border-cyan-500/30'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link href="/" className="group flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 border-2 border-cyan-400 flex items-center justify-center transition-all duration-300 group-hover:border-cyan-300 group-hover:shadow-[0_0_20px_rgba(6,182,212,0.5)]">
                <span className="text-cyan-400 font-bold text-xl group-hover:text-cyan-300 transition-colors">
                  Z
                </span>
              </div>
              {/* Corner accents */}
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-cyan-400"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-cyan-400"></div>
            </div>
            <span className="font-mono text-cyan-400 text-lg group-hover:text-cyan-300 transition-colors hidden sm:block">
              ZISARKNAR
            </span>
          </Link>

          {/* Navigation Links */}
          <div className="flex items-center gap-1 md:gap-2">
            <Link
              href="/projects"
              className="group relative px-4 md:px-6 py-2 font-mono text-sm text-cyan-400 hover:text-cyan-300 transition-all duration-300"
            >
              <span className="relative z-10">{t.nav.projects}</span>
              <div className="absolute inset-0 border border-cyan-500/0 group-hover:border-cyan-500/50 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
              {/* Corner dots */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-1 h-1 bg-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            <Link
              href="/blogs"
              className="group relative px-4 md:px-6 py-2 font-mono text-sm text-purple-400 hover:text-purple-300 transition-all duration-300"
            >
              <span className="relative z-10">{t.nav.blogs}</span>
              <div className="absolute inset-0 border border-purple-500/0 group-hover:border-purple-500/50 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
              {/* Corner dots */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-1 h-1 bg-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            <Link
              href="/about"
              className="group relative px-4 md:px-6 py-2 font-mono text-sm text-blue-400 hover:text-blue-300 transition-all duration-300"
            >
              <span className="relative z-10">{t.nav.about}</span>
              <div className="absolute inset-0 border border-blue-500/0 group-hover:border-blue-500/50 transition-all duration-300"></div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-400 group-hover:w-full transition-all duration-300"></div>
              {/* Corner dots */}
              <div className="absolute top-0 left-0 w-1 h-1 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <div className="absolute top-0 right-0 w-1 h-1 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </Link>

            {/* Language Switcher */}
            <button
              onClick={() => setLanguage(language === 'en' ? 'jp' : 'en')}
              className="group relative px-3 md:px-4 py-2 font-mono text-xs text-pink-400 hover:text-pink-300 transition-all duration-300 ml-2"
              title={language === 'en' ? 'Switch to Japanese' : 'Switch to English'}
            >
              <span className="relative z-10">{language === 'en' ? 'JP' : 'EN'}</span>
              <div className="absolute inset-0 border border-pink-500/30 group-hover:border-pink-500/50 transition-all duration-300"></div>
              <div className="absolute top-0 left-0 w-1 h-1 bg-pink-400"></div>
              <div className="absolute bottom-0 right-0 w-1 h-1 bg-pink-400"></div>
            </button>

            {/* Status Indicator */}
            <div className="hidden lg:flex items-center gap-2 ml-4 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs font-mono text-gray-400">{t.nav.online}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent line */}
      {scrolled && (
        <div className="h-px w-full bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent"></div>
      )}
    </nav>
  )
}

export default Navbar
