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
    <main className="min-h-screen bg-[#FAFAF8]">
      {/* Nav */}
      <nav className="sticky top-0 z-10 bg-[#FAFAF8] border-b border-[#E8E4DF] px-4 py-4">
        <div className="max-w-lg mx-auto flex items-center justify-between">
          <a href="/" className="text-sm text-[#6B6B6B]">← All brands</a>
          <span className="text-sm font-semibold tracking-tight text-[#1A1A1A]">passio</span>
        </div>
      </nav>

      <div className="max-w-lg mx-auto pb-20">
        {/* Hero photo — full width, generous height */}
        <div className="relative w-full aspect-[4/5] bg-[#F0EDE8]">
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
              <span className="font-display text-7xl font-bold text-[#D8D4CF] italic">
                {creator.name[0]}
              </span>
            </div>
          )}

          {/* Niche pill overlaid on photo */}
          {creator.niche && (
            <div className="absolute bottom-4 left-4">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-medium text-[#1A1A1A] capitalize tracking-wide">
                {creator.niche}
              </span>
            </div>
          )}
        </div>

        {/* Brand identity */}
        <div className="px-5 mt-6">
          <h1 className="font-display text-4xl font-bold text-[#1A1A1A] leading-tight tracking-tight">
            {creator.name}
          </h1>

          {creator.instagram_handle && (
            <p className="mt-1 text-sm text-[#6B6B6B]">@{creator.instagram_handle}</p>
          )}
        </div>

        {/* Divider */}
        <div className="mx-5 mt-6 border-t border-[#E8E4DF]" />

        {/* The Story */}
        {creator.bio && (
          <div className="px-5 mt-6">
            <p className="text-xs font-medium text-[#B0ADA8] uppercase tracking-[0.15em] mb-3">
              The Story
            </p>
            <p className="font-display text-lg text-[#1A1A1A] leading-relaxed italic">
              &ldquo;{creator.bio}&rdquo;
            </p>
          </div>
        )}

        {/* Instagram badge */}
        {creator.instagram_handle && creator.instagram_followers != null && (
          <div className="px-5 mt-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#F0EDE8] rounded-full">
              <span className="text-sm">📸</span>
              <span className="text-sm font-medium text-[#1A1A1A]">
                {formatFollowers(creator.instagram_followers)} followers on Instagram
              </span>
            </div>
          </div>
        )}

        {/* Divider */}
        <div className="mx-5 mt-8 border-t border-[#E8E4DF]" />

        {/* The Collection */}
        {products.length > 0 && (
          <div className="px-5 mt-8">
            <p className="text-xs font-medium text-[#B0ADA8] uppercase tracking-[0.15em] mb-1">
              The Collection
            </p>
            <h2 className="font-display text-2xl font-bold text-[#1A1A1A] mb-6">
              {products.length} {products.length === 1 ? 'piece' : 'pieces'}
            </h2>
            <div className="grid grid-cols-2 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} handle={creator.handle} />
              ))}
            </div>
          </div>
        )}

        {/* Footer note */}
        <div className="px-5 mt-12 text-center">
          <p className="text-xs text-[#B0ADA8]">
            Listed on Passio · Creator-owned, India-made
          </p>
        </div>
      </div>
    </main>
  )
}
