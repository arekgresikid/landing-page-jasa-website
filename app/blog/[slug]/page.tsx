import Link from "next/link"

export async function generateMetadata({ params }: { params: { slug: string } }) {
  try {
    const res = await fetch(`/api/blog/${params.slug}`, { cache: "no-store" })
    if (!res.ok) return {}
    const { post } = await res.json()
    const url = `https://ariftirtana.my.id/blog/${post.slug}`
    return {
      title: post.title,
      description: post.excerpt,
      alternates: { canonical: url },
      openGraph: {
        type: "article",
        url,
        title: post.title,
        description: post.excerpt,
        images: post.coverImage ? [{ url: post.coverImage }] : undefined,
      },
    }
  } catch {
    return {}
  }
}

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  let post: any | null = null
  try {
    const res = await fetch(`/api/blog/${params.slug}`, { cache: "no-store" })
    if (res.ok) {
      const data = await res.json()
      post = data?.post ?? null
    }
  } catch (e) {
    console.log("[v0] blog slug fetch error:", e)
  }

  if (!post) {
    return (
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-2xl font-semibold">Artikel tidak ditemukan</h1>
        <p className="text-muted-foreground mt-2">Maaf, artikel yang Anda cari tidak tersedia.</p>
        <div className="mt-6">
          <Link href="/blog" className="underline">
            ← Kembali ke Blog
          </Link>
        </div>
      </section>
    )
  }

  const dateStr = post?.date
    ? new Date(post.date).toLocaleDateString("id-ID", { day: "2-digit", month: "long", year: "numeric" })
    : ""
  const reading = typeof post?.readingTime === "number" && post.readingTime > 0 ? `${post.readingTime} menit baca` : ""

  return (
    <article className="mx-auto max-w-3xl px-6 py-16 space-y-6">
      <header className="space-y-3">
        <h1 className="text-pretty text-3xl md:text-4xl font-semibold">{post.title}</h1>
        <p className="text-sm text-muted-foreground">
          {dateStr}
          {dateStr && reading ? " • " : ""}
          {reading}
        </p>
        {post.categories?.length ? (
          <div className="flex gap-2 flex-wrap">
            {post.categories.map((c: string) => (
              <span key={c} className="text-xs px-2 py-1 rounded bg-secondary text-secondary-foreground">
                {c}
              </span>
            ))}
          </div>
        ) : null}
      </header>

      {post.coverImage ? (
        <img
          src={post.coverImage || "/placeholder.svg"}
          alt={`Gambar untuk ${post.title}`}
          className="w-full h-64 object-cover rounded-md"
        />
      ) : null}

      {/* Render markdown sederhana sebagai teks terformat */}
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <pre className="whitespace-pre-wrap break-words text-base leading-relaxed">{post.content}</pre>
      </div>

      <footer className="pt-8">
        <Link href="/blog" className="underline">
          ← Kembali ke Blog
        </Link>
      </footer>
    </article>
  )
}
