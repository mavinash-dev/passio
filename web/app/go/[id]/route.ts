import { NextRequest, NextResponse } from 'next/server'
import { createHash } from 'crypto'
import { supabaseAdmin } from '@/lib/supabase'

const BOT_UA_PATTERNS = [
  'googlebot', 'bingbot', 'slurp', 'duckduckbot', 'baiduspider',
  'yandexbot', 'facebot', 'ia_archiver', 'crawler', 'spider', 'bot',
]

function isBot(ua: string | null): boolean {
  if (!ua) return true
  return BOT_UA_PATTERNS.some(p => ua.toLowerCase().includes(p))
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params

  const { data: product } = await supabaseAdmin
    .from('products')
    .select('id, creator_id, buy_url, is_active')
    .eq('id', id)
    .single()

  if (!product || !product.is_active) {
    return new NextResponse('Not found', { status: 404 })
  }

  // Log click (skip bots)
  const ua = request.headers.get('user-agent')
  if (!isBot(ua)) {
    const rawIp =
      request.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ??
      request.headers.get('x-real-ip') ??
      'unknown'
    const ipHash = createHash('sha256').update(rawIp).digest('hex')

    await supabaseAdmin.from('click_events').insert({
      product_id: product.id,
      creator_id: product.creator_id,
      referrer: request.headers.get('referer'),
      user_agent: ua,
      ip_hash: ipHash,
    })
  }

  // Redirect: buy_url or fall back to Instagram DM
  if (product.buy_url) {
    return NextResponse.redirect(product.buy_url, { status: 307 })
  }

  // No buy_url — get creator's instagram for DM fallback
  const { data: creator } = await supabaseAdmin
    .from('creators')
    .select('instagram')
    .eq('id', product.creator_id)
    .single()

  if (creator?.instagram) {
    return NextResponse.redirect(`https://ig.me/m/${creator.instagram}`, { status: 307 })
  }

  return new NextResponse('No buy link available', { status: 404 })
}
