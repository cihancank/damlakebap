"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Plus, Trash2, Save, CheckCircle, Loader2, X, ToggleLeft, ToggleRight,
  ChevronDown, ChevronUp, Flame, GripVertical, Clock
} from "lucide-react"

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

const PAGE_OPTIONS = [
  { value: "all", label: "Tüm Sayfalar" },
  { value: "home", label: "Ana Sayfa" },
  { value: "menu", label: "Menü Sayfası" },
  { value: "about", label: "Hakkımızda" },
  { value: "contact", label: "İletişim" },
]

const COLOR_OPTIONS: { value: PopupSection["color"]; label: string; cls: string }[] = [
  { value: "red", label: "Kırmızı", cls: "bg-red-600" },
  { value: "orange", label: "Turuncu", cls: "bg-orange-500" },
  { value: "green", label: "Yeşil", cls: "bg-emerald-600" },
]

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

function blankSection(): PopupSection {
  return { id: uid(), title: "", description: "", items: "", price: "", color: "red" }
}

function blankPopup(): Omit<Popup, "id"> {
  return {
    title: "Yeni Popup",
    subtitle: null,
    badge: null,
    content: [blankSection()],
    image_url: null,
    show_on_pages: ["all"],
    trigger_type: "delay",
    trigger_delay_ms: 2500,
    frequency: "once_per_day",
    show_address_button: true,
    address_button_text: "Yol Tarifi Al",
    address_url: "https://g.co/kgs/cQVWqD2",
    show_menu_button: true,
    menu_button_text: "Menüyü Gör",
    menu_button_url: "/menu",
    is_active: false,
    valid_from: null,
    valid_until: null,
  }
}

export default function PopupManager({ initialPopups }: { initialPopups: Popup[] }) {
  const supabase = createClient()
  const [popups, setPopups] = useState<Popup[]>(initialPopups)
  const [editing, setEditing] = useState<Popup | null>(null)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)

  // ── CRUD helpers ──────────────────────────────────────────
  async function handleSave() {
    if (!editing) return
    setSaving(true)
    const { id, ...rest } = editing

    let result
    if (id.startsWith("new_")) {
      result = await supabase.from("popups").insert(rest).select().single()
    } else {
      result = await supabase.from("popups").update({ ...rest, updated_at: new Date().toISOString() }).eq("id", id).select().single()
    }

    if (!result.error && result.data) {
      setPopups((prev) => {
        const exists = prev.find((p) => p.id === id)
        return exists
          ? prev.map((p) => (p.id === id ? result.data : p))
          : [...prev, result.data]
      })
      setEditing(result.data)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    }
    setSaving(false)
  }

  async function handleDelete(id: string) {
    if (id.startsWith("new_")) {
      setPopups((p) => p.filter((x) => x.id !== id))
      setEditing(null)
      return
    }
    await supabase.from("popups").delete().eq("id", id)
    setPopups((p) => p.filter((x) => x.id !== id))
    if (editing?.id === id) setEditing(null)
    setDeleteConfirm(null)
  }

  async function toggleActive(popup: Popup) {
    const updated = !popup.is_active
    await supabase.from("popups").update({ is_active: updated }).eq("id", popup.id)
    setPopups((p) => p.map((x) => (x.id === popup.id ? { ...x, is_active: updated } : x)))
    if (editing?.id === popup.id) setEditing((e) => e ? { ...e, is_active: updated } : e)
  }

  function addNew() {
    const p: Popup = { id: `new_${uid()}`, ...blankPopup() }
    setPopups((prev) => [...prev, p])
    setEditing(p)
  }

  // ── Section helpers ───────────────────────────────────────
  function updateSection(idx: number, key: keyof PopupSection, val: string) {
    if (!editing) return
    const sections = [...editing.content]
    sections[idx] = { ...sections[idx], [key]: val }
    setEditing({ ...editing, content: sections })
  }

  function addSection() {
    if (!editing) return
    setEditing({ ...editing, content: [...editing.content, blankSection()] })
  }

  function removeSection(idx: number) {
    if (!editing) return
    setEditing({ ...editing, content: editing.content.filter((_, i) => i !== idx) })
  }

  function togglePage(page: string) {
    if (!editing) return
    const current = editing.show_on_pages
    if (page === "all") {
      setEditing({ ...editing, show_on_pages: ["all"] })
      return
    }
    const without = current.filter((p) => p !== "all" && p !== page)
    const next = current.includes(page) ? without : [...without, page]
    setEditing({ ...editing, show_on_pages: next.length === 0 ? ["all"] : next })
  }

  // ── UI ────────────────────────────────────────────────────
  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:gap-6">
      {/* Left: popup list */}
      <div className="flex-shrink-0 space-y-2 lg:w-72">
        <Button onClick={addNew} className="w-full bg-primary text-white hover:bg-primary/90" size="sm">
          <Plus className="mr-1.5 h-4 w-4" />
          Yeni Popup Ekle
        </Button>

        {popups.length === 0 && (
          <div className="rounded-xl border border-dashed border-zinc-700 p-6 text-center">
            <p className="text-sm text-zinc-500">Henüz popup yok. Yukarıdan ekleyin.</p>
          </div>
        )}

        {popups.map((popup) => (
          <div
            key={popup.id}
            onClick={() => setEditing(popup)}
            className={`flex cursor-pointer items-center gap-3 rounded-xl border p-3 transition-all ${
              editing?.id === popup.id
                ? "border-primary bg-primary/10"
                : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"
            }`}
          >
            {/* Active indicator */}
            <div className={`h-2 w-2 flex-shrink-0 rounded-full ${popup.is_active ? "bg-emerald-500" : "bg-zinc-600"}`} />
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">{popup.title}</p>
              <p className="text-[11px] text-zinc-500">
                {popup.is_active ? "Aktif" : "Pasif"} ·{" "}
                {PAGE_OPTIONS.find((p) => popup.show_on_pages.includes(p.value))?.label ?? popup.show_on_pages.join(", ")}
              </p>
            </div>
            <button
              onClick={(e) => { e.stopPropagation(); toggleActive(popup) }}
              className="flex-shrink-0 text-zinc-500 hover:text-white transition-colors"
              title={popup.is_active ? "Pasif yap" : "Aktif yap"}
            >
              {popup.is_active
                ? <ToggleRight className="h-5 w-5 text-emerald-500" />
                : <ToggleLeft className="h-5 w-5" />}
            </button>
          </div>
        ))}
      </div>

      {/* Right: editor */}
      {editing ? (
        <div className="flex-1 space-y-4 rounded-2xl border border-zinc-800 bg-zinc-900 p-4 md:p-6">
          {/* Editor header */}
          <div className="flex items-center justify-between">
            <h2 className="font-semibold text-white">Popup Düzenle</h2>
            <div className="flex items-center gap-2">
              {deleteConfirm === editing.id ? (
                <div className="flex items-center gap-2 rounded-lg bg-red-950/40 border border-red-800/40 px-3 py-1.5">
                  <span className="text-xs text-zinc-300">Silinecek. Emin misiniz?</span>
                  <button onClick={() => handleDelete(editing.id)} className="text-xs font-semibold text-red-400 hover:text-red-300">Evet</button>
                  <button onClick={() => setDeleteConfirm(null)} className="text-xs text-zinc-500 hover:text-white">Hayır</button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(editing.id)}
                  className="rounded-lg border border-zinc-700 p-1.5 text-zinc-500 hover:border-red-800 hover:text-red-400 transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              )}
              <Button onClick={handleSave} disabled={saving} size="sm" className="bg-primary text-white hover:bg-primary/90">
                {saving ? <Loader2 className="mr-1.5 h-3.5 w-3.5 animate-spin" /> : saved ? <CheckCircle className="mr-1.5 h-3.5 w-3.5" /> : <Save className="mr-1.5 h-3.5 w-3.5" />}
                {saved ? "Kaydedildi" : "Kaydet"}
              </Button>
            </div>
          </div>

          {/* Basic info */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Genel Bilgiler</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Başlık</span>
                <Input value={editing.title} onChange={(e) => setEditing({ ...editing, title: e.target.value })}
                  className="border-zinc-700 bg-zinc-800 text-white" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Alt Başlık</span>
                <Input value={editing.subtitle ?? ""} onChange={(e) => setEditing({ ...editing, subtitle: e.target.value || null })}
                  className="border-zinc-700 bg-zinc-800 text-white" placeholder="Sadece Mekanda Servis Edilir" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Rozet (saat / kısa not)</span>
                <Input value={editing.badge ?? ""} onChange={(e) => setEditing({ ...editing, badge: e.target.value || null })}
                  className="border-zinc-700 bg-zinc-800 text-white" placeholder="12:00 – 14:00" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Görsel URL (isteğe bağlı)</span>
                <Input value={editing.image_url ?? ""} onChange={(e) => setEditing({ ...editing, image_url: e.target.value || null })}
                  className="border-zinc-700 bg-zinc-800 text-white" placeholder="https://..." />
              </label>
            </div>
          </section>

          {/* Menu sections */}
          <section className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Menü Bölümleri</h3>
              <button onClick={addSection} className="flex items-center gap-1 text-xs text-primary hover:text-primary/80">
                <Plus className="h-3.5 w-3.5" /> Bölüm Ekle
              </button>
            </div>
            <div className="space-y-3">
              {editing.content.map((section, idx) => (
                <div key={section.id} className="relative rounded-xl border border-zinc-700/60 bg-zinc-800/50 p-3">
                  <button onClick={() => removeSection(idx)} className="absolute right-2 top-2 text-zinc-600 hover:text-red-400 transition-colors">
                    <X className="h-3.5 w-3.5" />
                  </button>
                  <div className="grid gap-2 sm:grid-cols-2">
                    <label className="space-y-1">
                      <span className="text-[11px] text-zinc-500">Bölüm Başlığı</span>
                      <Input value={section.title} onChange={(e) => updateSection(idx, "title", e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-white text-sm" placeholder="Kebap Menü" />
                    </label>
                    <label className="space-y-1">
                      <span className="text-[11px] text-zinc-500">Fiyat (TL)</span>
                      <Input value={section.price} onChange={(e) => updateSection(idx, "price", e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-white text-sm" placeholder="490" type="number" />
                    </label>
                    <label className="col-span-full space-y-1">
                      <span className="text-[11px] text-zinc-500">Açıklama (içerik listesi)</span>
                      <Input value={section.description} onChange={(e) => updateSection(idx, "description", e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-white text-sm" placeholder="Günün Çorbası + Kebap + İçecek" />
                    </label>
                    <label className="col-span-full space-y-1">
                      <span className="text-[11px] text-zinc-500">Ürün Listesi (alt satır)</span>
                      <Input value={section.items} onChange={(e) => updateSection(idx, "items", e.target.value)}
                        className="border-zinc-700 bg-zinc-900 text-white text-sm" placeholder="Adana • Urfa • Tavuk Şiş" />
                    </label>
                  </div>
                  {/* Color picker */}
                  <div className="mt-2 flex items-center gap-2">
                    <span className="text-[11px] text-zinc-500">Renk:</span>
                    {COLOR_OPTIONS.map((c) => (
                      <button key={c.value} onClick={() => updateSection(idx, "color", c.value)}
                        className={`h-5 w-5 rounded-full transition-all ${c.cls} ${section.color === c.value ? "ring-2 ring-white ring-offset-1 ring-offset-zinc-800 scale-110" : "opacity-60 hover:opacity-100"}`}
                        title={c.label} />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Display rules */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Gösterim Kuralları</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {/* Pages */}
              <div className="space-y-1 sm:col-span-2">
                <span className="text-xs text-zinc-400">Hangi Sayfalarda Gösterilsin?</span>
                <div className="flex flex-wrap gap-2">
                  {PAGE_OPTIONS.map((p) => (
                    <button key={p.value} onClick={() => togglePage(p.value)}
                      className={`rounded-lg border px-3 py-1 text-xs font-medium transition-all ${
                        editing.show_on_pages.includes(p.value)
                          ? "border-primary bg-primary/10 text-primary"
                          : "border-zinc-700 bg-zinc-800 text-zinc-400 hover:border-zinc-500"
                      }`}>
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Trigger */}
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Tetikleyici</span>
                <select value={editing.trigger_type}
                  onChange={(e) => setEditing({ ...editing, trigger_type: e.target.value as Popup["trigger_type"] })}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none">
                  <option value="delay">Gecikmeli (otomatik)</option>
                  <option value="onload">Sayfa açılışında</option>
                  <option value="exit">Çıkış niyetinde</option>
                </select>
              </label>

              {editing.trigger_type === "delay" && (
                <label className="space-y-1">
                  <span className="text-xs text-zinc-400">Gecikme (ms)</span>
                  <Input type="number" value={editing.trigger_delay_ms}
                    onChange={(e) => setEditing({ ...editing, trigger_delay_ms: parseInt(e.target.value) || 2500 })}
                    className="border-zinc-700 bg-zinc-800 text-white" />
                </label>
              )}

              {/* Frequency */}
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Gösterim Sıklığı</span>
                <select value={editing.frequency}
                  onChange={(e) => setEditing({ ...editing, frequency: e.target.value as Popup["frequency"] })}
                  className="w-full rounded-md border border-zinc-700 bg-zinc-800 px-3 py-2 text-sm text-white focus:border-primary focus:outline-none">
                  <option value="always">Her zaman</option>
                  <option value="once_per_day">Günde bir kez</option>
                  <option value="once">Yalnızca bir kez</option>
                </select>
              </label>
            </div>

            {/* Date range */}
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Başlangıç Tarihi (isteğe bağlı)</span>
                <Input type="datetime-local"
                  value={editing.valid_from ? editing.valid_from.slice(0, 16) : ""}
                  onChange={(e) => setEditing({ ...editing, valid_from: e.target.value ? new Date(e.target.value).toISOString() : null })}
                  className="border-zinc-700 bg-zinc-800 text-white" />
              </label>
              <label className="space-y-1">
                <span className="text-xs text-zinc-400">Bitiş Tarihi (isteğe bağlı)</span>
                <Input type="datetime-local"
                  value={editing.valid_until ? editing.valid_until.slice(0, 16) : ""}
                  onChange={(e) => setEditing({ ...editing, valid_until: e.target.value ? new Date(e.target.value).toISOString() : null })}
                  className="border-zinc-700 bg-zinc-800 text-white" />
              </label>
            </div>
          </section>

          {/* CTA buttons config */}
          <section className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-500">Aksiyon Butonları</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="col-span-full flex items-center gap-3">
                <button onClick={() => setEditing({ ...editing, show_address_button: !editing.show_address_button })}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    editing.show_address_button ? "border-primary bg-primary/10 text-primary" : "border-zinc-700 bg-zinc-800 text-zinc-400"
                  }`}>
                  {editing.show_address_button ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  Adres Butonu
                </button>
                <button onClick={() => setEditing({ ...editing, show_menu_button: !editing.show_menu_button })}
                  className={`flex items-center gap-2 rounded-lg border px-3 py-1.5 text-xs font-medium transition-all ${
                    editing.show_menu_button ? "border-primary bg-primary/10 text-primary" : "border-zinc-700 bg-zinc-800 text-zinc-400"
                  }`}>
                  {editing.show_menu_button ? <ToggleRight className="h-4 w-4" /> : <ToggleLeft className="h-4 w-4" />}
                  Menü Butonu
                </button>
              </div>
              {editing.show_address_button && (<>
                <label className="space-y-1">
                  <span className="text-[11px] text-zinc-500">Adres Buton Metni</span>
                  <Input value={editing.address_button_text} onChange={(e) => setEditing({ ...editing, address_button_text: e.target.value })}
                    className="border-zinc-700 bg-zinc-800 text-white text-sm" />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] text-zinc-500">Adres URL</span>
                  <Input value={editing.address_url} onChange={(e) => setEditing({ ...editing, address_url: e.target.value })}
                    className="border-zinc-700 bg-zinc-800 text-white text-sm" placeholder="https://g.co/..." />
                </label>
              </>)}
              {editing.show_menu_button && (<>
                <label className="space-y-1">
                  <span className="text-[11px] text-zinc-500">Menü Buton Metni</span>
                  <Input value={editing.menu_button_text} onChange={(e) => setEditing({ ...editing, menu_button_text: e.target.value })}
                    className="border-zinc-700 bg-zinc-800 text-white text-sm" />
                </label>
                <label className="space-y-1">
                  <span className="text-[11px] text-zinc-500">Menü URL</span>
                  <Input value={editing.menu_button_url} onChange={(e) => setEditing({ ...editing, menu_button_url: e.target.value })}
                    className="border-zinc-700 bg-zinc-800 text-white text-sm" placeholder="/menu" />
                </label>
              </>)}
            </div>
          </section>

          {/* Active toggle */}
          <div className="flex items-center justify-between rounded-xl border border-zinc-800 px-4 py-3">
            <div>
              <p className="text-sm font-medium text-white">Popup Durumu</p>
              <p className="text-xs text-zinc-500">{editing.is_active ? "Aktif — sitede görünüyor" : "Pasif — sitede gösterilmiyor"}</p>
            </div>
            <button onClick={() => setEditing({ ...editing, is_active: !editing.is_active })}
              className={`transition-colors ${editing.is_active ? "text-emerald-500" : "text-zinc-600"}`}>
              {editing.is_active ? <ToggleRight className="h-8 w-8" /> : <ToggleLeft className="h-8 w-8" />}
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center rounded-2xl border border-dashed border-zinc-800 p-12 text-center">
          <div>
            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-zinc-800">
              <Flame className="h-6 w-6 text-zinc-600" />
            </div>
            <p className="text-sm text-zinc-400">Düzenlemek için bir popup seçin</p>
            <p className="mt-1 text-xs text-zinc-600">veya yeni bir popup oluşturun</p>
          </div>
        </div>
      )}
    </div>
  )
}
