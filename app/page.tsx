import Link from "next/link"
import Image from "next/image"
import { ChevronRight, MapPin, Phone, Clock, Star } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Suspense, lazy } from "react"

// Lazy load components that are below the fold
const WhyChooseUs = lazy(() => import("@/components/why-choose-us"))
const Testimonials = lazy(() => import("@/components/testimonials"))
const ContactSection = lazy(() => import("@/components/contact-section"))

// Loading component for lazy loaded sections
function SectionSkeleton() {
  return <div className="animate-pulse bg-gray-200 h-64 w-full rounded-lg"></div>
}

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center overflow-hidden px-4 py-16 text-center md:px-6 md:py-24 lg:px-8">
        {/* Elegant Background with Turkish/Kebab motifs */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-black to-zinc-800">
          {/* Geometric Pattern Overlay */}
          <div className="absolute inset-0 opacity-10">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `
                radial-gradient(circle at 25% 25%, #dc2626 2px, transparent 2px),
                radial-gradient(circle at 75% 75%, #dc2626 2px, transparent 2px),
                linear-gradient(45deg, transparent 40%, rgba(220, 38, 38, 0.1) 50%, transparent 60%)
              `,
                backgroundSize: "60px 60px, 60px 60px, 120px 120px",
              }}
            ></div>
          </div>

          {/* Elegant Flame/Fire motifs */}
          <div className="absolute top-10 left-10 opacity-20">
            <div className="w-32 h-32 bg-gradient-to-t from-primary via-red-500 to-orange-400 rounded-full blur-xl"></div>
          </div>
          <div className="absolute bottom-20 right-20 opacity-15">
            <div className="w-40 h-40 bg-gradient-to-t from-primary via-red-600 to-yellow-400 rounded-full blur-2xl"></div>
          </div>
          <div className="absolute top-1/2 left-1/4 opacity-10">
            <div className="w-24 h-24 bg-gradient-to-t from-orange-500 via-red-500 to-primary rounded-full blur-lg"></div>
          </div>

          {/* Subtle Turkish pattern border */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
          <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-transparent via-primary to-transparent opacity-60"></div>
        </div>

        <div className="relative z-10 mx-auto max-w-5xl">
          <div className="mb-3 flex items-center justify-center gap-2 md:mb-4">
            <div className="flex items-center gap-1 rounded-full bg-primary/20 px-2 py-1 text-xs text-primary md:px-3 md:text-sm backdrop-blur-sm border border-primary/30">
              <Star className="h-3 w-3 fill-current md:h-4 md:w-4" />
              <span className="font-medium">16 Yıllık Deneyim</span>
            </div>
            <div className="flex items-center gap-1 rounded-full bg-zinc-800/80 px-2 py-1 text-xs text-white md:px-3 md:text-sm backdrop-blur-sm border border-zinc-600">
              <MapPin className="h-3 w-3 md:h-4 md:w-4" />
              <span>Ataşehir, İstanbul</span>
            </div>
          </div>

          <h1 className="mb-3 text-2xl font-extrabold tracking-tight text-white md:mb-4 md:text-4xl lg:text-5xl xl:text-6xl drop-shadow-2xl">
            Damla Kebap: Ataşehir'in Kalbinde Eşsiz Lezzet Durağı
          </h1>
          <p className="mb-4 text-sm text-white/90 md:mb-8 md:text-xl lg:text-2xl drop-shadow-lg">
            16 Yıldır Geleneksel Türk Mutfağının En Seçkin Lezzetlerini Sunuyoruz
          </p>

          {/* Quick Info Cards */}
          <div className="mb-4 grid grid-cols-3 gap-2 md:mb-8 md:gap-4">
            <div className="rounded-lg bg-black/50 p-2 backdrop-blur-sm border border-white/10 md:p-4">
              <Clock className="mx-auto mb-1 h-4 w-4 text-primary md:mb-2 md:h-6 md:w-6" />
              <p className="text-xs text-white md:text-sm">Hızlı Teslimat</p>
              <p className="text-xs text-gray-300">20-35 dk</p>
            </div>
            <div className="rounded-lg bg-black/50 p-2 backdrop-blur-sm border border-white/10 md:p-4">
              <Star className="mx-auto mb-1 h-4 w-4 text-primary md:mb-2 md:h-6 md:w-6" />
              <p className="text-xs text-white md:text-sm">Müşteri Memnuniyeti</p>
              <p className="text-xs text-gray-300">4.8/5 puan</p>
            </div>
            <div className="rounded-lg bg-black/50 p-2 backdrop-blur-sm border border-white/10 md:p-4">
              <Phone className="mx-auto mb-1 h-4 w-4 text-primary md:mb-2 md:h-6 md:w-6" />
              <p className="text-xs text-white md:text-sm">Sipariş hattı</p>
              <p className="text-xs text-gray-300">2 Hat Aktif</p>
            </div>
          </div>

          <div className="mb-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-4 md:mb-6">
            <Button
              asChild
              size="sm"
              className="w-full bg-primary text-white hover:bg-primary/90 px-6 py-2 sm:w-auto md:size-lg md:px-8 md:py-3 shadow-2xl"
            >
              <a href="tel:+902164563790">
                <span className="mr-2">📞</span>
                Şimdi Sipariş Ver
              </a>
            </Button>
            <Button
              asChild
              size="sm"
              className="w-full bg-secondary text-white hover:bg-secondary/90 px-6 py-2 sm:w-auto md:size-lg md:px-8 md:py-3 shadow-2xl"
            >
              <Link href="/menu">
                <span className="mr-2">📋</span>
                Menüyü İncele
              </Link>
            </Button>
          </div>

          <div className="mb-3 flex flex-col items-center justify-center gap-2 sm:flex-row sm:gap-2 md:mb-6">
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-primary/50 bg-black/30 text-white hover:bg-primary/20 backdrop-blur-sm sm:w-auto"
            >
              <a href="tel:+902164563790">
                <Phone className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">216 456 37 90</span>
              </a>
            </Button>
            <Button
              asChild
              variant="outline"
              size="sm"
              className="w-full border-primary/50 bg-black/30 text-white hover:bg-primary/20 backdrop-blur-sm sm:w-auto"
            >
              <a href="tel:+902164563791">
                <Phone className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">216 456 37 91</span>
              </a>
            </Button>
          </div>

          <div>
            <Button asChild variant="ghost" size="sm" className="text-white/80 hover:text-white">
              <a href="https://g.co/kgs/cQVWqD2" target="_blank" rel="noopener noreferrer">
                <MapPin className="mr-1 h-3 w-3 md:mr-2 md:h-4 md:w-4" />
                <span className="text-xs md:text-sm">Yenişehir, Baraj Yolu Cad. 30/A - Yol Tarifi Al</span>
              </a>
            </Button>
          </div>
        </div>
      </section>

      {/* Restaurant Showcase Collage */}
      <section className="bg-gray-50 px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-8 text-center">
            <h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">Damla Kebap'ı Keşfedin</h2>
            <p className="text-lg text-gray-600">Modern Atmosfer, Geleneksel Lezzetler</p>
          </div>

          <div className="grid gap-4 md:grid-cols-3 md:gap-6">
            {/* Large Interior Image */}
            <div className="md:col-span-2">
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/restaurant-interior-new.jpg"
                  alt="Damla Kebap'ın modern ve şık iç mekanı"
                  width={800}
                  height={500}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80"
                  style={{ objectPosition: "center 60%" }}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 66vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold md:text-xl">Modern İç Mekan</h3>
                  <p className="text-sm opacity-90">Şık ve konforlu atmosfer</p>
                </div>
              </div>
            </div>

            {/* Exterior Image */}
            <div className="space-y-4">
              <div className="group relative overflow-hidden rounded-xl shadow-lg">
                <Image
                  src="/images/exterior-storefront.jpg"
                  alt="Damla Kebap'ın gece görünümü ve dış cephesi"
                  width={400}
                  height={300}
                  className="h-64 w-full object-cover transition-transform duration-500 group-hover:scale-105 md:h-80"
                  style={{ objectPosition: "center 15%" }}
                  quality={85}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-lg font-bold">Işıklı Tabela</h3>
                  <p className="text-sm opacity-90">Kaliteli hizmet</p>
                </div>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            <div className="rounded-lg bg-white p-6 shadow-sm border">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">🏪</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Merkezi Konum</h3>
              <p className="text-sm text-gray-600">Ataşehir'in kalbinde, kolay ulaşılabilir konumda</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm border">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">🛵</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Hızlı Teslimat</h3>
              <p className="text-sm text-gray-600">Profesyonel teslimat ekibimizle kapınıza kadar</p>
            </div>
            <div className="rounded-lg bg-white p-6 shadow-sm border">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="mb-2 font-semibold text-gray-900">Hijyen & Kalite</h3>
              <p className="text-sm text-gray-600">En yüksek hijyen standartları ve kalite kontrolü</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-2 md:items-center">
          <div className="space-y-4">
            <div className="mb-4">
              <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
                <span>🏆</span>
                16 Yıllık Deneyim
              </div>
            </div>

            <h2 className="text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
              Damla Kebap: Lezzetin ve Geleneğin Buluşma Noktası
            </h2>
            <p className="text-lg text-gray-600">
              Ataşehir'in kalbinde, 2009 yılından bu yana Türk mutfağının en seçkin lezzetlerini sizlere sunmaktan gurur
              duyuyoruz. 16 yıllık deneyimimizle, usta ellerden çıkan kebaplarımız, yöresel malzemelerle ve özenle
              hazırlanıyor.
            </p>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">16+</div>
                <div className="text-sm text-gray-600">Yıllık Deneyim</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">50+</div>
                <div className="text-sm text-gray-600">Menü Çeşidi</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">4.8</div>
                <div className="text-sm text-gray-600">Müşteri Puanı</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-primary">1000+</div>
                <div className="text-sm text-gray-600">Mutlu Müşteri</div>
              </div>
            </div>

            <p className="text-gray-600">
              Misafirperverliğimiz ve sıcak atmosferimizle, her yemeği unutulmaz bir deneyime dönüştürmeyi hedefliyoruz.
              Ataşehir'de bulunan restoranımızda sizi ağırlamaktan mutluluk duyarız.
            </p>

            <Button asChild className="mt-4 bg-primary text-white hover:bg-primary/90">
              <Link href="/about" className="inline-flex items-center">
                Hikayemizi Keşfet
                <ChevronRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="overflow-hidden rounded-lg shadow-lg">
            <Image
              src="/images/restaurant-interior-new.jpg"
              alt="İç Mekan Görünümü: Damla Kebap Restoranının modern ve şık atmosferi"
              width={600}
              height={400}
              className="h-full w-full object-cover"
              style={{ objectPosition: "center 40%" }}
              loading="lazy"
              quality={85}
              sizes="(max-width: 768px) 100vw, 50vw"
            />
          </div>
        </div>
      </section>

      {/* Featured Dishes */}
      <section className="bg-gray-50 px-4 py-16 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="mb-10 text-center">
            <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">Özel Lezzetlerimiz</h2>
            <p className="text-lg text-gray-600">Damla Kebap'ın İmzası Olan Tatlar</p>
          </div>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {/* Adana Kebap */}
            <div className="group overflow-hidden rounded-lg border bg-white shadow-sm transition-all hover:shadow-md">
              <div className="aspect-video relative overflow-hidden">
                <Image
                  src="/images/adana-kebap-featured.jpg"
                  alt="Delicious Adana kebab served with grilled vegetables and rice"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  quality={75}
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold text-gray-900">Adana Kebap</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Adana'nın geleneksel acı-tatlı dengesi, közde mükemmel pişirilmiş kuzu etiyle buluşuyor.
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
                  src="/images/urfa-kebap-featured.jpg"
                  alt="Authentic Urfa kebab, a milder alternative, prepared with fresh herbs and spices"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  quality={75}
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold text-gray-900">Urfa Kebap</h3>
                <p className="mb-4 text-sm text-gray-600">
                  Acı sevmeyenler için ideal, bol domates ve biberle zenginleştirilmiş yöresel tat.
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
                  src="/images/kebaptan-iskender.png"
                  alt="Traditional Kebaptan İskender kebab with thinly sliced döner, tomato sauce, and melted butter over pide bread"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  quality={75}
                />
              </div>
              <div className="p-4">
                <h3 className="mb-2 text-xl font-bold text-gray-900">Kebaptan İskender</h3>
                <p className="mb-4 text-sm text-gray-600">
                  İncecik Kebaptan Iskender döner dilimleri, özel sosu, taze pide ve tereyağı ile lezzet patlaması.
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
                  src="/images/lahmacun-new.png"
                  alt="Crispy Lahmacun, Turkish-style pizza topped with spiced minced meat and herbs"
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  loading="lazy"
                  quality={75}
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

      {/* Why Choose Us - Lazy Loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        <WhyChooseUs />
      </Suspense>

      {/* Quick Order Section */}
      <section className="bg-gradient-to-r from-primary to-red-700 px-4 py-12 md:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <div className="text-center mb-8">
            <h2 className="mb-3 text-2xl font-bold text-white md:text-3xl">Hemen Sipariş Verin!</h2>
            <p className="text-lg text-white/90">2 farklı hat ile hızlı sipariş • Ortalama teslimat 25-35 dk</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            <a
              href="tel:+902164563790"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 rounded-xl p-4 text-white border border-white/20"
            >
              <Phone className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium text-sm">Telefon Sipariş</div>
                <div className="text-xs opacity-90">216 456 37 90</div>
              </div>
            </a>

            <a
              href="tel:+902164563791"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 rounded-xl p-4 text-white border border-white/20"
            >
              <Phone className="h-5 w-5" />
              <div className="text-left">
                <div className="font-medium text-sm">Telefon Sipariş</div>
                <div className="text-xs opacity-90">216 456 37 91</div>
              </div>
            </a>

            <a
              href="https://tgoyemek.com/restoranlar/1542#bu-restoranin-en-sevilenleri"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 rounded-xl p-4 text-white border border-white/20"
            >
              <span className="text-lg">🛒</span>
              <div className="text-left">
                <div className="font-medium text-sm">Trendyol Yemek</div>
                <div className="text-xs opacity-90">Online Sipariş</div>
              </div>
            </a>

            <a
              href="https://getir.com/yemek/restoran/damla-kebap-yenisehir-mah-atasehir-istanbul/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-white/10 backdrop-blur-sm hover:bg-white/20 transition-all duration-200 rounded-xl p-4 text-white border border-white/20"
            >
              <span className="text-lg">🚀</span>
              <div className="text-left">
                <div className="font-medium text-sm">GetirYemek</div>
                <div className="text-xs opacity-90">Hızlı Teslimat</div>
              </div>
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials - Lazy Loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        <Testimonials />
      </Suspense>

      {/* Contact Section - Lazy Loaded */}
      <Suspense fallback={<SectionSkeleton />}>
        <ContactSection />
      </Suspense>
    </div>
  )
}
