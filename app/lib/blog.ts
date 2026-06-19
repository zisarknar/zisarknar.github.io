import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { unified } from 'unified'
import remarkParse from 'remark-parse'
import remarkGfm from 'remark-gfm'
import remarkRehype from 'remark-rehype'
import rehypeSlug from 'rehype-slug'
import rehypeStringify from 'rehype-stringify'
import { toString } from 'mdast-util-to-string'
import GithubSlugger from 'github-slugger'
import { visit } from 'unist-util-visit'

const BLOG_DIR = path.join(process.cwd(), 'content/blog')

export type PostStatus = 'draft' | 'published'

export interface BlogHeading {
  depth: number
  text: string
  slug: string
}

export interface BlogPostMeta {
  slug: string
  title: string
  date: string
  excerpt: string
  tags: string[]
  status: PostStatus
}

export interface BlogPost extends BlogPostMeta {
  contentHtml: string
  headings: BlogHeading[]
}

function readFrontmatter(slug: string) {
  const fileContents = fs.readFileSync(path.join(BLOG_DIR, `${slug}.md`), 'utf8')
  const { data, content } = matter(fileContents)
  const meta: BlogPostMeta = {
    slug,
    title: data.title as string,
    date: data.date as string,
    excerpt: data.excerpt as string,
    tags: (data.tags as string[]) || [],
    status: (data.status as PostStatus) || 'published',
  }
  return { meta, content }
}

function getAllSlugsOnDisk(): string[] {
  return fs
    .readdirSync(BLOG_DIR)
    .filter((file) => file.endsWith('.md'))
    .map((file) => file.replace(/\.md$/, ''))
}

/** Slugs for published posts only — these are the only ones statically generated. */
export function getAllSlugs(): string[] {
  return getAllSlugsOnDisk().filter((slug) => readFrontmatter(slug).meta.status === 'published')
}

/** Published posts only, newest first. */
export function getAllPosts(): BlogPostMeta[] {
  return getAllSlugsOnDisk()
    .map((slug) => readFrontmatter(slug).meta)
    .filter((meta) => meta.status === 'published')
    .sort((a, b) => (a.date < b.date ? 1 : -1))
}

function extractHeadings(content: string): BlogHeading[] {
  const tree = unified().use(remarkParse).use(remarkGfm).parse(content)
  const slugger = new GithubSlugger()
  const headings: BlogHeading[] = []

  visit(tree, 'heading', (node: any) => {
    if (node.depth < 2 || node.depth > 3) return
    const text = toString(node)
    headings.push({ depth: node.depth, text, slug: slugger.slug(text) })
  })

  return headings
}

export async function getPostBySlug(slug: string): Promise<BlogPost> {
  const { meta, content } = readFrontmatter(slug)

  const processed = await unified()
    .use(remarkParse)
    .use(remarkGfm)
    .use(remarkRehype)
    .use(rehypeSlug)
    .use(rehypeStringify)
    .process(content)

  return {
    ...meta,
    contentHtml: processed.toString(),
    headings: extractHeadings(content),
  }
}
