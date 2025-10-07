"use client"

import { useEffect } from "react"
import Link from "next/link"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.log("[v0] App error boundary:", error)
  }, [error])

  const safeReset = () => {
    try {
      if (typeof reset === "function") {
        reset()
      } else if (typeof window !== "undefined") {
        window.location.reload()
      }
    } catch {
      if (typeof window !== "undefined") window.location.reload()
    }
  }

  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-2xl md:text-3xl font-semibold">Terjadi kesalahan</h1>
      <p className="text-muted-foreground mt-2 max-w-prose">
        Maaf, halaman tidak dapat dimuat. Coba muat ulang atau kembali ke beranda.
      </p>
      <div className="mt-4 flex gap-3">
        <button onClick={safeReset} className="rounded-md bg-primary text-primary-foreground px-4 py-2 text-sm">
          Muat ulang
        </button>
        <Link href="/" className="rounded-md border px-4 py-2 text-sm">
          Ke Beranda
        </Link>
      </div>
    </div>
  )
}
