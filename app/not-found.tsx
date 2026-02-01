'use client'

import Link from 'next/link'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import { useEffect, useState } from 'react'

export default function NotFound() {
  const [glitchText, setGlitchText] = useState('404')
  const glitchChars = '!<>-_\\/[]{}—=+*^?#________'

  useEffect(() => {
    const interval = setInterval(() => {
      const shouldGlitch = Math.random() > 0.85
      if (shouldGlitch) {
        const chars = glitchText.split('')
        const randomIndex = Math.floor(Math.random() * chars.length)
        chars[randomIndex] = glitchChars[Math.floor(Math.random() * glitchChars.length)]
        setGlitchText(chars.join(''))
        setTimeout(() => setGlitchText('404'), 100)
      }
    }, 150)

    return () => clearInterval(interval)
  }, [glitchText])

  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* Tron-style geometric overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Error status bar */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/40 backdrop-blur-md border border-red-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-gray-400 tracking-wider">ERROR_DETECTED</span>
            <div className="w-px h-4 bg-red-500/30"></div>
            <span className="text-xs font-mono text-red-400">PAGE_NOT_FOUND</span>
          </div>
          
          {/* Giant 404 with glitch effect */}
          <div className="relative mb-8">
            <h1 className="text-[12rem] md:text-[16rem] font-bold leading-none tracking-tight">
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-500 via-purple-500 to-cyan-500 opacity-50"></span>
                <span className="relative bg-gradient-to-r from-red-400 via-purple-500 to-cyan-500 bg-clip-text text-transparent glitch-text" data-text={glitchText}>
                  {glitchText}
                </span>
              </span>
            </h1>
            
            {/* Hexagonal accent lines */}
            <div className="absolute -left-20 top-1/2 w-16 h-px bg-gradient-to-r from-transparent to-red-500"></div>
            <div className="absolute -right-20 top-1/2 w-16 h-px bg-gradient-to-l from-transparent to-cyan-500"></div>
          </div>

          {/* Error message */}
          <div className="relative inline-block mb-8">
            <div className="text-2xl md:text-3xl font-light tracking-[0.3em] text-cyan-300 mb-2">
              PAGE NOT FOUND
            </div>
            <div className="absolute inset-0 text-2xl md:text-3xl font-light tracking-[0.3em] text-red-500 opacity-30 blur-sm" style={{ transform: 'translate(2px, 2px)' }}>
              PAGE NOT FOUND
            </div>
          </div>
          
          {/* Description */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            The page you&apos;re looking for has been moved, deleted, or never existed in this dimension.
            Let&apos;s get you back to safety.
          </p>

          {/* Terminal-style error info */}
          <div className="relative max-w-2xl mx-auto bg-black/60 backdrop-blur-sm border border-red-500/30 p-6 mb-12">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-400"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-400"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-400"></div>
            
            <div className="font-mono text-left text-sm space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-red-400">{'>'}</span>
                <span className="text-gray-500">ERROR_CODE:</span>
                <span className="text-red-400">404</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">{'>'}</span>
                <span className="text-gray-500">STATUS:</span>
                <span className="text-yellow-400">RESOURCE_NOT_FOUND</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">{'>'}</span>
                <span className="text-gray-500">SUGGESTION:</span>
                <span className="text-cyan-400">RETURN_HOME()</span>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link
              href="/"
              className="group relative px-8 py-4 font-mono text-cyan-400 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-sm border-2 border-cyan-500 group-hover:bg-cyan-500/20 transition-all duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span>← GO HOME</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </Link>

            <Link
              href="/projects"
              className="group relative px-8 py-4 font-mono text-purple-400 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-sm border-2 border-purple-500 group-hover:bg-purple-500/20 transition-all duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span>VIEW PROJECTS</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
            </Link>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-red-500/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-purple-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-cyan-500/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-red-500/30"></div>
      </section>
    </main>
  )
}
