import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import GalleryManager from "@/components/admin/gallery-manager"

export default async function AdminGalleryPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: images } = await supabase
    .from("gallery_images")
    .select("*")
    .order("sort_order")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-8 md:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Galeri Yönetimi</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Ana sayfadaki galeri bölümünü buradan yönetin. Fotoğraf ekleyin, kaldırın veya sırasını değiştirin.
            </p>
          </div>
          <GalleryManager initialImages={images ?? []} />
        </div>
      </main>
    </div>
  )
}
