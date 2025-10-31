import { Leaf, ChefHat, Home, MapPin, Clock, Award } from "lucide-react"

export default function WhyChooseUs() {
  return (
    <section className="bg-white px-4 py-16 md:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 text-center">
          <h2 className="mb-2 text-3xl font-bold tracking-tight text-gray-900 md:text-4xl">
            Neden Damla Kebap'ı Tercih Etmelisiniz?
          </h2>
          <p className="text-lg text-gray-600">16 yıllık deneyimimizle fark yaratan özelliklerimiz</p>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {/* En Taze Malzemeler */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Leaf className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">En Taze Malzemeler</h3>
            <p className="text-gray-600">Günlük temin edilen yöresel ve taze ürünlerle hazırlanan eşsiz lezzetler.</p>
          </div>

          {/* Usta Şefler */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <ChefHat className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Usta Şefler</h3>
            <p className="text-gray-600">Yılların tecrübesiyle, kebap sanatını zirveye taşıyan ustalarımız.</p>
          </div>

          {/* 16 Yıllık Deneyim */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Award className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">16 Yıllık Deneyim</h3>
            <p className="text-gray-600">2008'den bu yana Ataşehir'de kaliteli hizmet ve lezzet garantisi.</p>
          </div>

          {/* Sıcak Ortam */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Home className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Sıcak Ortam</h3>
            <p className="text-gray-600">Aile sıcaklığında, samimi ve konforlu bir yemek deneyimi.</p>
          </div>

          {/* Kolay Erişim */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <MapPin className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Kolay Erişim</h3>
            <p className="text-gray-600">
              Ataşehir'in merkezinde, toplu taşıma ve otopark imkanlarıyla kolayca ulaşılabilir.
            </p>
          </div>

          {/* Hızlı Teslimat */}
          <div className="flex flex-col items-center text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-secondary">
              <Clock className="h-8 w-8 text-primary" />
            </div>
            <h3 className="mb-2 text-xl font-bold text-gray-900">Hızlı Teslimat</h3>
            <p className="text-gray-600">
              2 farklı hat ile sipariş alıyor, ortalama 25-35 dakikada teslim ediyoruz.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
