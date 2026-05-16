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

  const featured = !niche ? creators.slice(0, 3) : []
  const grid = !niche && creators.length > 3 ? creators.slice(3) : creators

  return (
    <main className="min-h-screen bg-[#FAFAF8]">
      <header className="sticky top-0 z-10 bg-[#FAFAF8] border-b border-[#E8E4DF] px-4 py-4">
        <div className="max-w-lg mx-auto">
          <h1 className="font-display text-2xl font-bold italic text-[#1A1A1A]">passio</h1>
        </div>
      </header>

      <div className="max-w-lg mx-auto px-4 pb-16">
        {/* Featured strip */}
        {featured.length > 0 && (
          <section className="mt-6">
            <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-widest mb-4">
              Featured this week
            </p>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
              {featured.map((c) => (
                <div key={c.id} className="flex-shrink-0 w-52">
                  <CreatorCard creator={c} />
                </div>
              ))}
            </div>
          </section>
        )}

        {/* Category pills */}
        <div className="mt-6 flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          <a
            href="/"
            className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium transition-colors ${
              !niche ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0EDE8] text-[#1A1A1A]'
            }`}
          >
            All
          </a>
          {NICHES.map((n) => (
            <a
              key={n}
              href={`/?niche=${n}`}
              className={`flex-shrink-0 px-4 py-1.5 rounded-full text-sm font-medium capitalize transition-colors ${
                niche === n ? 'bg-[#1A1A1A] text-white' : 'bg-[#F0EDE8] text-[#1A1A1A]'
              }`}
            >
              {n}
            </a>
          ))}
        </div>

        {/* Grid */}
        <section className="mt-6">
          <p className="text-xs font-medium text-[#6B6B6B] uppercase tracking-widest mb-4">
            {niche ? `${niche} brands` : 'New on Passio'}
          </p>

          {creators.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-[#6B6B6B] text-sm">No brands listed yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
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
