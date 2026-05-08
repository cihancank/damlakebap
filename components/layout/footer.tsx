import Link from "next/link"
import { MapPin, Phone, Mail, Clock } from "lucide-react"
import Logo from "@/components/logo"

export default function Footer({ s = {} }: { s?: Record<string, string> }) {
  const location = s.footer_location || "Ataşehir, İstanbul"
  const tagline = s.footer_tagline || "Geleneksel Türk mutfağının en seçkin lezzetlerini, modern bir ortamda sunuyoruz."
  const address = s.footer_address || s.contact_address || "Yenişehir, Baraj Yolu Cad. 30/A, 34779 Ataşehir/İstanbul"
  const phone1 = s.footer_phone1 || s.contact_phone1 || "+90 216 456 37 90"
  const phone2 = s.footer_phone2 || s.contact_phone2 || "+90 216 456 37 91"
  const email = s.footer_email || s.contact_email || "Ahmetkaya1073@gmail.com"
  const hours = s.footer_hours || "Pazartesi-Pazar: 10:00 - 01:00"
  const copyright = s.footer_copyright || `© ${new Date().getFullYear()} Damla Kebap. Tüm Hakları Saklıdır.`

  const tel1 = phone1.replace(/\s|\(|\)|-/g, "")
  const tel2 = phone2.replace(/\s|\(|\)|-/g, "")

  return (
    <footer className="bg-black px-4 py-12 text-white md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Logo and About */}
          <div>
            <div className="mb-4">
              <Logo width={140} height={140} className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 lg:w-36 lg:h-36" />
            </div>
            <p className="mt-2 text-sm text-gray-400">{location}</p>
            <p className="mt-4 text-sm text-gray-400">{tagline}</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Hızlı Menü</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 transition-colors hover:text-primary">
                  Anasayfa
                </Link>
              </li>
              <li>
                <Link href="/menu" className="text-gray-400 transition-colors hover:text-primary">
                  Menü
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-400 transition-colors hover:text-primary">
                  Hakkımızda
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 transition-colors hover:text-primary">
                  İletişim
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Bize Ulaşın</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <MapPin className="mt-0.5 h-5 w-5 text-primary" />
                <span className="text-gray-400">{address}</span>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="mt-0.5 h-5 w-5 text-primary" />
                <div>
                  <a href={`tel:${tel1}`} className="text-gray-400 transition-colors hover:text-primary block">
                    {phone1}
                  </a>
                  {phone2 && (
                    <a href={`tel:${tel2}`} className="text-gray-400 transition-colors hover:text-primary">
                      {phone2}
                    </a>
                  )}
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Mail className="mt-0.5 h-5 w-5 text-primary" />
                <a href={`mailto:${email}`} className="text-gray-400 transition-colors hover:text-primary">
                  {email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="mt-0.5 h-5 w-5 text-primary" />
                <div className="text-gray-400">
                  <p>{hours}</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="mb-4 text-lg font-semibold text-white">Yasal Bilgiler</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/privacy" className="text-gray-400 transition-colors hover:text-primary">
                  Gizlilik Politikası
                </Link>
              </li>
              <li>
                <Link href="/terms" className="text-gray-400 transition-colors hover:text-primary">
                  Kullanım Koşulları
                </Link>
              </li>
              <li>
                <Link href="/cookies" className="text-gray-400 transition-colors hover:text-primary">
                  Çerez Politikası
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-gray-800 pt-6 text-center">
          <p className="text-sm text-gray-400">{copyright}</p>
        </div>
      </div>
    </footer>
  )
}
