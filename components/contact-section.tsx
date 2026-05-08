import Link from "next/link"
import { MapPin, Phone, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"

const DEFAULT_EMBED = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3009.044176971293!2d29.12305777655489!3d40.98640379999999!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14cab6540c39c6f9%3A0x694b97624888ab06!2sYeni%C5%9Fehir%2C%20Baraj%20Yolu%20Cd.%20No%3A30%2FA%2C%2034779%20Ata%C5%9Fehir%2F%C4%B0stanbul%2C%20Turkey!5e0!3m2!1sen!2str!4v1701862411749!5m2!1sen!2str"

export default function ContactSection({ s = {} }: { s?: Record<string, string> }) {
  const title = s.contact_section_title || "Bize Ulaşın"
  const locationTitle = s.contact_location_title || "Damla Kebap Ataşehir"
  const address = s.contact_address || "Yenişehir, Baraj Yolu Cad. 30/A, 34779 Ataşehir/İstanbul"
  const phone1 = s.contact_phone1 || "+90 (216) 456 37 90"
  const phone2 = s.contact_phone2 || "+90 (216) 456 37 91"
  const hoursWeekday = s.contact_hours_weekday || "Pazartesi-Cumartesi: 11:00 - 23:00"
  const hoursWeekend = s.contact_hours_weekend || "Pazar: 12:00 - 22:00"
  const mapsUrl = s.contact_maps_url || s.hero_maps_url || "https://g.co/kgs/cQVWqD2"
  const embedUrl = s.contact_maps_embed || DEFAULT_EMBED

  // Build clean tel: href from display number
  const tel1 = phone1.replace(/\s|\(|\)|-/g, "")
  const tel2 = phone2.replace(/\s|\(|\)|-/g, "")

  return (
    <section className="bg-zinc-900 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-8 md:grid-cols-2">
          <div className="h-[400px] overflow-hidden rounded-lg">
            <iframe
              src={embedUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Damla Kebap Konum"
            ></iframe>
          </div>

          <div className="flex flex-col justify-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight text-white">{title}</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <MapPin className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-medium text-white">{locationTitle}</h3>
                  <p className="text-gray-300">{address}</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Phone className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-medium text-white">Telefon</h3>
                  <p className="text-gray-300">
                    <a href={`tel:${tel1}`} className="hover:underline">{phone1}</a>
                  </p>
                  {phone2 && (
                    <p className="text-gray-300">
                      <a href={`tel:${tel2}`} className="hover:underline">{phone2}</a>
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-start gap-4">
                <Clock className="mt-1 h-5 w-5 text-primary" />
                <div>
                  <h3 className="text-lg font-medium text-white">Çalışma Saatleri</h3>
                  <p className="text-gray-300">{hoursWeekday}</p>
                  {hoursWeekend && <p className="text-gray-300">{hoursWeekend}</p>}
                </div>
              </div>
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild className="bg-primary text-white hover:bg-primary/90">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer">
                  <MapPin className="mr-2 h-4 w-4" />
                  Yol Tarifi Al
                </a>
              </Button>
              <Button asChild variant="outline" className="border-primary text-white hover:bg-primary/20">
                <Link href="/contact">İletişim Formu</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
