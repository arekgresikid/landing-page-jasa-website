"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"

export default function ContactClientPage({ turnstileSlot }: { turnstileSlot?: React.ReactNode }) {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState<string>("")

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus("loading")
    setMessage("")
    const form = new FormData(e.currentTarget)
    const payload = Object.fromEntries(form.entries())

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data?.error || "Gagal mengirim pesan.")
      setStatus("success")
      setMessage("Pesan berhasil dikirim. Terima kasih!")
      e.currentTarget.reset()
      // refresh Turnstile (if used in widget mode)
      if ((window as any).turnstile?.reset) (window as any).turnstile.reset()
    } catch (err: any) {
      setStatus("error")
      setMessage(err.message || "Terjadi kesalahan.")
    }
  }

  return (
    <section className="mx-auto max-w-3xl px-6 py-12">
      <h1 className="text-3xl md:text-4xl font-semibold text-pretty">Hubungi Saya</h1>
      <p className="text-muted-foreground mt-2">Isi formulir di bawah atau kontak langsung via WhatsApp.</p>

      <form onSubmit={onSubmit} className="mt-8 grid gap-5">
        <div className="grid gap-2">
          <Label htmlFor="name">Nama</Label>
          <Input id="name" name="name" required placeholder="Nama Anda" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required placeholder="email@domain.com" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="phone">Telepon/WhatsApp</Label>
          <Input id="phone" name="phone" required placeholder="+62..." />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="message">Pesan</Label>
          <Textarea id="message" name="message" required rows={5} placeholder="Ceritakan kebutuhan website Anda..." />
        </div>

        {/* Cloudflare Turnstile widget */}
        {turnstileSlot}

        <Button type="submit" disabled={status === "loading"}>
          {status === "loading" ? "Mengirim..." : "Kirim Pesan"}
        </Button>

        {message && (
          <p role="status" className={status === "success" ? "text-green-600" : "text-red-600"}>
            {message}
          </p>
        )}
      </form>

      {/* Turnstile script */}
      <script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
    </section>
  )
}
