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

  return (
    <main className="min-h-screen bg-[#0C0C0C]">
      {/* Nav */}
      <header className="sticky top-0 z-20 bg-[#0C0C0C]/90 backdrop-blur-md border-b border-[#2C2C2C] px-4 py-3">
        <div className="max-w-6xl mx-auto flex items-center justify-between gap-4">
          <h1 className="font-display text-2xl font-bold italic text-[#F2EDE4] flex-shrink-0">passio</h1>

          {/* Category pills — desktop inline in nav, mobile below */}
          <div className="hidden md:flex items-center gap-1 overflow-x-auto scrollbar-hide">
            <a href="/" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!niche ? 'bg-[#C9A96E] text-[#0C0C0C]' : 'text-[#787878] hover:text-[#F2EDE4]'}`}>
              All
            </a>
            {NICHES.map((n) => (
              <a key={n} href={`/?niche=${n}`} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${niche === n ? 'bg-[#C9A96E] text-[#0C0C0C]' : 'text-[#787878] hover:text-[#F2EDE4]'}`}>
                {n}
              </a>
            ))}
          </div>
        </div>
      </header>

      {/* Mobile category pills */}
      <div className="md:hidden flex gap-2 overflow-x-auto px-4 py-3 scrollbar-hide border-b border-[#2C2C2C]">
        <a href="/" className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${!niche ? 'bg-[#C9A96E] text-[#0C0C0C]' : 'bg-[#1E1E1E] text-[#787878]'}`}>
          All
        </a>
        {NICHES.map((n) => (
          <a key={n} href={`/?niche=${n}`} className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${niche === n ? 'bg-[#C9A96E] text-[#0C0C0C]' : 'bg-[#1E1E1E] text-[#787878]'}`}>
            {n}
          </a>
        ))}
      </div>

      <div className="max-w-6xl mx-auto px-4 pb-20">

        {/* Featured — horizontal scroll strip */}
        {!niche && creators.length > 0 && (
          <section className="mt-6">
            <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em] mb-3">
              Featured
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {creators.slice(0, 8).map((c) => (
                <div key={c.id} className="flex-shrink-0 w-40 sm:w-48">
                  <CreatorCard creator={c} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* All brands — mixed grid */}
        <section className="mt-8">
          <p className="text-xs font-medium text-[#444] uppercase tracking-[0.2em] mb-4">
            {niche ? `${niche} brands` : 'All brands'}
          </p>
          {creators.length === 0 ? (
            <div className="text-center py-32">
              <p className="text-[#444] text-sm">No brands listed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 md:gap-4">
              {creators.map((c) => (
                <CreatorCard key={c.id} creator={c} />
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  )
}
