"use client"

import { useTheme } from "./theme-provider"
import { ComputerDesktopIcon, MoonIcon, SunIcon } from "@heroicons/react/24/outline"

export default function ThemeToggle() {
  const { mode, setMode } = useTheme()

  return (
    <div className="inline-flex items-center gap-2" role="group" aria-label="Pengubah tema">
      <button
        type="button"
        aria-label="Mode Sistem"
        className={`rounded-md border px-2 py-1 text-sm ${mode === "system" ? "bg-primary text-primary-foreground" : ""}`}
        onClick={() => setMode("system")}
        title="System"
      >
        <ComputerDesktopIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Mode Sistem</span>
      </button>
      <button
        type="button"
        aria-label="Mode Terang"
        className={`rounded-md border px-2 py-1 text-sm ${mode === "light" ? "bg-primary text-primary-foreground" : ""}`}
        onClick={() => setMode("light")}
        title="Light"
      >
        <SunIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Mode Terang</span>
      </button>
      <button
        type="button"
        aria-label="Mode Gelap"
        className={`rounded-md border px-2 py-1 text-sm ${mode === "dark" ? "bg-primary text-primary-foreground" : ""}`}
        onClick={() => setMode("dark")}
        title="Dark"
      >
        <MoonIcon className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Mode Gelap</span>
      </button>
    </div>
  )
}
