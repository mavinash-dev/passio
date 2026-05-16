import { supabase } from '@/lib/supabase'
import { Creator } from '@/lib/types'
import CreatorCard from '@/components/CreatorCard'

export const revalidate = 3600

const NICHES = ['skincare', 'food', 'fitness', 'fashion', 'lifestyle'] as const

export default async function HomePage({
  searchParams,
}: {
  searchParams: Promise<{ niche?: string }>
}) {
  const { niche } = await searchParams

  let query = supabase
    .from('creators')
    .select('*')
    .eq('is_active', true)
    .order('created_at', { ascending: false })

  if (niche && NICHES.includes(niche as (typeof NICHES)[number])) {
    query = query.eq('niche', niche)
  }

  const { data } = await query
  const creators = (data ?? []) as Creator[]
  const featured = !niche ? creators.slice(0, 1) : []
  const grid = !niche && creators.length > 1 ? creators.slice(1) : creators

  return (
    <main className="min-h-screen bg-[#0C0C0C]">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-[#2C2C2C] px-4 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <h1 className="font-display text-2xl font-bold italic text-[#F2EDE4]">passio</h1>
          <div className="hidden md:flex items-center gap-1">
            <a
              href="/"
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
                !niche
                  ? 'bg-[#C9A96E] text-[#0C0C0C]'
                  : 'text-[#787878] hover:text-[#F2EDE4]'
              }`}
            >
              All
            </a>
            {NICHES.map((n) => (
              <a
                key={n}
                href={`/?niche=${n}`}
                className={`px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                  niche === n
                    ? 'bg-[#C9A96E] text-[#0C0C0C]'
                    : 'text-[#787878] hover:text-[#F2EDE4]'
                }`}
              >
                {n}
              </a>
            ))}
          </div>
        </div>
      </header>

      <div className="max-w-6xl mx-auto px-4 pb-20">
        {/* Featured hero — desktop only prominent */}
        {featured.length > 0 && (
          <section className="mt-8">
            <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em] mb-4">
              Featured
            </p>
            <div className="relative rounded-3xl overflow-hidden bg-[#161616] border border-[#2C2C2C] md:flex md:h-80">
              {featured[0].photo_url && (
                <div className="relative w-full md:w-72 h-48 md:h-full flex-shrink-0 bg-[#1E1E1E]">
                  <a href={`/${featured[0].handle}`}>
                    <div className="relative w-full h-full">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={featured[0].photo_url}
                        alt={featured[0].name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                  </a>
                </div>
              )}
              <div className="p-6 flex flex-col justify-center">
                {featured[0].niche && (
                  <span className="text-xs font-medium text-[#C9A96E] uppercase tracking-widest mb-2 capitalize">
                    {featured[0].niche}
                  </span>
                )}
                <a href={`/${featured[0].handle}`}>
                  <h2 className="font-display text-3xl md:text-4xl font-bold text-[#F2EDE4] leading-tight hover:text-[#C9A96E] transition-colors">
                    {featured[0].name}
                  </h2>
                </a>
                {featured[0].bio && (
                  <p className="mt-3 text-sm text-[#787878] leading-relaxed line-clamp-3 max-w-md">
                    {featured[0].bio}
                  </p>
                )}
                <a
                  href={`/${featured[0].handle}`}
                  className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-[#C9A96E] hover:gap-3 transition-all"
                >
                  View brand →
                </a>
              </div>
            </div>
          </section>
        )}

        {/* Mobile category pills */}
        <div className="mt-6 flex md:hidden gap-2 overflow-x-auto pb-1 -mx-4 px-4 scrollbar-hide">
          <a
            href="/"
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !niche ? 'bg-[#C9A96E] text-[#0C0C0C]' : 'bg-[#1E1E1E] text-[#787878]'
            }`}
          >
            All
          </a>
          {NICHES.map((n) => (
            <a
              key={n}
              href={`/?niche=${n}`}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                niche === n ? 'bg-[#C9A96E] text-[#0C0C0C]' : 'bg-[#1E1E1E] text-[#787878]'
              }`}
            >
              {n}
            </a>
          ))}
        </div>

        {/* Grid */}
        <section className="mt-8">
          <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em] mb-5">
            {niche ? `${niche} brands` : 'All brands'}
          </p>

          {creators.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-[#444] text-sm">No brands listed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
              {grid.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
