export default function Pricing() {
  const plans = [
    { name: "Starter", price: "Rp 3jt", features: ["Landing page", "Mobile responsive", "Basic SEO"] },
    { name: "Bisnis", price: "Rp 7jt", features: ["Multi-page", "CMS sederhana", "SEO optimal"] },
    { name: "Pro", price: "Rp 12jt", features: ["Kustom penuh", "Integrasi API", "Performa premium"] },
  ]

  return (
    <section id="harga" className="px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Paket Harga</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {plans.map((p) => (
            <div key={p.name} className="rounded-lg border bg-card p-5">
              <h3 className="font-semibold">{p.name}</h3>
              <p className="text-3xl mt-2">{p.price}</p>
              <ul className="mt-3 text-sm text-muted-foreground list-disc list-inside">
                {p.features.map((f) => (
                  <li key={f}>{f}</li>
                ))}
              </ul>
              <button className="mt-4 w-full rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm">
                Pilih Paket
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
