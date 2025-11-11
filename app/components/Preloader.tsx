'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../lib/LanguageContext'

const Preloader = () => {
  const { t } = useLanguage()
  const [isLoading, setIsLoading] = useState(true)
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    // Simulate loading progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => setIsLoading(false), 500)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)

    return () => clearInterval(interval)
  }, [])

  if (!isLoading) return null

  return (
    <div className="fixed inset-0 z-[100] bg-black flex items-center justify-center preloader-fade-out">
      {/* Animated grid background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `
            linear-gradient(rgba(6, 182, 212, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(6, 182, 212, 0.1) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          animation: 'grid-move 2s linear infinite'
        }}></div>
      </div>

      {/* Center content */}
      <div className="relative z-10 flex flex-col items-center gap-8">
        {/* Tron circles */}
        <div className="relative w-48 h-48">
          {/* Outer rotating circle */}
          <div className="absolute inset-0 border-2 border-cyan-500/30 rounded-full animate-spin-slow"></div>
          <div className="absolute inset-4 border-2 border-cyan-500/20 rounded-full animate-spin-reverse"></div>
          <div className="absolute inset-8 border-2 border-purple-500/30 rounded-full animate-spin-slow"></div>
          
          {/* Center hexagon */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-20 h-20">
              {/* Hexagon shape */}
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-full h-full animate-pulse" viewBox="0 0 100 100">
                  <polygon 
                    points="50 5, 95 27.5, 95 72.5, 50 95, 5 72.5, 5 27.5" 
                    fill="none" 
                    stroke="url(#gradient)" 
                    strokeWidth="2"
                  />
                  <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#06b6d4" />
                      <stop offset="100%" stopColor="#a855f7" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              
              {/* Inner glow */}
              <div className="absolute inset-0 bg-cyan-500/20 blur-xl rounded-full"></div>
            </div>
          </div>

          {/* Scanning line */}
          <div className="absolute inset-0 flex items-center justify-center overflow-hidden">
            <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-scan"></div>
          </div>
        </div>

        {/* Loading text */}
        <div className="space-y-4">
          <h1 className="text-4xl font-bold tracking-wider">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              {t.preloader.initializing}
            </span>
          </h1>
          
          {/* Progress bar */}
          <div className="w-80 h-2 bg-gray-900/50 border border-cyan-500/30 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-300 relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            </div>
          </div>

          {/* Loading percentage */}
          <div className="text-center font-mono text-cyan-400 text-sm">
            {Math.floor(progress)}% {t.preloader.complete}
          </div>

          {/* System messages */}
          <div className="font-mono text-xs text-gray-500 text-center space-y-1 min-h-[40px]">
            {progress < 30 && <div className="animate-pulse">{t.preloader.loadingModules}</div>}
            {progress >= 30 && progress < 60 && <div className="animate-pulse">{t.preloader.initializingInterface}</div>}
            {progress >= 60 && progress < 90 && <div className="animate-pulse">{t.preloader.establishingConnection}</div>}
            {progress >= 90 && <div className="text-green-400 animate-pulse">{t.preloader.systemReady} ✓</div>}
          </div>
        </div>

        {/* Corner brackets */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-2 border-l-2 border-cyan-500/50 animate-pulse"></div>
        <div className="absolute top-10 right-10 w-20 h-20 border-t-2 border-r-2 border-cyan-500/50 animate-pulse" style={{ animationDelay: '0.5s' }}></div>
        <div className="absolute bottom-10 left-10 w-20 h-20 border-b-2 border-l-2 border-purple-500/50 animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-2 border-r-2 border-purple-500/50 animate-pulse" style={{ animationDelay: '1.5s' }}></div>
      </div>
    </div>
  )
}

export default Preloader
