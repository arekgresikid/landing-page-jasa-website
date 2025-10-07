import Link from "next/link"

export default function ContactSection() {
  return (
    <section id="contact" className="px-6 py-12">
      <div className="mx-auto max-w-6xl grid gap-6 md:grid-cols-2 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold">Siap Diskusi Proyek?</h2>
          <p className="text-muted-foreground mt-2">Hubungi saya untuk konsultasi gratis dan penawaran terbaik.</p>
          <div className="mt-4 flex gap-3">
            <Link
              href="https://wa.me/6281330763633"
              className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm"
              target="_blank"
            >
              WhatsApp
            </Link>
            <Link href="/contact" className="rounded-md border px-3 py-2 text-sm">
              Form Kontak
            </Link>
          </div>
        </div>
        <div className="rounded-xl border bg-card p-6">
          <img src="/contact-illustration.jpg" alt="Ilustrasi kontak" className="w-full h-auto rounded-md" />
        </div>
      </div>
    </section>
  )
}
