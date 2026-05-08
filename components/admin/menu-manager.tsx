"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import {
  Plus,
  Pencil,
  Trash2,
  X,
  Save,
  CheckCircle,
  Upload,
  Search,
  ToggleLeft,
  ToggleRight,
  ChevronDown,
} from "lucide-react"

type MenuItem = {
  id: string
  slug: string
  name: string
  description: string | null
  price: number
  image_url: string | null
  category: string
  preparation_time: string | null
  rating: number
  is_spicy: boolean
  is_vegetarian: boolean
  is_popular: boolean
  sort_order: number
  is_active: boolean
}

const CATEGORIES: { value: string; label: string }[] = [
  { value: "corbalar", label: "Corbalar" },
  { value: "lahmacun", label: "Lahmacun" },
  { value: "pideler", label: "Pideler" },
  { value: "kebaplar", label: "Kebaplar" },
  { value: "durum", label: "Dürüm" },
  { value: "mezeler", label: "Mezeler & Salatalar" },
  { value: "tatlilar", label: "Tatlılar" },
  { value: "icecekler", label: "İçecekler" },
]

const EMPTY_FORM: Omit<MenuItem, "id"> = {
  slug: "",
  name: "",
  description: "",
  price: 0,
  image_url: "",
  category: "kebaplar",
  preparation_time: "",
  rating: 4.5,
  is_spicy: false,
  is_vegetarian: false,
  is_popular: false,
  sort_order: 0,
  is_active: true,
}

export default function MenuManager({ initialItems }: { initialItems: MenuItem[] }) {
  const [items, setItems] = useState<MenuItem[]>(initialItems)
  const [search, setSearch] = useState("")
  const [filterCategory, setFilterCategory] = useState("all")
  const [showForm, setShowForm] = useState(false)
  const [editingItem, setEditingItem] = useState<MenuItem | null>(null)
  const [form, setForm] = useState<Omit<MenuItem, "id">>(EMPTY_FORM)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [saveError, setSaveError] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  // Grouped by category for display
  const filtered = items.filter((item) => {
    const matchSearch =
      item.name.toLowerCase().includes(search.toLowerCase()) ||
      item.category.toLowerCase().includes(search.toLowerCase())
    const matchCategory = filterCategory === "all" || item.category === filterCategory
    return matchSearch && matchCategory
  })

  const grouped = CATEGORIES.map((cat) => ({
    ...cat,
    items: filtered.filter((i) => i.category === cat.value),
  })).filter((g) => g.items.length > 0)

  function openNew() {
    setEditingItem(null)
    setForm(EMPTY_FORM)
    setShowForm(true)
    setUploading(false)
  }

  function openEdit(item: MenuItem) {
    setEditingItem(item)
    setForm({
      slug: item.slug,
      name: item.name,
      description: item.description ?? "",
      price: item.price,
      image_url: item.image_url ?? "",
      category: item.category,
      preparation_time: item.preparation_time ?? "",
      rating: item.rating,
      is_spicy: item.is_spicy,
      is_vegetarian: item.is_vegetarian,
      is_popular: item.is_popular,
      sort_order: item.sort_order,
      is_active: item.is_active,
    })
    setShowForm(true)
    setUploading(false)
  }

  function closeForm() {
    setShowForm(false)
    setEditingItem(null)
    setSaved(false)
    setSaveError(null)
  }

  async function handleImageUpload(file: File) {
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split(".").pop()
    const path = `menu/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from("cms-images").upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from("cms-images").getPublicUrl(path)
      setForm((prev) => ({ ...prev, image_url: data.publicUrl }))
    }
    setUploading(false)
  }

  async function handleSave() {
    setSaving(true)
    setSaveError(null)
    const supabase = createClient()

    // Generate base slug from name if user left it empty
    const baseSlug = form.slug ||
      form.name
        .toLowerCase()
        .replace(/\s+/g, "-")
        .replace(/[^a-z0-9-]/g, "")
        .replace(/-+/g, "-")
        .replace(/^-|-$/g, "")

    if (editingItem) {
      const { data, error } = await supabase
        .from("menu_items")
        .update({ ...form, slug: baseSlug, updated_at: new Date().toISOString() })
        .eq("id", editingItem.id)
        .select()
        .single()
      if (error) {
        setSaveError(error.message)
        setSaving(false)
        return
      }
      if (data) setItems((prev) => prev.map((i) => (i.id === editingItem.id ? data : i)))
    } else {
      // For new items: if slug conflicts (409), append a short unique suffix and retry once
      let slug = baseSlug
      let { data, error } = await supabase
        .from("menu_items")
        .insert({ ...form, slug })
        .select()
        .single()

      if (error && (error.code === "23505" || error.message?.includes("duplicate") || error.message?.includes("unique"))) {
        // Slug collision — append a 4-char random suffix and retry
        slug = `${baseSlug}-${Math.random().toString(36).slice(2, 6)}`
        const retry = await supabase
          .from("menu_items")
          .insert({ ...form, slug })
          .select()
          .single()
        data = retry.data
        error = retry.error
      }

      if (error) {
        setSaveError(error.message)
        setSaving(false)
        return
      }
      if (data) setItems((prev) => [...prev, data])
    }

    setSaving(false)
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
      closeForm()
    }, 1200)
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from("menu_items").delete().eq("id", id)
    setItems((prev) => prev.filter((i) => i.id !== id))
    setDeleteConfirm(null)
  }

  async function toggleActive(item: MenuItem) {
    const supabase = createClient()
    const { data } = await supabase
      .from("menu_items")
      .update({ is_active: !item.is_active })
      .eq("id", item.id)
      .select()
      .single()
    if (data) setItems((prev) => prev.map((i) => (i.id === item.id ? data : i)))
  }

  return (
    <div className="space-y-6">
      {/* Toolbar */}
      <div className="space-y-2 sm:space-y-0 sm:flex sm:flex-wrap sm:items-center sm:gap-3">
        <div className="flex items-center gap-2 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-500" />
            <Input
              placeholder="Ürün ara..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="border-zinc-700 bg-zinc-800 pl-9 text-sm text-white placeholder:text-zinc-500 focus:border-primary"
            />
          </div>
          <div className="relative flex-shrink-0">
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="h-9 appearance-none rounded-md border border-zinc-700 bg-zinc-800 pl-3 pr-8 text-sm text-white focus:border-primary focus:outline-none"
            >
              <option value="all">Tümü</option>
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value}>{c.label}</option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
          </div>
        </div>
        <Button
          onClick={openNew}
          className="w-full bg-primary text-white hover:bg-primary/90 sm:w-auto"
          size="sm"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Yeni Ürün
        </Button>
      </div>

      {/* Item list grouped by category */}
      {grouped.length === 0 ? (
        <div className="rounded-2xl border border-zinc-800 bg-zinc-900 py-16 text-center">
          <p className="text-sm text-zinc-500">Arama sonucu bulunamadı.</p>
        </div>
      ) : (
        grouped.map((group) => (
          <div key={group.value} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            <div className="border-b border-zinc-800 bg-zinc-800/50 px-5 py-3">
              <h2 className="text-sm font-semibold text-white">
                {group.label}
                <span className="ml-2 text-xs font-normal text-zinc-500">
                  ({group.items.length} ürün)
                </span>
              </h2>
            </div>
            <div className="divide-y divide-zinc-800">
              {group.items.map((item) => (
                <div
                  key={item.id}
                  className={`flex items-center gap-4 px-5 py-4 transition-colors ${
                    !item.is_active ? "opacity-50" : ""
                  }`}
                >
                  {/* Image */}
                  <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-lg bg-zinc-800">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        width={48}
                        height={48}
                        className="h-full w-full object-cover"
                        unoptimized={item.image_url.startsWith("http")}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-600">
                        <span className="text-xs">?</span>
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="truncate text-sm font-medium text-white">{item.name}</p>
                      {item.is_popular && (
                        <span className="flex-shrink-0 rounded-full bg-primary/20 px-2 py-0.5 text-xs text-primary">
                          Popüler
                        </span>
                      )}
                      {item.is_spicy && (
                        <span className="flex-shrink-0 rounded-full bg-red-900/50 px-2 py-0.5 text-xs text-red-400">
                          Acılı
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-xs text-zinc-500">{item.preparation_time}</p>
                  </div>

                  {/* Price */}
                  <div className="flex-shrink-0 text-right">
                    <p className="text-sm font-semibold text-white">₺{item.price}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-shrink-0 items-center gap-1">
                    <button
                      onClick={() => toggleActive(item)}
                      title={item.is_active ? "Pasif yap" : "Aktif yap"}
                      className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      {item.is_active ? (
                        <ToggleRight className="h-4 w-4 text-emerald-400" />
                      ) : (
                        <ToggleLeft className="h-4 w-4" />
                      )}
                    </button>
                    <button
                      onClick={() => openEdit(item)}
                      className="rounded-md p-1.5 text-zinc-500 hover:bg-zinc-800 hover:text-white transition-colors"
                    >
                      <Pencil className="h-4 w-4" />
                    </button>
                    {deleteConfirm === item.id ? (
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => handleDelete(item.id)}
                          className="rounded-md px-2 py-1 text-xs text-red-400 hover:bg-red-950/40 transition-colors"
                        >
                          Evet
                        </button>
                        <button
                          onClick={() => setDeleteConfirm(null)}
                          className="rounded-md px-2 py-1 text-xs text-zinc-400 hover:bg-zinc-800 transition-colors"
                        >
                          Hayır
                        </button>
                      </div>
                    ) : (
                      <button
                        onClick={() => setDeleteConfirm(item.id)}
                        className="rounded-md p-1.5 text-zinc-500 hover:bg-red-950/40 hover:text-red-400 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      )}

      {/* Add/Edit Modal — bottom sheet on mobile, centered on desktop */}
      {showForm && (
        <div className="fixed inset-0 z-[60] flex items-end justify-center bg-black/70 sm:items-center sm:px-4 sm:py-8">
          <div className="w-full max-w-2xl overflow-hidden rounded-t-2xl border border-zinc-800 bg-zinc-900 shadow-2xl sm:rounded-2xl max-h-[92vh] sm:max-h-[90vh] flex flex-col">
            {/* Modal header */}
            <div className="flex flex-shrink-0 items-center justify-between border-b border-zinc-800 px-4 py-3 sm:px-6 sm:py-4">
              <h2 className="font-semibold text-white">
                {editingItem ? "Ürünü Düzenle" : "Yeni Ürün Ekle"}
              </h2>
              <button
                onClick={closeForm}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Modal body — scrollable */}
            <div className="flex-1 overflow-y-auto px-4 py-4 space-y-4 sm:px-6 sm:py-5">
              {/* Image */}
              <div>
                <label className="mb-2 block text-xs font-medium text-zinc-400">Ürün Görseli</label>
                <div className="flex items-center gap-4">
                  <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-xl bg-zinc-800">
                    {form.image_url ? (
                      <Image
                        src={form.image_url}
                        alt="preview"
                        width={80}
                        height={80}
                        className="h-full w-full object-cover"
                        unoptimized={form.image_url.startsWith("http")}
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-zinc-600 text-xs">
                        Görsel yok
                      </div>
                    )}
                  </div>
                  <div className="flex-1 space-y-2">
                    <Button
                      type="button"
                      size="sm"
                      variant="outline"
                      onClick={() => fileRef.current?.click()}
                      disabled={uploading}
                      className="border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                    >
                      <Upload className="mr-1.5 h-3.5 w-3.5" />
                      {uploading ? "Yükleniyor..." : "Görsel Yükle"}
                    </Button>
                    <input
                      ref={fileRef}
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const file = e.target.files?.[0]
                        if (file) handleImageUpload(file)
                      }}
                    />
                    <p className="text-xs text-zinc-500">veya URL girin:</p>
                    <Input
                      value={form.image_url ?? ""}
                      onChange={(e) => setForm((prev) => ({ ...prev, image_url: e.target.value }))}
                      placeholder="https://... veya /images/..."
                      className="border-zinc-700 bg-zinc-800 text-xs text-white placeholder:text-zinc-600"
                    />
                  </div>
                </div>
              </div>

              {/* Name + Category */}
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Ürün Adı *</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm((prev) => ({ ...prev, name: e.target.value }))}
                    placeholder="Adana Kebap"
                    className="border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Kategori *</label>
                  <div className="relative">
                    <select
                      value={form.category}
                      onChange={(e) => setForm((prev) => ({ ...prev, category: e.target.value }))}
                      className="h-9 w-full appearance-none rounded-md border border-zinc-700 bg-zinc-800 pl-3 pr-8 text-sm text-white focus:border-primary focus:outline-none"
                    >
                      {CATEGORIES.map((c) => (
                        <option key={c.value} value={c.value}>{c.label}</option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-2 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-zinc-400" />
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Açıklama</label>
                <Textarea
                  value={form.description ?? ""}
                  onChange={(e) => setForm((prev) => ({ ...prev, description: e.target.value }))}
                  placeholder="Ürün açıklaması..."
                  rows={2}
                  className="resize-none border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600"
                />
              </div>

              {/* Price + Prep time + Sort */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Fiyat (₺) *</label>
                  <Input
                    type="number"
                    value={form.price}
                    onChange={(e) => setForm((prev) => ({ ...prev, price: Number(e.target.value) }))}
                    className="border-zinc-700 bg-zinc-800 text-sm text-white"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Hazırlık Süresi</label>
                  <Input
                    value={form.preparation_time ?? ""}
                    onChange={(e) => setForm((prev) => ({ ...prev, preparation_time: e.target.value }))}
                    placeholder="20-25 dk"
                    className="border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600"
                  />
                </div>
                <div>
                  <label className="mb-1.5 block text-xs font-medium text-zinc-400">Sıra</label>
                  <Input
                    type="number"
                    value={form.sort_order}
                    onChange={(e) => setForm((prev) => ({ ...prev, sort_order: Number(e.target.value) }))}
                    className="border-zinc-700 bg-zinc-800 text-sm text-white"
                  />
                </div>
              </div>

              {/* Slug */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Slug <span className="text-zinc-600">(boş bırakılırsa otomatik oluşturulur)</span>
                </label>
                <Input
                  value={form.slug}
                  onChange={(e) => setForm((prev) => ({ ...prev, slug: e.target.value }))}
                  placeholder="adana-kebap"
                  className="border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600"
                />
              </div>

              {/* Toggles */}
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                {(
                  [
                    { key: "is_active", label: "Aktif" },
                    { key: "is_popular", label: "Popüler" },
                    { key: "is_spicy", label: "Acılı" },
                    { key: "is_vegetarian", label: "Vejetaryen" },
                  ] as const
                ).map(({ key, label }) => (
                  <label
                    key={key}
                    className="flex cursor-pointer items-center gap-2 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2.5 transition-colors hover:border-zinc-600"
                  >
                    <input
                      type="checkbox"
                      checked={form[key]}
                      onChange={(e) => setForm((prev) => ({ ...prev, [key]: e.target.checked }))}
                      className="accent-primary"
                    />
                    <span className="text-xs text-zinc-300">{label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Modal footer */}
            <div className="flex flex-shrink-0 flex-wrap items-center justify-end gap-3 border-t border-zinc-800 px-4 py-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] sm:pb-4 sm:px-6 sm:py-4">
              {saved && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  Kaydedildi
                </span>
              )}
              {saveError && (
                <span className="mr-auto text-xs text-red-400">
                  Hata: {saveError}
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={closeForm}
                className="text-zinc-400 hover:text-white"
              >
                Vazgec
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !form.name || form.price <= 0}
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 disabled:opacity-60"
              >
                <Save className="mr-1.5 h-3.5 w-3.5" />
                {saving ? "Kaydediliyor..." : editingItem ? "Güncelle" : "Ekle"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
