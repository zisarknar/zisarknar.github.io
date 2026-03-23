'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

export default function TopNav() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 px-6 md:px-12 lg:px-24 py-8 transition-all duration-300 ${
      isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm' : ''
    }`}>
      <div className="max-w-7xl mx-auto flex justify-center">
        <div className="flex gap-8">
          <Link 
            href="/" 
            className={`text-xs tracking-wider transition-colors ${
              pathname === '/' 
                ? 'text-gray-900 font-semibold' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            HOME
          </Link>
             <Link 
            href="/hobbies" 
            className={`text-xs tracking-wider transition-colors ${
              pathname === '/hobbies' 
                ? 'text-gray-900 font-semibold' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            HOBBIES
          </Link>
          <Link 
            href="/contact" 
            className={`text-xs tracking-wider transition-colors ${
              pathname === '/contact' 
                ? 'text-gray-900 font-semibold' 
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            CONTACT
          </Link>
       
        </div>
      </div>
    </nav>
  )
}
