import Link from "next/link"

// Component ini didefinisikan sebagai Async Server Component (sudah benar)
export default async function BlogSection() {
  let posts: any[] = []
  try {
    // Pembatasan 3 postingan sudah diatur di sini: pageSize=3
    const apiUrl = `/api/blog-list?page=1&pageSize=3`
    const res = await fetch(apiUrl, { cache: "no-store" })
    if (!res.ok) {
      console.log("[v0] BlogSection fetch non-OK:", res.status)
      posts = []
    } else {
      const data = await res.json()
      posts = data?.items ?? []
    }
  } catch (e) {
    console.log("[v0] BlogSection fetch error:", e)
    posts = []
  }

  // Baris return ini harusnya mengembalikan JSX dengan benar.
  return (
    <section id="blog" className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Blog Terbaru</h2>
          <Link href="/blog" className="text-sm underline">
            Lihat semua
          </Link>
        </div>

        {posts.length === 0 ? (
          <div className="mt-6 rounded-lg border bg-card p-6 text-sm text-muted-foreground">
            Belum ada artikel. Silakan cek kembali nanti.
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-3">
            {/* Menggunakan posts.map, yang akan me-loop maksimal 3 item */}
            {posts.map((post) => (
              <article key={post.slug} className="rounded-lg border bg-card p-4">
                <img
                  src={post.coverImage || "/placeholder.svg?height=180&width=320&query=blog%20cover"}
                  alt={`Gambar untuk ${post.title}`}
                  className="w-full h-36 object-cover rounded-md"
                />
                <h3 className="mt-3 font-semibold">
                  <Link href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </Link>
                </h3>
                <p className="text-sm text-muted-foreground mt-1">{post.excerpt}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}