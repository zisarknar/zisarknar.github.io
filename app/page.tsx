'use client'

import { useState, useEffect } from 'react'
import ParticleBackground from './components/ParticleBackground'
import Navbar from './components/Navbar'
import Link from 'next/link'
import MeshBackground from './components/MeshBackground'
import Terminal from './components/Terminal'
import MouseGlow from './components/MouseGlow'
import Preloader from './components/Preloader'
import { useLanguage } from './lib/LanguageContext'

interface Project {
  title: string
  description: string
  tech: string[]
  icon: string
  link?: string
}

interface Skill {
  name: string
  logo: string
  level: number
  category: string
}

const skills: Skill[] = [
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", level: 95, category: "Languages" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", level: 95, category: "Backend" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 93, category: "Languages" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 93, category: "Frontend" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 93, category: "Mobile" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", level: 88, category: "Mobile" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 90, category: "Database" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 88, category: "DevOps" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", level: 85, category: "DevOps" }
]

export default function Home() {
  const [showScrollIndicator, setShowScrollIndicator] = useState(true)
  const { t } = useLanguage()

  useEffect(() => {
    const handleScroll = () => {
      // Show scroll indicator only when at the top (within 50px)
      setShowScrollIndicator(window.scrollY < 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <Preloader />
      <MouseGlow />
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section - Full Height with Tron/Sci-Fi Design */}
      <section className="relative min-h-screen flex flex-col items-center justify-center px-4 pt-20 pb-24 overflow-hidden">
        {/* Mesh Background with Data Links */}
        <MeshBackground />
        
        {/* Tron-style geometric overlay */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-1/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent"></div>
          <div className="absolute top-3/4 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent"></div>
        </div>

        {/* Glowing orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-40 right-20 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>

        <div className="relative z-10 max-w-6xl mx-auto text-center space-y-8">
          {/* Floating status bar */}
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-gray-900/40 backdrop-blur-md border border-cyan-500/30 rounded-full mb-6 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs font-mono text-gray-400 tracking-wider">{t.hero.systemOnline}</span>
            <div className="w-px h-4 bg-cyan-500/30"></div>
            <span className="text-xs font-mono text-cyan-400">{t.hero.location}</span>
          </div>
          
          {/* Main title with glitch effect */}
          <div className="relative">
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold mb-6 tracking-tight">
              <span className="relative inline-block glitch-text" data-text={t.hero.title}>
                <span className="absolute inset-0 blur-2xl bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 opacity-50"></span>
                <span className="relative bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                  {t.hero.title}
                </span>
              </span>
            </h1>
            
            {/* Hexagonal accent lines */}
            <div className="absolute -left-20 top-1/2 w-16 h-px bg-gradient-to-r from-transparent to-cyan-500"></div>
            <div className="absolute -right-20 top-1/2 w-16 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>

          {/* Glitch effect subtitle */}
          <div className="relative inline-block">
            <div className="text-2xl md:text-3xl font-light tracking-[0.3em] text-cyan-300 mb-2">
              {t.hero.subtitle}
            </div>
            <div className="absolute inset-0 text-2xl md:text-3xl font-light tracking-[0.3em] text-purple-500 opacity-30 blur-sm" style={{ transform: 'translate(2px, 2px)' }}>
              {t.hero.subtitle}
            </div>
          </div>
          
          {/* Holographic data display */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center mt-8">
            <div className="group relative px-6 py-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-400 transition-all duration-300 clip-corner">
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-cyan-400"></div>
              
              <div className="text-xs font-mono text-gray-500 mb-1">{t.hero.designation}</div>
              <div className="text-lg font-mono text-cyan-400">{t.hero.role}</div>
            </div>

            <div className="hidden md:block w-px h-12 bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>

            <div className="group relative px-6 py-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 backdrop-blur-sm border border-purple-500/30 hover:border-purple-400 transition-all duration-300 clip-corner">
              <div className="absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-purple-400"></div>
              <div className="absolute top-0 right-0 w-2 h-2 border-t-2 border-r-2 border-purple-400"></div>
              <div className="absolute bottom-0 left-0 w-2 h-2 border-b-2 border-l-2 border-purple-400"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-purple-400"></div>
              
              <div className="text-xs font-mono text-gray-500 mb-1">{t.hero.specialization}</div>
              <div className="text-lg font-mono text-purple-400">{t.hero.skills}</div>
            </div>
          </div>
          
          {/* Command line interface with visitor info */}
          <Terminal />
        </div>
        
        {/* Scroll indicator with enhanced animation - only show at top */}
        {showScrollIndicator && (
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-3 z-10 transition-opacity duration-300">
            <div className="text-sm font-mono text-cyan-400 tracking-wider uppercase animate-pulse">{t.hero.scrollDown}</div>
            <div className="relative w-6 h-10 border-2 border-cyan-400/50 rounded-full flex items-start justify-center p-1.5">
              <div className="w-1.5 h-3 bg-cyan-400 rounded-full animate-scroll-down shadow-[0_0_10px_rgba(6,182,212,0.8)]"></div>
            </div>
            <div className="flex flex-col gap-1">
              <div className="w-px h-6 bg-gradient-to-b from-cyan-400 to-transparent animate-pulse"></div>
              <div className="w-px h-6 bg-gradient-to-b from-cyan-400/60 to-transparent animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-px h-6 bg-gradient-to-b from-cyan-400/30 to-transparent animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}

        {/* Corner accents */}
        <div className="absolute top-0 left-0 w-32 h-32 border-t-2 border-l-2 border-cyan-500/30"></div>
        <div className="absolute top-0 right-0 w-32 h-32 border-t-2 border-r-2 border-purple-500/30"></div>
        <div className="absolute bottom-0 left-0 w-32 h-32 border-b-2 border-l-2 border-blue-500/30"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 border-b-2 border-r-2 border-cyan-500/30"></div>
      </section>

      {/* About Section */}
      <section id="about" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500"></div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                {t.sections.about}
              </span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
            <span className="font-mono text-xs text-cyan-500">001</span>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500 overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/5 transition-all duration-500"></div>
              
              <div className="relative p-8 z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-500"></div>
                  <h3 className="text-xl font-mono text-cyan-400">&gt; BACKGROUND_</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  Software engineer with 7+ years of experience in full-stack development. 
                  Specialized in building enterprise applications, mobile solutions, and API services 
                  using Java (Spring Boot), Python (Django), JavaScript/TypeScript (React, React Native), and Cloud technologies.
                  Based in Tokyo, Japan since April 2022.
                </p>
                
                {/* Decorative line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-cyan-500/50 via-cyan-500/20 to-transparent"></div>
              </div>
            </div>
            
            <div className="group relative bg-gradient-to-br from-purple-500/5 to-pink-500/5 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400/50 transition-all duration-500 overflow-hidden">
              {/* Corner brackets */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400"></div>
              
              {/* Hover glow effect */}
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-all duration-500"></div>
              
              <div className="relative p-8 z-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-500"></div>
                  <h3 className="text-xl font-mono text-purple-400">&gt; EXPERTISE_</h3>
                </div>
                <p className="text-gray-300 leading-relaxed">
                  System architecture design, RESTful APIs, cross-platform mobile development (React Native, Flutter), 
                  secure authentication (Keycloak, OAuth2), IoT integration, and CI/CD automation. 
                  Led multiple enterprise projects from conception to deployment.
                </p>
                
                {/* Decorative line */}
                <div className="mt-6 h-px w-full bg-gradient-to-r from-purple-500/50 via-purple-500/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="relative py-32 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-16">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
                {t.sections.skills}
              </span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
            <span className="font-mono text-xs text-purple-500">010</span>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative bg-black/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400 transition-all duration-500 overflow-hidden"
              >
                {/* Animated background on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
                
                {/* Top corner indicator */}
                <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>
                
                <div className="relative p-6 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 flex items-center justify-center filter group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all">
                        <img 
                          src={skill.logo} 
                          alt={skill.name}
                          className="w-8 h-8 object-contain"
                        />
                      </div>
                      <div>
                        <span className="text-lg font-mono text-cyan-400 group-hover:text-cyan-300 transition-colors block">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-600 font-mono">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom left corner accent */}
                <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section - Temporarily Hidden */}

      {/* Contact Section */}
      <section id="contact" className="relative py-32 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-16 justify-center">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500"></div>
            <h2 className="text-3xl md:text-5xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                {t.sections.contact}
              </span>
            </h2>
            <div className="w-12 h-px bg-gradient-to-l from-transparent to-purple-500"></div>
          </div>
          
          <div className="relative bg-gradient-to-br from-cyan-500/5 via-purple-500/5 to-blue-500/5 backdrop-blur-md border border-cyan-500/30 overflow-hidden">
            {/* Animated corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-400"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-400"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400"></div>
            
            {/* Center cross lines */}
            <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
            <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500/30 to-transparent"></div>
            
            <div className="relative p-12 md:p-16 z-10">
              <p className="text-xl md:text-2xl text-gray-300 mb-4">
                Interested in working together?
              </p>
              <p className="text-lg text-cyan-400 mb-12 font-mono">
                {'> INITIATE_CONNECTION()'}
              </p>
              
              <div className="flex flex-wrap gap-6 justify-center">
                <a
                  href="mailto:zisarknar.me@gmail.com"
                  className="group relative px-8 py-4 bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-cyan-500/0 group-hover:bg-cyan-500/10 transition-all"></div>
                  <span className="relative flex items-center gap-3 font-mono">
                    <span>📧</span>
                    <span>EMAIL</span>
                  </span>
                  <div className="absolute top-0 left-0 w-2 h-2 bg-cyan-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-cyan-400"></div>
                </a>
                
                <a
                  href="https://github.com/zisarknar"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-purple-500/10 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all"></div>
                  <span className="relative flex items-center gap-3 font-mono">
                    <span>💻</span>
                    <span>GITHUB</span>
                  </span>
                  <div className="absolute top-0 left-0 w-2 h-2 bg-purple-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-400"></div>
                </a>
                
                <a
                  href="https://www.linkedin.com/in/zisarknar/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative px-8 py-4 bg-blue-500/10 border-2 border-blue-500 text-blue-400 hover:bg-blue-500/20 transition-all duration-300 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all"></div>
                  <span className="relative flex items-center gap-3 font-mono">
                    <span>💼</span>
                    <span>LINKEDIN</span>
                  </span>
                  <div className="absolute top-0 left-0 w-2 h-2 bg-blue-400"></div>
                  <div className="absolute bottom-0 right-0 w-2 h-2 bg-blue-400"></div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-12 px-4 border-t border-cyan-500/20">
        <div className="max-w-6xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <p className="text-gray-500 font-mono text-sm">
                © 2025 ZISARKNAR.DEV
              </p>
            </div>
            
            <div className="flex items-center gap-4">
              <span className="text-gray-600 font-mono text-xs">BUILT_WITH:</span>
              <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
                <span>Next.js</span>
                <span className="text-gray-600">•</span>
                <span>TypeScript</span>
                <span className="text-gray-600">•</span>
                <span>Tailwind</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 text-gray-600 font-mono text-xs">
              <span>{'// '}</span>
              <span>Powered by coffee</span>
            </div>
          </div>
          
          {/* Bottom accent line */}
          <div className="mt-8 h-px w-full bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
        </div>
      </footer>
    </main>
  )
}
