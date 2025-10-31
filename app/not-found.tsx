"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Home, Menu, Phone, ArrowLeft } from "lucide-react"
import Logo from "@/components/logo"

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <div className="text-center max-w-2xl mx-auto">
        {/* Logo */}
        <div className="mb-8 flex justify-center">
          <Logo width={120} height={120} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32" />
        </div>

        {/* 404 Error */}
        <div className="mb-8">
          <h1 className="text-6xl md:text-8xl font-bold text-primary mb-4">404</h1>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Sayfa Bulunamadı</h2>
          <p className="text-gray-300 text-lg mb-2">Aradığınız sayfa mevcut değil veya taşınmış olabilir.</p>
          <p className="text-gray-400 text-sm">Belki menümüze göz atmak istersiniz? 🍽️</p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <Button asChild className="bg-primary text-white hover:bg-primary/90 w-full sm:w-auto">
            <Link href="/">
              <Home className="mr-2 h-4 w-4" />
              Ana Sayfaya Dön
            </Link>
          </Button>

          <Button asChild variant="outline" className="border-primary text-white hover:bg-primary/20 w-full sm:w-auto">
            <Link href="/menu">
              <Menu className="mr-2 h-4 w-4" />
              Menüyü İncele
            </Link>
          </Button>
        </div>

        {/* Quick Contact */}
        <div className="border-t border-zinc-800 pt-8">
          <p className="text-gray-400 text-sm mb-4">Hemen sipariş vermek isterseniz:</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild variant="ghost" className="text-primary hover:bg-primary/20">
              <a href="tel:+902164563790">
                <Phone className="mr-2 h-4 w-4" />
                216 456 37 90
              </a>
            </Button>
            <Button asChild variant="ghost" className="text-primary hover:bg-primary/20">
              <a href="tel:+902164563791">
                <Phone className="mr-2 h-4 w-4" />
                216 456 37 91
              </a>
            </Button>
          </div>
        </div>

        {/* Back Button */}
        <div className="mt-8">
          <Button variant="ghost" className="text-gray-400 hover:text-white" onClick={() => window.history.back()}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Geri Dön
          </Button>
        </div>
      </div>
    </div>
  )
}
