"use client"

import { useEffect, useState, useCallback } from "react"
import { usePathname } from "next/navigation"
import Image from "next/image"
import { X, MapPin, UtensilsCrossed, Clock, Flame } from "lucide-react"

interface PopupSection {
  id: string
  title: string
  description: string
  items: string
  price: string
  color: "red" | "orange" | "green"
}

interface Popup {
  id: string
  title: string
  subtitle: string | null
  badge: string | null
  content: PopupSection[]
  image_url: string | null
  show_on_pages: string[]
  trigger_type: "onload" | "delay" | "exit"
  trigger_delay_ms: number
  frequency: "always" | "once" | "once_per_day"
  show_address_button: boolean
  address_button_text: string
  address_url: string
  show_menu_button: boolean
  menu_button_text: string
  menu_button_url: string
  is_active: boolean
  valid_from: string | null
  valid_until: string | null
}

const COLOR_MAP = {
  red: {
    accent: "bg-red-600",
    text: "text-red-400",
    border: "border-red-600/40",
    badge: "bg-red-950/60 border border-red-600/30",
    price: "text-red-400",
    bar: "from-red-900/40 to-transparent",
  },
  orange: {
    accent: "bg-orange-500",
    text: "text-orange-400",
    border: "border-orange-500/40",
    badge: "bg-orange-950/60 border border-orange-500/30",
    price: "text-orange-400",
    bar: "from-orange-900/40 to-transparent",
  },
  green: {
    accent: "bg-emerald-600",
    text: "text-emerald-400",
    border: "border-emerald-600/40",
    badge: "bg-emerald-950/60 border border-emerald-600/30",
    price: "text-emerald-400",
    bar: "from-emerald-900/40 to-transparent",
  },
}

function storageKey(id: string) {
  return `popup_shown_${id}`
}

function shouldShow(popup: Popup): boolean {
  const key = storageKey(popup.id)
  const now = Date.now()

  if (popup.frequency === "always") return true
  if (popup.frequency === "once") {
    return !localStorage.getItem(key)
  }
  if (popup.frequency === "once_per_day") {
    const last = parseInt(localStorage.getItem(key) ?? "0", 10)
    return now - last > 86_400_000
  }
  return true
}

function markShown(popup: Popup) {
  localStorage.setItem(storageKey(popup.id), Date.now().toString())
}

function pageMatches(pages: string[], pathname: string): boolean {
  if (pages.includes("all")) return true
  if (pages.includes("home") && (pathname === "/" || pathname === "")) return true
  if (pages.includes("menu") && pathname.startsWith("/menu")) return true
  if (pages.includes("about") && pathname.startsWith("/about")) return true
  if (pages.includes("contact") && pathname.startsWith("/contact")) return true
  return false
}

export default function PopupBanner({ popups }: { popups: Popup[] }) {
  const pathname = usePathname()
  const [activePopup, setActivePopup] = useState<Popup | null>(null)
  const [visible, setVisible] = useState(false)

  const dismiss = useCallback(() => {
    setVisible(false)
    setTimeout(() => setActivePopup(null), 350)
  }, [])

  useEffect(() => {
    // Find first eligible popup for this page
    const eligible = popups.find((p) => {
      if (!p.is_active) return false
      const now = new Date()
      if (p.valid_from && new Date(p.valid_from) > now) return false
      if (p.valid_until && new Date(p.valid_until) < now) return false
      if (!pageMatches(p.show_on_pages, pathname)) return false
      return shouldShow(p)
    })

    if (!eligible) return

    // Exit intent listener
    if (eligible.trigger_type === "exit") {
      const onMouseLeave = (e: MouseEvent) => {
        if (e.clientY <= 0) {
          setActivePopup(eligible)
          setVisible(true)
          markShown(eligible)
          document.removeEventListener("mouseleave", onMouseLeave)
        }
      }
      document.addEventListener("mouseleave", onMouseLeave)
      return () => document.removeEventListener("mouseleave", onMouseLeave)
    }

    // Delay / onload
    const delay = eligible.trigger_type === "onload" ? 100 : (eligible.trigger_delay_ms ?? 2500)
    const timer = setTimeout(() => {
      setActivePopup(eligible)
      setVisible(true)
      markShown(eligible)
    }, delay)
    return () => clearTimeout(timer)
  }, [pathname, popups])

  // Close on Escape
  useEffect(() => {
    if (!activePopup) return
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") dismiss() }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [activePopup, dismiss])

  if (!activePopup) return null

  const sections = (activePopup.content ?? []) as PopupSection[]

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center p-3 transition-all duration-300 sm:p-6 ${
        visible ? "bg-black/75 backdrop-blur-sm" : "pointer-events-none bg-transparent"
      }`}
      onClick={(e) => { if (e.target === e.currentTarget) dismiss() }}
      role="dialog"
      aria-modal="true"
      aria-label={activePopup.title}
    >
      <div
        className={`relative w-full max-w-md overflow-hidden rounded-2xl border border-zinc-700/50 bg-zinc-950 shadow-2xl shadow-black/60 transition-all duration-300 ${
          visible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 translate-y-4"
        }`}
      >
        {/* Close button */}
        <button
          onClick={dismiss}
          className="absolute right-3 top-3 z-10 flex h-7 w-7 items-center justify-center rounded-full bg-zinc-800/90 text-zinc-400 transition-colors hover:bg-zinc-700 hover:text-white"
          aria-label="Kapat"
        >
          <X className="h-3.5 w-3.5" />
        </button>

        {/* Header — dark branded */}
        <div className="relative overflow-hidden bg-gradient-to-b from-zinc-900 to-zinc-950 px-5 py-5 text-center">
          {/* Flame decorations */}
          <div className="pointer-events-none absolute inset-0 opacity-20">
            <div className="absolute -left-4 bottom-0 h-20 w-20 rounded-full bg-orange-600 blur-2xl" />
            <div className="absolute -right-4 bottom-0 h-20 w-20 rounded-full bg-red-600 blur-2xl" />
          </div>

          <div className="relative">
            <p className="mb-0.5 text-[11px] font-bold uppercase tracking-widest text-primary">
              Damla Kebap
            </p>
            <h2 className="text-2xl font-black tracking-tight text-white sm:text-3xl">
              {activePopup.title}
            </h2>
            {activePopup.badge && (
              <div className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 border border-primary/30 px-3 py-1">
                <Clock className="h-3 w-3 text-primary" />
                <span className="text-xs font-bold text-primary">{activePopup.badge}</span>
              </div>
            )}
            {activePopup.subtitle && (
              <p className="mt-1.5 text-xs text-zinc-400">{activePopup.subtitle}</p>
            )}
          </div>
        </div>

        {/* Menu sections */}
        <div className="divide-y divide-zinc-800/60 overflow-y-auto max-h-[50vh] sm:max-h-none">
          {sections.map((section) => {
            const c = COLOR_MAP[section.color] ?? COLOR_MAP.red
            return (
              <div key={section.id} className={`relative px-4 py-3.5 sm:px-5`}>
                {/* Left accent bar */}
                <div className={`absolute left-0 top-0 h-full w-1 ${c.accent}`} />

                <div className="flex items-start gap-3">
                  {/* Text side */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <Flame className={`h-3 w-3 flex-shrink-0 ${c.text}`} />
                      <span className={`text-xs font-bold uppercase tracking-wider ${c.text}`}>
                        {section.title}
                      </span>
                    </div>
                    <p className="text-sm font-semibold text-white leading-snug">
                      {section.description}
                    </p>
                    {section.items && (
                      <p className="mt-0.5 text-[11px] text-zinc-500 leading-relaxed">
                        {section.items}
                      </p>
                    )}
                  </div>

                  {/* Price badge */}
                  <div className={`flex-shrink-0 rounded-xl px-3 py-2 text-center ${c.badge}`}>
                    <span className={`block text-xl font-black leading-none ${c.price}`}>
                      {section.price}
                    </span>
                    <span className="text-[10px] font-semibold text-zinc-400">TL</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer with campaign image snippet + CTAs */}
        <div className="border-t border-zinc-800/60 bg-zinc-900/50 px-4 py-4 sm:px-5">
          {/* Time reminder */}
          <div className="mb-3 flex items-center justify-center gap-2 text-xs text-zinc-400">
            <Clock className="h-3.5 w-3.5 text-primary" />
            <span>
              Saat <strong className="text-white">12:00 – 14:00</strong> arası geçerlidir
            </span>
          </div>

          {/* CTA buttons */}
          <div className="flex gap-2">
            {activePopup.show_address_button && (
              <a
                href={activePopup.address_url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-primary/90 active:scale-95"
              >
                <MapPin className="h-4 w-4" />
                {activePopup.address_button_text}
              </a>
            )}
            {activePopup.show_menu_button && (
              <a
                href={activePopup.menu_button_url}
                className="flex flex-1 items-center justify-center gap-1.5 rounded-xl border border-zinc-700 bg-zinc-800 px-4 py-2.5 text-sm font-semibold text-white transition-all hover:bg-zinc-700 active:scale-95"
              >
                <UtensilsCrossed className="h-4 w-4" />
                {activePopup.menu_button_text}
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
