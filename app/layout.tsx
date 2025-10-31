import type React from "react"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/header"
import Footer from "@/components/layout/footer"
import { ThemeProvider } from "@/components/theme-provider"
import CallWidget from "@/components/call-widget"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Damla Kebap | Ataşehir'in En İyi Kebapçısı | İstanbul",
  description:
    "Damla Kebap, Ataşehir'in kalbinde geleneksel Türk mutfağının en seçkin lezzetlerini sunuyor. Adana, Urfa, İskender ve daha fazlası.",
  keywords:
    "kebap, ataşehir kebap, istanbul kebap, adana kebap, urfa kebap, iskender kebap, lahmacun, türk mutfağı, damla kebap",
  openGraph: {
    title: "Damla Kebap | Ataşehir'in En İyi Kebapçısı | İstanbul",
    description:
      "Damla Kebap, Ataşehir'in kalbinde geleneksel Türk mutfağının en seçkin lezzetlerini sunuyor. Adana, Urfa, İskender ve daha fazlası.",
    url: "https://www.damlakebap.com.tr",
    siteName: "Damla Kebap",
    images: [
      {
        url: "/images/og-image.png",
        width: 1200,
        height: 630,
        alt: "Damla Kebap Logosu ve Kebap Görseli",
      },
    ],
    locale: "tr_TR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Damla Kebap | Ataşehir'in En İyi Kebapçısı | İstanbul",
    description: "Damla Kebap, Ataşehir'in kalbinde geleneksel Türk mutfağının en seçkin lezzetlerini sunuyor.",
    images: ["/images/twitter-card-image.png"],
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="tr" suppressHydrationWarning>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#A52A2A" />
        <link rel="icon" href="/favicon.png" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          <main className="min-h-screen pt-20">{children}</main>
          <Footer />
        </ThemeProvider>
        <CallWidget />
      </body>
    </html>
  )
}
