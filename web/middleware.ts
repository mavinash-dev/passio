import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl
  let response = NextResponse.next({ request })

  // Admin cookie auth
  if (pathname.startsWith('/admin')) {
    // Allow the login page and the auth API through
    if (pathname === '/admin' || pathname.startsWith('/api/admin/auth')) {
      return response
    }
    const token = request.cookies.get('admin_token')?.value
    const secret = process.env.ADMIN_SECRET
    if (!secret || token !== secret) {
      return NextResponse.redirect(new URL('/admin', request.url))
    }
    return response
  }

  // Skip auth checks in local dev or demo mode
  if (process.env.NODE_ENV === 'development') return response
  if (request.cookies.get('passio_demo')?.value === '1') return response

  // Supabase auth for creator routes
  if (
    pathname.startsWith('/onboard') ||
    pathname.startsWith('/dashboard') ||
    pathname === '/join'
  ) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
      {
        cookies: {
          getAll() { return request.cookies.getAll() },
          setAll(cookiesToSet) {
            cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value))
            response = NextResponse.next({ request })
            cookiesToSet.forEach(({ name, value, options }) =>
              response.cookies.set(name, value, options)
            )
          },
        },
      }
    )

    const { data: { user } } = await supabase.auth.getUser()

    if (!user && (pathname.startsWith('/onboard') || pathname.startsWith('/dashboard'))) {
      return NextResponse.redirect(new URL('/join', request.url))
    }

    if (user && pathname === '/join') {
      return NextResponse.redirect(new URL('/dashboard', request.url))
    }
  }

  return response
}

export const config = {
  matcher: ['/admin/:path*', '/api/admin/:path*', '/onboard/:path*', '/dashboard/:path*', '/join'],
}
