'use client'

import { useState, useEffect } from 'react'

const MouseGlow = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  if (!isVisible) return null

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      {/* Vertical line */}
      <div
        className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-500/30 to-transparent"
        style={{
          left: mousePosition.x,
        }}
      ></div>

      {/* Horizontal line */}
      <div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
        style={{
          top: mousePosition.y,
        }}
      ></div>

      {/* Glow at intersection */}
      <div
        className="absolute"
        style={{
          left: mousePosition.x,
          top: mousePosition.y,
          transform: 'translate(-50%, -50%)',
        }}
      >
        <div className="w-[200px] h-[200px] bg-cyan-500/10 rounded-full blur-[60px]"></div>
        <div className="absolute inset-0 w-[100px] h-[100px] bg-purple-500/10 rounded-full blur-[40px] m-auto"></div>
      </div>

      {/* Small coordinate label at intersection */}
      <div
        className="absolute font-mono text-[10px] text-cyan-400/60"
        style={{
          left: mousePosition.x + 15,
          top: mousePosition.y - 15,
        }}
      >
        {mousePosition.x},{mousePosition.y}
      </div>
    </div>
  )
}

export default MouseGlow
