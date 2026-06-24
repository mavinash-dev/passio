import { NextRequest, NextResponse } from 'next/server'

export function GET(request: NextRequest) {
  const { origin } = new URL(request.url)
  const response = NextResponse.redirect(`${origin}/`)
  response.cookies.delete('passio_demo')
  return response
}
