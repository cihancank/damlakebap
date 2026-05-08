import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/admin-shell"
import PopupManager from "@/components/admin/popup-manager"

export default async function AdminPopupsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: popups } = await supabase
    .from("popups")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <AdminShell
      title="Popup Yönetimi"
      subtitle="Kampanya popupları oluşturun, düzenleyin ve yönetin"
    >
      <PopupManager initialPopups={popups ?? []} />
    </AdminShell>
  )
}
