import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/lib/types'

export default function ProductCard({ product, handle }: { product: Product; handle: string }) {
  return (
    <Link href={`/${handle}/${product.slug}`} className="block group">
      <div className="bg-[#161616] rounded-2xl overflow-hidden border border-[#2C2C2C] hover:border-[#444] transition-all duration-300 hover:-translate-y-0.5">
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
    </Link>
  )
}
