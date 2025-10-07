"use client"

import Link from "next/link"
import { useState } from "react"
import ThemeToggle from "./theme-toggle"
import { cn } from "@/lib/utils"

const navLinks = [
	{ title: "Home", href: "/" },
	{ title: "Layanan", href: "#layanan" },
	{ title: "Portofolio", href: "#portofolio" },
	{ title: "Blog", href: "/blog" },
	{ title: "Kontak", href: "/contact" },
]

export default function Navbar() {
	const [open, setOpen] = useState(false)
	return (
		// PERBAIKAN: Kelas 'bg-background/80 backdrop-blur' Dihapus
		// Menjadi: 'bg-background border-b' untuk latar belakang solid
		<header className="sticky top-0 z-50 bg-background border-b">
			<div className="mx-auto max-w-6xl flex items-center justify-between px-6 h-14">
				<Link href="/" className="font-semibold text-lg hover:opacity-80 transition-opacity">
					ArekGresikID
				</Link>
				<nav className="hidden lg:flex items-center space-x-4">
					{navLinks.map((link) => (
						<Link
							key={link.title}
							href={link.href}
							className="text-sm font-medium transition-colors hover:text-primary"
						>
							{link.title}
						</Link>
					))}
					<ThemeToggle />
				</nav>
				<div className="flex items-center lg:hidden">
					<ThemeToggle />
					<button
						onClick={() => setOpen(!open)}
						className="ml-2 flex flex-col justify-center items-center w-8 h-8 focus:outline-none"
						aria-label="Toggle Menu"
					>
						<span
							className={cn(
								"block w-6 h-0.5 bg-foreground transition-all duration-300",
								open ? "rotate-45 translate-y-1.5" : ""
							)}
						/>
						<span
							className={cn(
								"block w-6 h-0.5 bg-foreground transition-all duration-300 mt-1",
								open ? "-rotate-45 -translate-y-1" : ""
							)}
						/>
					</button>
				</div>
			</div>
			{/* Mobile Menu */}
			<div
				className={cn(
					"absolute top-14 left-0 w-full bg-background transition-all duration-300 overflow-hidden shadow-lg lg:hidden",
					open ? "max-h-96 border-b" : "max-h-0"
				)}
			>
				<nav className="flex flex-col space-y-2 p-4">
					{navLinks.map((link) => (
						<Link
							key={link.title}
							href={link.href}
							onClick={() => setOpen(false)}
							className="text-base font-medium transition-colors hover:text-primary py-2"
						>
							{link.title}
						</Link>
					))}
				</nav>
			</div>
		</header>
	)
}