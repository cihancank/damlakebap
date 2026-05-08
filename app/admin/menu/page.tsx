import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
import MenuManager from "@/components/admin/menu-manager"

export default async function AdminMenuPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: items } = await supabase
    .from("menu_items")
    .select("*")
    .order("category")
    .order("sort_order")

  return (
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-8 md:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Menü Yönetimi</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Menü ürünlerini ekleyin, düzenleyin, fiyatları güncelleyin ve görselleri değiştirin.
            </p>
          </div>
          <MenuManager initialItems={items ?? []} />
        </div>
      </main>
    </div>
  )
}
