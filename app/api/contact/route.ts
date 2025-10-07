import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

async function verifyTurnstile(token: string) {
  const secret = process.env.CLOUDFLARE_TURNSTILE_SECRET_KEY
  if (!secret) {
    // If missing, fail closed
    return false
  }
  const res = await fetch("https://challenges.cloudflare.com/turnstile/v0/siteverify", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ secret, response: token }),
  })
  const data = await res.json()
  return !!data.success
}

export async function POST(req: Request) {
  try {
    const { name, email, phone, message, "cf-turnstile-response": turnstileToken } = await req.json()

    if (!name || !email || !phone || !message) {
      return NextResponse.json({ error: "Semua field wajib diisi." }, { status: 400 })
    }

    const ok = await verifyTurnstile(turnstileToken)
    if (!ok) {
      return NextResponse.json({ error: "Verifikasi Turnstile gagal." }, { status: 400 })
    }

    const user = process.env.GMAIL_USER
    const pass = process.env.GMAIL_APP_PASSWORD
    if (!user || !pass) {
      return NextResponse.json({ error: "Konfigurasi email belum lengkap." }, { status: 500 })
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user, pass },
    })

    await transporter.sendMail({
      from: `"Website Contact" <${user}>`,
      to: "querinojanic@gmail.com",
      subject: `Pesan Baru dari ${name}`,
      replyTo: email,
      text: `Nama: ${name}\nEmail: ${email}\nTelepon: ${phone}\n\n${message}`,
    })

    return NextResponse.json({ ok: true })
  } catch (err) {
    return NextResponse.json({ error: "Terjadi kesalahan saat mengirim pesan." }, { status: 500 })
  }
}
