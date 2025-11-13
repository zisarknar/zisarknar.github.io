'use client'

import { useEffect, useState } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'

interface ErrorProps {
  error: Error & { digest?: string }
  reset: () => void
}

export default function Error({ error, reset }: ErrorProps) {
  const [errorCode, setErrorCode] = useState('ERR_500')

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20">
        {/* Tron-style geometric overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-red-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-red-500 to-transparent"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-orange-500/50 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent"></div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-red-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          {/* Error status bar */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/40 backdrop-blur-md border border-red-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(239,68,68,0.3)]">
            <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-gray-400 tracking-wider">SYSTEM_ERROR</span>
            <div className="w-px h-4 bg-red-500/30"></div>
            <span className="text-xs font-mono text-red-400">{errorCode}</span>
          </div>
          
          {/* Error icon */}
          <div className="relative mb-8">
            <div className="text-8xl md:text-9xl mb-8">
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-3xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-50"></span>
                <span className="relative bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  ⚠️
                </span>
              </span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              <span className="relative inline-block">
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-red-500 via-orange-500 to-yellow-500 opacity-50"></span>
                <span className="relative bg-gradient-to-r from-red-400 via-orange-500 to-yellow-500 bg-clip-text text-transparent">
                  SOMETHING WENT WRONG
                </span>
              </span>
            </h1>
            
            {/* Hexagonal accent lines */}
            <div className="absolute -left-20 top-1/2 w-16 h-px bg-gradient-to-r from-transparent to-red-500"></div>
            <div className="absolute -right-20 top-1/2 w-16 h-px bg-gradient-to-l from-transparent to-orange-500"></div>
          </div>
          
          {/* Description */}
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-12">
            An unexpected error occurred while processing your request. 
            Our systems have logged this issue and we&apos;ll look into it.
          </p>

          {/* Terminal-style error info */}
          <div className="relative max-w-2xl mx-auto bg-black/60 backdrop-blur-sm border border-red-500/30 p-6 mb-12">
            <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-red-400"></div>
            <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-red-400"></div>
            <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-red-400"></div>
            <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-red-400"></div>
            
            <div className="font-mono text-left text-sm space-y-2">
              <div className="flex items-start gap-2">
                <span className="text-red-400 flex-shrink-0">{'>'}</span>
                <span className="text-gray-500 flex-shrink-0">ERROR:</span>
                <span className="text-red-400 break-all">{error.message || 'Unknown error occurred'}</span>
              </div>
              {error.digest && (
                <div className="flex items-center gap-2">
                  <span className="text-red-400">{'>'}</span>
                  <span className="text-gray-500">DIGEST:</span>
                  <span className="text-yellow-400">{error.digest}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <span className="text-red-400">{'>'}</span>
                <span className="text-gray-500">STATUS:</span>
                <span className="text-yellow-400">SYSTEM_FAILURE</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-red-400">{'>'}</span>
                <span className="text-gray-500">ACTION:</span>
                <span className="text-cyan-400">TRY_AGAIN()</span>
              </div>
            </div>
          </div>
          
          {/* Action buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <button
              onClick={reset}
              className="group relative px-8 py-4 font-mono text-cyan-400 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-cyan-500/10 backdrop-blur-sm border-2 border-cyan-500 group-hover:bg-cyan-500/20 transition-all duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span>↻ TRY AGAIN</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-cyan-400 group-hover:w-full transition-all duration-300"></div>
            </button>

            <a
              href="/"
              className="group relative px-8 py-4 font-mono text-purple-400 overflow-hidden transition-all duration-300"
            >
              <div className="absolute inset-0 bg-purple-500/10 backdrop-blur-sm border-2 border-purple-500 group-hover:bg-purple-500/20 transition-all duration-300"></div>
              <span className="relative z-10 flex items-center gap-2">
                <span>← GO HOME</span>
              </span>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-400 group-hover:w-full transition-all duration-300"></div>
            </a>
          </div>
        </div>

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-red-500/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-orange-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-yellow-500/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-red-500/30"></div>
      </section>
    </main>
  )
}
