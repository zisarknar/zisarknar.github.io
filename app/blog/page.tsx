import { Suspense } from 'react'
import type { Metadata } from 'next'
import { getAllPosts } from '../lib/blog'
import Footer from '../components/Footer'
import SocialSidebar from '../components/SocialSidebar'
import PageTransition from '../components/PageTransition'
import TopNav from '../components/TopNav'
import Breadcrumb from '../components/Breadcrumb'
import BlogListClient from './BlogListClient'

export const metadata: Metadata = {
  title: 'Blog - ZISARKNAR.DEV',
  description: 'Writing on software engineering, mobile development, and life between Myanmar and Japan.',
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
            <Suspense>
              <BlogListClient posts={posts} />
            </Suspense>
          </div>
        </section>

        <Footer />
      </main>
    </PageTransition>
  )
}
