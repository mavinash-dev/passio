import Image from 'next/image'
import { Product } from '@/lib/types'

export default function ProductCard({
  product,
  creatorInstagram,
}: {
  product: Product
  creatorInstagram?: string | null
}) {
  const href = product.buy_link
    ? `/go/${product.id}`
    : creatorInstagram
    ? `https://instagram.com/${creatorInstagram}`
    : '#'

  const isExternal = !product.buy_link && creatorInstagram

  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="block group"
    >
      <div className="bg-[#161616] rounded-2xl overflow-hidden border border-[#2C2C2C] hover:border-[#C9A96E] transition-all duration-200 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full bg-[#1E1E1E]">
          {product.photo_url ? (
            <Image
              src={product.photo_url}
              alt={product.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="text-4xl opacity-20">◻</span>
            </div>
          )}

          {/* Buy overlay on hover */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-end justify-center pb-3 opacity-0 group-hover:opacity-100">
            <span className="px-4 py-1.5 bg-[#C9A96E] text-[#0C0C0C] text-xs font-bold rounded-full">
              {product.buy_link ? 'Buy now' : 'Contact to order'}
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="font-medium text-[#F2EDE4] text-sm leading-tight line-clamp-2">
            {product.name}
          </p>
          {product.price_range && (
            <p className="text-sm font-semibold text-[#C9A96E] mt-1">{product.price_range}</p>
          )}
        </div>
      </div>
    </a>
  )
}
