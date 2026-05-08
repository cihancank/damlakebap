"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

type S = Record<string, string>

const DEFAULTS = {
  title: "Müşterilerimiz Damla Kebap Hakkında Ne Diyor?",
  subtitle: "16 yıllık deneyimimizin müşteri memnuniyetine yansıması",
  stat1_value: "4.8", stat1_label: "Ortalama Puan",
  stat2_value: "1000+", stat2_label: "Mutlu Müşteri",
  stat3_value: "16", stat3_label: "Yıllık Deneyim",
  review_url: "https://g.page/damla-kebap-atasehir/review",
  reviews: [
    { name: "Ayşe Y.", location: "Ataşehir", rating: 5, text: "Ataşehir'deki favori kebapçım! Adana kebapları her zaman enfes, servis ise harika. 16 yıllık deneyimleri gerçekten belli oluyor." },
    { name: "Mehmet D.", location: "Küçükbakkalköy", rating: 5, text: "Urfa kebaplarını mutlaka denemelisiniz. Yanında gelen mezeler de çok lezzetli. Ailecek severek gidiyoruz." },
    { name: "Zeynep K.", location: "Ataşehir", rating: 4, text: "İskender kebabı için sürekli geliyorum. Porsiyonlar doyurucu, fiyatlar makul. İki telefon hattı olması çok pratik." },
    { name: "Ali R.", location: "Ataşehir", rating: 5, text: "Ataşehir'de iş toplantıları için sık sık tercih ettiğimiz bir mekan. Hızlı servis ve kaliteli yemekler sunuyorlar." },
    { name: "Fatma S.", location: "Yenişehir", rating: 5, text: "Baraj Yolu'nda çok uygun bir konumda. Paket servisleri de çok hızlı, 20 dakikada geldi siparişim." },
    { name: "Osman T.", location: "Ataşehir", rating: 5, text: "16 yıldır bu kaliteyi koruyabilmeleri gerçekten takdire şayan. Çöp şiş dürümleri harika!" },
  ],
}

export default function Testimonials({ s = {} }: { s?: S }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Build reviews from settings, falling back to defaults
  const testimonials = DEFAULTS.reviews.map((def, i) => {
    const n = i + 1
    return {
      id: n,
      name: s[`testimonials_r${n}_name`] || def.name,
      location: s[`testimonials_r${n}_location`] || def.location,
      text: s[`testimonials_r${n}_text`] || def.text,
      rating: def.rating,
    }
  }).filter((r) => r.text)
  const itemsPerPage = 2
  const totalPages = Math.ceil(testimonials.length / itemsPerPage)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % totalPages)
  }

  const prevSlide = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + totalPages) % totalPages)
  }

  const currentTestimonials = testimonials.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage)

  return (
    <section className="bg-zinc-800 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-white md:text-4xl">
            {s.testimonials_title || DEFAULTS.title}
          </h2>
          <p className="text-lg text-gray-300">{s.testimonials_subtitle || DEFAULTS.subtitle}</p>
        </div>

        <div className="relative">
          <div className="grid gap-6 md:grid-cols-2">
            {currentTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-none bg-zinc-900 shadow-sm">
                <CardContent className="p-6">
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                      ))}
                      {Array.from({ length: 5 - testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-5 w-5 text-gray-600" />
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">{testimonial.location}</span>
                  </div>
                  <p className="mb-4 text-gray-300">"{testimonial.text}"</p>
                  <p className="font-medium text-white">- {testimonial.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-8 flex justify-center gap-2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevSlide}
                className="h-8 w-8 rounded-full border-primary text-white hover:bg-primary/20"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="sr-only">Önceki</span>
              </Button>
              {Array.from({ length: totalPages }).map((_, index) => (
                <Button
                  key={index}
                  variant={currentIndex === index ? "default" : "outline"}
                  size="icon"
                  onClick={() => setCurrentIndex(index)}
                  className={`h-8 w-8 rounded-full ${
                    currentIndex === index ? "bg-primary text-white" : "border-primary text-white hover:bg-primary/20"
                  }`}
                >
                  <span>{index + 1}</span>
                </Button>
              ))}
              <Button
                variant="outline"
                size="icon"
                onClick={nextSlide}
                className="h-8 w-8 rounded-full border-primary text-white hover:bg-primary/20"
              >
                <ChevronRight className="h-4 w-4" />
                <span className="sr-only">Sonraki</span>
              </Button>
            </div>
          )}
        </div>

        <div className="mt-8 text-center">
          <div className="mb-4 flex items-center justify-center gap-8 text-white">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{s.testimonials_stat1_value || DEFAULTS.stat1_value}</div>
              <div className="text-sm text-gray-400">{s.testimonials_stat1_label || DEFAULTS.stat1_label}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{s.testimonials_stat2_value || DEFAULTS.stat2_value}</div>
              <div className="text-sm text-gray-400">{s.testimonials_stat2_label || DEFAULTS.stat2_label}</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">{s.testimonials_stat3_value || DEFAULTS.stat3_value}</div>
              <div className="text-sm text-gray-400">{s.testimonials_stat3_label || DEFAULTS.stat3_label}</div>
            </div>
          </div>
          <Button variant="link" className="text-primary hover:text-primary/80" asChild>
            <a href={s.testimonials_review_url || DEFAULTS.review_url} target="_blank" rel="noopener noreferrer">
              Tüm Yorumları Okuyun
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
