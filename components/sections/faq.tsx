export default function FAQ() {
  const items = [
    { q: "Berapa lama pembuatan website?", a: "Biasanya 1–3 minggu tergantung cakupan." },
    { q: "Apakah termasuk SEO?", a: "Ya, optimasi SEO dasar termasuk di semua paket." },
    { q: "Apakah bisa kustom?", a: "Tentu. Paket Pro mendukung kustomisasi penuh." },
  ]

  return (
    <section id="faq" className="px-6 py-12 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold">FAQ</h2>
        <div className="mt-6 grid gap-4">
          {items.map((it) => (
            <div key={it.q} className="rounded-lg border bg-card p-5">
              <p className="font-semibold">{it.q}</p>
              <p className="text-muted-foreground text-sm mt-1">{it.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
