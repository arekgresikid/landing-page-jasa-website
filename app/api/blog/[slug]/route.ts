import { NextResponse } from "next/server"
import path from "node:path"
import { promises as fs } from "node:fs"

export const runtime = "nodejs"
export const dynamic = "force-dynamic"

const BLOG_DIR = path.join(process.cwd(), "content", "blog")

function parseFrontMatter(raw: string): { data: Record<string, any>; content: string } {
  if (!raw.startsWith("---")) return { data: {}, content: raw }
  const end = raw.indexOf("\n---", 3)
  if (end === -1) return { data: {}, content: raw }
  const headerBlock = raw.slice(3, end).trim()
  const content = raw.slice(end + 4).replace(/^\s*\n/, "")
  const data: Record<string, any> = {}
  for (const line of headerBlock.split("\n")) {
    const m = line.match(/^([A-Za-z0-9_-]+)\s*:\s*(.*)$/)
    if (!m) continue
    const key = m[1].trim()
    let val = m[2].trim()
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1)
    }
    if (key === "categories" || key === "category") {
      data[key] = val
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    } else {
      data[key] = val
    }
  }
  return { data, content }
}

export async function GET(_req: Request, { params }: { params: { slug: string } }) {
  try {
    const slug = params.slug
    const filePath = path.join(BLOG_DIR, `${slug}.md`)
    const raw = await fs.readFile(filePath, "utf8")
    const { data, content } = parseFrontMatter(raw)

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

    return NextResponse.json({
      post: {
        slug,
        title: data.title || slug,
        date,
        excerpt,
        categories,
        coverImage,
        readingTime,
        content, // raw markdown; halaman akan render dengan whitespace-pre-wrap
      },
    })
  } catch (e: any) {
    const msg = e?.code === "ENOENT" ? "Post not found" : e?.message || "Unknown error"
    const status = e?.code === "ENOENT" ? 404 : 500
    return NextResponse.json({ error: msg }, { status })
  }
}
