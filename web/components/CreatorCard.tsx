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
      <div className="relative aspect-square w-full bg-[#F0EDE8] rounded-xl overflow-hidden mb-2">
        {creator.photo_url ? (
          <Image
            src={creator.photo_url}
            alt={creator.name}
            fill
            className="object-contain group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-3xl font-semibold text-[#B0ADA8]">{creator.name[0]}</span>
          </div>
        )}
      </div>
      <p className="font-display font-bold text-[#1A1A1A] text-base leading-tight">{creator.name}</p>
      {creator.niche && (
        <p className="text-xs text-[#6B6B6B] capitalize mt-0.5">{creator.niche}</p>
      )}
      {creator.instagram_followers != null && (
        <p className="text-xs text-[#B0ADA8] mt-0.5">
          {formatFollowers(creator.instagram_followers)} on Instagram
        </p>
      )}
    </Link>
  )
}
