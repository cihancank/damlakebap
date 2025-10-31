"use client"

import type React from "react"

import { useState } from "react"
import { MapPin, Phone, Clock, Mail, Instagram, Facebook } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Basic validation
    if (!formData.name || !formData.email || !formData.subject || !formData.message) {
      alert("Lütfen zorunlu alanları doldurun.")
      setIsSubmitting(false)
      return
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      alert("Lütfen geçerli bir e-posta adresi girin.")
      setIsSubmitting(false)
      return
    }

    // Simulate form submission
    setTimeout(() => {
      alert("Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağız.")
      setFormData({ name: "", email: "", phone: "", subject: "", message: "" })
      setIsSubmitting(false)
    }, 1000)
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  return (
    <div className="container mx-auto px-4 py-12 md:px-6 md:py-16 lg:py-24">
      <div className="mb-12 text-center">
        <h1 className="mb-2 text-4xl font-bold tracking-tight text-white md:text-5xl">Bize Ulaşın</h1>
        <p className="text-xl text-gray-300">Damla Kebap Ataşehir</p>
      </div>

      <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-2">
        <div className="space-y-8">
          <Card>
            <CardContent className="p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <MapPin className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Adres</h3>
                    <p className="text-gray-300">Yenişehir mahallesi barajyolu caddesi no30A, Ataşehir, İstanbul</p>
                    <Button variant="link" className="mt-1 h-auto p-0 text-primary hover:text-primary/80">
                      <a href="https://g.co/kgs/cQVWqD2" target="_blank" rel="noopener noreferrer">
                        Yol Tarifi Al
                      </a>
                    </Button>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Phone className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Telefon</h3>
                    <p className="text-gray-300">
                      <a href="tel:+902164563790" className="hover:underline">
                        +90 (216) 456 37 90
                      </a>
                    </p>
                    <p className="text-gray-300">
                      <a href="tel:+902164563791" className="hover:underline">
                        +90 (216) 456 37 91
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Mail className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium text-white">E-posta</h3>
                    <p className="text-gray-300">
                      <a href="mailto:Ahmetkaya1073@gmail.com" className="hover:underline">
                        Ahmetkaya1073@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <Clock className="mt-1 h-5 w-5 text-primary" />
                  <div>
                    <h3 className="text-lg font-medium text-white">Çalışma Saatleri</h3>
                    <p className="text-gray-300">Pazartesi-Cumartesi: 11:00 - 23:00</p>
                    <p className="text-gray-300">Pazar: 12:00 - 22:00</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 flex h-5 w-5 items-center justify-center text-primary">
                    <span className="sr-only">Sosyal Medya</span>
                    <div className="h-5 w-5 rounded-full bg-primary"></div>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-white">Sosyal Medya</h3>
                    <div className="mt-2 flex gap-4">
                      <a
                        href="https://instagram.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 transition-colors hover:text-primary"
                      >
                        <Instagram className="h-6 w-6" />
                        <span className="sr-only">Instagram</span>
                      </a>
                      <a
                        href="https://facebook.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-300 transition-colors hover:text-primary"
                      >
                        <Facebook className="h-6 w-6" />
                        <span className="sr-only">Facebook</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="h-[300px] overflow-hidden rounded-lg">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.044176971293!2d29.12305777655489!3d40.98640379999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6540c39c6f9%3A0x694b97624888ab06!2sDamla%20Kebap!5e0!3m2!1str!2str!4v1701862411749!5m2!1str!2str"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Damla Kebap Konum"
            ></iframe>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className="p-6">
              <h2 className="mb-6 text-2xl font-bold text-white">İletişim Formu</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-white">
                      Adınız Soyadınız *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Adınız Soyadınız"
                      required
                      maxLength={100}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-white">
                      E-posta Adresiniz *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="E-posta Adresiniz"
                      required
                      maxLength={100}
                    />
                  </div>
                </div>
                <div className="space-y-2">
                  <label htmlFor="phone" className="text-sm font-medium text-white">
                    Telefon Numaranız
                  </label>
                  <Input
                    id="phone"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="Telefon Numaranız"
                    maxLength={20}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="subject" className="text-sm font-medium text-white">
                    Konu *
                  </label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Mesajınızın Konusu"
                    required
                    maxLength={200}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-white">
                    Mesajınız *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Mesajınızı buraya yazın..."
                    rows={5}
                    required
                    maxLength={1000}
                    className="border-gray-800 bg-zinc-800 text-white placeholder:text-gray-400"
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-primary text-white hover:bg-primary/90 disabled:opacity-50"
                >
                  {isSubmitting ? "Gönderiliyor..." : "Mesajı Gönder"}
                </Button>
              </form>
            </CardContent>
          </Card>

          <Card className="mt-8">
            <CardContent className="p-6">
              <h2 className="mb-4 text-xl font-bold text-white">Sıkça Sorulan Sorular</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium text-white">Rezervasyon gerekli mi?</h3>
                  <p className="text-gray-300">
                    Hafta sonları ve özel günlerde rezervasyon yapmanızı öneririz. Diğer günlerde genellikle yer
                    bulunabilir.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Paket servisiniz var mı?</h3>
                  <p className="text-gray-300">
                    Evet, Trendyol Yemek ve GetirYemek üzerinden paket servisimiz bulunmaktadır. Ayrıca doğrudan bizi
                    arayarak da sipariş verebilirsiniz.
                  </p>
                </div>
                <div>
                  <h3 className="text-lg font-medium text-white">Vejetaryen seçenekleriniz var mı?</h3>
                  <p className="text-gray-300">
                    Evet, menümüzde çeşitli vejetaryen mezeler, salatalar ve sebze ağırlıklı seçenekler bulunmaktadır.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
