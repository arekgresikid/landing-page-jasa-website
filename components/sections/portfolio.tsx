export default function Portfolio() {
  const items = [
    { title: "E-commerce Store", desc: "Toko online dengan payment gateway" },
    { title: "Corporate Website", desc: "Website perusahaan dengan dashboard admin" },
    { title: "Travel Booking Platform", desc: "Platform booking dengan sistem reservasi" },
    { title: "Restaurant Website", desc: "Menu online dan reservasi" },
  ]

  return (
    <section id="portfolio" className="px-6 py-12 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Portofolio</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {items.map((it) => (
            <div key={it.title} className="rounded-lg border bg-card p-3">
              <img
                src="/project-thumbnail.png"
                alt={`Gambar ${it.title}`}
                className="w-full h-40 object-cover rounded-md"
              />
              <div className="mt-3">
                <h3 className="font-semibold">{it.title}</h3>
                <p className="text-sm text-muted-foreground">{it.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
