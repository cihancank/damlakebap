import { createClient } from '@/lib/supabase/server'
import { NextRequest, NextResponse } from 'next/server'

// Allowlist of safe redirect paths to prevent open-redirect attacks
const ALLOWED_REDIRECTS = ['/admin', '/admin/menu', '/admin/gallery', '/admin/settings']

export async function GET(request: NextRequest) {
  const { searchParams, origin } = request.nextUrl
  const code = searchParams.get('code')
  const nextParam = searchParams.get('next') ?? '/admin'

  // Only allow redirects to known internal admin paths
  const next = ALLOWED_REDIRECTS.includes(nextParam) ? nextParam : '/admin'

  if (code) {
    const supabase = await createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`)
    }
  }

  return NextResponse.redirect(`${origin}/admin/login?error=callback_error`)
}
