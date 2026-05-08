"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import {
  LayoutDashboard,
  UtensilsCrossed,
  Images,
  Settings,
  LogOut,
  ExternalLink,
  ChevronRight,
  Megaphone,
} from "lucide-react"

const navItems = [
  { href: "/admin", label: "Panel", icon: LayoutDashboard, exact: true },
  { href: "/admin/menu", label: "Menü", icon: UtensilsCrossed },
  { href: "/admin/gallery", label: "Galeri", icon: Images },
  { href: "/admin/popups", label: "Popuplar", icon: Megaphone },
  { href: "/admin/settings", label: "Ayarlar", icon: Settings },
]

function useActive() {
  const pathname = usePathname()
  return (item: { href: string; exact?: boolean }) => {
    if (item.exact) return pathname === item.href
    return pathname.startsWith(item.href)
  }
}

export default function AdminShell({
  children,
  title,
  subtitle,
}: {
  children: ReactNode
  title: string
  subtitle?: string
}) {
  const router = useRouter()
  const isActive = useActive()

  async function handleLogout() {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/admin/login")
    router.refresh()
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-950">
      {/* ── Desktop sidebar ─────────────────────────────────── */}
      <aside className="hidden w-56 flex-shrink-0 flex-col border-r border-zinc-800 bg-zinc-900 md:flex">
        {/* Brand */}
        <div className="flex items-center gap-3 border-b border-zinc-800 px-5 py-4">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/20">
            <span className="text-sm font-black text-primary">D</span>
          </div>
          <div>
            <p className="text-sm font-bold text-white">Damla Kebap</p>
            <p className="text-[11px] text-zinc-500">İçerik Yönetimi</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 space-y-0.5 px-2 py-3">
          {navItems.map((item) => {
            const active = isActive(item)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all ${
                  active
                    ? "bg-primary text-white"
                    : "text-zinc-400 hover:bg-zinc-800 hover:text-white"
                }`}
              >
                <item.icon className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1">{
                  item.label === "Panel" ? "Dashboard"
                  : item.label === "Ayarlar" ? "Site Ayarları"
                  : item.label === "Menü" ? "Menü Yönetimi"
                  : item.label === "Popuplar" ? "Popup Yönetimi"
                  : item.label
                }</span>
                {active && <ChevronRight className="h-3 w-3 opacity-60" />}
              </Link>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="border-t border-zinc-800 px-2 py-3 space-y-0.5">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-zinc-800 hover:text-white transition-all"
          >
            <ExternalLink className="h-4 w-4 flex-shrink-0" />
            <span>Siteyi Görüntüle</span>
          </Link>
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm text-zinc-400 hover:bg-red-950/40 hover:text-red-400 transition-all"
          >
            <LogOut className="h-4 w-4 flex-shrink-0" />
            <span>Çıkış Yap</span>
          </button>
        </div>
      </aside>

      {/* ── Main content area ────────────────────────────────── */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Sticky top bar */}
        <header className="flex flex-shrink-0 items-center justify-between border-b border-zinc-800 bg-zinc-900 px-4 py-3 md:px-6">
          <div>
            <h1 className="text-base font-bold text-white md:text-lg">{title}</h1>
            {subtitle && (
              <p className="text-xs text-zinc-500 md:text-sm">{subtitle}</p>
            )}
          </div>
          {/* Desktop: site link + logout */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href="/"
              target="_blank"
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:border-zinc-500 hover:text-white transition-all"
            >
              <ExternalLink className="h-3 w-3" />
              Siteyi Gör
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 rounded-lg border border-zinc-700 px-3 py-1.5 text-xs text-zinc-400 hover:border-red-800 hover:text-red-400 transition-all"
            >
              <LogOut className="h-3 w-3" />
              Çıkış
            </button>
          </div>
          {/* Mobile: logo only */}
          <div className="flex items-center gap-2 md:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary/20">
              <span className="text-xs font-black text-primary">D</span>
            </div>
          </div>
        </header>

        {/* Scrollable page content */}
        <main className="flex-1 overflow-y-auto pb-24 md:pb-6">
          <div className="px-4 py-5 md:px-6 md:py-8">
            {children}
          </div>
        </main>
      </div>

      {/* ── Mobile bottom tab bar ────────────────────────────── */}
      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-zinc-800 bg-zinc-900 md:hidden">
        {navItems.map((item) => {
          const active = isActive(item)
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-1 flex-col items-center gap-1 py-2.5 text-center transition-colors ${
                active ? "text-primary" : "text-zinc-500 active:text-white"
              }`}
            >
              <item.icon className={`h-5 w-5 ${active ? "drop-shadow-[0_0_8px_rgb(var(--primary))]" : ""}`} />
              <span className="text-[10px] font-medium leading-none">{item.label}</span>
            </Link>
          )
        })}
        <button
          onClick={handleLogout}
          className="flex flex-1 flex-col items-center gap-1 py-2.5 text-center text-zinc-500 active:text-red-400 transition-colors"
        >
          <LogOut className="h-5 w-5" />
          <span className="text-[10px] font-medium leading-none">Çıkış</span>
        </button>
      </nav>
    </div>
  )
}
