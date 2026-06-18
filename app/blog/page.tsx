import Link from 'next/link'
import type { Metadata } from 'next'
import { getAllPosts } from '../lib/blog'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'
import PageTransition from '../components/PageTransition'
import TopNav from '../components/TopNav'
import Breadcrumb from '../components/Breadcrumb'

export const metadata: Metadata = {
  title: 'Blog - ZISARKNAR.DEV',
  description: 'Writing on software engineering, mobile development, and life between Myanmar and Japan.',
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default function Blog() {
  const posts = getAllPosts()

  return (
    <PageTransition>
      <main className="min-h-screen w-full bg-white text-gray-900">
        <TopNav />
        <SocialSidebar />

        {/* Hero Section */}
        <section className="relative py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto w-full">
            <div className="mb-12">
              <Breadcrumb currentPage="Blog" />
            </div>

            <div className="mb-24">
              <div className="space-y-2">
                <h1 className="text-7xl md:text-8xl font-bold tracking-tight text-gray-900">
                  BLOG
                </h1>
                <div className="w-24 h-1 bg-gray-900"></div>
              </div>
              <p className="text-xl text-gray-600 font-light mt-6 max-w-2xl">
                Notes on software engineering, mobile development, and life between Myanmar and Japan.
              </p>
            </div>
          </div>
        </section>

        {/* Posts List */}
        <section className="relative pb-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-7xl mx-auto">
            <div className="divide-y divide-gray-100">
              {posts.map((post, index) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block py-10 first:pt-0"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
                    <span className="text-sm text-gray-400 tracking-wider shrink-0 w-24">
                      {String(index + 1).padStart(2, '0')} /
                    </span>
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-wrap items-center gap-4">
                        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-gray-900 group-hover:text-gray-500 transition-colors">
                          {post.title}
                        </h2>
                      </div>
                      <p className="text-base text-gray-600 leading-relaxed max-w-2xl">
                        {post.excerpt}
                      </p>
                      <div className="flex flex-wrap items-center gap-4 pt-1">
                        <span className="text-sm text-gray-500">{formatDate(post.date)}</span>
                        <div className="flex gap-2">
                          {post.tags.map((tag) => (
                            <span
                              key={tag}
                              className="text-xs text-gray-500 tracking-wider px-2 py-1 border border-gray-200"
                            >
                              {tag.toUpperCase()}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
