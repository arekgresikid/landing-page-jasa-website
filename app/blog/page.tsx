import Link from "next/link"

const PAGE_SIZE = 6

export const metadata = {
  title: "Blog — Querino Janic",
  description: "Artikel seputar web development, SEO, dan desain.",
}

export default async function BlogIndex({
  searchParams,
}: {
  searchParams: { page?: string; category?: string }
}) {
  const page = Math.max(1, Number(searchParams?.page || 1))
  const category = (searchParams?.category || "").trim()
  const qs = new URLSearchParams({ page: String(page), pageSize: String(PAGE_SIZE) })
  if (category) qs.set("category", category)

  const res = await fetch(`/api/blog-list?${qs.toString()}`, { cache: "no-store" })
  let data: any = { items: [], page, pageSize: PAGE_SIZE, totalPages: 1 }
  if (res.ok) {
    data = await res.json()
  } else {
    console.log("[v0] blog index fetch non-OK:", res.status)
  }

  const posts = (data?.items ?? []) as any[]
  const totalPages = data?.totalPages || 1
  const currentPage = data?.page || page
  const categories: string[] = Array.isArray(data?.categories) ? data.categories : []

  return (
    <section className="mx-auto max-w-5xl px-6 py-12 space-y-8">
      <header className="space-y-3">
        <h1 className="text-3xl md:text-4xl font-semibold text-pretty">Blog</h1>
        <p className="text-muted-foreground">Insight terbaru untuk membantu bisnis Anda tumbuh.</p>

        {/* Category chips */}
        {categories.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-2">
            <Link
              href="/blog"
              className={`text-xs px-3 py-1 rounded border ${!category ? "bg-secondary text-secondary-foreground" : "bg-card"}`}
            >
              Semua
            </Link>
            {categories.map((c) => {
              const href = `/blog?category=${encodeURIComponent(c)}`
              const active = c === category
              return (
                <Link
                  key={c}
                  href={href}
                  className={`text-xs px-3 py-1 rounded border ${active ? "bg-secondary text-secondary-foreground" : "bg-card"}`}
                >
                  {c}
                </Link>
              )
            })}
          </div>
        )}
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {posts.map((post) => {
          const dateStr = post?.date
            ? new Date(post.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
            : ""
          const reading =
            typeof post?.readingTime === "number" && post.readingTime > 0 ? `${post.readingTime} menit baca` : ""
          return (
            <article key={post.slug} className="rounded-lg border bg-card p-5">
              <img
                src={post.coverImage || "/placeholder.svg?height=220&width=400&query=blog%20cover"}
                alt={`Gambar untuk ${post.title}`}
                className="w-full h-48 object-cover rounded-md"
              />
              <div className="mt-4 space-y-2">
                <h2 className="text-xl font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h2>
                <p className="text-sm text-muted-foreground">
                  {dateStr}
                  {dateStr && reading ? " • " : ""}
                  {reading}
                </p>
                <p className="text-muted-foreground">{post.excerpt}</p>
                <div className="flex gap-2 flex-wrap">
                  {(post.categories ?? []).slice(0, 3).map((c: string) => (
                    <span key={c} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            </article>
          )
        })}
      </div>

      <nav className="flex items-center justify-between pt-6">
        {(() => {
          const prevPage = Math.max(1, currentPage - 1)
          const nextPage = Math.min(totalPages, currentPage + 1)
          const mkHref = (p: number) => {
            const qp = new URLSearchParams()
            qp.set("page", String(p))
            if (category) qp.set("category", category)
            return `/blog?${qp.toString()}`
          }
          return (
            <>
              <Link
                aria-label="Sebelumnya"
                className="underline disabled:no-underline disabled:text-muted-foreground"
                href={mkHref(prevPage)}
                aria-disabled={currentPage <= 1}
              >
                ← Sebelumnya
              </Link>
              <span className="text-sm text-muted-foreground">
                Halaman {currentPage} dari {totalPages}
              </span>
              <Link
                aria-label="Berikutnya"
                className="underline disabled:no-underline disabled:text-muted-foreground"
                href={mkHref(nextPage)}
                aria-disabled={currentPage >= totalPages}
              >
                Berikutnya →
              </Link>
            </>
          )
        })()}
      </nav>
    </section>
  )
}
