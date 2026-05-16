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
    <main className="min-h-screen bg-[#FAFAF8]">
      <nav className="sticky top-0 z-10 bg-[#FAFAF8] border-b border-[#E8E4DF] px-4 py-4">
        <div className="max-w-lg mx-auto">
          <a href={`/${creator.handle}`} className="text-sm text-[#6B6B6B]">
            ← {creator.name}
          </a>
        </div>
      </nav>

      <div className="max-w-lg mx-auto pb-16">
        {/* Product photo */}
        <div className="relative w-full aspect-square bg-[#F0EDE8]">
          {product.photo_url ? (
            <Image src={product.photo_url} alt={product.name} fill className="object-contain" priority />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-6xl">👗</span>
            </div>
          )}
        </div>

        <div className="px-5 mt-6">
          {/* Product name — serif, editorial */}
          <h1 className="font-display text-3xl font-bold text-[#1A1A1A] leading-tight">
            {product.name}
          </h1>

          {product.price_range && (
            <p className="mt-2 text-xl font-semibold text-[#1A1A1A]">{product.price_range}</p>
          )}

          {/* Description — editorial tone */}
          {product.description && (
            <div className="mt-5">
              <p className="text-xs font-medium text-[#B0ADA8] uppercase tracking-[0.15em] mb-2">
                About this piece
              </p>
              <p className="text-sm text-[#1A1A1A] leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* CTA — only shown when a buy link exists */}
          {product.buy_link ? (
            <div className="mt-8">
              <a
                href={`/go/${product.id}`}
                className="block w-full py-4 bg-[#1A1A1A] text-white text-center font-semibold rounded-xl hover:bg-[#333] transition-colors tracking-wide"
              >
                Where to buy →
              </a>
              <p className="text-center text-xs text-[#B0ADA8] mt-2">
                You&apos;ll be taken to {creator.name}&apos;s store
              </p>
            </div>
          ) : (
            <div className="mt-8 px-4 py-4 bg-[#F0EDE8] rounded-xl text-center">
              <p className="text-sm text-[#6B6B6B]">
                Reach out to{' '}
                {creator.instagram_handle ? (
                  <a
                    href={`https://instagram.com/${creator.instagram_handle}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-medium text-[#1A1A1A] underline"
                  >
                    @{creator.instagram_handle}
                  </a>
                ) : (
                  <span className="font-medium text-[#1A1A1A]">{creator.name}</span>
                )}{' '}
                on Instagram to order.
              </p>
            </div>
          )}

          {/* Creator card */}
          <div className="mt-10 pt-6 border-t border-[#E8E4DF]">
            <p className="text-xs font-medium text-[#B0ADA8] uppercase tracking-[0.15em] mb-4">
              The brand
            </p>
            <Link href={`/${creator.handle}`} className="flex items-center gap-4 group">
              <div className="relative w-14 h-14 bg-[#F0EDE8] rounded-full overflow-hidden flex-shrink-0">
                {creator.photo_url ? (
                  <Image src={creator.photo_url} alt={creator.name} fill className="object-contain" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center">
                    <span className="font-display font-bold text-[#B0ADA8]">{creator.name[0]}</span>
                  </div>
                )}
              </div>
              <div>
                <p className="font-display font-bold text-[#1A1A1A] text-lg leading-tight">
                  {creator.name}
                </p>
                {creator.niche && (
                  <p className="text-xs text-[#6B6B6B] capitalize mt-0.5">{creator.niche}</p>
                )}
                <p className="text-xs text-[#6B6B6B] mt-1 group-hover:underline">
                  View the full collection →
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
