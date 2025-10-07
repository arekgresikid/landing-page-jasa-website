export const metadata = {
  title: "Terms of Service — Querino Janic",
  description: "Syarat dan ketentuan layanan.",
}

export default function TermsPage() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-12 space-y-4">
      <h1 className="text-3xl md:text-4xl font-semibold">Terms of Service</h1>
      <p className="text-muted-foreground">
        Dengan menggunakan layanan ini, Anda setuju terhadap syarat dan ketentuan berikut.
      </p>
      <h2 className="text-2xl font-semibold">Penggunaan Layanan</h2>
      <p>Layanan pembuatan website disediakan sesuai kesepakatan proyek.</p>
      <h2 className="text-2xl font-semibold">Batasan Tanggung Jawab</h2>
      <p>Kami tidak bertanggung jawab atas kerusakan tidak langsung akibat penggunaan website.</p>
      <p>Hubungi kami untuk klarifikasi lebih lanjut.</p>
    </section>
  )
}
