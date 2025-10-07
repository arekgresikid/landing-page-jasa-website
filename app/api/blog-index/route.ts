import { NextResponse } from "next/server"
import path from "node:path"
import { promises as fs } from "node:fs"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function parseFrontMatter(raw: string): { data: Record<string, any>; content: string } {
  // Normalise newlines to avoid CRLF issues
  const norm = raw.replace(/\r\n/g, "\n")
  if (!norm.startsWith("---")) return { data: {}, content: norm }

  // Match header block between --- and --- with optional trailing newline
  const m = norm.match(/^---\n([\s\S]*?)\n---\n?/)
  if (!m) return { data: {}, content: norm }

  const headerBlock = m[1].trim()
  const content = norm.slice(m[0].length)
  const data: Record<string, any> = {}

  for (const line of headerBlock.split("\n")) {
    const match = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!match) continue
    const key = match[1].trim()
    let val = match[2].trim()

    // strip surrounding quotes
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }

    // allow comma-separated strings for categories/category
    if (key === "categories" || key === "category") {
      data[key] = val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    } else {
      data[key] = val
    }
  }

  return { data, content: content.replace(/^\s*\n/, "") }
}

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const page = Math.max(1, Number.parseInt(searchParams.get("page") || "1", 10))
    const pageSize = Math.max(1, Math.min(48, Number.parseInt(searchParams.get("pageSize") || "12", 10)))
    const categoryFilter = (searchParams.get("category") || "").trim()

    let entries: Array<string> = []
    try {
      const dirents = await fs.readdir(BLOG_DIR, { withFileTypes: true })
      entries = dirents.filter((d) => d.isFile() && d.name.toLowerCase().endsWith(".md")).map((d) => d.name)
    } catch {
      entries = []
    }

    const allPosts: Array<any> = []
    for (const name of entries) {
      try {
        const raw = await fs.readFile(path.join(BLOG_DIR, name), "utf8")
        const { data, content } = parseFrontMatter(raw)
        const slugFromName = name.replace(/\.md$/i, "")
        const slug = (data.slug || slugFromName).toString()
        const dateRaw = (data.publishedDate || data.date || null) as string | null
        const date = dateRaw ? new Date(dateRaw).toISOString() : null
        const coverImage = (data.imageUrl || data.coverImage || null) as string | null

        const categories: string[] = Array.isArray(data.categories)
          ? data.categories
          : Array.isArray(data.category)
            ? data.category
            : typeof data.category === "string"
              ? data.category
                  .split(",")
                  .map((s: string) => s.trim())
                  .filter(Boolean)
              : []

        const excerpt =
          (data.summary || data.excerpt || "").toString() ||
          (content ? content.trim().split("\n").slice(0, 4).join(" ").slice(0, 240) : "")

        const words = typeof content === "string" ? content.trim().split(/\s+/).length : 0
        const readingTime = words > 0 ? Math.max(1, Math.round(words / 200)) : undefined

        allPosts.push({
          slug,
          title: data.title || slug,
          date,
          excerpt,
          categories,
          coverImage,
          readingTime,
        })
      } catch (e: any) {
        console.log("[v0] blog-index parse file error:", name, e?.message)
      }
    }

    const uniqueCategories = Array.from(new Set(allPosts.flatMap((p) => p.categories || []))).sort()
    const filtered = categoryFilter ? allPosts.filter((p) => (p.categories || []).includes(categoryFilter)) : allPosts

    filtered.sort((a, b) => {
      const da = a.date ? new Date(a.date).getTime() : 0
      const db = b.date ? new Date(b.date).getTime() : 0
      return db - da
    })

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const start = (page - 1) * pageSize
    const posts = filtered.slice(start, start + pageSize)

    return NextResponse.json({
      posts,
      meta: { page, pageSize, total, totalPages, category: categoryFilter || null, categories: uniqueCategories },
    })
  } catch (err: any) {
    console.log("[v0] blog-index fatal error:", err?.message)
    return NextResponse.json(
      { posts: [], meta: { page: 1, pageSize: 0, total: 0, totalPages: 1, categories: [] } },
      { status: 200 },
    )
  }
}
