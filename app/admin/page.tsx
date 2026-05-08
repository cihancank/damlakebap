import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/admin-shell"
import Link from "next/link"
import { UtensilsCrossed, Images, Settings, ArrowRight } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) redirect("/admin/login")

  // Fetch counts for dashboard cards
  const [{ count: menuCount }, { count: galleryCount }, { count: settingsCount }] = await Promise.all([
    supabase.from("menu_items").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("gallery_images").select("*", { count: "exact", head: true }).eq("is_active", true),
    supabase.from("site_settings").select("*", { count: "exact", head: true }),
  ])

  const cards = [
    {
      title: "Menü Yönetimi",
      description: "Ürün ekle, düzenle, fiyat güncelle, görsel değiştir",
      href: "/admin/menu",
      icon: UtensilsCrossed,
      stat: `${menuCount ?? 0} aktif ürün`,
      color: "from-orange-500/20 to-red-500/20 border-orange-800/50",
      iconColor: "text-orange-400",
    },
    {
      title: "Galeri",
      description: "Galeri fotoğraflarını ekle, sırala veya kaldır",
      href: "/admin/gallery",
      icon: Images,
      stat: `${galleryCount ?? 0} fotoğraf`,
      color: "from-blue-500/20 to-cyan-500/20 border-blue-800/50",
      iconColor: "text-blue-400",
    },
    {
      title: "Site Ayarları",
      description: "Hero, hakkımızda, iletişim ve footer metinlerini düzenle",
      href: "/admin/settings",
      icon: Settings,
      stat: `${settingsCount ?? 0} ayar`,
      color: "from-emerald-500/20 to-teal-500/20 border-emerald-800/50",
      iconColor: "text-emerald-400",
    },
  ]

  return (
    <AdminShell
      title="Yönetim Paneli"
      subtitle={`Hoş geldiniz — ${user.email}`}
    >
      {/* Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card) => (
          <Link
            key={card.href}
            href={card.href}
            className={`group relative overflow-hidden rounded-2xl border bg-gradient-to-br p-5 transition-all hover:shadow-lg hover:shadow-black/30 active:scale-[0.98] ${card.color}`}
          >
            <div className="mb-3 flex items-center justify-between">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-black/30 ${card.iconColor}`}>
                <card.icon className="h-4 w-4" />
              </div>
              <ArrowRight className="h-4 w-4 text-zinc-500 transition-transform group-hover:translate-x-1 group-hover:text-white" />
            </div>
            <h2 className="mb-1 text-sm font-semibold text-white">{card.title}</h2>
            <p className="mb-3 text-xs text-zinc-400 leading-relaxed">{card.description}</p>
            <div className="text-xs font-medium text-zinc-300">{card.stat}</div>
          </Link>
        ))}
      </div>

      {/* Quick info */}
      <div className="mt-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6">
        <h2 className="mb-3 text-sm font-semibold text-white">Hızlı Rehber</h2>
        <ul className="space-y-2 text-sm text-zinc-400">
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            <span><strong className="text-zinc-200">Menü Yönetimi:</strong> Ürün ekleyebilir, fiyat güncelleyebilir, görsel değiştirebilir ve ürünleri aktif/pasif yapabilirsiniz.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            <span><strong className="text-zinc-200">Galeri:</strong> Ana sayfadaki kayan galeriye yeni fotoğraf ekleyebilir veya mevcut fotoğrafları kaldırabilirsiniz.</span>
          </li>
          <li className="flex items-start gap-2">
            <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-primary" />
            <span><strong className="text-zinc-200">Site Ayarları:</strong> Başlık, açıklama, telefon numaraları, çalışma saatleri ve diğer tüm metinleri değiştirebilirsiniz.</span>
          </li>
        </ul>
      </div>
    </AdminShell>
  )
}
