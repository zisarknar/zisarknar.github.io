'use client'

import { useEffect, useState } from 'react'

interface Props {
  children: React.ReactNode
}

export default function PageTransition({ children }: Props) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div
      className={`transition-opacity duration-700 ease-in-out ${
        mounted ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {children}
    </div>
  )
}
