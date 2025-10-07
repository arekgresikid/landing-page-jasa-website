import gfm from "remark-gfm"
import rehypeRaw from "rehype-raw"
import rehypeHighlight from "rehype-highlight"
import { unified } from "unified"
import remarkParse from "remark-parse"
import remarkRehype from "remark-rehype"
import rehypeStringify from "rehype-stringify"
import { postsData } from "./blog-data"

export type PostFrontmatter = {
  title: string
  slug: string
  excerpt: string
  date: string
  author: string
  featuredImage?: string
  categories?: string[]
  readingTime?: number
}

export type Post = PostFrontmatter & { content: string }

export async function getAllPosts(): Promise<PostFrontmatter[]> {
  const list: PostFrontmatter[] = postsData
    .map(({ content, ...fm }) => fm)
    .sort((a, b) => +new Date(b.date) - +new Date(a.date))
  return list
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const found = postsData.find((p) => p.slug === slug)
  return found || null
}

export async function renderMarkdownToHtml(markdown: string): Promise<string> {
  const file = await unified()
    .use(remarkParse)
    .use(gfm)
    .use(remarkRehype, { allowDangerousHtml: true })
    .use(rehypeRaw)
    .use(rehypeHighlight)
    .use(rehypeStringify)
    .process(markdown)
  return String(file)
}
