import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Suspense } from "react"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"
import CookieConsent from "@/components/cookie-consent"

export const metadata: Metadata = {
  title: "Querino Janic — Jasa Pembuatan Website Profesional",
  description:
    "Landing page jasa pembuatan website modern & SEO-friendly. Next.js + Tailwind. Hubungi via WhatsApp atau form kontak.",
  metadataBase: new URL("https://ariftirtana.my.id"),
  openGraph: {
    title: "Querino Janic — Jasa Pembuatan Website Profesional",
    description: "Website modern, cepat, dan SEO-friendly. Konsultasi gratis.",
    url: "https://ariftirtana.my.id",
    siteName: "Querino Janic",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Querino Janic — Jasa Pembuatan Website Profesional",
    description: "Website modern, cepat, dan SEO-friendly. Konsultasi gratis.",
  },
  alternates: {
    canonical: "/",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  // JSON-LD Organization
  const orgJsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Querino Janic",
    url: "https://ariftirtana.my.id",
    email: "querinojanic@gmail.com",
    telephone: "+6281330763633",
    address: {
      "@type": "PostalAddress",
      streetAddress: "Kungsgatan 32",
      addressLocality: "Stockholm",
      postalCode: "111 35",
      addressCountry: "SE",
    },
  }

  return (
    <html lang="id" suppressHydrationWarning>
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <Suspense>
            <CookieConsent />
          </Suspense>
        </ThemeProvider>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgJsonLd) }} />
        <Analytics />
      </body>
    </html>
  )
}
