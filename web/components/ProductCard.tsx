import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'

export default function ProductCard({
  product,
  handle,
}: {
  product: Product
  handle: string
}) {
  return (
    <Link href={`/${handle}/${product.slug}`} className="block group">
      <div className="relative aspect-square w-full bg-[#F0EDE8] rounded-xl overflow-hidden mb-2">
        {product.photo_url ? (
          <Image
            src={product.photo_url}
            alt={product.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl">👗</span>
          </div>
        )}
      </div>
      <p className="font-medium text-[#1A1A1A] text-sm leading-tight line-clamp-2">{product.name}</p>
      {product.price_range && (
        <p className="text-sm font-semibold text-[#1A1A1A] mt-0.5">{product.price_range}</p>
      )}
    </Link>
  )
}
