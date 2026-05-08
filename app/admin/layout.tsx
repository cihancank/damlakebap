import type { ReactNode } from "react"

export const metadata = {
  title: "CMS | Damla Kebap Yönetim Paneli",
  description: "Damla Kebap içerik yönetim sistemi",
  // Prevent search engines from indexing the admin panel
  robots: { index: false, follow: false },
}

// Auth protection is handled in two layers:
// 1. middleware.ts — redirects unauthenticated requests to /admin/login at the edge
// 2. Each individual admin page does supabase.auth.getUser() as a defence-in-depth check
export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-zinc-950">
      {children}
    </div>
  )
}
