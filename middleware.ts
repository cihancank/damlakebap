import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  const response = await updateSession(request)

  // Expose pathname to Server Components via a custom request header
  // so the root layout can decide whether to render Header/Footer
  if (response instanceof NextResponse) {
    response.headers.set('x-pathname', request.nextUrl.pathname)
  }

  return response
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}
