export default function Testimonials() {
  const items = [
    { name: "Andi", text: "Website kami kini lebih cepat dan mudah ditemukan di Google." },
    { name: "Budi", text: "Proses sangat profesional dan hasilnya memuaskan." },
    { name: "Citra", text: "Desain modern dan UX yang baik meningkatkan konversi." },
  ]

  return (
    <section id="testimoni" className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Testimoni</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.name} className="rounded-lg border bg-card p-5">
              <p className="text-sm leading-relaxed">"{it.text}"</p>
              <p className="mt-3 text-sm font-semibold">— {it.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
