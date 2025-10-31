"use client"

import { useState } from "react"
import { Phone, X } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function CallWidget() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      {/* Floating Call Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen ? (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-primary text-white shadow-2xl hover:bg-primary/90 transition-all duration-300 hover:scale-110"
            size="icon"
          >
            <Phone className="h-6 w-6" />
            <span className="sr-only">Telefon menüsünü aç</span>
          </Button>
        ) : (
          <div className="relative">
            {/* Close Button */}
            <Button
              onClick={() => setIsOpen(false)}
              className="h-14 w-14 rounded-full bg-gray-600 text-white shadow-2xl hover:bg-gray-700 transition-all duration-300"
              size="icon"
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Telefon menüsünü kapat</span>
            </Button>

            {/* Call Options */}
            <div className="absolute bottom-16 right-0 flex flex-col gap-3 animate-in slide-in-from-bottom-2 duration-300">
              {/* Phone Line 1 */}
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-black/80 px-3 py-2 text-xs text-white whitespace-nowrap backdrop-blur-sm">
                  Hat 1
                </span>
                <a
                  href="tel:+902164563790"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-200 hover:scale-110"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>

              {/* Phone Line 2 */}
              <div className="flex items-center gap-3">
                <span className="rounded-lg bg-black/80 px-3 py-2 text-xs text-white whitespace-nowrap backdrop-blur-sm">
                  Hat 2
                </span>
                <a
                  href="tel:+902164563791"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-green-600 text-white shadow-lg hover:bg-green-700 transition-all duration-200 hover:scale-110"
                >
                  <Phone className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pulsing Animation */}
      {!isOpen && (
        <div className="fixed bottom-6 right-6 z-40">
          <div className="h-14 w-14 rounded-full bg-primary/30 animate-ping"></div>
        </div>
      )}
    </>
  )
}
