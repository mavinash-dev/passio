import Link from 'next/link'
import Image from 'next/image'
import { Creator } from '@/lib/types'

function formatFollowers(n: number | null): string {
  if (!n) return ''
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`
  if (n >= 1_000) return `${Math.round(n / 1_000)}K`
  return n.toString()
}

export default function CreatorCard({ creator }: { creator: Creator }) {
  return (
    <Link href={`/${creator.handle}`} className="block group">
      <div className="bg-[#161616] rounded-2xl overflow-hidden border border-[#2C2C2C] hover:border-[#444] transition-all duration-300 hover:-translate-y-0.5">
        {/* Image */}
        <div className="relative aspect-[3/4] w-full bg-[#1E1E1E]">
          {creator.photo_url ? (
            <Image
              src={creator.photo_url}
              alt={creator.name}
              fill
              className="object-contain"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <span className="font-display text-4xl font-bold text-[#444] italic">
                {creator.name[0]}
              </span>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="p-3">
          <p className="font-display font-bold text-[#F2EDE4] text-base leading-tight">
            {creator.name}
          </p>
          <div className="flex items-center justify-between mt-1">
            {creator.niche && (
              <span className="text-xs text-[#787878] capitalize">{creator.niche}</span>
            )}
            {creator.instagram_followers != null && (
              <span className="text-xs text-[#787878]">
                {formatFollowers(creator.instagram_followers)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  )
}
