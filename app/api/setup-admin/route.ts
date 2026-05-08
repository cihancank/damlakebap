import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// One-time route to create the admin user via GoTrue admin API.
// Delete this file after the account is created.
export async function GET() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email: "cihankara534@gmail.com",
    password: "23B7A439DAMLAKEBAP",
    email_confirm: true,
    user_metadata: { is_admin: true },
  })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 })
  }

  return NextResponse.json({ success: true, userId: data.user?.id })
}
