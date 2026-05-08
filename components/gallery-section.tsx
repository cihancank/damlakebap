"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Image from "next/image"
import { ChevronLeft, ChevronRight } from "lucide-react"

const galleryItems = [
  {
    src: "/images/adana-kebap-featured.jpg",
    alt: "Adana Kebap – közde pişirilmiş, baharatlı lezzetin zirvesi",
    label: "Adana Kebap",
  },
  {
    src: "/images/urfa-kebap-featured.jpg",
    alt: "Urfa Kebap – yumuşak ve aromalı, yöresel tarife sadık",
    label: "Urfa Kebap",
  },
  {
    src: "/images/kebaptan-iskender.png",
    alt: "Kebaptan İskender – özel sosuyla enfes bir klasik",
    label: "İskender Kebap",
  },
  {
    src: "/images/karisik-kebap-new.png",
    alt: "Karışık Kebap – birden fazla lezzet bir arada",
    label: "Karışık Kebap",
  },
  {
    src: "/images/kiymali-pide-new.png",
    alt: "Kıymalı Pide – fırından taze çıkmış altın çıtır pide",
    label: "Kıymalı Pide",
  },
  {
    src: "/images/kasarli-pide-new.png",
    alt: "Kaşarlı Pide – eritilmiş kaşar peyniriyle dolu lezzet",
    label: "Kaşarlı Pide",
  },
  {
    src: "/images/bafra-pide-new.jpg",
    alt: "Bafra Pide – Karadeniz usulü yumurtalı kıymalı pide",
    label: "Bafra Pide",
  },
  {
    src: "/images/lahmacun-new.png",
    alt: "Lahmacun – ince hamur, baharatlı kıyma, taptaze",
    label: "Lahmacun",
  },
  {
    src: "/images/kasarli-lahmacun-new.png",
    alt: "Kaşarlı Lahmacun – kaşar peyniriyle zenginleştirilmiş",
    label: "Kaşarlı Lahmacun",
  },
  {
    src: "/images/fistikli-kebap-new.jpg",
    alt: "Fıstıklı Kebap – Antep fıstığıyla buluşan kebap lezzeti",
    label: "Fıstıklı Kebap",
  },
  {
    src: "/images/cevizli-kebap-new.jpg",
    alt: "Cevizli Kebap – cevizli özel harçla hazırlanmış",
    label: "Cevizli Kebap",
  },
  {
    src: "/images/iskender-kebap.png",
    alt: "İskender – tereyağı, domates sosuyla döner lezzeti",
    label: "İskender",
  },
  {
    src: "/images/sarma-beyti.png",
    alt: "Sarma Beyti – özel baharat harmanıyla sarılmış kebap",
    label: "Sarma Beyti",
  },
  {
    src: "/images/kunefe-new.png",
    alt: "Künefe – fıstıklı, şerbetli geleneksel tatlı",
    label: "Künefe",
  },
  {
    src: "/images/restaurant-interior-new.jpg",
    alt: "Damla Kebap iç mekan – modern ve davetkar atmosfer",
    label: "Restoranımız",
  },
]

export default function GallerySection() {
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

  // Auto-play
  useEffect(() => {
    if (isHovered) return
    autoPlayRef.current = setInterval(next, 3500)
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current)
    }
  }, [isHovered, next])

  // Touch / drag support
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

  // Visible indices: prev, current, next (for peek effect)
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
            Lezzetlerin Dünyasına Hoş Geldiniz
          </h2>
          <p className="mt-2 text-base text-zinc-400">
            Damla Kebap&apos;ın enfes yemekleri ve sıcak atmosferinden kareler
          </p>
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
          {/* Cards track */}
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
                      key={item.src}
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
                      />
                    </div>
                  ))}
                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  {/* Label */}
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
              key={item.src}
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
