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
    .order('created_at', { ascending: false })

  const activeCreators: Creator[] = creators ?? []

  return (
    <div className="min-h-screen bg-[#F2EBE1] relative">
      {/* Grain overlay */}
      <div className="grain-overlay" />

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#F2EBE1]/90 backdrop-blur-sm">
        <div className="max-w-4xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-passio italic text-xl text-[#1A1A1A]">passio</span>
          <a
            href="/join"
            className="text-sm text-[#B8956A] hover:text-[#1A1A1A] transition-colors py-2"
          >
            List your brand →
          </a>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-4xl mx-auto px-6 pt-8 pb-8 md:pt-16 md:pb-12">
        <h1 className="font-display italic text-4xl sm:text-5xl md:text-7xl text-[#1A1A1A] leading-tight">
          Indian fashion,
          <br />
          discovered.
        </h1>
        <p className="text-[#6B6B6B] mt-3 text-sm md:text-lg">
          Find the brands your feed never showed you.
        </p>
      </section>

      {/* Feed */}
      <section className="max-w-4xl mx-auto px-6 pb-12 md:pb-20">
        {activeCreators.length === 0 ? (
          <div className="text-center py-20">
            <p className="font-display italic text-2xl text-[#6B4226]">Coming soon.</p>
            <p className="text-sm text-[#6B6B6B] mt-3 max-w-xs mx-auto">
              We&apos;re onboarding our first brands. Meanwhile,{' '}
              <a
                href="/demo-brand"
                className="text-[#B8956A] hover:text-[#1A1A1A] transition-colors underline underline-offset-2"
              >
                see a preview
              </a>
              .
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
            {activeCreators.map((creator) => (
              <a
                key={creator.id}
                href={`/${creator.handle}`}
                className="group block"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-sm bg-[#DDD0C0] aspect-[3/4]">
                  {creator.portrait_url ? (
                    <img
                      src={creator.portrait_url}
                      alt={creator.brand_name}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#DDD0C0]" />
                  )}
                </div>

                {/* Card footer */}
                <div className="mt-3">
                  <p className="font-display italic text-lg text-[#1A1A1A] leading-snug">
                    {creator.brand_name}
                  </p>
                  <p className="text-xs text-[#6B6B6B] mt-1">
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
