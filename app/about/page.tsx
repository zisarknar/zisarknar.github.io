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
                  <div className="text-2xl font-medium">Software Engineering</div>
                </div>
              </div>
            </div>

            {/* Right Content - Story */}
            <div className="space-y-8 lg:pt-32">
              <div className="text-6xl text-gray-300 font-serif leading-none">&ldquo;</div>
              
              <div className="space-y-6 text-base text-gray-700 leading-relaxed">
                <p>
                  Hello! I&apos;m <strong className="font-semibold text-gray-900">ZI SAR KAY NAR (ジサーケィナー)</strong>, a software engineer currently based in Tokyo, Japan. 
                  With over 7 years of experience in full-stack development, I specialize in architecting API services, web, and mobile applications using Java (Spring Boot), Python (Django), JavaScript/TypeScript (React, React Native), and AWS Cloud infrastructure.
                </p>
                <p>
                  Since relocating to Japan in April 2022, I&apos;ve successfully delivered diverse projects ranging from educational mobile platforms to IoT-enabled smart systems. At ICT Star Group Myanmar Co., Ltd., I&apos;ve worked on everything from Japanese learning mobile apps with OAuth2 security to smart meter systems leveraging AWS Lambda and ThingsBoard.
                </p>
                <p>
                  I hold a TOEIC score of 825 (2024) and passed JLPT N3, continuously expanding my ability to bridge cultures through technology. My approach combines technical excellence with a deep understanding of user needs, whether architecting end-to-end systems in Figma, implementing cross-platform IAP functionality, or optimizing CI/CD pipelines with GitHub Actions.
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
      <section className="relative py-16 px-6 md:px-12 lg:px-24 bg-gray-50">
        <div className="max-w-7xl mx-auto">
          <div className="mb-8">
            <div className="space-y-2">
              <h2 className="text-5xl font-bold">SKILLS</h2>
              <div className="w-20 h-1 bg-gray-900"></div>
            </div>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3">
            {[
              { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
              { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
              { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
              { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
              { name: 'Dart', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/dart/dart-original.svg' },
              { name: 'SQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg' },
              { name: 'Spring Boot', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/spring/spring-original.svg' },
              { name: 'Django', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg' },
              { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
              { name: 'Flutter', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg' },
              { name: 'Android', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/android/android-original.svg' },
              { name: 'iOS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/apple/apple-original.svg' },
              { name: 'Tailwind', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-original.svg' },
              { name: 'AWS', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg' },
              { name: 'Docker', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg' },
              { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
              { name: 'PostgreSQL', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg' },
              { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
              { name: 'Redis', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg' },
              { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
              { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
              { name: 'GitHub', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg' },
            ].map((skill, i) => (
              <div key={i} className="group">
                <div className="flex flex-col items-center gap-2 p-3 border border-gray-200 hover:border-gray-900 hover:shadow-md transition-all bg-white">
                  <img 
                    src={skill.icon} 
                    alt={skill.name}
                    className="w-8 h-8 object-contain"
                  />
                  <div className="text-xs font-medium text-center">{skill.name}</div>
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
            {/* Experience 1 - OneJPN */}
            <div className="border-l-2 border-gray-900 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">OneJPN Japanese Learning Mobile App</h3>
                  <span className="text-sm text-gray-500 tracking-wider">JAN 2024 - DEC 2025</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Full Stack Engineer</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Architected end-to-end system design including user flows in Figma, RESTful API architecture, and PostgreSQL database schemas. 
                  Developed mobile app using React Native and Redux, implemented IAM using Keycloak and OAuth2, integrated cross-platform In-App Purchase functionality. 
                  Developed backend APIs with Python (Django) and PostgreSQL with Redis for caching.
                </p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.isgm2.ilearner" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <span>Google Play</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </a>
                  <a 
                    href="https://apps.apple.com/us/app/onejpn-japanese-mastery/id6476648372" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <span>App Store</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">React Native</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Redux</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Python</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Django</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">PostgreSQL</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Keycloak</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">OAuth2</span>
                </div>
              </div>
            </div>

            {/* Experience 2 - Smart Meter */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Smart Meter Reading System</h3>
                  <span className="text-sm text-gray-500 tracking-wider">AUG 2025 - OCT 2025</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Project Member (NESIC SES Project)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Migration by converting ThingsBoard&apos;s built-in rule chain functions into AWS Lambda functions using Python. 
                  Ensured code reliability by writing comprehensive unit tests for Lambda functions using PyTest.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">AWS Lambda</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Python</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">PyTest</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">ThingsBoard</span>
                </div>
              </div>
            </div>

            {/* Experience 3 - Location Management */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Smartphone Location Information Management System</h3>
                  <span className="text-sm text-gray-500 tracking-wider">OCT 2021 - DEC 2023</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Full Stack Engineer (NESIC SES Project)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Designed UI/UX and system architecture including RESTful APIs and database schemas. Developed cross-platform mobile app (Android/iOS) using Flutter to track BLE devices via GPS data. 
                  Developed robust backend services and admin panels using Java, Spring Boot, and MySQL. 
                  Automated CI/CD pipelines using GitHub Actions for seamless deployment to Sakura Cloud.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Flutter</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Java</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Spring Boot</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">MySQL</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">GitHub Actions</span>
                </div>
              </div>
            </div>

            {/* Experience 4 - PC Rental */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">PC Rental Management System</h3>
                  <span className="text-sm text-gray-500 tracking-wider">JUN 2021 - SEP 2021</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Backend Engineer (NESIC Offshore Project)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Integrated Active Directory authentication into an offshore PC rental management system using Java, Spring Boot, and Spring Security. 
                  Automated communication workflows by implementing bulk email systems with dynamic templates using Spring Scheduling.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Java</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Spring Boot</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Spring Security</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Active Directory</span>
                </div>
              </div>
            </div>

            {/* Experience 5 - Fiber Management */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Fiber Pre/Post-Sale Management System</h3>
                  <span className="text-sm text-gray-500 tracking-wider">MAR 2021 - JUN 2021</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Android Engineer (In-House Project)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Engineered interactive mapping features allowing users to hand-draw fiber routes directly within the mobile application. 
                  Optimized data visibility by enabling location-tagged image uploads for real-time admin monitoring of fiber infrastructure.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Android</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Java</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Google Maps API</span>
                </div>
              </div>
            </div>

            {/* Experience 6 - iSGM HR */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">iSGM Human Resources Management System</h3>
                  <span className="text-sm text-gray-500 tracking-wider">AUG 2020 - FEB 2021</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Full Stack Engineer (In-House Project)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Designed mobile app UI/UX using Figma and developed cross-platform apps using Flutter and released them to stores. 
                  Developed full-stack features including Java (Spring Boot) backend services and Angular-based admin dashboard. 
                  Managed containerized deployments and code quality using Docker, Docker Compose, and GitLab CI/CD.
                </p>
                <div className="flex gap-3 pt-2">
                  <a 
                    href="https://play.google.com/store/apps/details?id=com.isgm2.ihrms.client&hl=en" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <span>Google Play</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                    </svg>
                  </a>
                  <a 
                    href="https://apps.apple.com/us/app/ihrms-mobile/id1505528205" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <span>App Store</span>
                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Flutter</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Java</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Spring Boot</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Angular</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Docker</span>
                </div>
              </div>
            </div>

            {/* Experience 7 - Fish Farming */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Fish Farming with IoT and AI</h3>
                  <span className="text-sm text-gray-500 tracking-wider">AUG 2019 - AUG 2020</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Backend Engineer (NESIC Offshore Project)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Developed centralized admin dashboard using Java and Spring Boot to visualize real-time data. 
                  Implemented multi-video upload with total size up to 20 GBs without data loss to S3 buckets for AI service. 
                  Configured cloud monitoring by integrating AWS EC2 with CloudWatch to track system health and performance metrics.
                </p>
                <div className="pt-2">
                  <a 
                    href="https://jpn.nec.com/press/201804/20180424_01.html" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-xs font-medium"
                  >
                    <span>Project Reference</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                  </a>
                </div>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Java</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Spring Boot</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">AWS S3</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">CloudWatch</span>
                </div>
              </div>
            </div>

            {/* Experience 8 - Real Estate */}
            <div className="border-l-2 border-gray-300 pl-8">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Real Estate Project</h3>
                  <span className="text-sm text-gray-500 tracking-wider">JAN 2019 - JUL 2019</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">ICT Star Group Myanmar Co., Ltd. • Full Stack Engineer (Customer Project)</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Created system design documents and designed web app UI/UX using Figma. 
                  Integrated enterprise data by fetching information from Odoo admin backend using gRPC protocols. 
                  Executed multi-platform launch by developing Spring Boot web app and converting it into Flutter mobile applications for iOS/Android stores.
                </p>
                <div className="flex flex-wrap gap-2 pt-2">
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Spring Boot</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">Flutter</span>
                  <span className="text-xs px-3 py-1 bg-gray-100 text-gray-700">gRPC</span>
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
            {/* Education 1 - Diploma */}
            <div className="border-l-2 border-gray-900 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Diploma in Software Engineering</h3>
                  <span className="text-sm text-gray-500 tracking-wider">MAY - OCT 2018</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">Information and Communication Technology Training Institute (ICTTI JICA) • Yangon, Myanmar</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Intensive software engineering program focused on modern development practices and methodologies.
                </p>
              </div>
            </div>

            {/* Education 2 - Bachelor */}
            <div className="border-l-2 border-gray-300 pl-8 pb-12">
              <div className="space-y-4">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                  <h3 className="text-2xl font-bold">Bachelor of Electronic and Communication Engineering</h3>
                  <span className="text-sm text-gray-500 tracking-wider">SEP 2011 - FEB 2017</span>
                </div>
                <div className="text-lg text-gray-600 font-medium">Sagaing Technological University • Sagaing, Myanmar</div>
                <p className="text-gray-700 leading-relaxed max-w-3xl">
                  Focused on electronic systems, communication technologies, programming, and fundamental engineering principles.
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
                      <div className="font-medium">TOEIC Listening & Reading - Score: 825</div>
                      <div className="text-sm text-gray-600">Test of English for International Communication (2024) • <a href="https://iibc.cloudcerts.jp/viewer/cert/5aJemlWBgNAqgu68NgOA5VmIbVAVQ8JRN1MRA2yWqwWERiZYeXE8POBuYQnXj9pE" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">View Certificate</a></div>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <span className="text-gray-400">•</span>
                    <div>
                      <div className="font-medium">JLPT N3 - Passed</div>
                      <div className="text-sm text-gray-600">Japanese Language Proficiency Test</div>
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
