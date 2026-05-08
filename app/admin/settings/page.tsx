import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import AdminSidebar from "@/components/admin/admin-sidebar"
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
    <div className="flex min-h-screen">
      <AdminSidebar />
      <main className="flex-1 overflow-auto">
        <div className="px-6 py-8 md:px-8">
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-white">Site Ayarları</h1>
            <p className="mt-1 text-sm text-zinc-400">
              Sitedeki tüm metinleri ve iletişim bilgilerini buradan düzenleyin.
            </p>
          </div>
          <SettingsEditor initialSettings={settingsMap} />
        </div>
      </main>
    </div>
  )
}
