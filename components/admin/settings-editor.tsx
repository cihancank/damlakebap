"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, CheckCircle, ChevronDown, ChevronUp, Upload, X, Image as ImageIcon, Loader2 } from "lucide-react"
import Image from "next/image"

type Settings = Record<string, string>

interface SettingField {
  key: string
  label: string
  type: "text" | "textarea" | "url" | "image"
  placeholder?: string
  hint?: string
}

interface SettingSection {
  id: string
  title: string
  fields: SettingField[]
}

const sections: SettingSection[] = [
  {
    id: "hero",
    title: "Ana Sayfa — Hero Bölümü",
    fields: [
      { key: "hero_title", label: "Ana Başlık", type: "textarea" },
      { key: "hero_subtitle", label: "Alt Başlık", type: "text" },
      { key: "hero_badge_experience", label: "Deneyim Rozeti", type: "text", placeholder: "16 Yıllık Deneyim" },
      { key: "hero_badge_location", label: "Konum Rozeti", type: "text", placeholder: "Ataşehir, İstanbul" },
      { key: "hero_stat1_label", label: "İstatistik 1 Başlık", type: "text" },
      { key: "hero_stat1_value", label: "İstatistik 1 Değer", type: "text" },
      { key: "hero_stat2_label", label: "İstatistik 2 Başlık", type: "text" },
      { key: "hero_stat2_value", label: "İstatistik 2 Değer", type: "text" },
      { key: "hero_stat3_label", label: "İstatistik 3 Başlık", type: "text" },
      { key: "hero_stat3_value", label: "İstatistik 3 Değer", type: "text" },
      { key: "hero_phone1", label: "Telefon 1 (tel: link)", type: "text", placeholder: "+902164563790" },
      { key: "hero_phone1_display", label: "Telefon 1 (gösterim)", type: "text", placeholder: "216 456 37 90" },
      { key: "hero_phone2", label: "Telefon 2 (tel: link)", type: "text", placeholder: "+902164563791" },
      { key: "hero_phone2_display", label: "Telefon 2 (gösterim)", type: "text", placeholder: "216 456 37 91" },
      { key: "hero_address", label: "Adres Metni (harita butonu)", type: "text" },
      { key: "hero_maps_url", label: "Google Maps Bağlantısı", type: "url" },
    ],
  },
  {
    id: "showcase",
    title: "Ana Sayfa — Vitrin Bölümü (Görseller & Metinler)",
    fields: [
      { key: "showcase_title", label: "Başlık", type: "text" },
      { key: "showcase_subtitle", label: "Alt Başlık", type: "text" },
      {
        key: "showcase_interior_image",
        label: "Restoran İç Mekan Görseli",
        type: "image",
        placeholder: "/images/restaurant-interior-new.jpg",
        hint: "Ana sayfanın büyük iç mekan fotoğrafı (sol taraf)",
      },
      { key: "interior_image_title", label: "İç Mekan Görseli Başlık", type: "text" },
      { key: "interior_image_subtitle", label: "İç Mekan Görseli Alt Metin", type: "text" },
      {
        key: "showcase_exterior_image",
        label: "Dış Mekan / Tabela Görseli",
        type: "image",
        placeholder: "/images/exterior-storefront.jpg",
        hint: "Ana sayfanın dış mekan / tabela fotoğrafı (sağ taraf)",
      },
      { key: "exterior_image_title", label: "Dış Mekan Görseli Başlık", type: "text" },
      { key: "exterior_image_subtitle", label: "Dış Mekan Görseli Alt Metin", type: "text" },
      { key: "showcase_card1_title", label: "Kart 1 Başlık", type: "text" },
      { key: "showcase_card1_desc", label: "Kart 1 Açıklama", type: "text" },
      { key: "showcase_card2_title", label: "Kart 2 Başlık", type: "text" },
      { key: "showcase_card2_desc", label: "Kart 2 Açıklama", type: "text" },
      { key: "showcase_card3_title", label: "Kart 3 Başlık", type: "text" },
      { key: "showcase_card3_desc", label: "Kart 3 Açıklama", type: "text" },
    ],
  },
  {
    id: "about",
    title: "Ana Sayfa — Hakkımızda Bölümü",
    fields: [
      { key: "about_badge", label: "Rozet Metni", type: "text" },
      { key: "about_title", label: "Başlık", type: "textarea" },
      { key: "about_body", label: "Ana Paragraf", type: "textarea" },
      { key: "about_body2", label: "İkinci Paragraf", type: "textarea" },
      {
        key: "about_image",
        label: "Hakkımızda Görseli",
        type: "image",
        placeholder: "/images/restaurant-interior-new.jpg",
        hint: "Hakkımızda bölümünün sağ tarafındaki fotoğraf",
      },
      { key: "about_stat1_value", label: "İstatistik 1 Değer", type: "text" },
      { key: "about_stat1_label", label: "İstatistik 1 Etiket", type: "text" },
      { key: "about_stat2_value", label: "İstatistik 2 Değer", type: "text" },
      { key: "about_stat2_label", label: "İstatistik 2 Etiket", type: "text" },
      { key: "about_stat3_value", label: "İstatistik 3 Değer", type: "text" },
      { key: "about_stat3_label", label: "İstatistik 3 Etiket", type: "text" },
      { key: "about_stat4_value", label: "İstatistik 4 Değer", type: "text" },
      { key: "about_stat4_label", label: "İstatistik 4 Etiket", type: "text" },
    ],
  },
  {
    id: "featured",
    title: "Ana Sayfa — Öne Çıkan Ürünler",
    fields: [
      { key: "featured_title", label: "Başlık", type: "text" },
      { key: "featured_subtitle", label: "Alt Başlık", type: "text" },
    ],
  },
  {
    id: "gallery",
    title: "Ana Sayfa — Galeri",
    fields: [
      { key: "gallery_title", label: "Galeri Başlık", type: "text" },
      { key: "gallery_subtitle", label: "Galeri Alt Başlık", type: "text" },
    ],
  },
  {
    id: "why",
    title: "Ana Sayfa — Neden Biz?",
    fields: [
      { key: "why_title", label: "Başlık", type: "text" },
      { key: "why_subtitle", label: "Alt Başlık", type: "text" },
      { key: "why_feat1_title", label: "Özellik 1 Başlık", type: "text" },
      { key: "why_feat1_desc", label: "Özellik 1 Açıklama", type: "textarea" },
      { key: "why_feat2_title", label: "Özellik 2 Başlık", type: "text" },
      { key: "why_feat2_desc", label: "Özellik 2 Açıklama", type: "textarea" },
      { key: "why_feat3_title", label: "Özellik 3 Başlık", type: "text" },
      { key: "why_feat3_desc", label: "Özellik 3 Açıklama", type: "textarea" },
      { key: "why_feat4_title", label: "Özellik 4 Başlık", type: "text" },
      { key: "why_feat4_desc", label: "Özellik 4 Açıklama", type: "textarea" },
      { key: "why_feat5_title", label: "Özellik 5 Başlık", type: "text" },
      { key: "why_feat5_desc", label: "Özellik 5 Açıklama", type: "textarea" },
      { key: "why_feat6_title", label: "Özellik 6 Başlık", type: "text" },
      { key: "why_feat6_desc", label: "Özellik 6 Açıklama", type: "textarea" },
    ],
  },
  {
    id: "cta",
    title: "Ana Sayfa — Sipariş Çağrısı",
    fields: [
      { key: "cta_title", label: "Başlık", type: "text" },
      { key: "cta_subtitle", label: "Alt Başlık", type: "text" },
      { key: "trendyol_url", label: "Trendyol Yemek Linki", type: "url" },
      { key: "getir_url", label: "Getir Yemek Linki", type: "url" },
    ],
  },
  {
    id: "contact",
    title: "İletişim Bilgileri",
    fields: [
      { key: "contact_address", label: "Adres", type: "text" },
      { key: "contact_phone1", label: "Telefon 1", type: "text" },
      { key: "contact_phone2", label: "Telefon 2", type: "text" },
      { key: "contact_email", label: "E-posta", type: "text" },
      { key: "contact_hours", label: "Çalışma Saatleri", type: "text" },
      { key: "contact_maps_embed", label: "Google Maps Embed URL", type: "url" },
    ],
  },
  {
    id: "footer",
    title: "Footer",
    fields: [
      { key: "footer_tagline", label: "Slogan / Açıklama", type: "textarea" },
      { key: "footer_copyright", label: "Telif Hakkı Metni", type: "text" },
    ],
  },
  {
    id: "about_page",
    title: "Hakkımızda Sayfası",
    fields: [
      { key: "about_page_title", label: "Sayfa Başlığı", type: "text" },
      { key: "about_page_subtitle", label: "Alt Başlık", type: "text" },
      { key: "about_page_start_title", label: "Nasıl Başladık — Başlık", type: "text" },
      { key: "about_page_start_body", label: "Nasıl Başladık — Metin", type: "textarea" },
      { key: "about_page_philosophy_title", label: "Felsefe — Başlık", type: "text" },
      { key: "about_page_philosophy_body", label: "Felsefe — Metin", type: "textarea" },
    ],
  },
]

// ─── Image Upload Field Component ───────────────────────────────────────────
function ImageField({
  field,
  value,
  onChange,
}: {
  field: SettingField
  value: string
  onChange: (key: string, value: string) => void
}) {
  const fileInputRef = useRef<HTMLInputElement>(null)
  const [uploading, setUploading] = useState(false)
  const [uploadError, setUploadError] = useState("")

  const currentSrc = value || field.placeholder || ""

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type and size
    const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"]
    if (!validTypes.includes(file.type)) {
      setUploadError("Sadece JPG, PNG, WEBP veya GIF dosyaları yüklenebilir.")
      return
    }
    if (file.size > 5 * 1024 * 1024) {
      setUploadError("Dosya boyutu 5MB'dan küçük olmalıdır.")
      return
    }

    setUploading(true)
    setUploadError("")

    const supabase = createClient()
    const ext = file.name.split(".").pop()
    const filename = `site/${field.key}-${Date.now()}.${ext}`

    const { data, error } = await supabase.storage
      .from("cms-images")
      .upload(filename, file, { upsert: true, contentType: file.type })

    if (error) {
      setUploadError("Yükleme başarısız: " + error.message)
      setUploading(false)
      return
    }

    const { data: urlData } = supabase.storage.from("cms-images").getPublicUrl(data.path)
    onChange(field.key, urlData.publicUrl)
    setUploading(false)

    // Reset file input
    if (fileInputRef.current) fileInputRef.current.value = ""
  }

  return (
    <div className="sm:col-span-2">
      <label className="mb-1.5 block text-xs font-medium text-zinc-400">{field.label}</label>
      {field.hint && <p className="mb-2 text-xs text-zinc-600">{field.hint}</p>}

      <div className="overflow-hidden rounded-xl border border-zinc-700 bg-zinc-800">
        {/* Image preview */}
        <div className="relative h-44 w-full bg-zinc-900">
          {currentSrc ? (
            <Image
              src={currentSrc}
              alt={field.label}
              fill
              className="object-cover"
              sizes="600px"
              onError={() => {}}
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <ImageIcon className="h-10 w-10 text-zinc-700" />
            </div>
          )}
          {/* Overlay badge */}
          {currentSrc && (
            <div className="absolute bottom-2 right-2">
              <span className="rounded-full bg-black/60 px-2 py-0.5 text-xs text-white backdrop-blur-sm">
                Mevcut görsel
              </span>
            </div>
          )}
        </div>

        {/* Controls */}
        <div className="space-y-3 p-4">
          {/* URL input */}
          <div>
            <p className="mb-1.5 text-xs text-zinc-500">URL ile bağla</p>
            <Input
              type="url"
              value={value}
              onChange={(e) => onChange(field.key, e.target.value)}
              placeholder={field.placeholder ?? "https://..."}
              className="border-zinc-700 bg-zinc-900 text-sm text-white placeholder:text-zinc-600 focus:border-primary"
            />
          </div>

          {/* Divider */}
          <div className="flex items-center gap-2">
            <div className="flex-1 border-t border-zinc-700" />
            <span className="text-xs text-zinc-600">ya da</span>
            <div className="flex-1 border-t border-zinc-700" />
          </div>

          {/* File upload */}
          <div>
            <p className="mb-1.5 text-xs text-zinc-500">Bilgisayardan yükle</p>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/jpeg,image/png,image/webp,image/gif"
              onChange={handleFileChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => fileInputRef.current?.click()}
              className="w-full border-zinc-700 bg-zinc-900 text-zinc-300 hover:border-primary hover:bg-zinc-800 hover:text-white disabled:opacity-50"
            >
              {uploading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Yükleniyor...
                </>
              ) : (
                <>
                  <Upload className="mr-2 h-4 w-4" />
                  Görsel Seç (JPG, PNG, WEBP — max 5MB)
                </>
              )}
            </Button>

            {uploadError && (
              <div className="mt-2 flex items-start gap-1.5 rounded-lg bg-red-950/40 border border-red-900 px-3 py-2">
                <X className="mt-0.5 h-3.5 w-3.5 flex-shrink-0 text-red-400" />
                <p className="text-xs text-red-400">{uploadError}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main Settings Editor ────────────────────────────────────────────────────
export default function SettingsEditor({ initialSettings }: { initialSettings: Settings }) {
  const [settings, setSettings] = useState<Settings>(initialSettings)
  const [saving, setSaving] = useState<string | null>(null)
  const [saved, setSaved] = useState<string | null>(null)
  const [openSections, setOpenSections] = useState<Set<string>>(new Set(["hero"]))

  function toggleSection(id: string) {
    setOpenSections((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function handleChange(key: string, value: string) {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  async function saveSection(sectionId: string, fields: SettingField[]) {
    setSaving(sectionId)
    const supabase = createClient()

    const updates = fields.map(({ key }) => ({
      key,
      value: settings[key] ?? "",
      updated_at: new Date().toISOString(),
    }))

    const { error } = await supabase
      .from("site_settings")
      .upsert(updates, { onConflict: "key" })

    setSaving(null)
    if (!error) {
      setSaved(sectionId)
      setTimeout(() => setSaved(null), 2500)
    }
  }

  return (
    <div className="space-y-4">
      {sections.map((section) => {
        const isOpen = openSections.has(section.id)
        const isSaving = saving === section.id
        const isSaved = saved === section.id

        return (
          <div key={section.id} className="overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900">
            {/* Section header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="flex w-full items-center justify-between px-6 py-4 text-left hover:bg-zinc-800/50 transition-colors"
            >
              <span className="font-medium text-white">{section.title}</span>
              {isOpen ? (
                <ChevronUp className="h-4 w-4 text-zinc-400" />
              ) : (
                <ChevronDown className="h-4 w-4 text-zinc-400" />
              )}
            </button>

            {/* Section body */}
            {isOpen && (
              <div className="border-t border-zinc-800 px-6 pb-6 pt-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  {section.fields.map((field) => {
                    if (field.type === "image") {
                      return (
                        <ImageField
                          key={field.key}
                          field={field}
                          value={settings[field.key] ?? ""}
                          onChange={handleChange}
                        />
                      )
                    }

                    return (
                      <div
                        key={field.key}
                        className={field.type === "textarea" ? "sm:col-span-2" : ""}
                      >
                        <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                          {field.label}
                        </label>
                        {field.type === "textarea" ? (
                          <Textarea
                            value={settings[field.key] ?? ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            rows={3}
                            className="resize-y border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-primary"
                          />
                        ) : (
                          <Input
                            type={field.type === "url" ? "url" : "text"}
                            value={settings[field.key] ?? ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={field.placeholder}
                            className="border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600 focus:border-primary"
                          />
                        )}
                      </div>
                    )
                  })}
                </div>

                <div className="mt-5 flex items-center justify-end gap-3">
                  {isSaved && (
                    <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                      <CheckCircle className="h-4 w-4" />
                      Kaydedildi
                    </span>
                  )}
                  <Button
                    onClick={() => saveSection(section.id, section.fields)}
                    disabled={isSaving}
                    size="sm"
                    className="bg-primary text-white hover:bg-primary/90 disabled:opacity-60"
                  >
                    <Save className="mr-1.5 h-3.5 w-3.5" />
                    {isSaving ? "Kaydediliyor..." : "Kaydet"}
                  </Button>
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
