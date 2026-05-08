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

const categories = [
  { id: "all", name: "Tümü", emoji: "🍽️" },
  { id: "corbalar", name: "Çorbalar", emoji: "🍲" },
  { id: "lahmacun", name: "Lahmacun", emoji: "🍕" },
  { id: "pideler", name: "Pideler", emoji: "🫓" },
  { id: "kebaplar", name: "Kebaplar", emoji: "🥩" },
  { id: "durum", name: "Dürüm", emoji: "🌯" },
  { id: "mezeler", name: "Mezeler & Salatalar", emoji: "🥗" },
  { id: "tatlilar", name: "Tatlılar", emoji: "🍰" },
  { id: "icecekler", name: "İçecekler", emoji: "🥤" },
]

export default function MenuClient({ menuItems }: { menuItems: MenuItem[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [showSearch, setShowSearch] = useState(false)

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

      {/* Menu Items */}
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
                      unoptimized={item.image.startsWith("http")}
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
                    <div className="flex items-start justify-between gap-2">
                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-white text-sm sm:text-base truncate">{item.name}</h3>
                        <p className="text-xs text-gray-400 line-clamp-2 sm:text-sm">{item.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-bold text-primary text-sm sm:text-base">{item.price} ₺</p>
                      </div>
                    </div>
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

        {filteredItems.length === 0 && (
          <div className="py-16 text-center">
            <p className="text-gray-400 mb-4">Aradığınız ürün bulunamadı</p>
            <Button
              variant="outline"
              size="sm"
              className="border-gray-600 text-gray-300 hover:bg-zinc-800 bg-transparent"
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
            className="flex-1 border-gray-600 text-gray-300 hover:bg-zinc-800 h-12 rounded-xl font-medium bg-transparent"
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
