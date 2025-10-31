"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, Star, Clock, Flame, Leaf, X } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

type MenuItem = {
  id: string
  name: string
  description: string
  price: number
  image: string
  category: string
  preparationTime: string
  rating: number
  isSpicy?: boolean
  isVegetarian?: boolean
  isPopular?: boolean
}

export default function MenuPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showSearch, setShowSearch] = useState(false)

  const categories = [
    { id: "all", name: "Tümü", emoji: "🍽️" },
    { id: "kebaplar", name: "Kebaplar", emoji: "🥩" },
    { id: "pideler", name: "Pideler", emoji: "🫓" },
    { id: "lahmacun", name: "Lahmacun", emoji: "🍕" },
    { id: "durum", name: "Dürüm", emoji: "🌯" },
    { id: "corbalar", name: "Çorbalar", emoji: "🍲" },
    { id: "mezeler", name: "Mezeler", emoji: "🥗" },
    { id: "salatalar", name: "Salatalar", emoji: "🥙" },
    { id: "tatlilar", name: "Tatlılar", emoji: "🍰" },
    { id: "icecekler", name: "İçecekler", emoji: "🥤" },
  ]

  const menuItems: MenuItem[] = [
    // Kebaplar
    {
      id: "acili-adana",
      name: "Acılı Adana",
      description: "Geleneksel acılı Adana kebabı, közde pişirilmiş",
      price: 375,
      image: "/images/adana-kebap-featured.jpg",
      category: "kebaplar",
      preparationTime: "20-25 dk",
      rating: 4.8,
      isSpicy: true,
      isPopular: true,
    },
    {
      id: "acisiz-urfa",
      name: "Acısız Urfa",
      description: "Yumuşak ve lezzetli Urfa kebabı",
      price: 375,
      image: "/images/urfa-kebap-featured.jpg",
      category: "kebaplar",
      preparationTime: "20-25 dk",
      rating: 4.7,
    },
    {
      id: "tavuk-sis",
      name: "Tavuk Şiş",
      description: "Marine edilmiş tavuk şiş kebabı",
      price: 370,
      image: "/images/tavuk-sis-new.png",
      category: "kebaplar",
      preparationTime: "18-22 dk",
      rating: 4.6,
    },
    {
      id: "sarma-beyti",
      name: "Sarma Beyti",
      description: "Lavaşa sarılmış özel beyti kebabı",
      price: 450,
      image: "/images/sarma-beyti.png",
      category: "kebaplar",
      preparationTime: "25-30 dk",
      rating: 4.8,
      isPopular: true,
    },
    {
      id: "domatesli-kebap",
      name: "Domateslı Kebap",
      description: "Taze domates ile pişirilmiş özel kebap",
      price: 500,
      image: "/images/domatesli-kebap.png",
      category: "kebaplar",
      preparationTime: "25-30 dk",
      rating: 4.7,
    },
    {
      id: "cop-sis",
      name: "Çöp Şiş",
      description: "İnce çubukta pişirilmiş lezzetli kebap",
      price: 450,
      image: "/images/cop-sis.png",
      category: "kebaplar",
      preparationTime: "20-25 dk",
      rating: 4.6,
    },
    {
      id: "pideli-kofte",
      name: "Pideli Köfte",
      description: "Pide üzerinde servis edilen köfte",
      price: 450,
      image: "/images/pideli-kofte.png",
      category: "kebaplar",
      preparationTime: "22-27 dk",
      rating: 4.7,
    },
    {
      id: "yaprak-kanat",
      name: "Yaprak Kanat",
      description: "Özel baharatlarla marine edilmiş tavuk kanat",
      price: 375,
      image: "/images/yaprak-kanat.png",
      category: "kebaplar",
      preparationTime: "18-22 dk",
      rating: 4.5,
    },
    {
      id: "karisik-kebap",
      name: "Karışık Kebap",
      description: "Çeşitli kebapların bir arada sunulduğu özel tabak",
      price: 900,
      image: "/images/karisik-kebap-new.png",
      category: "kebaplar",
      preparationTime: "30-35 dk",
      rating: 4.9,
      isPopular: true,
    },
    {
      id: "patlicanli-kebap",
      name: "Patlıcanlı Kebap",
      description: "Közlenmiş patlıcan ile servis edilen kebap",
      price: 500,
      image: "/images/patlicanli-kebap.png",
      category: "kebaplar",
      preparationTime: "25-30 dk",
      rating: 4.8,
    },
    {
      id: "kasap-kofte",
      name: "Kasap Köfte",
      description: "Taze kıymadan hazırlanan özel köfte",
      price: 375,
      image: "/images/kasap-kofte.png",
      category: "kebaplar",
      preparationTime: "20-25 dk",
      rating: 4.6,
    },
    {
      id: "tereyagli-iskender",
      name: "Tereyağlı İskender",
      description: "Kebaptan hazırlanan özel İskender",
      price: 450,
      image: "/images/kebaptan-iskender.png",
      category: "kebaplar",
      preparationTime: "22-27 dk",
      rating: 4.9,
      isPopular: true,
    },

    // Pideler
    {
      id: "karisik-pide",
      name: "Karışık Pide",
      description: "Kıyma, kuşbaşı ve kaşar karışımı pide",
      price: 300,
      image: "/images/karisik-pide-new.png",
      category: "pideler",
      preparationTime: "15-20 dk",
      rating: 4.7,
      isPopular: true,
    },
    {
      id: "kusbasili-pide",
      name: "Kuşbaşılı Pide",
      description: "Kuşbaşı et ile hazırlanan pide",
      price: 325,
      image: "/images/kusbasili-pide-new.png",
      category: "pideler",
      preparationTime: "15-20 dk",
      rating: 4.6,
    },
    {
      id: "kiymali-pide",
      name: "Kıymalı Pide",
      description: "Taze kıyma ile hazırlanan klasik pide",
      price: 300,
      image: "/images/kiymali-pide-new.png",
      category: "pideler",
      preparationTime: "15-20 dk",
      rating: 4.5,
    },
    {
      id: "kasarli-pide",
      name: "Kaşarlı Pide",
      description: "Bol kaşar peyniri ile hazırlanan pide",
      price: 300,
      image: "/images/kasarli-pide-new.png",
      category: "pideler",
      preparationTime: "12-17 dk",
      rating: 4.4,
      isVegetarian: true,
    },
    {
      id: "damla-pide",
      name: "Damla Pide",
      description: "Restoranımızın özel karışımı ile hazırlanan pide",
      price: 325,
      image: "/images/damla-pide-new.png",
      category: "pideler",
      preparationTime: "15-20 dk",
      rating: 4.8,
      isPopular: true,
    },
    {
      id: "kavurmali-pide",
      name: "Kavurmalı Pide",
      description: "Özel kavurma ile hazırlanan lezzetli pide",
      price: 375,
      image: "/images/damla-pide-new.png",
      category: "pideler",
      preparationTime: "18-23 dk",
      rating: 4.7,
    },

    // Lahmacun
    {
      id: "lahmacun",
      name: "Lahmacun",
      description: "İncecik hamur üzerine baharatlı kıyma",
      price: 130,
      image: "/images/lahmacun-new.png",
      category: "lahmacun",
      preparationTime: "10-15 dk",
      rating: 4.8,
      isPopular: true,
    },
    {
      id: "kasarli-lahmacun",
      name: "Kaşarlı Lahmacun",
      description: "Kaşar peyniri ile zenginleştirilmiş lahmacun",
      price: 175,
      image: "/images/kasarli-lahmacun-new.png",
      category: "lahmacun",
      preparationTime: "12-17 dk",
      rating: 4.6,
    },

    // Dürüm
    {
      id: "adana-durum",
      name: "Adana Dürüm",
      description: "Acılı Adana kebabı lavaş ekmeğinde",
      price: 275,
      image: "/images/adana-durum-new.png",
      category: "durum",
      preparationTime: "15-20 dk",
      rating: 4.7,
      isSpicy: true,
    },
    {
      id: "urfa-durum",
      name: "Urfa Dürüm",
      description: "Urfa kebabı lavaş ekmeğinde",
      price: 275,
      image: "/images/urfa-durum-new.png",
      category: "durum",
      preparationTime: "15-20 dk",
      rating: 4.6,
    },
    {
      id: "cop-sis-durum",
      name: "Çöp Şiş Dürüm",
      description: "Çöp şiş kebabı lavaş ekmeğinde",
      price: 300,
      image: "/images/cop-sis-durum.png",
      category: "durum",
      preparationTime: "15-20 dk",
      rating: 4.6,
    },
    {
      id: "tavuk-sis-durum",
      name: "Tavuk Şiş Dürüm",
      description: "Tavuk şiş kebabı lavaş ekmeğinde",
      price: 275,
      image: "/images/tavuk-sis-durum.png",
      category: "durum",
      preparationTime: "15-20 dk",
      rating: 4.5,
    },
    {
      id: "kofte-durum",
      name: "Köfte Dürüm",
      description: "Köfte lavaş ekmeğinde",
      price: 275,
      image: "/images/kofte-durum.png",
      category: "durum",
      preparationTime: "15-20 dk",
      rating: 4.5,
    },
    {
      id: "tombik-kofte",
      name: "Tombik Köfte",
      description: "Tombik ekmeğinde köfte",
      price: 275,
      image: "/images/tombik-kofte.png",
      category: "durum",
      preparationTime: "12-17 dk",
      rating: 4.4,
    },

    // Çorbalar
    {
      id: "gunun-corbasi",
      name: "Günün Çorbası",
      description: "Her gün değişen özel çorba",
      price: 130,
      image: "/images/gunun-corbasi.png",
      category: "corbalar",
      preparationTime: "5-10 dk",
      rating: 4.5,
      isVegetarian: true,
    },

    // Mezeler
    {
      id: "cig-kofte",
      name: "Çiğ Köfte",
      description: "Geleneksel çiğ köfte, yeşilliklerle",
      price: 200,
      image: "/images/cig-kofte.png",
      category: "mezeler",
      preparationTime: "5-10 dk",
      rating: 4.6,
      isVegetarian: true,
      isSpicy: true,
    },
    {
      id: "icli-kofte",
      name: "İçli Köfte",
      description: "Bulgur ile hazırlanan geleneksel içli köfte",
      price: 120,
      image: "/images/icli-kofte.png",
      category: "mezeler",
      preparationTime: "10-15 dk",
      rating: 4.4,
    },

    // Salatalar
    {
      id: "coban-salatasi",
      name: "Çoban Salatası",
      description: "Taze domates, salatalık, soğan ve biber",
      price: 200,
      image: "/images/coban-salatasi.png",
      category: "salatalar",
      preparationTime: "5-10 dk",
      rating: 4.5,
      isVegetarian: true,
    },
    {
      id: "gavurdagi",
      name: "Gavurdağı",
      description: "Cevizli, nar ekşili özel salata",
      price: 300,
      image: "/images/gavurdagi-salatasi.png",
      category: "salatalar",
      preparationTime: "8-12 dk",
      rating: 4.7,
      isVegetarian: true,
    },

    // Tatlılar
    {
      id: "sutlac",
      name: "Sütlaç",
      description: "Fırında pişirilmiş geleneksel sütlaç",
      price: 150,
      image: "/images/sutlac-new.png",
      category: "tatlilar",
      preparationTime: "5-10 dk",
      rating: 4.6,
      isVegetarian: true,
    },
    {
      id: "kunefe",
      name: "Künefe",
      description: "Sıcak tel kadayıf, peynir ve şerbet",
      price: 200,
      image: "/images/kunefe-new.png",
      category: "tatlilar",
      preparationTime: "15-20 dk",
      rating: 4.9,
      isVegetarian: true,
      isPopular: true,
    },
    {
      id: "sicak-kadayif",
      name: "Sıcak Kadayıf",
      description: "Sıcak servis edilen özel kadayıf tatlısı",
      price: 200,
      image: "/images/sicak-kadayif-new.png",
      category: "tatlilar",
      preparationTime: "15-20 dk",
      rating: 4.7,
      isVegetarian: true,
    },

    // İçecekler
    {
      id: "ayran",
      name: "Ayran",
      description: "Geleneksel köpüklü ayran",
      price: 50,
      image: "/images/ayran-new.png",
      category: "icecekler",
      preparationTime: "2-5 dk",
      rating: 4.5,
      isVegetarian: true,
    },
    {
      id: "su",
      name: "Su",
      description: "Şişe su",
      price: 20,
      image: "/images/su-new.png",
      category: "icecekler",
      preparationTime: "1 dk",
      rating: 4.0,
      isVegetarian: true,
    },
    {
      id: "soda",
      name: "Soda",
      description: "Soğuk soda",
      price: 30,
      image: "/images/soda-new.png",
      category: "icecekler",
      preparationTime: "1 dk",
      rating: 4.0,
      isVegetarian: true,
    },
    {
      id: "kola",
      name: "Kola",
      description: "Coca Cola",
      price: 60,
      image: "/images/kola-new.png",
      category: "icecekler",
      preparationTime: "1 dk",
      rating: 4.2,
      isVegetarian: true,
    },
    {
      id: "kola-zero",
      name: "Kola Zero",
      description: "Coca Cola Zero",
      price: 60,
      image: "/images/kola-zero-new.png",
      category: "icecekler",
      preparationTime: "1 dk",
      rating: 4.1,
      isVegetarian: true,
    },
    {
      id: "cappy",
      name: "Cappy",
      description: "Meyve suyu çeşitleri",
      price: 60,
      image: "/images/cappy-new.png",
      category: "icecekler",
      preparationTime: "1 dk",
      rating: 4.2,
      isVegetarian: true,
    },
    {
      id: "sprite",
      name: "Sprite",
      description: "Sprite limonlu içecek",
      price: 60,
      image: "/images/sprite-new.png",
      category: "icecekler",
      preparationTime: "1 dk",
      rating: 4.1,
      isVegetarian: true,
    },
  ]

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      searchQuery === "" ||
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.description.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = activeCategory === "all" || item.category === activeCategory
    return matchesSearch && matchesCategory
  })

  return (
    <div className="min-h-screen bg-black">
      {/* Mobile-First Header */}
      <div className="sticky top-0 z-50 bg-black/95 backdrop-blur-sm border-b border-zinc-800">
        <div className="px-4 py-3">
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-3">
            <div>
              <h1 className="text-xl font-bold text-white">Menümüz</h1>
              <p className="text-xs text-gray-400">Damla Kebap</p>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="text-gray-400 hover:text-white"
              onClick={() => setShowSearch(!showSearch)}
            >
              <Search className="h-5 w-5" />
            </Button>
          </div>

          {/* Search Bar - Collapsible */}
          <AnimatePresence>
            {showSearch && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="overflow-hidden mb-3"
              >
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                  <Input
                    type="search"
                    placeholder="Ara..."
                    className="h-10 border-0 bg-zinc-900 pl-10 pr-10 text-white placeholder:text-gray-400 focus:ring-1 focus:ring-primary"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-1 top-1/2 h-8 w-8 -translate-y-1/2 p-0 text-gray-400 hover:text-white"
                      onClick={() => setSearchQuery("")}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Category Pills - Horizontal Scroll */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={activeCategory === category.id ? "default" : "ghost"}
                size="sm"
                className={`flex-shrink-0 rounded-full px-4 py-2 text-sm ${
                  activeCategory === category.id
                    ? "bg-primary text-white shadow-lg"
                    : "bg-zinc-900 text-gray-300 hover:bg-zinc-800 hover:text-white"
                }`}
                onClick={() => setActiveCategory(category.id)}
              >
                <span className="mr-1">{category.emoji}</span>
                {category.name}
              </Button>
            ))}
          </div>
        </div>
      </div>

      {/* Menu Items - Mobile Optimized */}
      <div className="px-4 py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${activeCategory}-${searchQuery}`}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="space-y-3"
          >
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                className="group relative overflow-hidden rounded-xl bg-zinc-900 transition-all hover:bg-zinc-800 active:scale-[0.98]"
              >
                <div className="flex gap-3 p-3">
                  {/* Image */}
                  <div className="relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg sm:h-24 sm:w-24">
                    <Image
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                      sizes="(max-width: 640px) 80px, 96px"
                      loading="lazy"
                      quality={70}
                    />

                    {/* Quick badges on image */}
                    <div className="absolute -right-1 -top-1 flex flex-col gap-1">
                      {item.isPopular && (
                        <div className="rounded-full bg-primary px-1.5 py-0.5">
                          <span className="text-xs font-medium text-white">🔥</span>
                        </div>
                      )}
                      {item.isSpicy && (
                        <div className="rounded-full bg-red-600 px-1.5 py-0.5">
                          <Flame className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                      {item.isVegetarian && (
                        <div className="rounded-full bg-green-600 px-1.5 py-0.5">
                          <Leaf className="h-2.5 w-2.5 text-white" />
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="flex flex-1 flex-col justify-between min-w-0">
                    {/* Header */}
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-sm sm:text-base truncate">{item.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 sm:text-sm">{item.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-primary text-sm sm:text-base">{item.price} ₺</p>
                      </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-3 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                          <span>{item.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          <span>{item.preparationTime}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-1">
                        {item.isPopular && (
                          <Badge className="bg-primary/20 text-primary text-xs px-2 py-0.5 border-0">Popüler</Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* No results */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <div className="text-4xl mb-4">🔍</div>
            <p className="text-gray-400 mb-4">Aradığınız ürün bulunamadı</p>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-zinc-800"
              onClick={() => {
                setSearchQuery("")
                setActiveCategory("all")
                setShowSearch(false)
              }}
            >
              Tüm menüyü göster
            </Button>
          </div>
        )}
      </div>

      {/* Bottom CTA - Sticky */}
      <div className="sticky bottom-0 border-t border-zinc-800 bg-black/95 backdrop-blur-sm p-4">
        <div className="flex gap-3">
          <Button className="flex-1 bg-primary text-white hover:bg-primary/90 h-12 rounded-xl font-medium">
            <a href="tel:+902164563790" className="flex items-center justify-center w-full">
              📞 +90 216 456 37 90
            </a>
          </Button>
          <Button
            variant="outline"
            className="flex-1 border-gray-600 text-gray-300 hover:bg-zinc-800 h-12 rounded-xl font-medium"
          >
            <a href="tel:+902164563791" className="flex items-center justify-center w-full">
              📞 +90 216 456 37 91
            </a>
          </Button>
        </div>
      </div>
    </div>
  )
}
