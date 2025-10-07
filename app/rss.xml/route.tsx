import { promises as fs } from "node:fs"
import path from "node:path"
import matter from "gray-matter"

export async function GET() {
  const site = "https://ariftirtana.my.id"
  const dir = path.join(process.cwd(), "content", "blog")
  let files: string[] = []
  try {
    files = await fs.readdir(dir)
  } catch {
    files = []
  }

  const items: string[] = []
  for (const f of files.filter((x) => x.toLowerCase().endsWith(".md"))) {
    try {
      const slug = f.replace(/\.md$/i, "")
      const raw = await fs.readFile(path.join(dir, f), "utf-8")
      const { data } = matter(raw)
      const title = (typeof data?.title === "string" && data.title) || slug.replace(/-/g, " ")
      const link = `${site}/blog/${slug}`
      items.push(`<item><title><![CDATA[${title}]]></title><link>${link}</link><guid>${link}</guid></item>`)
    } catch {}
  }

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel>
<title>ariftirtana.my.id — Blog</title>
<link>${site}</link>
<description>Artikel terbaru dari ariftirtana.my.id</description>
${items.join("\n")}
</channel></rss>`

  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8" } })
}
