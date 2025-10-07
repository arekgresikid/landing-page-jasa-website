export const metadata = {
  title: "Kontak — Querino Janic",
  description: "Hubungi saya untuk konsultasi proyek website Anda.",
}

import ContactClientPage from "./contact-client"
import Turnstile from "./turnstile"

export default function ContactPage() {
  return <ContactClientPage turnstileSlot={<Turnstile />} />
}
