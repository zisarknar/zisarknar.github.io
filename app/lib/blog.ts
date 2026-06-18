import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { remark } from 'remark'
import remarkGfm from 'remark-gfm'
import html from 'remark-html'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string
}

export function getAllSlugs(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

export function getAllPosts(): BlogPostMeta[] {
  return getAllSlugs()
    .map((slug) => {
      const fileContents = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8')
      const { data } = matter(fileContents)
      return {
        slug,
        title: data.title as string,
        date: data.date as string,
        excerpt: data.excerpt as string,
        tags: (data.tags as string[]) || [],
      }
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const fileContents = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8')
  const { data, content } = matter(fileContents)

  const processed = await remark().use(remarkGfm).use(html).process(content)

  return {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) || [],
    contentHtml: processed.toString(),
  }
}
