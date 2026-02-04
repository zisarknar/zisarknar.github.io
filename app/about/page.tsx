import ParticleBackground from '../components/ParticleBackground'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import Image from 'next/image'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'About - ZISARKNAR.DEV',
  description: 'Software engineer passionate about building scalable applications and solving complex problems',
}

const skills = [
  { name: "Java", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg", level: 95, category: "Languages" },
  { name: "JavaScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg", level: 93, category: "Languages" },
  { name: "TypeScript", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg", level: 93, category: "Languages" },
  { name: "Python", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg", level: 85, category: "Languages" },
  { name: "Spring Boot", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg", level: 95, category: "Backend" },
  { name: "Django", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg", level: 85, category: "Backend" },
  { name: "React", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 93, category: "Frontend" },
  { name: "React Native", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg", level: 93, category: "Mobile" },
  { name: "Flutter", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg", level: 88, category: "Mobile" },
  { name: "PostgreSQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg", level: 90, category: "Database" },
  { name: "MySQL", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg", level: 90, category: "Database" },
  { name: "MongoDB", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg", level: 85, category: "Database" },
  { name: "Redis", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg", level: 85, category: "Database" },
  { name: "Docker", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg", level: 88, category: "DevOps" },
  { name: "AWS", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg", level: 85, category: "DevOps" },
  { name: "Git", logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg", level: 95, category: "DevOps" }
]

const experience = [
  {
    title: "Team Lead",
    company: "ICT Star Group Myanmar Co., Ltd. (日本支社)",
    period: "Jan 2024 - Dec 2025",
    project: "OneJPN Japanese Learning Mobile App",
    description: "Led development of a comprehensive Japanese language learning mobile application",
    achievements: [
      "Designed user flows, UI/UX of mobile app using Figma, system architecture, RESTful APIs, and database schema",
      "Developed React Native mobile app with Redux for state management and wrote tests with Jest",
      "Implemented IAM using Keycloak and OAuth2 to secure the mobile app",
      "Integrated cross-platform In-App Purchase using react-native-iap to support subscription models"
    ]
  },
  {
    title: "Project Member",
    company: "ICT Star Group Myanmar Co., Ltd. (日本支社)",
    period: "Aug 2025 - Oct 2025",
    project: "Smart Meter Reading System (NESIC SES Project)",
    description: "Contributed to the design and development of a smart meter reading system",
    achievements: [
      "Designed UI/UX for both mobile and web apps with Figma",
      "Analyzed requirements and prepared detailed designs"
    ]
  },
  {
    title: "Full Stack Engineer",
    company: "ICT Star Group Myanmar Co., Ltd. (日本支社)",
    period: "Oct 2021 - Dec 2023",
    project: "Smartphone Location Information Management System (NESIC SES Project)",
    description: "Developed a comprehensive location tracking system with mobile and web applications",
    achievements: [
      "Designed UI/UX for both mobile and web apps with Figma, analyzed requirements, and prepared detailed designs",
      "Designed RESTful APIs, database schema, and overall system design",
      "Developed backend system admin panels and API services using Spring Boot, Thymeleaf, jQuery, and Tailwind CSS",
      "Developed mobile app (Android/iOS) using Flutter, connected and fetched GPS data from BLE tracking devices",
      "Implemented authentication using Keycloak and OAuth2",
      "Managed code base with Git and GitFlow, reviewed members' merge requests, and wrote test cases with JUnit",
      "Managed CI/CD with Jenkins for testing and deployments to Sakura Cloud"
    ]
  },
  {
    title: "Backend Engineer",
    company: "ICT Star Group Myanmar Co., Ltd. (日本支社)",
    period: "Jun 2021 - Sep 2021",
    project: "PC Rental Management System (NESIC Offshore Project)",
    description: "Developed backend services for a PC rental management system",
    achievements: [
      "Developed backend API services and business logic",
      "Collaborated with team of 8 members in offshore development model"
    ]
  },
  {
    title: "Full Stack Engineer",
    company: "ICT Star Group Myanmar Co., Ltd. (日本支社)",
    period: "Aug 2019 - Aug 2020",
    project: "Fish Farming with IOT and AI (NESIC Offshore Project)",
    description: "Built IoT-enabled monitoring system for fish farming operations",
    achievements: [
      "Developed centralized admin dashboard using Java and Spring Boot to visualize real-time IoT sensor data",
      "Integrated AWS EC2 with CloudWatch to monitor system performance and health",
      "Helped members refactor code and review code before feature releases",
      "Developed data collection and processing pipelines for IoT devices"
    ]
  },
  {
    title: "Software Engineer",
    company: "ICT Star Group Myanmar Co., Ltd. (日本支社)",
    period: "Jan 2019 - Jul 2019",
    project: "Real Estate Project (Customer Project)",
    description: "Built a comprehensive real estate management platform for Myanmar real estate company",
    achievements: [
      "Created system design documents, detailed design documents, and designed web app UI/UX using Figma",
      "Integrated enterprise data by fetching information from Odoo admin backend using gRPC protocols",
      "Developed Spring Boot web app and deployed to the Cloud with Docker",
      "Converted web app into Flutter mobile applications and successfully deployed iOS/Android apps to stores",
      "Managed source code with Git and GitFlow and wrote test cases with JUnit"
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
                Hello! I&apos;m ZI SAR KAY NAR (ジサーケィナー), a software engineer based in Tokyo, Japan, 
                with 7+ years of experience in full-stack software development. I specialize in building 
                API services, web and mobile applications using Java (Spring Boot), Python (Django), 
                JavaScript/TypeScript (React, React Native), and Cloud technologies.
              </p>
              <p>
                I&apos;ve been in Japan since April 2022 and have been working on diverse projects ranging from 
                Japanese language learning mobile apps to IoT-enabled smart systems. My expertise includes 
                designing system architectures, developing RESTful APIs, building cross-platform mobile 
                applications with React Native and Flutter, and implementing secure authentication systems 
                with Keycloak and OAuth2.
              </p>
              <p>
                I hold a TOEIC score of 825 (2024) and passed JLPT N3. I&apos;m passionate about creating 
                scalable solutions, optimizing performance, and delivering exceptional user experiences. 
                My work spans enterprise systems for companies like NESIC, mobile app development, and 
                cloud infrastructure management.
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
                      <div className="w-10 h-10 flex items-center justify-center filter group-hover:drop-shadow-[0_0_8px_rgba(6,182,212,0.8)] transition-all">
                        <Image 
                          src={skill.logo} 
                          alt={skill.name}
                          width={32}
                          height={32}
                          className="object-contain"
                        />
                      </div>
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
                      {job.project && (
                        <p className="text-purple-400 font-semibold text-base mb-1">{job.project}</p>
                      )}
                      <p className="text-gray-500 font-mono text-sm">{job.company}</p>
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

      {/* Education & Certifications Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <div className="w-12 h-px bg-gradient-to-r from-transparent to-purple-500"></div>
            <h2 className="text-3xl md:text-4xl font-bold">
              <span className="bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                EDUCATION & CERTIFICATIONS
              </span>
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
          </div>

          <div className="space-y-6">
            {/* Certifications */}
            <div className="relative bg-gradient-to-br from-cyan-500/5 to-blue-500/5 backdrop-blur-md border border-cyan-500/30 p-8">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-400"></div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🏆</span>
                <h3 className="text-xl font-bold text-cyan-400">Certifications</h3>
              </div>
              <div className="space-y-3 text-gray-300">
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <div>
                    <span className="text-purple-400 font-mono">TOEIC Listening & Reading</span> - Score: 825 (2024)
                    {' '}
                    <a 
                      href="https://iibc.cloudcerts.jp/viewer/cert/5aJemlWBgNAqgu68NgOA5VmIbVAVQ8JRN1MRA2yWqwWERiZYeXE8POBuYQnXj9pE"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-cyan-400 hover:text-cyan-300 underline"
                    >
                      [View Certificate]
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="text-cyan-400 mt-1">▹</span>
                  <div>
                    <span className="text-purple-400 font-mono">JLPT N3</span> - Passed
                  </div>
                </div>
              </div>
            </div>

            {/* Education */}
            <div className="relative bg-gradient-to-br from-purple-500/5 to-cyan-500/5 backdrop-blur-md border border-purple-500/30 p-8">
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-purple-400"></div>
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-purple-400"></div>
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-purple-400"></div>
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-purple-400"></div>

              <div className="flex items-center gap-3 mb-4">
                <span className="text-2xl">🎓</span>
                <h3 className="text-xl font-bold text-purple-400">Education</h3>
              </div>
              <div className="space-y-4">
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg text-cyan-400 font-semibold">
                      Information and Communication Technology Training Institute (ICTTI JICA)
                    </h4>
                    <span className="text-sm text-gray-500 font-mono">May - Oct 2018</span>
                  </div>
                  <p className="text-gray-300">Diploma in Software Engineering</p>
                  <p className="text-gray-500 text-sm">Yangon, Myanmar</p>
                </div>
                <div className="h-px bg-gradient-to-r from-transparent via-purple-500/30 to-transparent"></div>
                <div>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h4 className="text-lg text-cyan-400 font-semibold">
                      Sagaing Technological University
                    </h4>
                    <span className="text-sm text-gray-500 font-mono">Sep 2011 - Feb 2017</span>
                  </div>
                  <p className="text-gray-300">Bachelor of Electronic and Communication Engineering</p>
                  <p className="text-gray-500 text-sm">Sagaing, Myanmar</p>
                </div>
              </div>
            </div>
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
