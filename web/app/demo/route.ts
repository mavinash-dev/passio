import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const { origin } = new URL(request.url)
  const response = NextResponse.redirect(`${origin}/onboard`)
  response.cookies.set('passio_demo', '1', {
    path: '/',
    sameSite: 'lax',
    maxAge: 60 * 60 * 2, // 2 hours
  })
  return response
}
