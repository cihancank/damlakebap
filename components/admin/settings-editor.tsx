"use client"

import { useState } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, CheckCircle, ChevronDown, ChevronUp } from "lucide-react"

type Settings = Record<string, string>

interface SettingField {
  key: string
  label: string
  type: "text" | "textarea" | "url"
  placeholder?: string
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
    title: "Ana Sayfa — Vitrin Bölümü",
    fields: [
      { key: "showcase_title", label: "Başlık", type: "text" },
      { key: "showcase_subtitle", label: "Alt Başlık", type: "text" },
      { key: "interior_image_title", label: "İç Mekan Görseli Başlık", type: "text" },
      { key: "interior_image_subtitle", label: "İç Mekan Görseli Alt Metin", type: "text" },
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
                  {section.fields.map((field) => (
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
                  ))}
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
