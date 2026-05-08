import type { ReactNode } from "react"

export const metadata = {
  title: "CMS | Damla Kebap Yönetim Paneli",
  description: "Damla Kebap içerik yönetim sistemi",
  robots: "noindex, nofollow",
}

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      {children}
    </div>
  )
}
