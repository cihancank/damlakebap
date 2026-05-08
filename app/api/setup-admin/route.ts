import { createClient } from "@supabase/supabase-js"
import { NextResponse } from "next/server"

// One-time route — resets the admin password via GoTrue Admin API.
// DELETE this file after confirming login works.
export async function GET() {
  const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  )

  // Find the existing user by email
  const { data: { users }, error: listError } = await supabaseAdmin.auth.admin.listUsers()
  if (listError) return NextResponse.json({ error: listError.message }, { status: 500 })

  const user = users.find((u) => u.email === "cihankara534@gmail.com")
  if (!user) return NextResponse.json({ error: "User not found in auth.users" }, { status: 404 })

  // Update password using GoTrue's own bcrypt hashing
  const { error: updateError } = await supabaseAdmin.auth.admin.updateUserById(user.id, {
    password: "23B7A439DAMLAKEBAP",
    email_confirm: true,
  })

  if (updateError) return NextResponse.json({ error: updateError.message }, { status: 500 })

  return NextResponse.json({
    success: true,
    message: "Password reset via Admin API. You can now log in at /admin/login.",
    userId: user.id,
  })
}
