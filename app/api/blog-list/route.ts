export const runtime = "nodejs"
export const dynamic = "force-dynamic"

import { NextResponse } from "next/server"
import fs from "fs/promises"
import path from "path"

type PostIndex = {
  slug: string
  title: string
  date?: string
  categories?: string[]
  excerpt?: string
  coverImage?: string
  readingTime?: number
}

function parseFrontmatter(md: string): { data: Record<string, any>; content: string } {
  const fm = /^---\s*[\r\n]+([\s\S]*?)\r?\n---\s*\r?\n?([\s\S]*)$/m.exec(md)
  if (!fm) return { data: {}, content: md }
  const raw = fm[1]
  const content = fm[2] ?? ""
  const data: Record<string, any> = {}
  for (const line of raw.split(/\r?\n/)) {
    const m = /^([A-Za-z0-9_-]+)\s*:\s*(.*)$/.exec(line.trim())
    if (!m) continue
    const key = m[1]
    let val: any = m[2].trim()
    // handle arrays like [a, b] or "a, b"
    if (/^\[.*\]$/.test(val)) {
      val = val
        .slice(1, -1)
        .split(",")
        .map((s: string) => s.trim().replace(/^['"]|['"]$/g, ""))
        .filter(Boolean)
    } else if (val.includes(",")) {
      const parts = val.split(",").map((v) => v.trim().replace(/^['"]|['"]$/g, ""))
      if (parts.length > 1) val = parts
    } else {
      val = val.replace(/^['"]|['"]$/g, "")
    }
    data[key] = val
  }
  return { data, content }
}

function readingTimeInMin(text: string) {
  const words = (text || "").trim().split(/\s+/).filter(Boolean).length
  return Math.max(1, Math.round(words / 200))
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url)
    const page = Math.max(1, Number(url.searchParams.get("page") || "1"))
    const pageSize = Math.min(24, Math.max(1, Number(url.searchParams.get("pageSize") || "10")))
    const category = (url.searchParams.get("category") || "").toLowerCase().trim()

    const blogDir = path.join(process.cwd(), "content", "blog")
    try {
      const stat = await fs.stat(blogDir)
      if (!stat.isDirectory()) {
        console.log("[v0] blog-list: path exists but not directory:", blogDir)
        return NextResponse.json({ items: [], page, pageSize, total: 0, totalPages: 0 }, { status: 200 })
      }
    } catch (e: any) {
      if (e?.code === "ENOENT") {
        console.log("[v0] blog-list: content/blog not found at cwd:", process.cwd(), "dir:", blogDir)
        return NextResponse.json({ items: [], page, pageSize, total: 0, totalPages: 0 }, { status: 200 })
      }
      console.log("[v0] blog-list: stat error", e?.message)
      return NextResponse.json({ items: [], page, pageSize, total: 0, totalPages: 0 }, { status: 200 })
    }

    let files: string[] = []
    try {
      files = await fs.readdir(blogDir)
      console.log("[v0] blog-list: files found", files)
    } catch (e: any) {
      console.log("[v0] blog-list: readdir error", e?.message)
      return NextResponse.json({ items: [], page, pageSize, total: 0, totalPages: 0 }, { status: 200 })
    }

    const mdFiles = files.filter((f) => f.toLowerCase().endsWith(".md"))
    console.log("[v0] blog-list: mdFiles", mdFiles)

    const items: PostIndex[] = []
    for (const file of mdFiles) {
      try {
        const fullPath = path.join(blogDir, file)
        const raw = await fs.readFile(fullPath, "utf-8")
        const { data, content } = parseFrontmatter(raw)
        const slug = file.replace(/\.md$/i, "")
        const title = data.title || slug.replace(/[-_]/g, " ")
        const date = data.date || data.publishedDate
        const categories: string[] = Array.isArray(data.categories)
          ? data.categories
          : data.category
            ? String(data.category)
                .split(",")
                .map((s: string) => s.trim())
            : []
        const coverImage = data.coverImage || data.imageUrl || data.image || undefined
        const excerpt = data.excerpt || data.summary || (content || "").slice(0, 200)
        const rt = readingTimeInMin(content)
        items.push({ slug, title, date, categories, coverImage, excerpt, readingTime: rt })
      } catch (err: any) {
        console.log("[v0] blog-list: parse error for", file, err?.message)
      }
    }

    items.sort((a, b) => {
      const ad = a.date ? Date.parse(a.date) : 0
      const bd = b.date ? Date.parse(b.date) : 0
      if (bd !== ad) return bd - ad
      return (a.title || "").localeCompare(b.title || "")
    })

    const filtered = category
      ? items.filter((p) => (p.categories || []).some((c) => c.toLowerCase() === category))
      : items

    const total = filtered.length
    const totalPages = Math.max(1, Math.ceil(total / pageSize))
    const start = (page - 1) * pageSize
    const pageItems = filtered.slice(start, start + pageSize)

    console.log("[v0] blog-list: result", { total, page, pageSize, totalPages })
    return NextResponse.json(
      { items: pageItems, page, pageSize, total, totalPages, category: category || null },
      { status: 200 },
    )
  } catch (e: any) {
    console.log("[v0] blog-list: unexpected error", e?.message, e?.stack)
    return NextResponse.json({ items: [], page: 1, pageSize: 10, total: 0, totalPages: 0 }, { status: 200 })
  }
}
