import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - ZISARKNAR.DEV',
  description: 'Software engineer passionate about building scalable applications',
}

export default function About() {
  return (
    <main className="min-h-screen w-full bg-white text-gray-900">
      {/* Fixed Social Links - Right Side */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-6">
        <a 
          href="https://github.com/zisarknar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group p-2"
          aria-label="GitHub"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
          </svg>
        </a>
        <a 
          href="https://twitter.com/zisarknar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group p-2"
          aria-label="Twitter"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </a>
        <a 
          href="https://linkedin.com/in/zisarknar" 
          target="_blank" 
          rel="noopener noreferrer"
          className="group p-2"
          aria-label="LinkedIn"
        >
          <svg className="w-5 h-5 text-gray-400 group-hover:text-gray-900 transition-colors" fill="currentColor" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </a>
      </div>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Content */}
            <div className="space-y-12 pt-12">
              {/* Back to home */}
              <Link href="/" className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-gray-900 transition-colors">
                <span>←</span> Back to Home
              </Link>

              {/* Title */}
              <div className="space-y-6">
                <div className="space-y-2">
                  <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-gray-900">
                    ABOUT
                  </h1>
                  <div className="w-24 h-1 bg-gray-900"></div>
                </div>
                <p className="text-xl text-gray-600 font-light leading-relaxed max-w-lg">
                  Software engineer with 7+ years of experience building scalable digital solutions from Tokyo
                </p>
              </div>

              {/* Quick Stats */}
              <div className="space-y-8 pt-8">
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 tracking-wider">LOCATION</div>
                  <div className="text-2xl font-medium">Tokyo, Japan <span className="text-gray-400 ml-2">東京</span></div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 tracking-wider">EXPERIENCE</div>
                  <div className="text-2xl font-medium">7+ Years</div>
                </div>
                
                <div className="space-y-2">
                  <div className="text-xs text-gray-500 tracking-wider">SPECIALIZATION</div>
                  <div className="text-2xl font-medium">Full Stack Development</div>
                </div>
              </div>
            </div>

            {/* Right Content - Story */}
            <div className="space-y-8 lg:pt-32">
              <div className="text-6xl text-gray-300 font-serif leading-none">&ldquo;</div>
              
              <div className="space-y-6 text-base text-gray-700 leading-relaxed">
                <p>
                  Hello! I&apos;m <strong className="font-semibold text-gray-900">ZI SAR KAY NAR (ジサーケィナー)</strong>, a software engineer currently based in Tokyo, Japan. 
                  I&apos;ve spent the past 7+ years crafting digital experiences, from enterprise systems to mobile applications.
                </p>
                <p>
                  My journey began with a passion for solving complex problems through code. Today, I specialize in 
                  building scalable API services, web applications, and mobile solutions using technologies like 
                  Java (Spring Boot), Python (Django), and JavaScript/TypeScript (React, React Native).
                </p>
                <p>
                  Since moving to Japan in April 2022, I&apos;ve worked on diverse projects — from Japanese language learning 
                  mobile apps to IoT-enabled smart systems. I hold a TOEIC score of 825 (2024) and passed JLPT N3, 
                  continuously expanding my ability to bridge cultures through technology.
                </p>
              </div>

              {/* Decorative corner brackets */}
              <div className="relative pt-12">
                <div className="absolute -top-4 -left-4 w-16 h-16 border-t-2 border-l-2 border-gray-200"></div>
              </div>
            </div>

          </div>
        </div>

        {/* Bottom Links */}
        <div className="absolute bottom-8 left-0 right-0 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto text-center">
            <Link href="/" className="text-xs text-gray-500 hover:text-gray-900 transition-colors tracking-wider">HOME</Link>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="space-y-2">
              <h2 className="text-5xl font-bold">SKILLS</h2>
              <div className="w-20 h-1 bg-gray-900"></div>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {[
              'Java', 
              'Spring Boot', 
              'TypeScript', 
              'React', 
              'React Native', 
              'Flutter', 
              'PostgreSQL', 
              'Docker', 
              'AWS', 
              'Python', 
              'Django', 
              'Redis'
            ].map((skill, i) => (
              <div key={i} className="group">
                <div className="p-6 border border-gray-200 hover:border-gray-900 transition-colors bg-white">
                  <div className="text-lg font-medium">{skill}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-32 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto text-center space-y-8">
          <h2 className="text-5xl md:text-6xl font-bold">LET&apos;S WORK<br/>TOGETHER</h2>
          <p className="text-xl text-gray-600 font-light max-w-2xl mx-auto">
            Interested in collaborating on a project? Let&apos;s create something amazing.
          </p>
          <div className="pt-8">
            <a
              href="mailto:hello@zisarknar.dev"
              className="inline-block px-12 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium tracking-wider"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative py-8 px-6 md:px-12 lg:px-24 border-t border-gray-100">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-gray-500">
            © 2026 ZISARKNAR
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="https://github.com/zisarknar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/zisarknar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">LinkedIn</a>
            <a href="https://twitter.com/zisarknar" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 transition-colors">Twitter</a>
          </div>
        </div>
      </footer>
    </main>
  )
}
