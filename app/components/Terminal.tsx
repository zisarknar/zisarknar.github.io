'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '../lib/LanguageContext'

interface VisitorInfo {
  ip: string
  city: string
  country: string
  timezone: string
}

const Terminal = () => {
  const { t } = useLanguage()
  const [visitorInfo, setVisitorInfo] = useState<VisitorInfo>({
    ip: 'Loading...',
    city: 'Loading...',
    country: 'Loading...',
    timezone: 'Loading...'
  })
  const [currentLine, setCurrentLine] = useState(0)
  const [isMaximized, setIsMaximized] = useState(false)

  useEffect(() => {
    // Fetch visitor IP and information
    const fetchVisitorInfo = async () => {
      try {
        const response = await fetch('https://ipapi.co/json/')
        const data = await response.json()
        setVisitorInfo({
          ip: data.ip || 'Unknown',
          city: data.city || 'Unknown',
          country: data.country_name || 'Unknown',
          timezone: data.timezone || 'Unknown'
        })
      } catch (error) {
        setVisitorInfo({
          ip: '127.0.0.1',
          city: 'Local',
          country: 'Local Network',
          timezone: Intl.DateTimeFormat().resolvedOptions().timeZone
        })
      }
    }

    fetchVisitorInfo()
  }, [])

  useEffect(() => {
    // Loop through terminal lines
    const interval = setInterval(() => {
      setCurrentLine((prev) => (prev + 1) % 8)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const terminalLines = [
    { text: `$ ${t.terminal.whoami}`, delay: 0 },
    { text: `> ${t.terminal.visitorDetected}: ${visitorInfo.ip}`, delay: 0.5 },
    { text: `> ${t.terminal.location}: ${visitorInfo.city}, ${visitorInfo.country}`, delay: 1 },
    { text: `> ${t.terminal.timezone}: ${visitorInfo.timezone}`, delay: 1.5 },
    { text: `$ ${t.terminal.ls}`, delay: 0 },
    { text: `> drwxr-xr-x  ${t.terminal.skills}/`, delay: 0.5 },
    { text: `> drwxr-xr-x  ${t.terminal.projects}/`, delay: 1 },
    { text: `> drwxr-xr-x  ${t.terminal.experience}/`, delay: 1.5 }
  ]

  const getVisibleLines = () => {
    const linesPerScreen = 4
    const startIndex = Math.floor(currentLine / linesPerScreen) * linesPerScreen
    return terminalLines.slice(startIndex, startIndex + linesPerScreen)
  }

  const handleMaximize = () => {
    setIsMaximized(true)
  }

  const handleClose = () => {
    setIsMaximized(false)
  }

  return (
    <>
      {/* Regular Terminal */}
      <div className="mt-12 max-w-2xl mx-auto">
        <div className="bg-black/60 backdrop-blur-md border border-cyan-500/30 rounded-lg overflow-hidden shadow-[0_0_40px_rgba(6,182,212,0.2)]">
          <div className="flex items-center gap-2 px-4 py-2 bg-gray-900/80 border-b border-cyan-500/30">
            <button 
              onClick={handleClose}
              className="w-3 h-3 rounded-full bg-red-500/80 hover:bg-red-500 transition-colors animate-pulse"
            ></button>
            <button className="w-3 h-3 rounded-full bg-yellow-500/80 hover:bg-yellow-500 transition-colors animate-pulse" style={{ animationDelay: '0.2s' }}></button>
            <button 
              onClick={handleMaximize}
              className="w-3 h-3 rounded-full bg-green-500/80 hover:bg-green-500 transition-colors animate-pulse cursor-pointer"
              style={{ animationDelay: '0.4s' }}
            ></button>
            <span className="ml-2 text-xs font-mono text-gray-500">{t.terminal.title}</span>
            <div className="ml-auto flex items-center gap-2">
              <span className="text-xs font-mono text-cyan-400">{new Date().toLocaleTimeString()}</span>
            </div>
          </div>
          <div className="p-6 font-mono text-sm space-y-2 text-left min-h-[180px]">
            {getVisibleLines().map((line, index) => (
              <div 
                key={`${currentLine}-${index}`}
                className="terminal-line-loop opacity-0"
                style={{ 
                  animationDelay: `${line.delay}s`,
                  animationFillMode: 'forwards'
                }}
              >
                {line.text.startsWith('$') ? (
                  <div className="flex items-center gap-2">
                    <span className="text-green-400">➜</span>
                    <span className="text-cyan-400">~</span>
                    <span className="text-gray-300">{line.text.substring(2)}</span>
                    {index === 0 && <span className="animate-pulse text-cyan-400">▊</span>}
                  </div>
                ) : (
                  <div className={line.text.includes('✓') ? 'text-green-400 pl-4' : 'text-cyan-400 pl-4'}>
                    {line.text}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Maximized Terminal Modal */}
      {isMaximized && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="w-[90vw] max-w-5xl h-[80vh] bg-black/90 backdrop-blur-md border-2 border-cyan-500/50 rounded-lg overflow-hidden shadow-[0_0_80px_rgba(6,182,212,0.4)] terminal-zoom-in">
            <div className="flex items-center gap-2 px-6 py-3 bg-gray-900/90 border-b-2 border-cyan-500/50">
              <button 
                onClick={handleClose}
                className="w-4 h-4 rounded-full bg-red-500 hover:bg-red-600 transition-colors cursor-pointer"
              ></button>
              <button className="w-4 h-4 rounded-full bg-yellow-500 hover:bg-yellow-600 transition-colors"></button>
              <button 
                onClick={handleClose}
                className="w-4 h-4 rounded-full bg-green-500 hover:bg-green-600 transition-colors cursor-pointer"
              ></button>
              <span className="ml-3 text-sm font-mono text-gray-400">{t.terminal.titleMaximized}</span>
              <div className="ml-auto flex items-center gap-3">
                <span className="text-sm font-mono text-cyan-400">{new Date().toLocaleTimeString()}</span>
                <button 
                  onClick={handleClose}
                  className="text-gray-400 hover:text-red-400 transition-colors"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="p-8 font-mono text-base space-y-3 text-left overflow-y-auto h-[calc(100%-60px)] custom-scrollbar">
              {/* All terminal lines visible in maximized mode */}
              {terminalLines.map((line, index) => (
                <div 
                  key={`max-${index}`}
                  className="terminal-line-loop opacity-0"
                  style={{ 
                    animationDelay: `${index * 0.15}s`,
                    animationFillMode: 'forwards'
                  }}
                >
                  {line.text.startsWith('$') ? (
                    <div className="flex items-center gap-3">
                      <span className="text-green-400 text-xl">➜</span>
                      <span className="text-cyan-400 text-xl">~</span>
                      <span className="text-gray-300 text-lg">{line.text.substring(2)}</span>
                      {index === currentLine && <span className="animate-pulse text-cyan-400 text-xl">▊</span>}
                    </div>
                  ) : (
                    <div className={line.text.includes('✓') ? 'text-green-400 pl-8 text-lg' : 'text-cyan-400 pl-8 text-lg'}>
                      {line.text}
                    </div>
                  )}
                </div>
              ))}
              
              {/* Additional maximized view content */}
              <div className="mt-6 pt-6 border-t border-cyan-500/30 space-y-3">
                <div className="terminal-line-loop opacity-0" style={{ animationDelay: '1.5s', animationFillMode: 'forwards' }}>
                  <div className="flex items-center gap-3">
                    <span className="text-green-400 text-xl">➜</span>
                    <span className="text-cyan-400 text-xl">~</span>
                    <span className="text-gray-300 text-lg">cat /system/info</span>
                  </div>
                </div>
                <div className="terminal-line-loop opacity-0 text-purple-400 pl-8 text-lg" style={{ animationDelay: '2s', animationFillMode: 'forwards' }}>
                  &gt; System Status: ONLINE
                </div>
                <div className="terminal-line-loop opacity-0 text-purple-400 pl-8 text-lg" style={{ animationDelay: '2.3s', animationFillMode: 'forwards' }}>
                  &gt; Portfolio Version: 2.0.0
                </div>
                <div className="terminal-line-loop opacity-0 text-purple-400 pl-8 text-lg" style={{ animationDelay: '2.6s', animationFillMode: 'forwards' }}>
                  &gt; Last Updated: {new Date().toLocaleDateString()}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default Terminal
