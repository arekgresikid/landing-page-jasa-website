"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export default function CookieConsent() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const pref = localStorage.getItem("cookie:consent")
    if (!pref) setVisible(true)
  }, [])

  if (!visible) return null

  function accept() {
    localStorage.setItem("cookie:consent", "accepted")
    setVisible(false)
  }
  function decline() {
    localStorage.setItem("cookie:consent", "declined")
    setVisible(false)
  }

  return (
    <div className="fixed inset-x-0 bottom-0 z-50">
      <div className="mx-auto max-w-6xl m-4 rounded-lg border bg-card p-4 shadow">
        <p className="text-sm">
          Kami menggunakan cookie untuk meningkatkan pengalaman Anda. Lihat{" "}
          <Link href="/privacy-policy" className="underline">
            Privacy Policy
          </Link>
          .
        </p>
        <div className="mt-3 flex items-center gap-2">
          <button onClick={accept} className="rounded-md bg-primary text-primary-foreground px-3 py-2 text-sm">
            Accept
          </button>
          <button onClick={decline} className="rounded-md border px-3 py-2 text-sm">
            Decline
          </button>
        </div>
      </div>
    </div>
  )
}
