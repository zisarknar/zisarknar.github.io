import Link from 'next/link'
import type { Metadata } from 'next'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'
import PageTransition from '../components/PageTransition'
import TopNav from '../components/TopNav'
import Breadcrumb from '../components/Breadcrumb'

export const metadata: Metadata = {
  title: 'About - ZISARKNAR.DEV',
  description: 'Software engineer passionate about building scalable applications',
}

export default function About() {
  return (
    <PageTransition>
      <main className="min-h-screen w-full bg-white text-gray-900">
        <TopNav />
        <SocialSidebar />

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Content */}
            <div className="space-y-12 pt-12">
              <Breadcrumb currentPage="About" />

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

      {/* Work Experience Section */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="space-y-2">
              <h2 className="text-5xl font-bold">WORK EXPERIENCE</h2>
              <div className="w-20 h-1 bg-gray-900"></div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Experience 1 */}
            <div className="border-l-2 border-gray-900 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Senior Software Engineer</h3>
                  <span className="text-sm text-gray-500 tracking-wider">2022 - PRESENT</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">Tech Company • Tokyo, Japan</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Leading development of scalable API services and mobile applications. Architecting cloud-native solutions using Spring Boot, React Native, and AWS. Mentoring junior developers and establishing best practices for code quality.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Java</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Spring Boot</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">React Native</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">AWS</span>
                </div>
              </div>
            </div>

            {/* Experience 2 */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Full Stack Developer</h3>
                  <span className="text-sm text-gray-500 tracking-wider">2019 - 2022</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">Digital Agency • Remote</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Developed web applications and API services for various clients. Built responsive user interfaces using React and TypeScript. Implemented RESTful APIs with Django and PostgreSQL.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">React</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">TypeScript</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Django</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">PostgreSQL</span>
                </div>
              </div>
            </div>

            {/* Experience 3 */}
            <div className="border-l-2 border-gray-300 pl-8">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Software Developer</h3>
                  <span className="text-sm text-gray-500 tracking-wider">2017 - 2019</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">Startup Company • Remote</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Contributed to building MVP products and prototypes. Worked with cross-functional teams to deliver features on tight deadlines. Gained experience in full software development lifecycle.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">JavaScript</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Python</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Docker</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section className="relative py-24 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16">
            <div className="space-y-2">
              <h2 className="text-5xl font-bold">EDUCATION</h2>
              <div className="w-20 h-1 bg-gray-900"></div>
            </div>
          </div>

          <div className="space-y-12">
            {/* Education 1 */}
            <div className="border-l-2 border-gray-900 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Bachelor of Engineering </h3>
                  <span className="text-sm text-gray-500 tracking-wider">Sep 2011 - Feb 2017</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">University of Technology (Sagaging)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Focused on software engineering, algorithms, and data structures. Completed capstone project on distributed systems and cloud computing.
                </p>
              </div>
            </div>

            {/* Certifications */}
            <div className="border-l-2 border-gray-300 pl-8">
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Certifications & Language</h3>
                <div className="space-y-3 text-gray-700">
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">•</span>
                    <div>
                      <div className="font-medium">JLPT N3</div>
                      <div className="text-sm text-gray-600">Japanese Language Proficiency Test</div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">•</span>
                    <div>
                      <div className="font-medium">TOEIC 825</div>
                      <div className="text-sm text-gray-600">Test of English for International Communication (2024)</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
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
              href="mailto:zisarknar.me@gmail.com"
              className="inline-block px-12 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium tracking-wider"
            >
              GET IN TOUCH
            </a>
          </div>
        </div>
      </section>

      <Footer />
      </main>
    </PageTransition>
  )
}
