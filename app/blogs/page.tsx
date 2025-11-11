import ParticleBackground from '../components/ParticleBackground'
import Navbar from '../components/Navbar'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog - ZISARKNAR.DEV',
  description: 'Thoughts on software development, architecture, and technology',
}

interface BlogPost {
  title: string
  excerpt: string
  date: string
  readTime: string
  category: string
  tags: string[]
  slug: string
}

const blogPosts: BlogPost[] = [
  {
    title: "Building Scalable Microservices with Kubernetes",
    excerpt: "Learn how to design and deploy production-ready microservices architecture using Kubernetes, Docker, and modern DevOps practices.",
    date: "2025-01-15",
    readTime: "8 min read",
    category: "DevOps",
    tags: ["Kubernetes", "Docker", "Microservices", "Cloud"],
    slug: "scalable-microservices-kubernetes"
  },
  {
    title: "The Future of Web Development: Next.js 15",
    excerpt: "Exploring the latest features in Next.js 15, including improved performance, better developer experience, and new rendering strategies.",
    date: "2025-01-10",
    readTime: "6 min read",
    category: "Web Development",
    tags: ["Next.js", "React", "JavaScript", "Frontend"],
    slug: "nextjs-15-future-web-development"
  },
  {
    title: "Optimizing PostgreSQL for High-Traffic Applications",
    excerpt: "Advanced techniques for tuning PostgreSQL databases to handle millions of queries per day with minimal latency.",
    date: "2025-01-05",
    readTime: "10 min read",
    category: "Database",
    tags: ["PostgreSQL", "Performance", "Backend", "SQL"],
    slug: "optimizing-postgresql-high-traffic"
  },
  {
    title: "Implementing Real-Time Features with WebSockets",
    excerpt: "A comprehensive guide to building real-time applications using WebSocket technology, including best practices and common pitfalls.",
    date: "2024-12-28",
    readTime: "7 min read",
    category: "Backend",
    tags: ["WebSocket", "Real-time", "Node.js", "API"],
    slug: "real-time-features-websockets"
  },
  {
    title: "Securing Your API: Best Practices for 2025",
    excerpt: "Essential security measures every developer should implement to protect their APIs from common vulnerabilities and attacks.",
    date: "2024-12-20",
    readTime: "9 min read",
    category: "Security",
    tags: ["Security", "API", "Authentication", "Best Practices"],
    slug: "securing-api-best-practices-2025"
  },
  {
    title: "TypeScript Advanced Patterns for React",
    excerpt: "Master advanced TypeScript patterns to build type-safe React applications with better developer experience and fewer bugs.",
    date: "2024-12-15",
    readTime: "8 min read",
    category: "Frontend",
    tags: ["TypeScript", "React", "Patterns", "Frontend"],
    slug: "typescript-advanced-patterns-react"
  }
]

const categories = ["All", "DevOps", "Web Development", "Database", "Backend", "Security", "Frontend"]

export default function Blog() {
  return (
    <main className="min-h-screen w-full bg-black text-white overflow-x-hidden">
      <ParticleBackground />
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex flex-col items-center justify-center px-4 pt-32 pb-16">
        {/* Tron lines */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 left-1/2 w-px h-full bg-gradient-to-b from-transparent via-purple-500 to-transparent"></div>
          <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          {/* Breadcrumb */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-gray-900/40 backdrop-blur-md border border-purple-500/30 rounded-full mb-8">
            <Link href="/" className="text-xs font-mono text-gray-400 hover:text-purple-400 transition-colors">
              HOME
            </Link>
            <span className="text-purple-500">/</span>
            <span className="text-xs font-mono text-purple-400">BLOGS</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              BLOGS
            </span>
          </h1>
          
          <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
            Thoughts on software development, architecture, and technology. 
            Sharing knowledge from building scalable applications.
          </p>

          <div className="flex items-center justify-center gap-4 text-sm font-mono">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
              <span className="text-gray-500">Total Posts:</span>
              <span className="text-purple-400">{blogPosts.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Category Filter */}
      <section className="relative py-8 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 overflow-x-auto pb-4">
            <span className="text-xs font-mono text-gray-500 whitespace-nowrap">FILTER:</span>
            {categories.map((category, index) => (
              <button
                key={index}
                className={`px-4 py-2 font-mono text-sm border transition-all whitespace-nowrap ${
                  index === 0
                    ? 'bg-purple-500/20 border-purple-400 text-purple-400'
                    : 'bg-gray-900/40 border-gray-700 text-gray-400 hover:border-purple-400 hover:text-purple-400'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="relative py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.map((post, index) => (
              <article
                key={index}
                className="group relative bg-gradient-to-br from-gray-900/40 to-black/40 backdrop-blur-sm border border-purple-500/20 hover:border-purple-400 transition-all duration-500 overflow-hidden cursor-pointer"
              >
                {/* Corner accents */}
                <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-purple-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                
                {/* Hover glow */}
                <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/5 transition-all duration-500"></div>
                
                <div className="relative p-8 z-10">
                  {/* Category badge */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-purple-500/10 border border-purple-500/30 mb-4">
                    <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-pulse"></div>
                    <span className="text-xs font-mono text-purple-400">{post.category}</span>
                  </div>

                  {/* Title */}
                  <h2 className="text-xl font-bold text-cyan-400 mb-3 group-hover:text-cyan-300 transition-colors line-clamp-2">
                    {post.title}
                  </h2>
                  
                  {/* Excerpt */}
                  <p className="text-gray-400 mb-6 leading-relaxed text-sm line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  {/* Meta info */}
                  <div className="flex items-center justify-between text-xs font-mono text-gray-500 mb-4">
                    <span>{post.date}</span>
                    <span>{post.readTime}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {post.tags.slice(0, 3).map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="px-2 py-1 text-xs font-mono bg-cyan-500/10 border border-cyan-500/30 text-cyan-400"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>

                  {/* Read more link */}
                  <div className="flex items-center gap-2 text-purple-400 font-mono text-sm group-hover:text-purple-300 transition-colors">
                    <span>READ MORE</span>
                    <span className="group-hover:translate-x-1 transition-transform">→</span>
                  </div>

                  {/* Bottom accent line */}
                  <div className="h-px w-0 group-hover:w-full bg-gradient-to-r from-purple-500 to-cyan-500 transition-all duration-500 mt-4"></div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More */}
          <div className="flex justify-center mt-16">
            <button className="group relative px-8 py-4 bg-purple-500/10 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/20 transition-all font-mono overflow-hidden">
              <div className="absolute inset-0 bg-purple-500/0 group-hover:bg-purple-500/10 transition-all"></div>
              <span className="relative flex items-center gap-2">
                <span>LOAD MORE POSTS</span>
                <span className="group-hover:rotate-180 transition-transform">↻</span>
              </span>
              <div className="absolute top-0 left-0 w-2 h-2 bg-purple-400"></div>
              <div className="absolute bottom-0 right-0 w-2 h-2 bg-purple-400"></div>
            </button>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="relative py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-purple-500/5 to-cyan-500/5 backdrop-blur-md border border-purple-500/30 p-12">
            {/* Corner brackets */}
            <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-purple-400"></div>
            <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-cyan-400"></div>
            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-cyan-400"></div>
            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-purple-400"></div>

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-cyan-500 bg-clip-text text-transparent">
                Stay Updated
              </h2>
              <p className="text-gray-400 mb-8">
                Subscribe to get notified about new blog posts and updates
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="flex-1 px-6 py-3 bg-black/60 border border-cyan-500/30 text-white font-mono text-sm focus:border-cyan-400 focus:outline-none"
                />
                <button className="px-6 py-3 bg-purple-500/20 border-2 border-purple-500 text-purple-400 hover:bg-purple-500/30 transition-all font-mono">
                  SUBSCRIBE
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
