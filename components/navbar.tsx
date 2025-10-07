"use client"

import Link from "next/link"
import { useState } from "react"
import ThemeToggle from "./theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
	{ href: "/", label: "Home" },
	{ href: "/#layanan", label: "Layanan" },
	{ href: "/#skills", label: "Skills" },
	{ href: "/#portfolio", label: "Portofolio" },
	{ href: "/blog", label: "Blog" },
	{ href: "/#harga", label: "Harga" },
	{ href: "/#testimoni", label: "Testimoni" },
	{ href: "/#faq", label: "FAQ" },
	{ href: "/contact", label: "Contact" },
	{ href: "/privacy-policy", label: "Privacy" },
	{ href: "/terms-of-service", label: "Terms" },
]

export default function Navbar() {
	const [open, setOpen] = useState(false)
	return (
		<header className="sticky top-0 z-50 bg-background/80 backdrop-blur border-b">
			<div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-14">
				<Link href="/" className="font-semibold">
					Querino Janic
				</Link>

				<nav className="hidden md:flex items-center gap-6">
					{navLinks.slice(0, 8).map((l) => (
						<Link key={l.href} href={l.href} className="text-sm hover:underline">
							{l.label}
						</Link>
					))}
					<ThemeToggle />
				</nav>

				<button
					type="button"
					onClick={() => setOpen(true)}
					aria-label="Buka menu"
					className="md:hidden inline-flex items-center justify-center rounded-md border px-3 py-2"
				>
					{"☰"}
				</button>
			</div>

			{/* Mobile Drawer */}
			<div
				role="dialog"
				aria-modal="true"
				className={cn("fixed inset-0 z-50 md:hidden transition", open ? "pointer-events-auto" : "pointer-events-none")}
				aria-hidden={!open}
			>
				<div
					className={cn("absolute inset-0 bg-black/40 transition-opacity", open ? "opacity-100" : "opacity-0")}
					onClick={() => setOpen(false)}
				/>
				<aside
					className={cn(
						"absolute right-0 top-0 h-full w-80 max-w-[85%] bg-card border-l shadow-lg transition-transform", // ubah bg-background jadi bg-card
						open ? "translate-x-0" : "translate-x-full",
					)}
				>
					<div className="flex items-center justify-between h-14 px-4 border-b">
						<span className="font-semibold">Menu</span>
						<button aria-label="Tutup menu" className="rounded-md border px-3 py-2" onClick={() => setOpen(false)}>
							{"✕"}
						</button>
					</div>
					<div className="flex flex-col p-4 gap-2">
						{navLinks.map((l) => (
							<Link
								key={l.href}
								href={l.href}
								className="rounded-md px-3 py-2 hover:bg-secondary"
								onClick={() => setOpen(false)}
							>
								{l.label}
							</Link>
						))}
						<div className="pt-2 border-t mt-2">
							<ThemeToggle />
						</div>
					</div>
				</aside>
			</div>
		</header>
	)
}
