"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

type GalleryItem = {
  src: string
  alt: string
  label: string
}

interface GallerySectionProps {
  items?: GalleryItem[]
  title?: string
  subtitle?: string
}

const DEFAULT_ITEMS: GalleryItem[] = [
  { src: "/images/adana-kebap-featured.jpg", alt: "Adana Kebap", label: "Adana Kebap" },
  { src: "/images/urfa-kebap-featured.jpg", alt: "Urfa Kebap", label: "Urfa Kebap" },
  { src: "/images/kebaptan-iskender.png", alt: "İskender Kebap", label: "İskender Kebap" },
  { src: "/images/karisik-kebap-new.png", alt: "Karışık Kebap", label: "Karışık Kebap" },
  { src: "/images/kiymali-pide-new.png", alt: "Kıymalı Pide", label: "Kıymalı Pide" },
  { src: "/images/sarma-beyti.png", alt: "Sarma Beyti", label: "Sarma Beyti" },
  { src: "/images/kunefe-new.png", alt: "Künefe", label: "Künefe" },
]

export default function GallerySection({
  items,
  title = "Lezzetlerin Dünyasına Hoş Geldiniz",
  subtitle = "Damla Kebap'ın enfes yemekleri ve sıcak atmosferinden kareler",
}: GallerySectionProps) {
  const galleryItems = (items && items.length > 0) ? items : DEFAULT_ITEMS

  const [current, setCurrent] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const autoPlayRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const total = galleryItems.length

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + total) % total)
  }, [total])

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % total)
  }, [total])

  // Clamp current index when items change
  useEffect(() => {
    setCurrent((c) => Math.min(c, total - 1))
  }, [total])

  // Auto-play
  useEffect(() => {
    if (isHovered) return
    autoPlayRef.current = setInterval(next, 3500)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isHovered, next])

  const handleDragStart = (clientX: number) => {
    setIsDragging(true)
    dragStartX.current = clientX
  }
  const handleDragEnd = (clientX: number) => {
    if (!isDragging) return
    const diff = dragStartX.current - clientX
    if (diff > 50) next()
    else if (diff < -50) prev()
    setIsDragging(false)
  }

  const getSlide = (offset: number) => (current + offset + total) % total

  return (
    <section
      className="bg-zinc-950 px-4 py-16 md:px-6 lg:px-8"
      aria-label="Fotoğraf Galerisi"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-10 text-center">
          <span className="mb-3 inline-block rounded-full bg-primary/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-primary">
            Galeri
          </span>
          <h2 className="text-balance text-3xl font-bold tracking-tight text-white md:text-4xl">
            {title}
          </h2>
          <p className="mt-2 text-base text-zinc-400">{subtitle}</p>
        </div>

        {/* Slider */}
        <div
          className="relative select-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseUp={(e) => handleDragEnd(e.clientX)}
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
        >
          <div className="flex items-center justify-center gap-3 md:gap-5">
            {/* Left peek card */}
            <div
              className="hidden md:block flex-shrink-0 w-48 lg:w-64 cursor-pointer"
              onClick={prev}
              aria-label="Önceki"
            >
              <div className="relative overflow-hidden rounded-xl opacity-40 scale-95 transition-all duration-500 hover:opacity-60">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={galleryItems[getSlide(-1)].src}
                    alt={galleryItems[getSlide(-1)].alt}
                    fill
                    className="object-cover"
                    sizes="256px"
                    quality={60}
                    unoptimized={galleryItems[getSlide(-1)].src.startsWith("http")}
                  />
                  <div className="absolute inset-0 bg-zinc-900/40" />
                </div>
              </div>
            </div>

            {/* Main center card */}
            <div className="flex-shrink-0 w-full max-w-md md:max-w-xl lg:max-w-2xl">
              <div className="relative overflow-hidden rounded-2xl shadow-2xl ring-1 ring-white/10">
                <div className="aspect-[16/10] relative">
                  {galleryItems.map((item, idx) => (
                    <div
                      key={`${item.src}-${idx}`}
                      className={`absolute inset-0 transition-opacity duration-700 ${
                        idx === current ? "opacity-100" : "opacity-0"
                      }`}
                    >
                      <Image
                        src={item.src}
                        alt={item.alt}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 672px"
                        quality={85}
                        priority={idx === 0}
                        unoptimized={item.src.startsWith("http")}
                      />
                    </div>
                  ))}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="text-lg font-bold text-white drop-shadow-lg md:text-xl">
                      {galleryItems[current].label}
                    </p>
                    <p className="text-xs text-white/70 mt-0.5">
                      {current + 1} / {total}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right peek card */}
            <div
              className="hidden md:block flex-shrink-0 w-48 lg:w-64 cursor-pointer"
              onClick={next}
              aria-label="Sonraki"
            >
              <div className="relative overflow-hidden rounded-xl opacity-40 scale-95 transition-all duration-500 hover:opacity-60">
                <div className="aspect-[4/3] relative">
                  <Image
                    src={galleryItems[getSlide(1)].src}
                    alt={galleryItems[getSlide(1)].alt}
                    fill
                    className="object-cover"
                    sizes="256px"
                    quality={60}
                    unoptimized={galleryItems[getSlide(1)].src.startsWith("http")}
                  />
                  <div className="absolute inset-0 bg-zinc-900/40" />
                </div>
              </div>
            </div>
          </div>

          {/* Prev / Next Buttons */}
          <button
            onClick={prev}
            aria-label="Önceki fotoğraf"
            className="absolute left-0 md:-left-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-primary hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            aria-label="Sonraki fotoğraf"
            className="absolute right-0 md:-right-4 top-1/2 -translate-y-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-black/60 text-white backdrop-blur-sm ring-1 ring-white/20 transition hover:bg-primary hover:ring-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        {/* Dot indicators */}
        <div className="mt-6 flex items-center justify-center gap-1.5" role="tablist" aria-label="Galeri sayfaları">
          {galleryItems.map((item, idx) => (
            <button
              key={`dot-${idx}`}
              role="tab"
              aria-selected={idx === current}
              aria-label={`${item.label} fotoğrafına git`}
              onClick={() => setCurrent(idx)}
              className={`transition-all duration-300 rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                idx === current
                  ? "w-6 h-2 bg-primary"
                  : "w-2 h-2 bg-zinc-600 hover:bg-zinc-400"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
