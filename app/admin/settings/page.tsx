import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminShell from "@/components/admin/admin-shell"
import SettingsEditor from "@/components/admin/settings-editor"

export default async function SettingsPage() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect("/admin/login")

  const { data: settings } = await supabase
    .from("site_settings")
    .select("key, value")

  const settingsMap: Record<string, string> = {}
  settings?.forEach(({ key, value }) => {
    settingsMap[key] = value ?? ""
  })

  return (
    <AdminShell
      title="Site Ayarları"
      subtitle="Tüm metinleri ve iletişim bilgilerini düzenleyin"
    >
      <SettingsEditor initialSettings={settingsMap} />
    </AdminShell>
  )
}
