import { redirect } from 'next/navigation'
import Link from 'next/link'
import { createServerSupabaseClient } from '@/lib/supabase-server'
import { supabaseAdmin } from '@/lib/supabase'
import { isDemoMode } from '@/lib/demo-mode'
import type { Creator, Product } from '@/lib/types'
import { SignOutButton, EditBasics, EditStory, EditProducts } from './edit-basics'

const DEV_CREATOR: Creator = {
  id: 'dev-mock',
  user_id: 'dev-mock',
  handle: 'demo-brand',
  brand_name: 'Bramarambaa',
  tagline: 'Where tradition meets today',
  story: 'Bramarambaa was born from a love of handwoven Indian textiles and the desire to make them part of everyday wear.',
  portrait_url: 'https://bramarambaa.com/cdn/shop/files/IMG_4788.jpg',
  instagram: 'bramarambaa',
  website: 'https://bramarambaa.com',
  status: 'active',
  created_at: new Date().toISOString(),
}

const DEV_PRODUCTS: Product[] = [
  { id: 'p1', creator_id: 'dev-mock', name: 'Blue Petal Flare', image_url: 'https://bramarambaa.com/cdn/shop/files/05BDAC90-412A-4DD2-A5D4-27392CACF57B.jpg', buy_url: 'https://bramarambaa.com', sort_order: 0, is_active: true },
  { id: 'p2', creator_id: 'dev-mock', name: 'Gingham Saree', image_url: 'https://bramarambaa.com/cdn/shop/files/93A24B84-63BB-4195-B8AE-9419397E6E3A.png', buy_url: null, sort_order: 1, is_active: true },
  { id: 'p3', creator_id: 'dev-mock', name: 'Sunflora', image_url: 'https://bramarambaa.com/cdn/shop/files/16D0A42E-D0DE-44FA-9E35-1B3734C7B5A7.jpg', buy_url: 'https://bramarambaa.com', sort_order: 2, is_active: true },
]

// ---- Status badge config ----
const statusConfig: Record<
  Creator['status'],
  { label: string; className: string }
> = {
  pending:  { label: 'Pending review', className: 'bg-amber-100 text-amber-800' },
  active:   { label: 'Live',           className: 'bg-green-100 text-green-800' },
  rejected: { label: 'Not approved',   className: 'bg-red-100 text-red-800' },
}

export default async function DashboardPage() {
  const supabase = await createServerSupabaseClient()

  // Demo mode or local dev — show Bramarambaa mock, no DB involved
  if (await isDemoMode() || process.env.NODE_ENV === 'development') {
    return <DashboardView creator={DEV_CREATOR} productList={DEV_PRODUCTS} clickCounts={{}} totalClicks={0} />
  }

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/join')

  // 2. Load creator row
  const { data: creator } = await supabase
    .from('creators')
    .select('*')
    .eq('user_id', user.id)
    .single<Creator>()

  if (!creator) redirect('/onboard')

  // 3. Load products
  const { data: products } = await supabase
    .from('products')
    .select('*')
    .eq('creator_id', creator.id)
    .order('sort_order', { ascending: true })

  const productList: Product[] = products ?? []

  // 4. Load click counts per product
  const { data: clickData } = await supabaseAdmin
    .from('click_events')
    .select('product_id')
    .eq('creator_id', creator.id)

  const clickCounts: Record<string, number> = {}
  clickData?.forEach(({ product_id }) => {
    if (product_id) clickCounts[product_id] = (clickCounts[product_id] ?? 0) + 1
  })
  const totalClicks = Object.values(clickCounts).reduce((a, b) => a + b, 0)

  return <DashboardView creator={creator} productList={productList} clickCounts={clickCounts} totalClicks={totalClicks} />
}

function DashboardView({ creator, productList, clickCounts, totalClicks }: {
  creator: Creator
  productList: Product[]
  clickCounts: Record<string, number>
  totalClicks: number
}) {
  const status = statusConfig[creator.status]

  return (
    <div className="min-h-screen bg-[#F2EBE1]">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#F2EBE1]/90 backdrop-blur-sm border-b border-[#DDD0C0]">
        <div className="max-w-2xl mx-auto px-6 h-14 flex items-center justify-between">
          <Link href="/" className="font-passio italic text-xl text-[#1A1A1A] hover:opacity-70 transition-opacity">
            passio
          </Link>
          <SignOutButton />
        </div>
      </nav>

      {/* Main content */}
      <main className="max-w-2xl mx-auto px-6 py-10 space-y-8">

        {/* Brand name + status */}
        <div className="space-y-3">
          <h1 className="font-display italic text-4xl text-[#1A1A1A] leading-tight">
            {creator.brand_name}
          </h1>
          <div className="flex items-center gap-3 flex-wrap">
            <span
              className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-sans font-medium ${status.className}`}
            >
              {status.label}
            </span>
            {creator.status === 'active' && (
              <Link
                href={`/${creator.handle}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-sans text-[#B8956A] hover:text-[#1A1A1A] transition-colors underline underline-offset-2"
              >
                View live page →
              </Link>
            )}
          </div>
          {totalClicks > 0 && (
            <p className="text-sm font-sans text-[#6B6B6B]">
              {totalClicks} product tap{totalClicks !== 1 ? 's' : ''} total
            </p>
          )}
          {creator.status === 'pending' && (
            <p className="text-sm font-sans text-[#6B6B6B]">
              Your page is under review. We&apos;ll notify you once it&apos;s approved.
            </p>
          )}
          {creator.status === 'rejected' && (
            <p className="text-sm font-sans text-[#6B6B6B]">
              Your application wasn&apos;t approved this time.{' '}
              <a
                href="mailto:hello@passio.in"
                className="text-[#B8956A] hover:text-[#1A1A1A] transition-colors underline underline-offset-2"
              >
                Contact us
              </a>{' '}
              to learn more.
            </p>
          )}
        </div>

        {/* Divider */}
        <hr className="border-[#DDD0C0]" />

        {/* Section: Brand Basics */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display italic text-xl text-[#1A1A1A]">Brand basics</h2>
            <EditBasics creator={creator} />
          </div>

          <div className="bg-[#EDE4D8] rounded-2xl p-5 space-y-3">
            <Row label="Brand name" value={creator.brand_name} />
            <Row label="Tagline" value={creator.tagline} />
            <Row
              label="Instagram"
              value={creator.instagram ? `@${creator.instagram}` : null}
              href={creator.instagram ? `https://instagram.com/${creator.instagram}` : undefined}
            />
            <Row
              label="Website"
              value={creator.website}
              href={creator.website ?? undefined}
            />
          </div>
        </section>

        {/* Divider */}
        <hr className="border-[#DDD0C0]" />

        {/* Section: Story */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display italic text-xl text-[#1A1A1A]">Story</h2>
            <EditStory story={creator.story} />
          </div>

          <div className="bg-[#EDE4D8] rounded-2xl p-5 space-y-4">
            {creator.portrait_url && (
              <div className="w-20 h-20 rounded-full overflow-hidden border border-[#DDD0C0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={creator.portrait_url}
                  alt={`${creator.brand_name} portrait`}
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {creator.story ? (
              <p className="font-sans text-sm text-[#1A1A1A] leading-relaxed whitespace-pre-wrap">
                {creator.story}
              </p>
            ) : (
              <p className="font-sans text-sm text-[#A89880] italic">
                No story added yet. Click Edit to tell buyers about your brand.
              </p>
            )}
          </div>
        </section>

        {/* Divider */}
        <hr className="border-[#DDD0C0]" />

        {/* Section: Products */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="font-display italic text-xl text-[#1A1A1A]">Products</h2>
            <span className="text-xs font-sans text-[#A89880]">{productList.length} listed</span>
          </div>

          <EditProducts products={productList} instagram={creator.instagram} clickCounts={clickCounts} totalClicks={totalClicks} />
        </section>

        {/* Bottom spacer */}
        <div className="pb-10" />
      </main>
    </div>
  )
}

// ---- Sub-components ----

function Row({
  label,
  value,
  href,
}: {
  label: string
  value: string | null | undefined
  href?: string
}) {
  return (
    <div className="flex items-start gap-3">
      <span className="text-xs font-sans font-medium text-[#A89880] uppercase tracking-wider w-24 shrink-0 pt-0.5">
        {label}
      </span>
      {value ? (
        href ? (
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm font-sans text-[#B8956A] hover:text-[#1A1A1A] transition-colors underline underline-offset-2 break-all"
          >
            {value}
          </a>
        ) : (
          <span className="text-sm font-sans text-[#1A1A1A] break-words">{value}</span>
        )
      ) : (
        <span className="text-sm font-sans text-[#A89880] italic">Not set</span>
      )}
    </div>
  )
}

