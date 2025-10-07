export default function Services() {
  const items = [
    { title: "Website Design", desc: "Desain website modern dan responsive" },
    { title: "UI/UX Design", desc: "Desain pengalaman pengguna yang optimal" },
    { title: "Web Development", desc: "Pengembangan website full-stack" },
  ]

  return (
    <section id="layanan" className="px-6 py-12 bg-secondary">
      <div className="mx-auto max-w-6xl">
        <h2 className="text-2xl md:text-3xl font-semibold">Layanan</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {items.map((it) => (
            <div key={it.title} className="rounded-lg border bg-card p-5">
              <h3 className="font-semibold">{it.title}</h3>
              <p className="text-muted-foreground text-sm mt-1">{it.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
