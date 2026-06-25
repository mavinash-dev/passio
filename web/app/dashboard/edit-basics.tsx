'use client'

import { useState, useTransition, useRef } from 'react'
import { createBrowserClient } from '@supabase/ssr'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}
import { updateCreatorBasics, updateCreatorStory, updateProduct } from './actions'
import type { Creator, Product } from '@/lib/types'

// ---- Shared input styles ----
const inputClass =
  'w-full px-3 py-2 rounded-lg text-sm font-sans bg-[#FAFAF8] border border-[#E5DDD5] text-[#1A1A1A] placeholder:text-[#A89880] focus:outline-none focus:border-[#B8956A] transition-colors'

const labelClass = 'block text-xs font-sans font-medium text-[#6B6B6B] uppercase tracking-wider mb-1'

// ---- Sign-out button ----
import { useRouter } from 'next/navigation'

export function SignOutButton() {
  const router = useRouter()

  async function handleSignOut() {
    const supabase = createBrowserClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
    await supabase.auth.signOut()
    router.push('/join')
  }

  return (
    <button
      onClick={handleSignOut}
      className="text-sm font-sans text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
    >
      Sign out
    </button>
  )
}

// ---- Edit Products ----

function EditableProductCard({ product, instagram, clickCount }: { product: Product; instagram: string | null; clickCount: number }) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(product.image_url)
  const [uploadedUrl, setUploadedUrl] = useState<string | null>(product.image_url)
  const [uploading, setUploading] = useState(false)
  const fileRef = useRef<HTMLInputElement>(null)

  async function handleImageChange(file: File) {
    setUploading(true)
    setError(null)
    try {
      const supabase = getSupabase()
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage.from('product-photos').upload(path, file)
      if (uploadError) { setError('Image upload failed.'); return }
      const { data } = supabase.storage.from('product-photos').getPublicUrl(path)
      setPreviewUrl(data.publicUrl)
      setUploadedUrl(data.publicUrl)
    } finally {
      setUploading(false)
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    formData.set('image_url', uploadedUrl ?? '')
    startTransition(async () => {
      const result = await updateProduct(product.id, formData)
      if (result?.error) setError(result.error)
      else setOpen(false)
    })
  }

  function handleClose() {
    setOpen(false)
    setError(null)
    setPreviewUrl(product.image_url)
    setUploadedUrl(product.image_url)
  }

  return (
    <div className="bg-[#F0EDE8] rounded-xl overflow-hidden border border-[#E5DDD5]">
      {/* Image area — clickable to upload when in edit mode */}
      <div
        className={`relative aspect-square bg-[#E5DDD5] ${open ? 'cursor-pointer group' : ''}`}
        onClick={() => open && fileRef.current?.click()}
      >
        {previewUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={previewUrl} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-[#A89880] text-xs font-sans">{uploading ? 'Uploading…' : 'No image'}</span>
          </div>
        )}
        {open && (
          <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-xs font-sans font-medium">
              {uploading ? 'Uploading…' : 'Change photo'}
            </span>
          </div>
        )}
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageChange(f); e.target.value = '' }}
        />
      </div>

      <div className="px-3 py-2">
        {open ? (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2 py-1">
            <input
              name="name"
              type="text"
              required
              defaultValue={product.name}
              className="w-full bg-transparent border-b border-[#E5DDD5] text-xs font-sans text-[#1A1A1A] py-1 focus:outline-none focus:border-[#B8956A] transition-colors"
              placeholder="Product name"
            />
            <input
              name="buy_url"
              type="text"
              defaultValue={product.buy_url ?? ''}
              className="w-full bg-transparent border-b border-[#E5DDD5] text-xs font-sans text-[#1A1A1A] py-1 focus:outline-none focus:border-[#B8956A] transition-colors"
              placeholder="Buy link (optional)"
            />
            {error && <p className="text-xs text-red-600 font-sans">{error}</p>}
            <div className="flex gap-3 pt-1">
              <button type="submit" disabled={isPending || uploading} className="text-xs font-sans text-[#B8956A] hover:text-[#1A1A1A] transition-colors disabled:opacity-50">
                {isPending ? 'Saving…' : 'Save'}
              </button>
              <button type="button" onClick={handleClose} className="text-xs font-sans text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors">
                Cancel
              </button>
            </div>
          </form>
        ) : (
          <div className="flex items-start justify-between gap-1">
            <div className="min-w-0">
              <p className="text-xs font-sans font-medium text-[#1A1A1A] line-clamp-1">{product.name}</p>
              {clickCount > 0 && (
                <p className="text-xs font-sans text-[#B8956A] mt-0.5">{clickCount} taps</p>
              )}
              {product.buy_url ? (
                <p className="text-xs font-sans text-[#A89880] truncate mt-0.5">{product.buy_url.replace('https://', '')}</p>
              ) : instagram ? (
                <a
                  href={`https://ig.me/m/${instagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-sans text-[#B8956A] hover:text-[#1A1A1A] transition-colors mt-0.5 block"
                >
                  DM to order →
                </a>
              ) : (
                <p className="text-xs font-sans text-[#A89880] italic mt-0.5">No buy link</p>
              )}
            </div>
            <button onClick={() => setOpen(true)} className="text-xs font-sans text-[#A89880] hover:text-[#B8956A] transition-colors shrink-0 pt-0.5">
              Edit
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export function EditProducts({ products, instagram, clickCounts, totalClicks: _totalClicks }: { products: Product[]; instagram: string | null; clickCounts: Record<string, number>; totalClicks: number }) {
  if (products.length === 0) {
    return (
      <div className="bg-[#F0EDE8] rounded-2xl p-5">
        <p className="font-sans text-sm text-[#A89880] italic">No products added yet.</p>
      </div>
    )
  }
  return (
    <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3">
      {products.map((product) => (
        <EditableProductCard key={product.id} product={product} instagram={instagram} clickCount={clickCounts[product.id] ?? 0} />
      ))}
    </div>
  )
}

// ---- Edit Brand Basics ----
type EditBasicsProps = {
  creator: Pick<Creator, 'brand_name' | 'tagline' | 'instagram' | 'website'>
}

export function EditBasics({ creator }: EditBasicsProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateCreatorBasics(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setOpen(false)
      }
    })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-sans font-medium text-[#B8956A] hover:text-[#1A1A1A] transition-colors border border-[#E5DDD5] px-3 py-1.5 rounded-full"
      >
        Edit
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="brand_name" className={labelClass}>Brand name</label>
        <input
          id="brand_name"
          name="brand_name"
          type="text"
          required
          defaultValue={creator.brand_name}
          className={inputClass}
          placeholder="Your brand name"
        />
      </div>

      <div>
        <label htmlFor="tagline" className={labelClass}>Tagline</label>
        <input
          id="tagline"
          name="tagline"
          type="text"
          defaultValue={creator.tagline ?? ''}
          className={inputClass}
          placeholder="A short line that captures your brand"
        />
      </div>

      <div>
        <label htmlFor="instagram" className={labelClass}>Instagram handle</label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-[#A89880]">@</span>
          <input
            id="instagram"
            name="instagram"
            type="text"
            defaultValue={creator.instagram ?? ''}
            className={`${inputClass} pl-7`}
            placeholder="yourhandle"
          />
        </div>
      </div>

      <div>
        <label htmlFor="website" className={labelClass}>Website URL</label>
        <input
          id="website"
          name="website"
          type="url"
          defaultValue={creator.website ?? ''}
          className={inputClass}
          placeholder="https://yourbrand.com"
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 font-sans">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-full text-sm font-sans font-medium bg-[#1A1A1A] text-[#FAFAF8] hover:opacity-80 disabled:opacity-50 transition-opacity"
        >
          {isPending ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setError(null) }}
          className="px-4 py-2 rounded-full text-sm font-sans font-medium text-[#6B6B6B] hover:text-[#1A1A1A] border border-[#E5DDD5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}

// ---- Edit Story ----
type EditStoryProps = {
  story: Creator['story']
}

export function EditStory({ story }: EditStoryProps) {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [error, setError] = useState<string | null>(null)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    const formData = new FormData(e.currentTarget)
    startTransition(async () => {
      const result = await updateCreatorStory(formData)
      if (result?.error) {
        setError(result.error)
      } else {
        setOpen(false)
      }
    })
  }

  if (!open) {
    return (
      <button
        onClick={() => setOpen(true)}
        className="text-xs font-sans font-medium text-[#B8956A] hover:text-[#1A1A1A] transition-colors border border-[#E5DDD5] px-3 py-1.5 rounded-full"
      >
        Edit
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="mt-4 space-y-4">
      <div>
        <label htmlFor="story" className={labelClass}>Your story</label>
        <textarea
          id="story"
          name="story"
          rows={6}
          defaultValue={story ?? ''}
          className={`${inputClass} resize-none`}
          placeholder="Tell buyers about your brand — how it started, what drives you, what makes it yours."
        />
      </div>

      {error && (
        <p className="text-xs text-red-600 font-sans">{error}</p>
      )}

      <div className="flex items-center gap-3 pt-1">
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 rounded-full text-sm font-sans font-medium bg-[#1A1A1A] text-[#FAFAF8] hover:opacity-80 disabled:opacity-50 transition-opacity"
        >
          {isPending ? 'Saving…' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => { setOpen(false); setError(null) }}
          className="px-4 py-2 rounded-full text-sm font-sans font-medium text-[#6B6B6B] hover:text-[#1A1A1A] border border-[#E5DDD5] transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  )
}
