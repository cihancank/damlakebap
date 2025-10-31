"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Ayşe Y.",
    text: "Ataşehir'deki favori kebapçım! Adana kebapları her zaman enfes, servis ise harika. 16 yıllık deneyimleri gerçekten belli oluyor.",
    rating: 5,
    location: "Ataşehir",
  },
  {
    id: 2,
    name: "Mehmet D.",
    text: "Urfa kebaplarını mutlaka denemelisiniz. Yanında gelen mezeler de çok lezzetli. Ailecek severek gidiyoruz.",
    rating: 5,
    location: "Küçükbakkalköy",
  },
  {
    id: 3,
    name: "Zeynep K.",
    text: "İskender kebabı için sürekli geliyorum. Porsiyonlar doyurucu, fiyatlar makul. İki telefon hattı olması çok pratik.",
    rating: 4,
    location: "Ataşehir",
  },
  {
    id: 4,
    name: "Ali R.",
    text: "Ataşehir'de iş toplantıları için sık sık tercih ettiğimiz bir mekan. Hızlı servis ve kaliteli yemekler sunuyorlar.",
    rating: 5,
    location: "Ataşehir",
  },
  {
    id: 5,
    name: "Fatma S.",
    text: "Baraj Yolu'nda çok uygun bir konumda. Paket servisleri de çok hızlı, 20 dakikada geldi siparişim.",
    rating: 5,
    location: "Yenişehir",
  },
  {
    id: 6,
    name: "Osman T.",
    text: "16 yıldır bu kaliteyi koruyabilmeleri gerçekten takdire şayan. Çöp şiş dürümleri harika!",
    rating: 5,
    location: "Ataşehir",
  },
]

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0)
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
            Müşterilerimiz Damla Kebap Hakkında Ne Diyor?
          </h2>
          <p className="text-lg text-gray-300">16 yıllık deneyimimizin müşteri memnuniyetine yansıması</p>
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
              <div className="text-2xl font-bold text-primary">4.8</div>
              <div className="text-sm text-gray-400">Ortalama Puan</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">1000+</div>
              <div className="text-sm text-gray-400">Mutlu Müşteri</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">16</div>
              <div className="text-sm text-gray-400">Yıllık Deneyim</div>
            </div>
          </div>
          <Button variant="link" className="text-primary hover:text-primary/80" asChild>
            <a href="https://g.page/damla-kebap-atasehir/review" target="_blank" rel="noopener noreferrer">
              Tüm Yorumları Okuyun
            </a>
          </Button>
        </div>
      </div>
    </section>
  )
}
