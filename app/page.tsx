import Services from "@/components/sections/services"
import Skills from "@/components/sections/skills"
import Portfolio from "@/components/sections/portfolio"
import Testimonials from "@/components/sections/testimonials"
import Pricing from "@/components/sections/pricing"
import FAQ from "@/components/sections/faq"
import BlogSection from "@/components/sections/blog-section"
import ContactSection from "@/components/sections/contact-section"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function HomePage() {
  return (
    <>
      <section className="relative isolate px-6 py-16 md:py-24">
        <div className="mx-auto max-w-6xl grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-5">
            <h1 className="text-pretty text-4xl md:text-5xl font-bold">
              Jasa Pembuatan Website
              <span className="block text-primary">Profesional & SEO-friendly</span>
            </h1>
            <p className="text-muted-foreground leading-relaxed">
              Saya membantu bisnis Anda memiliki website modern, cepat, dan mudah ditemukan di mesin pencari. Dibangun
              dengan Next.js dan praktik terbaik.
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <Link href="https://wa.me/6281330763633" target="_blank" aria-label="Hubungi via WhatsApp">
                <Button className="bg-primary text-primary-foreground hover:opacity-90">Konsultasi via WhatsApp</Button>
              </Link>
              <Link href="/contact" aria-label="Ke halaman kontak">
                <Button variant="outline">Kirim Brief Proyek</Button>
              </Link>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <img src="/generic-website-mockup.png" alt="Mockup website modern" className="w-full h-auto rounded-md" />
          </div>
        </div>
      </section>

      <Services />
      <Skills />
      <Portfolio />
      <Testimonials />
      <Pricing />
      <FAQ />
      <BlogSection />
      <ContactSection />
    </>
  )
}
