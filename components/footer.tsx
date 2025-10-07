import Link from "next/link"

export default function Footer() {
  return (
    <footer className="border-t mt-12">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-6 md:grid-cols-2 items-center">
        <div className="space-y-2">
          <p className="font-semibold">Querino Janic</p>
          <p className="text-sm text-muted-foreground">Kungsgatan 32, 111 35 Stockholm, Swedia</p>
          <p className="text-sm text-muted-foreground">Telp/WA: +6281330763633 · Email: querinojanic@gmail.com</p>
        </div>
        <nav className="flex items-center md:justify-end gap-4 text-sm">
          <Link href="/privacy-policy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/terms-of-service" className="hover:underline">
            Terms of Service
          </Link>
          <Link href="/blog" className="hover:underline">
            Blog
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
        </nav>
      </div>
      <div className="text-center text-xs text-muted-foreground pb-6">
        © {new Date().getFullYear()} Querino Janic. All rights reserved.
      </div>
    </footer>
  )
}
