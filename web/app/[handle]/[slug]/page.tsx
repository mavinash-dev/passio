import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import type { Metadata } from 'next'
import { supabase } from '@/lib/supabase'
import { Creator, Product } from '@/lib/types'

export const revalidate = 3600

export async function generateMetadata({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>
}): Promise<Metadata> {
  const { handle, slug } = await params

  const { data: creator } = await supabase
    .from('creators')
    .select('id, name')
    .eq('handle', handle)
    .single()

  if (!creator) return {}

  const { data: product } = await supabase
    .from('products')
    .select('name, description, price_range, photo_url')
    .eq('creator_id', creator.id)
    .eq('slug', slug)
    .single()

  if (!product) return {}

  return {
    title: `${product.name} by ${creator.name}`,
    description: `${product.description?.slice(0, 130) ?? product.name}${product.price_range ? ` — ${product.price_range}` : ''}`,
    openGraph: { images: product.photo_url ? [product.photo_url] : [] },
  }
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ handle: string; slug: string }>
}) {
  const { handle, slug } = await params

  const { data: creatorData } = await supabase
    .from('creators')
    .select('*')
    .eq('handle', handle)
    .eq('is_active', true)
    .single()

  if (!creatorData) notFound()

  const { data: productData } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', creatorData.id)
    .eq('slug', slug)
    .eq('is_active', true)
    .single()

  if (!productData) notFound()

  const creator = creatorData as Creator
  const product = productData as Product

  return (
    <main className="min-h-screen bg-[#0C0C0C]">
      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-[#2C2C2C] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <a
            href={`/${creator.handle}`}
            className="text-sm text-[#787878] hover:text-[#F2EDE4] transition-colors"
          >
            ← {creator.name}
          </a>
          <span className="font-display text-lg font-bold italic text-[#F2EDE4]">passio</span>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Desktop: two-column */}
        <div className="lg:grid lg:grid-cols-2 lg:gap-12 lg:mt-10 lg:items-start">

          {/* Photo */}
          <div className="mt-6 lg:mt-0 lg:sticky lg:top-24">
            <div className="relative w-full aspect-[3/4] bg-[#161616] rounded-3xl overflow-hidden border border-[#2C2C2C]">
              {product.photo_url ? (
                <Image
                  src={product.photo_url}
                  alt={product.name}
                  fill
                  className="object-contain"
                  priority
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl opacity-10">◻</span>
                </div>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="mt-6 lg:mt-0 lg:py-2">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-[#F2EDE4] leading-tight">
              {product.name}
            </h1>

            {product.price_range && (
              <p className="mt-3 text-3xl font-bold text-[#C9A96E]">{product.price_range}</p>
            )}

            {product.description && (
              <div className="mt-6 pt-6 border-t border-[#2C2C2C]">
                <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em] mb-3">
                  About this piece
                </p>
                <p className="text-[#F2EDE4] text-sm leading-relaxed">{product.description}</p>
              </div>
            )}

            {/* CTA */}
            <div className="mt-8">
              {product.buy_link ? (
                <>
                  <a
                    href={`/go/${product.id}`}
                    className="block w-full py-4 bg-[#C9A96E] text-[#0C0C0C] text-center font-bold rounded-2xl hover:bg-[#d4b87a] transition-colors tracking-wide"
                  >
                    Where to buy →
                  </a>
                  <p className="text-center text-xs text-[#444] mt-2">
                    You&apos;ll be taken to {creator.name}&apos;s store
                  </p>
                </>
              ) : (
                <div className="w-full py-4 bg-[#1E1E1E] rounded-2xl border border-[#2C2C2C] text-center">
                  <p className="text-sm text-[#787878]">
                    Order via{' '}
                    {creator.instagram_handle ? (
                      <a
                        href={`https://instagram.com/${creator.instagram_handle}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[#C9A96E] hover:underline font-medium"
                      >
                        @{creator.instagram_handle}
                      </a>
                    ) : (
                      <span className="text-[#F2EDE4]">{creator.name}</span>
                    )}{' '}
                    on Instagram
                  </p>
                </div>
              )}
            </div>

            {/* Creator card */}
            <div className="mt-8 pt-8 border-t border-[#2C2C2C]">
              <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em] mb-4">
                The brand
              </p>
              <Link href={`/${creator.handle}`} className="flex items-center gap-4 group">
                <div className="relative w-14 h-14 bg-[#1E1E1E] rounded-2xl overflow-hidden flex-shrink-0 border border-[#2C2C2C]">
                  {creator.photo_url ? (
                    <Image
                      src={creator.photo_url}
                      alt={creator.name}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="font-display font-bold text-[#444]">{creator.name[0]}</span>
                    </div>
                  )}
                </div>
                <div>
                  <p className="font-display font-bold text-[#F2EDE4] text-lg leading-tight">
                    {creator.name}
                  </p>
                  {creator.niche && (
                    <p className="text-xs text-[#787878] capitalize mt-0.5">{creator.niche}</p>
                  )}
                  <p className="text-xs text-[#C9A96E] mt-1 group-hover:underline">
                    View full collection →
                  </p>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
