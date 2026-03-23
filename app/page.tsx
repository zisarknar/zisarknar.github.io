'use client'

import Link from 'next/link'
import Footer from './components/Footer'
import SocialSidebar from './components/SocialSidebar'
import PageTransition from './components/PageTransition'
import TopNav from './components/TopNav'

export default function Home() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full bg-white text-gray-900">
        <TopNav />
        <SocialSidebar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <div className="space-y-8">
              {/* Available Badge */}
              {/* <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-sm text-gray-600">Available for work</span>
              </div> */}

              {/* Name */}
              <div className="space-y-2">
                <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight text-gray-900">
                  ZI SAR KAY NAR
                </h1>
                <div className="w-20 h-1 bg-gray-900"></div>
                <p className="text-lg md:text-xl text-gray-600 font-light tracking-wide">
                  ジサーケィナー (ဇီဆာကေနာ)
                </p>
              </div>

              {/* Quote decoration */}
              <div className="text-6xl text-gray-300 font-serif leading-none">&ldquo;</div>

              {/* Bio */}
              <div className="space-y-4 max-w-lg">
                <p className="text-base text-gray-700 leading-relaxed">
                  FULL STACK & MOBILE ENGINEER FROM <a href="https://en.wikipedia.org/wiki/Myanmar" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors cursor-pointer inline-flex items-center gap-1">MYANMAR<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>. ORIGINALLY FROM <a href="https://en.wikipedia.org/wiki/Lisu_people" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800 transition-colors cursor-pointer inline-flex items-center gap-1">THE LISU PEOPLE<svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg></a>, I SPECIALIZE IN BUILDING SCALABLE WEB APPLICATIONS, MOBILE APPS, AND APIS, TRANSFORMING COMPLEX REQUIREMENTS INTO ROBUST, PRODUCTION-READY SOLUTIONS.
                </p>
              </div>

              {/* CTA Button */}
              <div className="pt-4">
                <Link 
                  href="/contact"
                  className="inline-block px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium tracking-wider"
                >
                  CONTACT
                </Link>
              </div>
            </div>

            {/* Right Content - Portrait with Overlay Text */}
            <div className="relative lg:flex hidden items-center justify-center">
              <div className="relative w-[600px] h-[600px]">
                {/* Portrait Image with gray background */}
                <div className="absolute inset-0 bg-gray-400 overflow-hidden">
                  <img 
                    src="/assets/hobbies/me.png" 
                    alt="Portrait"
                    className="w-full h-full object-cover opacity-90"
                  />
                </div>
                
                {/* Overlaid Large Name Text */}
                <div className="absolute inset-0 flex flex-col justify-end">
                  <h3 className="text-9xl font-bold text-white leading-none tracking-tight px-8">
                    Bello
                    <br/>
                    Banana
                  </h3>
                </div>
                
                {/* Role Text - Top Right */}
                <div className="absolute top-8 right-8 text-right">
                  <p className="text-white text-lg font-light">Trust me, <br/> I am a coder!</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
      </main>
    </PageTransition>
  )
}
