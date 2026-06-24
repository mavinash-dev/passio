import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

type Creator = {
  id: string
  user_id: string
  handle: string
  brand_name: string
  tagline: string | null
  story: string | null
  portrait_url: string | null
  instagram: string | null
  website: string | null
  status: string
  created_at: string
}

type Product = {
  id: string
  creator_id: string
  name: string
  image_url: string | null
  buy_url: string | null
  sort_order: number
  is_active: boolean
}

// ---------------------------------------------------------------------------
// Supabase server client
// ---------------------------------------------------------------------------

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}

// ---------------------------------------------------------------------------
// Data fetching
// ---------------------------------------------------------------------------

async function getCreator(handle: string): Promise<Creator | null> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('creators')
    .select('*')
    .eq('handle', handle)
    .eq('status', 'active')
    .single()

  if (error || !data) return null
  return data as Creator
}

async function getProducts(creatorId: string): Promise<Product[]> {
  const supabase = await getSupabase()
  const { data, error } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', creatorId)
    .eq('is_active', true)
    .order('sort_order', { ascending: true })

  if (error || !data) return []
  return data as Product[]
}

// ---------------------------------------------------------------------------
// Metadata
// ---------------------------------------------------------------------------

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const creator = await getCreator(handle)

  if (!creator) {
    return { title: 'Brand not found — Passio' }
  }

  return {
    title: `${creator.brand_name} — Passio`,
    description: creator.tagline ?? undefined,
  }
}

// ---------------------------------------------------------------------------
// Page
// ---------------------------------------------------------------------------

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params
  const creator = await getCreator(handle)

  // Not found / not active
  if (!creator) {
    return (
      <div className="min-h-screen bg-[#F2EBE1] flex items-center justify-center">
        <div className="grain-overlay" aria-hidden="true" />
        <div className="relative z-10 text-center px-6">
          <p className="font-display italic text-3xl text-[#6B4226]">
            This brand hasn&apos;t launched yet.
          </p>
          <p className="text-[#6B6B6B] mt-3 text-sm">
            Check back soon, or explore other brands on{' '}
            <a href="/" className="underline hover:text-[#B8956A] transition-colors">
              passio
            </a>
            .
          </p>
        </div>
      </div>
    )
  }

  const products = await getProducts(creator.id)

  const websiteDisplay = creator.website
    ? creator.website.replace(/^https?:\/\//, '').replace(/\/$/, '')
    : null

  return (
    <div className="min-h-screen bg-[#F2EBE1] relative">

      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* All content sits above the background layers */}
      <div className="relative z-10">

        {/* Nav */}
        <nav className="sticky top-0 z-20 bg-[#F2EBE1]/90 backdrop-blur-sm px-6 py-4">
          <a href="/" className="font-passio italic text-xl text-[#1A1A1A] hover:text-[#B8956A] transition-colors">
            passio
          </a>
        </nav>

        {/* Brand header */}
        <div className="max-w-4xl mx-auto px-6 pt-6 pb-4 md:pt-12 md:pb-6">
          <h1 className="font-display italic text-4xl sm:text-5xl md:text-7xl text-[#6B4226] leading-tight">
            {creator.brand_name}
          </h1>
          {creator.tagline && (
            <p className="text-[#6B6B6B] text-lg mt-3">{creator.tagline}</p>
          )}
          {(creator.instagram || creator.website) && (
            <div className="flex items-center gap-4 mt-4 flex-wrap">
              {creator.instagram && (
                <a
                  href={`https://instagram.com/${creator.instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#B8956A] transition-colors"
                >
                  {/* Instagram icon */}
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <circle cx="12" cy="12" r="4" />
                    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
                  </svg>
                  {creator.instagram}
                </a>
              )}
              {creator.instagram && creator.website && (
                <span className="text-[#DDD0C0]">·</span>
              )}
              {creator.website && (
                <a
                  href={creator.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#B8956A] transition-colors"
                >
                  {/* Globe icon */}
                  <svg
                    className="w-4 h-4 flex-shrink-0"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <circle cx="12" cy="12" r="10" />
                    <line x1="2" y1="12" x2="22" y2="12" />
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                  </svg>
                  {websiteDisplay}
                </a>
              )}
            </div>
          )}
        </div>

        {/* Story */}
        {creator.story && (
          <div className="max-w-4xl mx-auto px-6 py-8 md:py-12 border-t border-[#DDD0C0]">
            <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-6 md:mb-10">
              The Story
            </p>
            <div className="grid md:grid-cols-[220px_1fr] gap-6 md:gap-14 items-start">
              {/* Portrait */}
              <div className="relative aspect-[3/4] w-40 sm:w-48 md:w-full rounded-sm overflow-hidden bg-[#DDD0C0]">
                {creator.portrait_url ? (
                  <img
                    src={creator.portrait_url}
                    alt={`${creator.brand_name} founder`}
                    className="object-cover object-top w-full h-full"
                  />
                ) : null}
              </div>
              {/* Story text */}
              <p className="font-display italic font-semibold text-[#1A1A1A] text-xl md:text-2xl leading-loose md:pt-4">
                &ldquo;{creator.story}&rdquo;
              </p>
            </div>
          </div>
        )}

        {/* Collection marquee — only if there are products */}
        {products.length > 0 && (
          <div className="border-t border-[#DDD0C0]">
            <div className="px-6 pt-6 pb-3 md:pt-8 md:pb-4 max-w-4xl mx-auto">
              <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium">
                The Collection
              </p>
            </div>
            <div className="marquee-track overflow-hidden pb-8">
              <div className="animate-marquee flex gap-4 w-max">
                {[...products, ...products].map((product, i) => {
                  const label = product.buy_url ? 'Buy →' : 'DM to order →'
                  const hasDest = !!(product.buy_url || creator.instagram)
                  return (
                    <a
                      key={i}
                      href={`/go/${product.id}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex-shrink-0 w-36 md:w-48"
                    >
                      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#DDD0C0]">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.name}
                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                          />
                        ) : null}
                        {hasDest && (
                          <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="bg-[#F2EBE1] text-[#1A1A1A] text-xs font-medium px-3 py-1.5 rounded-full">
                              {label}
                            </span>
                          </div>
                        )}
                      </div>
                    </a>
                  )
                })}
              </div>
            </div>
          </div>
        )}

      </div> {/* /z-10 content wrapper */}
    </div>
  )
}
