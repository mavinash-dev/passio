import { notFound } from 'next/navigation'
import Image from 'next/image'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Creator, Product } from '@/lib/types'
import ProductCard from '@/components/ProductCard'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string }>
}): Promise<Metadata> {
  const { handle } = await params
  const { data } = await supabase
    .from('creators')
    .select('name, bio, photo_url')
    .eq('handle', handle)
    .eq('is_active', true)
    .single()

  if (!data) return {}
  return {
    title: `${data.name} — on Passio`,
    description: data.bio?.slice(0, 155) ?? undefined,
    openGraph: { images: data.photo_url ? [data.photo_url] : [] },
  }
}

function formatFollowers(n: number | null): string {
  if (!n) return ''
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return n.toString()
}

export default async function CreatorPage({
  params,
}: {
  params: Promise<{ handle: string }>
}) {
  const { handle } = await params

  const { data: creatorData } = await supabase
    .from('creators')
    .select('*')
    .eq('handle', handle)
    .eq('is_active', true)
    .single()

  if (!creatorData) notFound()

  const { data: productsData } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', creatorData.id)
    .eq('is_active', true)
    .order('created_at', { ascending: true })

  const creator = creatorData as Creator
  const products = (productsData ?? []) as Product[]

  return (
    <main className="min-h-screen bg-[#0C0C0C]">
      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-[#2C2C2C] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a href="/" className="text-sm text-[#787878] hover:text-[#F2EDE4] transition-colors">
            ← Back
          </a>
          <span className="font-display text-lg font-bold italic text-[#F2EDE4]">passio</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Desktop: two-column layout */}
        <div className="lg:grid lg:grid-cols-[380px_1fr] lg:gap-12 lg:mt-10">

          {/* Left — photo (sticky on desktop) */}
          <div className="lg:sticky lg:top-24 lg:self-start">
            <div className="relative w-full aspect-[3/4] bg-[#161616] rounded-3xl overflow-hidden border border-[#2C2C2C] mt-6 lg:mt-0">
              {creator.photo_url ? (
                <Image
                  src={creator.photo_url}
                  alt={creator.name}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="font-display text-8xl font-bold text-[#2C2C2C] italic">
                    {creator.name[0]}
                  </span>
                </div>
              )}

              {creator.niche && (
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-[#0C0C0C]/80 backdrop-blur-sm rounded-full text-xs font-medium text-[#C9A96E] capitalize tracking-wide border border-[#2C2C2C]">
                    {creator.niche}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Right — details */}
          <div className="mt-6 lg:mt-0 lg:pt-0">
            <h1 className="font-display text-4xl md:text-5xl font-bold text-[#F2EDE4] leading-tight">
              {creator.name}
            </h1>

            {creator.instagram_handle && (
              <p className="mt-2 text-sm text-[#787878]">@{creator.instagram_handle}</p>
            )}

            <div className="mt-6 pt-6 border-t border-[#2C2C2C]">
              <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em] mb-3">
                The Story
              </p>
              {creator.bio ? (
                <p className="font-display text-lg text-[#F2EDE4] leading-relaxed italic">
                  &ldquo;{creator.bio}&rdquo;
                </p>
              ) : (
                <p className="text-sm text-[#787878]">No bio yet.</p>
              )}
            </div>

            {creator.instagram_handle && creator.instagram_followers != null && (
              <div className="mt-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#1E1E1E] rounded-full border border-[#2C2C2C]">
                  <span className="text-sm">📸</span>
                  <span className="text-sm text-[#F2EDE4] font-medium">
                    {formatFollowers(creator.instagram_followers)}
                    <span className="text-[#787878] font-normal"> followers</span>
                  </span>
                </div>
              </div>
            )}

            {/* Products */}
            {products.length > 0 && (
              <div className="mt-8 pt-8 border-t border-[#2C2C2C]">
                <div className="flex items-baseline gap-3 mb-5">
                  <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em]">
                    The Collection
                  </p>
                  <span className="text-xs text-[#444]">{products.length} pieces</span>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} handle={creator.handle} />
                  ))}
                </div>
              </div>
            )}

            <div className="mt-10 pt-6 border-t border-[#2C2C2C]">
              <p className="text-xs text-[#444]">Listed on Passio · Creator-owned, India-made</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
