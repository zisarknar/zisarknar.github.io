'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import type { BlogPostMeta } from '../lib/blog'

const POSTS_PER_PAGE = 10

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}

interface Props {
  posts: BlogPostMeta[]
}

export default function BlogListClient({ posts }: Props) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const totalPages = Math.max(1, Math.ceil(posts.length / POSTS_PER_PAGE))
  const requestedPage = Number(searchParams.get('page')) || 1
  const currentPage = Math.min(Math.max(1, requestedPage), totalPages)

  const start = (currentPage - 1) * POSTS_PER_PAGE
  const visiblePosts = posts.slice(start, start + POSTS_PER_PAGE)

  const goToPage = (page: number) => {
    const params = new URLSearchParams(searchParams.toString())
    if (page <= 1) {
      params.delete('page')
    } else {
      params.set('page', String(page))
    }
    const query = params.toString()
    router.push(`/blog${query ? `?${query}` : ''}`)
  }

  return (
    <>
      <div className="divide-y divide-gray-100">
        {visiblePosts.map((post, index) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group block py-10 first:pt-0"
          >
            <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-12">
              <span className="text-sm text-gray-400 tracking-wider shrink-0 w-24">
                {String(start + index + 1).padStart(2, '0')} /
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

      {totalPages > 1 && (
        <nav className="flex items-center justify-center gap-2 mt-16" aria-label="Blog pagination">
          <button
            type="button"
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 text-sm tracking-wider border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-colors disabled:opacity-40 disabled:hover:text-gray-600 disabled:hover:border-gray-200"
          >
            PREV
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <button
              key={page}
              type="button"
              onClick={() => goToPage(page)}
              aria-current={page === currentPage ? 'page' : undefined}
              className={`w-10 h-10 text-sm tracking-wider transition-colors ${
                page === currentPage
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-900'
              }`}
            >
              {page}
            </button>
          ))}

          <button
            type="button"
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 text-sm tracking-wider border border-gray-200 text-gray-600 hover:text-gray-900 hover:border-gray-900 transition-colors disabled:opacity-40 disabled:hover:text-gray-600 disabled:hover:border-gray-200"
          >
            NEXT
          </button>
        </nav>
      )}
    </>
  )
}
