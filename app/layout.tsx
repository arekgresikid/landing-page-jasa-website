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
  title: "Arif Tirtana — Jasa Pembuatan Website Profesional",
  description:
    "Landing page jasa pembuatan website modern & SEO-friendly. Next.js + Tailwind. Hubungi via WhatsApp atau form kontak.",
  metadataBase: new URL("https://ariftirtana.my.id"),
  openGraph: {
    title: "Arif Tirtana — Jasa Pembuatan Website Profesional",
    description: "Website modern, cepat, dan SEO-friendly. Konsultasi gratis.",
    url: "https://ariftirtana.my.id",
    siteName: "Arif Tirtana",
    type: "website",
    images: [
      {
        url: "https://ariftirtana.my.id/og.png",
        width: 1200,
        height: 630,
        alt: "Arif Tirtana — Jasa Pembuatan Website Profesional",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Arif Tirtana — Jasa Pembuatan Website Profesional",
    description: "Website modern, cepat, dan SEO-friendly. Konsultasi gratis.",
    images: ["https://ariftirtana.my.id/og.png"],
  },
  alternates: {
    canonical: "/",
  },
    generator: 'ruangriung',
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
    name: "Arif Tirtana",
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
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
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
