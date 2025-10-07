"use client"

import type React from "react"

import { useEffect, useState, createContext, useContext } from "react"

type Mode = "system" | "light" | "dark"

const ThemeContext = createContext<{
  mode: Mode
  setMode: (m: Mode) => void
}>({ mode: "system", setMode: () => {} })

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mode, setModeState] = useState<Mode>("system")

  useEffect(() => {
    const saved = localStorage.getItem("theme:mode") as Mode | null
    if (saved) setModeState(saved)
    else setModeState("system")
  }, [])

  useEffect(() => {
    const root = document.documentElement
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches
    const isDark = mode === "dark" || (mode === "system" && prefersDark)
    root.classList.toggle("dark", isDark)
  }, [mode])

  function setMode(m: Mode) {
    setModeState(m)
    localStorage.setItem("theme:mode", m)
  }

  return <ThemeContext.Provider value={{ mode, setMode }}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  return useContext(ThemeContext)
}
