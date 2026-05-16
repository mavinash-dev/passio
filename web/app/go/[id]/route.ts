import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { supabaseAdmin } from '@/lib/supabase'

const BOT_UA_PATTERNS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'facebot', 'ia_archiver', 'crawler', 'spider', 'bot',
]

function isBot(ua: string | null): boolean {
  if (!ua) return true
  const lower = ua.toLowerCase()
  return BOT_UA_PATTERNS.some((p) => lower.includes(p))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, creator_id, buy_link, is_active')
    .eq('id', id)
    .single()

  if (!product || !product.is_active || !product.buy_link) {
    return new NextResponse('Not found', { status: 404 })
  }

  const ua = request.headers.get('user-agent')

  if (!isBot(ua)) {
    const rawIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'

    const ipHash = createHash('sha256').update(rawIp).digest('hex')

    await supabaseAdmin.from('redirect_logs').insert({
      product_id: product.id,
      creator_id: product.creator_id,
      referrer: request.headers.get('referer'),
      user_agent: ua,
      ip_hash: ipHash,
    })
  }

  return NextResponse.redirect(product.buy_link, { status: 307 })
}
