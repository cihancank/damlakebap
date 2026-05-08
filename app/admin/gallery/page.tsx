import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/admin-shell"
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
    <AdminShell
      title="Galeri Yönetimi"
      subtitle="Fotoğraf ekleyin, kaldırın veya sırasını değiştirin"
    >
      <GalleryManager initialImages={images ?? []} />
    </AdminShell>
  )
}
