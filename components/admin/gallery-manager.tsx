"use client"

import { useState, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import {
  Plus,
  Trash2,
  Upload,
  GripVertical,
  CheckCircle,
  X,
  Eye,
  EyeOff,
} from "lucide-react"

type GalleryImage = {
  id: string
  src: string
  alt: string | null
  label: string | null
  sort_order: number
  is_active: boolean
}

export default function GalleryManager({ initialImages }: { initialImages: GalleryImage[] }) {
  const [images, setImages] = useState<GalleryImage[]>(initialImages)
  const [showAdd, setShowAdd] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [newUrl, setNewUrl] = useState("")
  const [newAlt, setNewAlt] = useState("")
  const [newLabel, setNewLabel] = useState("")
  const [adding, setAdding] = useState(false)
  const [added, setAdded] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleFileUpload(file: File) {
    setUploading(true)
    const supabase = createClient()
    const ext = file.name.split(".").pop()
    const path = `gallery/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
    const { error } = await supabase.storage.from("cms-images").upload(path, file, { upsert: true })
    if (!error) {
      const { data } = supabase.storage.from("cms-images").getPublicUrl(path)
      setNewUrl(data.publicUrl)
    }
    setUploading(false)
  }

  async function handleAdd() {
    if (!newUrl.trim()) return
    setAdding(true)
    const supabase = createClient()
    const nextOrder = images.length > 0 ? Math.max(...images.map((i) => i.sort_order)) + 1 : 1

    const { data, error } = await supabase
      .from("gallery_images")
      .insert({
        src: newUrl.trim(),
        alt: newAlt.trim() || newLabel.trim() || "Galeri fotoğrafı",
        label: newLabel.trim() || null,
        sort_order: nextOrder,
        is_active: true,
      })
      .select()
      .single()

    if (!error && data) {
      setImages((prev) => [...prev, data])
      setAdded(true)
      setTimeout(() => {
        setAdded(false)
        setShowAdd(false)
        setNewUrl("")
        setNewAlt("")
        setNewLabel("")
      }, 1200)
    }
    setAdding(false)
  }

  async function handleDelete(id: string) {
    const supabase = createClient()
    await supabase.from("gallery_images").delete().eq("id", id)
    setImages((prev) => prev.filter((i) => i.id !== id))
    setDeleteConfirm(null)
  }

  async function toggleActive(image: GalleryImage) {
    const supabase = createClient()
    const { data } = await supabase
      .from("gallery_images")
      .update({ is_active: !image.is_active })
      .eq("id", image.id)
      .select()
      .single()
    if (data) setImages((prev) => prev.map((i) => (i.id === image.id ? data : i)))
  }

  async function updateLabel(id: string, label: string, alt: string) {
    const supabase = createClient()
    const { data } = await supabase
      .from("gallery_images")
      .update({ label, alt })
      .eq("id", id)
      .select()
      .single()
    if (data) setImages((prev) => prev.map((i) => (i.id === id ? data : i)))
  }

  return (
    <div className="space-y-6">
      {/* Header toolbar */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-zinc-400">
          {images.filter((i) => i.is_active).length} aktif /{" "}
          {images.length} toplam fotoğraf
        </p>
        <Button
          onClick={() => setShowAdd(true)}
          size="sm"
          className="bg-primary text-white hover:bg-primary/90"
        >
          <Plus className="mr-1.5 h-4 w-4" />
          Fotoğraf Ekle
        </Button>
      </div>

      {/* Image grid */}
      {images.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-zinc-700 bg-zinc-900 py-20 text-center">
          <p className="text-sm text-zinc-500">Henuz fotoğraf yok. Yukari butonu kullanin.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {images.map((image) => (
            <GalleryCard
              key={image.id}
              image={image}
              deleteConfirm={deleteConfirm}
              onDelete={handleDelete}
              onToggleActive={toggleActive}
              onSetDeleteConfirm={setDeleteConfirm}
              onUpdateLabel={updateLabel}
            />
          ))}
        </div>
      )}

      {/* Add Modal */}
      {showAdd && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4">
          <div className="w-full max-w-md rounded-2xl border border-zinc-800 bg-zinc-900 shadow-2xl">
            <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
              <h2 className="font-semibold text-white">Fotoğraf Ekle</h2>
              <button
                onClick={() => setShowAdd(false)}
                className="text-zinc-500 hover:text-white transition-colors"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="px-6 py-5 space-y-4">
              {/* Preview */}
              {newUrl && (
                <div className="overflow-hidden rounded-xl bg-zinc-800">
                  <Image
                    src={newUrl}
                    alt="preview"
                    width={400}
                    height={200}
                    className="h-44 w-full object-cover"
                    unoptimized={newUrl.startsWith("http")}
                  />
                </div>
              )}

              {/* Upload */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Görsel</label>
                <div className="flex gap-2">
                  <Input
                    value={newUrl}
                    onChange={(e) => setNewUrl(e.target.value)}
                    placeholder="https://... veya /images/..."
                    className="flex-1 border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600"
                  />
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => fileRef.current?.click()}
                    disabled={uploading}
                    className="flex-shrink-0 border-zinc-700 bg-zinc-800 text-zinc-300 hover:bg-zinc-700 hover:text-white"
                  >
                    <Upload className="h-3.5 w-3.5" />
                  </Button>
                  <input
                    ref={fileRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0]
                      if (file) handleFileUpload(file)
                    }}
                  />
                </div>
                {uploading && (
                  <p className="mt-1 text-xs text-zinc-500">Yukleniyor...</p>
                )}
              </div>

              {/* Label */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">Etiket (opsiyonel)</label>
                <Input
                  value={newLabel}
                  onChange={(e) => setNewLabel(e.target.value)}
                  placeholder="Adana Kebap"
                  className="border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600"
                />
              </div>

              {/* Alt */}
              <div>
                <label className="mb-1.5 block text-xs font-medium text-zinc-400">
                  Alt Metin <span className="text-zinc-600">(SEO / erişilebilirlik)</span>
                </label>
                <Input
                  value={newAlt}
                  onChange={(e) => setNewAlt(e.target.value)}
                  placeholder="Izgara Adana kebap tabağı"
                  className="border-zinc-700 bg-zinc-800 text-sm text-white placeholder:text-zinc-600"
                />
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-zinc-800 px-6 py-4">
              {added && (
                <span className="flex items-center gap-1.5 text-sm text-emerald-400">
                  <CheckCircle className="h-4 w-4" />
                  Eklendi
                </span>
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAdd(false)}
                className="text-zinc-400 hover:text-white"
              >
                Vazgec
              </Button>
              <Button
                onClick={handleAdd}
                disabled={adding || !newUrl.trim()}
                size="sm"
                className="bg-primary text-white hover:bg-primary/90 disabled:opacity-60"
              >
                {adding ? "Ekleniyor..." : "Ekle"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function GalleryCard({
  image,
  deleteConfirm,
  onDelete,
  onToggleActive,
  onSetDeleteConfirm,
  onUpdateLabel,
}: {
  image: GalleryImage
  deleteConfirm: string | null
  onDelete: (id: string) => void
  onToggleActive: (image: GalleryImage) => void
  onSetDeleteConfirm: (id: string | null) => void
  onUpdateLabel: (id: string, label: string, alt: string) => void
}) {
  const [editingLabel, setEditingLabel] = useState(false)
  const [label, setLabel] = useState(image.label ?? "")
  const [alt, setAlt] = useState(image.alt ?? "")

  return (
    <div
      className={`group overflow-hidden rounded-2xl border border-zinc-800 bg-zinc-900 transition-all ${
        !image.is_active ? "opacity-50" : ""
      }`}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden bg-zinc-800">
        <Image
          src={image.src}
          alt={image.alt ?? "Galeri"}
          fill
          className="object-cover transition-transform group-hover:scale-105"
          unoptimized={image.src.startsWith("http")}
        />
        {/* Overlay actions */}
        <div className="absolute inset-0 flex items-center justify-center gap-2 bg-black/50 opacity-0 transition-opacity group-hover:opacity-100">
          <button
            onClick={() => onToggleActive(image)}
            title={image.is_active ? "Gizle" : "Goster"}
            className="rounded-lg bg-zinc-900/80 p-2 text-white hover:bg-zinc-800 transition-colors"
          >
            {image.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4 text-zinc-500" />}
          </button>
          {deleteConfirm === image.id ? (
            <div className="flex items-center gap-1 rounded-lg bg-zinc-900/90 px-3 py-1.5">
              <span className="text-xs text-zinc-300">Emin misiniz?</span>
              <button
                onClick={() => onDelete(image.id)}
                className="ml-1 text-xs text-red-400 hover:text-red-300"
              >
                Evet
              </button>
              <button
                onClick={() => onSetDeleteConfirm(null)}
                className="text-xs text-zinc-500 hover:text-white"
              >
                Hayir
              </button>
            </div>
          ) : (
            <button
              onClick={() => onSetDeleteConfirm(image.id)}
              className="rounded-lg bg-zinc-900/80 p-2 text-white hover:bg-red-950/80 hover:text-red-400 transition-colors"
            >
              <Trash2 className="h-4 w-4" />
            </button>
          )}
        </div>
      </div>

      {/* Label / Alt editor */}
      <div className="px-3 py-3">
        {editingLabel ? (
          <div className="space-y-1.5">
            <Input
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="Etiket"
              className="h-7 border-zinc-700 bg-zinc-800 text-xs text-white"
            />
            <Input
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              placeholder="Alt metin"
              className="h-7 border-zinc-700 bg-zinc-800 text-xs text-white"
            />
            <div className="flex justify-end gap-1">
              <button
                onClick={() => {
                  onUpdateLabel(image.id, label, alt)
                  setEditingLabel(false)
                }}
                className="text-xs text-emerald-400 hover:text-emerald-300"
              >
                Kaydet
              </button>
              <button
                onClick={() => setEditingLabel(false)}
                className="text-xs text-zinc-500 hover:text-white"
              >
                Iptal
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setEditingLabel(true)}
            className="w-full text-left"
          >
            <p className="truncate text-xs font-medium text-zinc-200">
              {image.label || <span className="text-zinc-600 italic">Etiket ekle...</span>}
            </p>
            <p className="mt-0.5 truncate text-xs text-zinc-500">
              {image.alt || "Alt metin yok"}
            </p>
          </button>
        )}
      </div>
    </div>
  )
}
