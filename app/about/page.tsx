import ParticleBackground from '../components/ParticleBackground'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - ZISARKNAR.DEV',
  description: 'Software engineer passionate about building scalable applications and solving complex problems',
}

const skills = [
  { name: "TypeScript", icon: "⚡", level: 95, category: "Languages" },
  { name: "JavaScript", icon: "📜", level: 95, category: "Languages" },
  { name: "Python", icon: "🐍", level: 85, category: "Languages" },
  { name: "React/Next.js", icon: "⚛️", level: 90, category: "Frontend" },
  { name: "Tailwind CSS", icon: "🎨", level: 92, category: "Frontend" },
  { name: "Node.js", icon: "🟢", level: 88, category: "Backend" },
  { name: "PostgreSQL", icon: "🗄️", level: 82, category: "Backend" },
  { name: "Docker/K8s", icon: "🐋", level: 85, category: "DevOps" },
  { name: "AWS/Azure", icon: "☁️", level: 80, category: "DevOps" }
]

const experience = [
  {
    title: "Senior Software Engineer",
    company: "Tech Corp",
    period: "2023 - Present",
    description: "Leading development of cloud-native applications and microservices architecture",
    achievements: [
      "Architected and deployed scalable microservices handling 10M+ daily requests",
      "Reduced infrastructure costs by 40% through optimization",
      "Mentored team of 5 junior engineers"
    ]
  },
  {
    title: "Full Stack Developer",
    company: "StartUp Inc",
    period: "2021 - 2023",
    description: "Built full-stack applications from concept to production",
    achievements: [
      "Developed real-time analytics dashboard processing 1M+ events/day",
      "Implemented CI/CD pipelines reducing deployment time by 60%",
      "Improved application performance by 3x through optimization"
    ]
  },
  {
    title: "Software Engineer",
    company: "Digital Agency",
    period: "2019 - 2021",
    description: "Developed web applications and APIs for various clients",
    achievements: [
      "Built 15+ client projects with 100% on-time delivery",
      "Introduced TypeScript and modern development practices",
      "Created reusable component library used across projects"
    ]
  }
]

export default function About() {
  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 pt-32 pb-16">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-blue-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/40 backdrop-blur-md border border-blue-500/30 rounded-full mb-8">
            <Link href="/" className="text-xs font-mono text-gray-400 hover:text-blue-400 transition-colors">
              HOME
            </Link>
            <span className="text-blue-500">/</span>
            <span className="text-xs font-mono text-blue-400">ABOUT</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-400 via-cyan-500 to-purple-400 bg-clip-text text-transparent">
              ABOUT ME
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Software engineer passionate about building scalable applications and solving complex problems
          </p>
        </div>
      </section>

      {/* Bio Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-md border border-cyan-500/30 p-12">
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-1 h-12 bg-gradient-to-b from-cyan-400 to-blue-500"></div>
              <h2 className="text-2xl font-mono text-cyan-400">&gt; INTRODUCTION_</h2>
            </div>

            <div className="space-y-4 text-gray-300 leading-relaxed">
              <p>
                Hello! I&apos;m a software engineer based in Tokyo, Japan, specializing in building 
                exceptional web applications, APIs, and mobile solutions. My journey in software 
                development began over 6 years ago, and I&apos;ve had the privilege of working on 
                diverse projects ranging from startups to enterprise applications.
              </p>
              <p>
                I&apos;m passionate about writing clean, maintainable code and building systems that 
                scale. My focus is on creating robust architectures, optimizing performance, and 
                delivering exceptional user experiences. I believe in continuous learning and staying 
                current with emerging technologies.
              </p>
              <p>
                When I&apos;m not coding, you&apos;ll find me exploring Tokyo&apos;s tech scene, 
                contributing to open-source projects, or sharing knowledge through technical writing 
                and mentoring.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                TECHNICAL SKILLS
              </span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {skills.map((skill, index) => (
              <div
                key={index}
                className="group relative bg-black/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400 transition-all duration-500"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/0 to-blue-500/0 group-hover:from-cyan-500/10 group-hover:to-blue-500/10 transition-all duration-500"></div>
                <div className="absolute top-0 right-0 w-6 h-6 border-t-2 border-r-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>
                
                <div className="relative p-6 z-10">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl filter group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all">
                        {skill.icon}
                      </span>
                      <div>
                        <span className="text-lg font-mono text-cyan-400 block">
                          {skill.name}
                        </span>
                        <span className="text-xs text-gray-600 font-mono">
                          {skill.category}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <div className="w-full h-2 bg-gray-900/50 border border-cyan-500/20 overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-cyan-500 to-blue-500 relative"
                        style={{ width: `${skill.level}%` }}
                      >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
                      </div>
                    </div>
                    <div className="text-right mt-2 text-xs text-cyan-400 font-mono">
                      {skill.level}%
                    </div>
                  </div>
                </div>

                <div className="absolute bottom-0 left-0 w-6 h-6 border-b-2 border-l-2 border-cyan-400/50 group-hover:border-cyan-400 transition-colors"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-cyan-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
                EXPERIENCE
              </span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-cyan-500 to-transparent"></div>
          </div>

          <div className="space-y-8">
            {experience.map((job, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-500"
              >
                <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
                <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
                <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
                <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

                <div className="relative p-8 z-10">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-cyan-400 mb-1">{job.title}</h3>
                      <p className="text-purple-400 font-mono text-sm">{job.company}</p>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-cyan-500/10 border border-cyan-500/30 mt-2 md:mt-0">
                      <span className="text-xs font-mono text-cyan-400">{job.period}</span>
                    </div>
                  </div>

                  <p className="text-gray-400 mb-4">{job.description}</p>

                  <div className="space-y-2">
                    {job.achievements.map((achievement, achIndex) => (
                      <div key={achIndex} className="flex items-start gap-3">
                        <span className="text-cyan-400 mt-1">▹</span>
                        <span className="text-gray-300 text-sm">{achievement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-md border border-cyan-500/30 p-12">
            <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-16 h-16 border-t-2 border-r-2 border-purple-400"></div>
            <div className="absolute bottom-0 left-0 w-16 h-16 border-b-2 border-l-2 border-purple-400"></div>
            <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-cyan-400"></div>

            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Let&apos;s Work Together
            </h2>
            <p className="text-gray-400 mb-8">
              I&apos;m always interested in hearing about new projects and opportunities
            </p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 transition-all font-mono"
            >
              {'>'} GET IN TOUCH {'<'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
