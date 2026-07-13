import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const metadata = {
  title: 'Passio — Indian fashion brands, discovered',
  description:
    'Discover creator-owned Indian fashion brands. Shop directly from the people who make them.',
}

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) =>
            cookieStore.set(name, value, options)
          )
        },
      },
    }
  )
}

type Creator = {
  id: string
  handle: string
  brand_name: string
  tagline: string | null
  portrait_url: string | null
  instagram: string | null
}

export default async function HomePage() {
  const supabase = await getSupabase()
  const { data: creators } = await supabase
    .from('creators')
    .select('id, handle, brand_name, tagline, portrait_url, instagram')
    .eq('status', 'active')
    .order('is_featured', { ascending: false })
    .order('feed_rank', { ascending: true, nullsFirst: false })
    .order('brand_name', { ascending: true })

  const activeCreators: Creator[] = creators ?? []

  return (
    <div className="min-h-screen bg-[#FAFAF8] relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-[#E5DDD5]">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-passio italic text-xl text-[#1A1A1A]">passio</span>
          <a
            href="/join"
            className="text-xs tracking-[0.12em] uppercase text-[#B8956A] hover:text-[#1A1A1A] transition-colors"
          >
            List your brand
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-12 pb-12 md:pt-20 md:pb-16">
        <h1 className="font-display italic text-5xl sm:text-6xl md:text-8xl text-[#1A1A1A] leading-[1.05]">
          Indian fashion, discovered.
        </h1>
        <p className="font-display italic text-[#B8956A] mt-5 text-lg md:text-2xl">
          Find the brands your feed never showed you.
        </p>
      </section>

      {/* Feed */}
      <section className="max-w-4xl mx-auto px-6 pb-16 md:pb-24">
        {/* Section header */}
        <div className="border-t border-[#E5DDD5] pt-5 mb-8 md:mb-10 flex items-center justify-between">
          <span className="text-[0.65rem] tracking-[0.2em] uppercase text-[#A89880] font-medium">
            Brands
          </span>
          {activeCreators.length > 0 && (
            <span className="text-[0.65rem] tracking-[0.12em] uppercase text-[#A89880]">
              {activeCreators.length} listed
            </span>
          )}
        </div>

        {activeCreators.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display italic text-3xl text-[#1A1A1A]">Coming soon.</p>
            <p className="font-display italic text-[#B8956A] mt-3 text-base">
              We&apos;re onboarding our first brands.{' '}
              <a
                href="/demo-brand"
                className="underline underline-offset-4 hover:text-[#1A1A1A] transition-colors"
              >
                See a preview.
              </a>
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12">
            {activeCreators.map((creator) => (
              <a
                key={creator.id}
                href={`/${creator.handle}`}
                className="group block"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-sm bg-[#E5DDD5] aspect-[3/4]">
                  {creator.portrait_url ? (
                    <img
                      src={creator.portrait_url}
                      alt={creator.brand_name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#E5DDD5]" />
                  )}
                </div>

                {/* Card footer */}
                <div className="mt-3 pt-3 border-t border-[#E5DDD5]">
                  <p className="font-display italic text-xl text-[#1A1A1A] leading-tight group-hover:text-[#B8956A] transition-colors">
                    {creator.brand_name}
                  </p>
                  <p className="text-[0.7rem] tracking-[0.1em] uppercase text-[#A89880] mt-1.5">
                    {creator.tagline ??
                      (creator.instagram ? `@${creator.instagram}` : `@${creator.handle}`)}
                  </p>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
