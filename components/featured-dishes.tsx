import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { ChevronRight } from "lucide-react"

export default function FeaturedDishes() {
  return (
    <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Özel Lezzetlerimiz</h2>
          <p className="text-lg text-gray-600">Damla Kebap&apos;ın İmzası Olan Tatlar</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Adana Kebap */}
          <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src="/images/adana-kebap.png"
                alt="Delicious Adana kebab served with grilled vegetables and rice"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-gray-900">Adana Kebap</h3>
              <p className="mb-4 text-sm text-gray-600">
                Adana&apos;nın geleneksel acı-tatlı dengesi, közde mükemmel pişirilmiş kuzu etiyle buluşuyor. Gerçek bir
                lezzet şöleni.
              </p>
              <Button variant="link" className="p-0 text-primary" asChild>
                <Link href="/menu">
                  Detaylar
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Urfa Kebap */}
          <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src="/images/urfa-kebap.png"
                alt="Authentic Urfa kebab, a milder alternative, prepared with fresh herbs and spices"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-gray-900">Urfa Kebap</h3>
              <p className="mb-4 text-sm text-gray-600">
                Acı sevmeyenler için ideal, bol domates ve biberle zenginleştirilmiş, etin doğal lezzetini ön plana
                çıkaran yöresel tat.
              </p>
              <Button variant="link" className="p-0 text-primary" asChild>
                <Link href="/menu">
                  Detaylar
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* İskender Kebap */}
          <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src="/images/iskender-kebap.png"
                alt="Traditional İskender kebab with thinly sliced döner, tomato sauce, and melted butter over pide bread"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-gray-900">İskender Kebap</h3>
              <p className="mb-4 text-sm text-gray-600">
                İncecik döner dilimleri, özel sosu, taze pide ve tereyağı ile lezzet patlaması.
              </p>
              <Button variant="link" className="p-0 text-primary" asChild>
                <Link href="/menu">
                  Detaylar
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Lahmacun */}
          <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
            <div className="aspect-video relative overflow-hidden">
              <Image
                src="/images/lahmacun.png"
                alt="Crispy Lahmacun, Turkish-style pizza topped with spiced minced meat and herbs"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className="object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <div className="p-4">
              <h3 className="mb-2 text-xl font-bold text-gray-900">Lahmacun</h3>
              <p className="mb-4 text-sm text-gray-600">
                İncecik hamur, baharatlı kıyma ve taptaze malzemelerle fırından yeni çıkmış çıtır lahmacun.
              </p>
              <Button variant="link" className="p-0 text-primary" asChild>
                <Link href="/menu">
                  Detaylar
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Button asChild className="bg-primary text-primary-foreground hover:bg-primary/90">
            <Link href="/menu">Tüm Menüyü Gör</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
