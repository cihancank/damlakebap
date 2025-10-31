"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, X, Phone } from "lucide-react"
import { Button } from "@/components/ui/button"
import Logo from "@/components/logo"

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    setIsMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isMenuOpen])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const closeMenu = () => {
    setIsMenuOpen(false)
  }

  const isActive = (path: string) => {
    return pathname === path
  }

  return (
    <header
      className={`fixed left-0 top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-black shadow-md" : "bg-black/90 backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto flex h-20 items-center justify-between px-4 md:px-6">
        <div className="flex items-center">
          <Logo width={60} height={60} className="w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16" />
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${
              isActive("/") ? "text-white" : "text-white/80 hover:text-white"
            }`}
          >
            Anasayfa
          </Link>
          <Link
            href="/menu"
            className={`text-sm font-medium transition-colors ${
              isActive("/menu") ? "text-white" : "text-white/80 hover:text-white"
            }`}
          >
            Menü
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${
              isActive("/about") ? "text-white" : "text-white/80 hover:text-white"
            }`}
          >
            Hakkımızda
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${
              isActive("/contact") ? "text-white" : "text-white/80 hover:text-white"
            }`}
          >
            İletişim
          </Link>
          <Button asChild size="sm" className="ml-2 bg-secondary text-white hover:bg-secondary/90">
            <Link href="/menu">📋 Menü</Link>
          </Button>
          <Button asChild size="sm" className="ml-2 bg-primary text-white hover:bg-primary/90">
            <a href="tel:+902164563790">Şimdi Sipariş Ver</a>
          </Button>
        </nav>

        {/* Mobile Menu Button */}
        <div className="flex items-center md:hidden">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-primary/20"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <>
          {/* Overlay */}
          <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={closeMenu} />

          {/* Menu */}
          <div className="fixed left-0 top-20 z-50 w-full bg-black/95 backdrop-blur-sm border-t border-zinc-800 px-4 py-4 shadow-lg md:hidden max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className={`px-3 py-3 text-base font-medium transition-colors rounded-lg ${
                  isActive("/") ? "text-white bg-primary/20" : "text-white/80 hover:text-white hover:bg-zinc-800"
                }`}
                onClick={closeMenu}
              >
                🏠 Anasayfa
              </Link>
              <Link
                href="/menu"
                className={`px-3 py-3 text-base font-medium transition-colors rounded-lg ${
                  isActive("/menu") ? "text-white bg-primary/20" : "text-white/80 hover:text-white hover:bg-zinc-800"
                }`}
                onClick={closeMenu}
              >
                🍽️ Menü
              </Link>
              <Link
                href="/about"
                className={`px-3 py-3 text-base font-medium transition-colors rounded-lg ${
                  isActive("/about") ? "text-white bg-primary/20" : "text-white/80 hover:text-white hover:bg-zinc-800"
                }`}
                onClick={closeMenu}
              >
                ℹ️ Hakkımızda
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-3 text-base font-medium transition-colors rounded-lg ${
                  isActive("/contact") ? "text-white bg-primary/20" : "text-white/80 hover:text-white hover:bg-zinc-800"
                }`}
                onClick={closeMenu}
              >
                📞 İletişim
              </Link>

              <div className="border-t border-zinc-700 pt-4 mt-4">
                <Button
                  asChild
                  size="lg"
                  className="w-full bg-primary text-white hover:bg-primary/90 mb-3"
                  onClick={closeMenu}
                >
                  <a href="tel:+902164563790">📞 Şimdi Sipariş Ver</a>
                </Button>

                <div className="grid grid-cols-1 gap-2">
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary text-white hover:bg-primary/20"
                    onClick={closeMenu}
                  >
                    <a href="tel:+902164563790">
                      <Phone className="mr-2 h-4 w-4" />
                      +90 (216) 456 37 90
                    </a>
                  </Button>
                  <Button
                    asChild
                    variant="outline"
                    size="lg"
                    className="border-primary text-white hover:bg-primary/20"
                    onClick={closeMenu}
                  >
                    <a href="tel:+902164563791">
                      <Phone className="mr-2 h-4 w-4" />
                      +90 (216) 456 37 91
                    </a>
                  </Button>
                </div>
              </div>
            </nav>
          </div>
        </>
      )}
    </header>
  )
}
