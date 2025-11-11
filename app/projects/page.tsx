import ParticleBackground from '../components/ParticleBackground'
import Navbar from '../components/Navbar'
import ProjectCard from '../components/ProjectCard'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Projects - ZISARKNAR.DEV',
  description: 'A collection of my work spanning web applications, APIs, mobile apps, and cloud infrastructure',
}

interface Project {
  title: string
  description: string
  tech: string[]
  icon: string
  link?: string
  fullDescription?: string
  features?: string[]
  github?: string
  demo?: string
}

const projects: Project[] = [
  {
    title: "Cloud Infrastructure Platform",
    description: "Scalable microservices architecture deployed on Kubernetes with CI/CD automation",
    fullDescription: "Enterprise-grade cloud infrastructure platform built on Kubernetes, featuring automated deployment pipelines, service mesh integration, and comprehensive monitoring solutions. Handles millions of requests daily with 99.99% uptime.",
    tech: ["Docker", "K8s", "Terraform", "AWS", "Jenkins"],
    icon: "☁️",
    features: [
      "Auto-scaling microservices with horizontal pod autoscaler",
      "Zero-downtime deployments using blue-green strategy",
      "Integrated service mesh with Istio for traffic management",
      "Comprehensive monitoring with Prometheus and Grafana",
      "Infrastructure as Code with Terraform"
    ],
    github: "https://github.com/zisarknar",
    demo: "https://demo.zisarknar.dev"
  },
  {
    title: "Real-time Analytics Dashboard",
    description: "High-performance data visualization platform processing millions of events per second",
    fullDescription: "Real-time analytics and visualization platform designed to handle massive data streams. Built with WebSocket technology for instant updates and Redis for sub-millisecond data retrieval.",
    tech: ["React", "WebSocket", "Redis", "PostgreSQL", "D3.js"],
    icon: "📊",
    features: [
      "Real-time data streaming with WebSocket connections",
      "Interactive charts and graphs with D3.js",
      "Advanced filtering and aggregation capabilities",
      "Custom alerting and notification system",
      "Export data in multiple formats (CSV, JSON, PDF)"
    ],
    github: "https://github.com/zisarknar"
  },
  {
    title: "API Gateway Service",
    description: "Enterprise-grade REST API with authentication, rate limiting, and comprehensive monitoring",
    fullDescription: "High-performance API gateway service that handles authentication, rate limiting, request routing, and API versioning. Built with Node.js and Express for maximum throughput.",
    tech: ["Node.js", "Express", "JWT", "Prometheus", "Redis"],
    icon: "🔌",
    features: [
      "JWT-based authentication and authorization",
      "Distributed rate limiting with Redis",
      "API versioning and request routing",
      "Comprehensive metrics and logging",
      "OpenAPI/Swagger documentation"
    ],
    github: "https://github.com/zisarknar",
    demo: "https://api.zisarknar.dev"
  },
  {
    title: "Mobile Banking App",
    description: "Cross-platform mobile application with biometric authentication and end-to-end encryption",
    fullDescription: "Secure mobile banking application with fingerprint and face ID authentication. Features real-time transaction updates, bill payments, and comprehensive account management.",
    tech: ["React Native", "TypeScript", "Firebase", "Stripe"],
    icon: "📱",
    features: [
      "Biometric authentication (fingerprint/Face ID)",
      "End-to-end encryption for all transactions",
      "Real-time balance and transaction updates",
      "Bill payment and fund transfer functionality",
      "Multi-language support"
    ],
    demo: "https://app.zisarknar.dev"
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce solution with inventory management and payment processing",
    fullDescription: "Complete e-commerce platform with admin dashboard, customer portal, inventory management, and integrated payment processing. Built for scalability and performance.",
    tech: ["Next.js", "PostgreSQL", "Stripe", "Tailwind", "Vercel"],
    icon: "🛒",
    features: [
      "Product catalog with advanced search and filtering",
      "Secure checkout with Stripe integration",
      "Order tracking and management system",
      "Admin dashboard for inventory management",
      "Email notifications for orders and shipments"
    ],
    github: "https://github.com/zisarknar",
    demo: "https://shop.zisarknar.dev"
  },
  {
    title: "AI Chat Assistant",
    description: "Intelligent chatbot powered by machine learning for customer support automation",
    fullDescription: "AI-powered chat assistant that uses natural language processing to understand and respond to customer queries. Integrated with knowledge base for accurate responses.",
    tech: ["Python", "TensorFlow", "FastAPI", "MongoDB", "Redis"],
    icon: "🤖",
    features: [
      "Natural language understanding with NLP",
      "Context-aware conversation handling",
      "Integration with knowledge base and FAQs",
      "Multi-language support",
      "Analytics dashboard for chat insights"
    ],
    github: "https://github.com/zisarknar"
  }
]

export default function Projects() {
  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 pt-32 pb-16">
        {/* Tron lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-cyan-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-500 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/40 backdrop-blur-md border border-cyan-500/30 rounded-full mb-8">
            <Link href="/" className="text-xs font-mono text-gray-400 hover:text-cyan-400 transition-colors">
              HOME
            </Link>
            <span className="text-cyan-500">/</span>
            <span className="text-xs font-mono text-cyan-400">PROJECTS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              ALL PROJECTS
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            A collection of my work spanning web applications, APIs, mobile apps, and cloud infrastructure.
            Hover over any project to see detailed information.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
              <span className="text-gray-500">Total Projects:</span>
              <span className="text-cyan-400">{projects.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <div className="relative bg-gradient-to-br from-cyan-500/5 to-purple-500/5 backdrop-blur-md border border-cyan-500/30 p-12">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 border-cyan-400"></div>
            <div className="absolute top-0 right-0 w-8 h-8 border-t-2 border-r-2 border-purple-400"></div>
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-2 border-l-2 border-purple-400"></div>
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 border-cyan-400"></div>

            <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-cyan-400 to-purple-500 bg-clip-text text-transparent">
              Have a Project in Mind?
            </h2>
            <p className="text-gray-400 mb-8">
              Let&apos;s build something amazing together
            </p>
            <Link
              href="/#contact"
              className="inline-block px-8 py-4 bg-cyan-500/10 border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/20 transition-all font-mono"
            >
              {'>'} CONTACT ME {'<'}
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
