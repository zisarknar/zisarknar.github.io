import Link from 'next/link'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { getAllSlugs, getAllPosts, getPostBySlug } from '../../lib/blog'
import Footer from '../../components/Footer'
import SocialSidebar from '../../components/SocialSidebar'
import PageTransition from '../../components/PageTransition'
import TopNav from '../../components/TopNav'
import Breadcrumb from '../../components/Breadcrumb'

interface PageProps {
  params: { slug: string }
}

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const post = await getPostBySlug(params.slug).catch(() => null)
  if (!post) return {}
  return {
    title: `${post.title} - ZISARKNAR.DEV`,
    description: post.excerpt,
  }
}

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

export default async function BlogPost({ params }: PageProps) {
  const slugs = getAllSlugs()
  if (!slugs.includes(params.slug)) {
    notFound()
  }

  const post = await getPostBySlug(params.slug)
  const allPosts = getAllPosts()
  const currentIndex = allPosts.findIndex((p) => p.slug === params.slug)
  const prevPost = allPosts[currentIndex + 1]
  const nextPost = allPosts[currentIndex - 1]

  return (
    <PageTransition>
      <main className="min-h-screen w-full bg-white text-gray-900">
        <TopNav />
        <SocialSidebar />

        <article className="relative py-24 px-6 md:px-12 lg:px-24">
          <div className="max-w-3xl mx-auto w-full">
            <div className="mb-12">
              <Breadcrumb currentPage="Blog" />
            </div>

            <header className="mb-12 space-y-6">
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
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-gray-900">
                {post.title}
              </h1>
              <div className="w-20 h-1 bg-gray-900"></div>
              <p className="text-sm text-gray-500">{formatDate(post.date)}</p>
            </header>

            <div
              className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-h2:text-2xl prose-h2:mt-12 prose-h2:mb-4 prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-blue-600 prose-strong:text-gray-900 prose-code:text-sm prose-pre:bg-gray-900"
              dangerouslySetInnerHTML={{ __html: post.contentHtml }}
            />

            <div className="mt-24 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between gap-6">
              {prevPost ? (
                <Link href={`/blog/${prevPost.slug}`} className="group max-w-xs">
                  <div className="text-xs text-gray-400 tracking-wider mb-1">PREVIOUS</div>
                  <div className="text-base font-medium text-gray-900 group-hover:text-gray-500 transition-colors">
                    {prevPost.title}
                  </div>
                </Link>
              ) : <div />}
              {nextPost ? (
                <Link href={`/blog/${nextPost.slug}`} className="group max-w-xs text-right">
                  <div className="text-xs text-gray-400 tracking-wider mb-1">NEXT</div>
                  <div className="text-base font-medium text-gray-900 group-hover:text-gray-500 transition-colors">
                    {nextPost.title}
                  </div>
                </Link>
              ) : <div />}
            </div>

            <div className="mt-12">
              <Link
                href="/blog"
                className="inline-block px-8 py-4 bg-gray-900 text-white hover:bg-gray-800 transition-colors text-sm font-medium tracking-wider"
              >
                BACK TO BLOG
              </Link>
            </div>
          </div>
        </article>

        <Footer />
      </main>
    </PageTransition>
  )
}
