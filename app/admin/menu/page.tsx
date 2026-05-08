import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/admin-shell"
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
    <AdminShell
      title="Menü Yönetimi"
      subtitle="Ürün ekleyin, fiyatları güncelleyin, görselleri değiştirin"
    >
      <MenuManager initialItems={items ?? []} />
    </AdminShell>
  )
}
