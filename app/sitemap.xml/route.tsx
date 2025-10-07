import { NextResponse } from "next/server"
import { getAllPosts } from "@/lib/blog"

export async function GET() {
  const base = "https://ariftirtana.my.id"
  const now = new Date().toISOString()
  const staticUrls = ["", "/blog", "/contact", "/privacy-policy", "/terms-of-service"].map((p) => `${base}${p || "/"}`)

  const posts = await getAllPosts()
  const postUrls = posts.map((p) => `${base}/blog/${p.slug}`)

  const urls = [...staticUrls, ...postUrls]
    .map((url) => `<url><loc>${url}</loc><lastmod>${now}</lastmod></url>`)
    .join("")

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    ${urls}
  </urlset>`

  return new NextResponse(xml, {
    headers: { "Content-Type": "application/xml" },
  })
}
