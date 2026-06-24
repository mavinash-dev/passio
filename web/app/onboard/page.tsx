'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { createBrowserClient } from '@supabase/ssr'
import { isDemoModeClient } from '@/lib/demo-mode-client'

// ─── Supabase ────────────────────────────────────────────────────────────────

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface FormData {
  brandName: string
  handle: string
  tagline: string
  instagram: string
  website: string
  story: string
  portraitUrl: string
}

interface Product {
  name: string
  buyUrl: string
  imageUrl: string
}

// ─── Input component ─────────────────────────────────────────────────────────

function Field({
  label,
  children,
  hint,
}: {
  label: string
  children: React.ReactNode
  hint?: string
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-xs uppercase tracking-widest text-[#6B6B6B] font-sans">
        {label}
      </label>
      {children}
      {hint && (
        <p className="text-xs text-[#A89880] font-sans mt-0.5">{hint}</p>
      )}
    </div>
  )
}

const inputClass =
  'w-full bg-transparent border-b border-[#DDD0C0] py-2 text-[#1A1A1A] placeholder:text-[#A89880] focus:outline-none focus:border-[#B8956A] transition-colors font-sans text-base'

// ─── Progress bar ─────────────────────────────────────────────────────────────

function Progress({ step }: { step: 1 | 2 | 3 }) {
  return (
    <div className="flex items-center gap-3">
      {[1, 2, 3].map((s) => (
        <div
          key={s}
          className={`h-px flex-1 transition-colors duration-500 ${
            s <= step ? 'bg-[#B8956A]' : 'bg-[#DDD0C0]'
          }`}
        />
      ))}
      <span className="text-xs text-[#6B6B6B] font-sans whitespace-nowrap">
        {step} / 3
      </span>
    </div>
  )
}

// ─── Step 1 — Brand basics ────────────────────────────────────────────────────

function StepOne({
  formData,
  onChange,
  handleTaken,
  onHandleBlur,
  onNext,
  demo,
}: {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  handleTaken: boolean
  onHandleBlur: () => void
  onNext: () => void
  demo: boolean
}) {
  const canProceed =
    demo ||
    (formData.brandName.trim().length > 0 &&
      formData.handle.trim().length > 0 &&
      !handleTaken)

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display italic text-3xl text-[#1A1A1A] leading-tight">
          Tell us about your brand.
        </h1>
        <p className="mt-2 text-sm text-[#6B6B6B] font-sans">
          This is what buyers will see on your page.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Field label="Brand name *">
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Bramarambaa"
            value={formData.brandName}
            onChange={(e) => onChange('brandName', e.target.value)}
            autoFocus
          />
        </Field>

        <Field
          label="Handle *"
          hint={
            handleTaken
              ? '✗ This handle is already taken.'
              : formData.handle
              ? `Your page will be at passio.in/${formData.handle.toLowerCase().trim()}`
              : 'Choose a unique handle — this is your URL.'
          }
        >
          <div className="relative">
            <span className="absolute left-0 top-2 text-[#A89880] font-sans text-base pointer-events-none select-none">
              passio.in/
            </span>
            <input
              type="text"
              className={`${inputClass} pl-[5.5rem] ${
                handleTaken ? 'border-red-400 focus:border-red-400' : ''
              }`}
              placeholder="yourbrand"
              value={formData.handle}
              onChange={(e) =>
                onChange(
                  'handle',
                  e.target.value.toLowerCase().replace(/[^a-z0-9_-]/g, '')
                )
              }
              onBlur={onHandleBlur}
            />
          </div>
          {handleTaken && (
            <p className="text-xs text-red-500 font-sans mt-0.5">
              This handle is taken. Try another.
            </p>
          )}
        </Field>

        <Field label="Tagline" hint="One line that captures your brand. Optional.">
          <input
            type="text"
            className={inputClass}
            placeholder="e.g. Where tradition meets today"
            value={formData.tagline}
            onChange={(e) => onChange('tagline', e.target.value)}
            maxLength={100}
          />
        </Field>

        <Field label="Instagram" hint="Optional — just your handle, no @.">
          <div className="relative">
            <span className="absolute left-0 top-2 text-[#A89880] font-sans text-base pointer-events-none select-none">
              @
            </span>
            <input
              type="text"
              className={`${inputClass} pl-5`}
              placeholder="yourbrand"
              value={formData.instagram}
              onChange={(e) => onChange('instagram', e.target.value.replace('@', ''))}
            />
          </div>
        </Field>

        <Field label="Website" hint="Optional — your existing shop or site.">
          <input
            type="url"
            className={inputClass}
            placeholder="https://yourbrand.com"
            value={formData.website}
            onChange={(e) => onChange('website', e.target.value)}
          />
        </Field>
      </div>

      <div className="flex justify-end pt-4">
        <button
          onClick={onNext}
          disabled={!canProceed}
          className="flex items-center gap-2 text-sm font-sans text-[#B8956A] disabled:text-[#DDD0C0] transition-colors hover:text-[#1A1A1A] disabled:cursor-not-allowed"
        >
          Next
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  )
}

// ─── Step 2 — Story ───────────────────────────────────────────────────────────

function StepTwo({
  formData,
  onChange,
  onPortraitUpload,
  uploading,
  onBack,
  onNext,
  demo,
}: {
  formData: FormData
  onChange: (field: keyof FormData, value: string) => void
  onPortraitUpload: (file: File) => Promise<void>
  uploading: boolean
  onBack: () => void
  onNext: () => void
  demo: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  const canProceed = demo || formData.story.trim().length > 0

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display italic text-3xl text-[#1A1A1A] leading-tight">
          Share your story.
        </h1>
        <p className="mt-2 text-sm text-[#6B6B6B] font-sans">
          Why did you start this brand? What makes it yours?
        </p>
      </div>

      <div className="flex flex-col gap-6">
        <Field label="Your story *">
          <textarea
            className={`${inputClass} resize-none min-h-[140px] leading-relaxed`}
            placeholder="Bramarambaa was born from a love of handwoven textiles and the desire to make them part of everyday wear…"
            value={formData.story}
            onChange={(e) => onChange('story', e.target.value)}
            autoFocus
          />
        </Field>

        <Field
          label="Portrait photo"
          hint="A photo of you or your workspace. Optional — adds a personal touch."
        >
          <div className="flex items-start gap-4 pt-1">
            {formData.portraitUrl ? (
              <div className="relative w-20 h-20 rounded-sm overflow-hidden flex-shrink-0 border border-[#DDD0C0]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={formData.portraitUrl}
                  alt="Portrait"
                  className="w-full h-full object-cover"
                />
              </div>
            ) : (
              <div className="w-20 h-20 rounded-sm bg-[#EDE4D8] border border-dashed border-[#DDD0C0] flex-shrink-0" />
            )}

            <div className="flex flex-col gap-2 pt-1">
              <button
                onClick={() => fileRef.current?.click()}
                disabled={uploading}
                className="text-sm font-sans text-[#B8956A] hover:text-[#1A1A1A] transition-colors disabled:text-[#A89880]"
              >
                {uploading
                  ? 'Uploading…'
                  : formData.portraitUrl
                  ? 'Change photo'
                  : 'Upload photo'}
              </button>
              {formData.portraitUrl && (
                <button
                  onClick={() => onChange('portraitUrl', '')}
                  className="text-xs font-sans text-[#6B6B6B] hover:text-red-500 transition-colors text-left"
                >
                  Remove
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0]
                  if (file) onPortraitUpload(file)
                  e.target.value = ''
                }}
              />
            </div>
          </div>
        </Field>
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-sm font-sans text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors"
        >
          <span className="text-base">←</span>
          Back
        </button>
        <button
          onClick={onNext}
          disabled={!canProceed || uploading}
          className="flex items-center gap-2 text-sm font-sans text-[#B8956A] disabled:text-[#DDD0C0] transition-colors hover:text-[#1A1A1A] disabled:cursor-not-allowed"
        >
          Next
          <span className="text-base">→</span>
        </button>
      </div>
    </div>
  )
}

// ─── Step 3 — Products ────────────────────────────────────────────────────────

function ProductCard({
  product,
  index,
  onUpdate,
  onRemove,
  onImageUpload,
  uploading,
}: {
  product: Product
  index: number
  onUpdate: (field: keyof Product, value: string) => void
  onRemove: () => void
  onImageUpload: (file: File) => Promise<void>
  uploading: boolean
}) {
  const fileRef = useRef<HTMLInputElement>(null)

  return (
    <div className="bg-[#EDE4D8] rounded-sm p-4 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <span className="text-xs uppercase tracking-widest text-[#6B6B6B] font-sans pt-0.5">
          Product {index + 1}
        </span>
        <button
          onClick={onRemove}
          className="text-xs text-[#6B6B6B] hover:text-red-500 transition-colors font-sans"
        >
          Remove
        </button>
      </div>

      <div className="flex gap-4">
        {/* Image thumbnail / upload */}
        <div className="flex-shrink-0">
          <button
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="w-16 h-16 rounded-sm overflow-hidden border border-dashed border-[#DDD0C0] bg-[#F2EBE1] flex items-center justify-center hover:border-[#B8956A] transition-colors"
            title="Upload product image"
          >
            {product.imageUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={product.imageUrl}
                alt={product.name || 'Product'}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-[#A89880] text-lg">
                {uploading ? '…' : '+'}
              </span>
            )}
          </button>
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) onImageUpload(file)
              e.target.value = ''
            }}
          />
        </div>

        {/* Name + URL */}
        <div className="flex flex-col gap-3 flex-1 min-w-0">
          <input
            type="text"
            className={inputClass}
            placeholder="Product name *"
            value={product.name}
            onChange={(e) => onUpdate('name', e.target.value)}
          />
          <input
            type="text"
            className={inputClass}
            placeholder="Buy link or leave blank (orders via DM)"
            value={product.buyUrl}
            onChange={(e) => onUpdate('buyUrl', e.target.value)}
          />
        </div>
      </div>
    </div>
  )
}

function StepThree({
  products,
  onAddProduct,
  onUpdateProduct,
  onRemoveProduct,
  onProductImageUpload,
  uploadingIndex,
  onBack,
  onSubmit,
  submitting,
  demo,
}: {
  products: Product[]
  onAddProduct: () => void
  onUpdateProduct: (index: number, field: keyof Product, value: string) => void
  onRemoveProduct: (index: number) => void
  onProductImageUpload: (index: number, file: File) => Promise<void>
  uploadingIndex: number | null
  onBack: () => void
  onSubmit: () => void
  submitting: boolean
  demo: boolean
}) {
  const filledProducts = products.filter((p) => p.name.trim())
  const canSubmit = (demo || filledProducts.length > 0) && !submitting

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display italic text-3xl text-[#1A1A1A] leading-tight">
          Add your products.
        </h1>
        <p className="mt-2 text-sm text-[#6B6B6B] font-sans">
          Up to 6 products. Buy link is optional — leave blank if you take orders via DM.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {products.map((product, i) => (
          <ProductCard
            key={i}
            product={product}
            index={i}
            onUpdate={(field, value) => onUpdateProduct(i, field, value)}
            onRemove={() => onRemoveProduct(i)}
            onImageUpload={(file) => onProductImageUpload(i, file)}
            uploading={uploadingIndex === i}
          />
        ))}

        {products.length < 6 && (
          <button
            onClick={onAddProduct}
            className="border border-dashed border-[#DDD0C0] rounded-sm py-3 text-sm text-[#A89880] font-sans hover:border-[#B8956A] hover:text-[#B8956A] transition-colors"
          >
            + Add product
          </button>
        )}
      </div>

      <div className="flex items-center justify-between pt-4">
        <button
          onClick={onBack}
          disabled={submitting}
          className="flex items-center gap-2 text-sm font-sans text-[#6B6B6B] hover:text-[#1A1A1A] transition-colors disabled:opacity-40"
        >
          <span className="text-base">←</span>
          Back
        </button>
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="flex items-center gap-2 text-sm font-sans text-[#B8956A] disabled:text-[#DDD0C0] transition-colors hover:text-[#1A1A1A] disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting…' : 'Submit'}
          {!submitting && <span className="text-base">→</span>}
        </button>
      </div>
    </div>
  )
}

// ─── Success screen ───────────────────────────────────────────────────────────

function SuccessScreen({ onDashboard }: { onDashboard: () => void }) {
  return (
    <div className="flex flex-col items-center justify-center text-center gap-6 py-12">
      <div className="w-12 h-12 rounded-full bg-[#EDE4D8] border border-[#DDD0C0] flex items-center justify-center">
        <span className="text-[#B8956A] text-xl">✓</span>
      </div>
      <div className="flex flex-col gap-2">
        <h1 className="font-display italic text-3xl text-[#1A1A1A]">
          You&apos;re in.
        </h1>
        <p className="text-sm text-[#6B6B6B] font-sans max-w-xs mx-auto leading-relaxed">
          Your page is being reviewed. We&apos;ll notify you once it&apos;s live — usually within 24 hours.
        </p>
      </div>
      <button
        onClick={onDashboard}
        className="mt-4 text-sm font-sans text-[#B8956A] hover:text-[#1A1A1A] transition-colors underline underline-offset-4"
      >
        Go to your dashboard →
      </button>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function OnboardPage() {
  const router = useRouter()

  const [step, setStep] = useState<1 | 2 | 3>(1)
  const [done, setDone] = useState(false)

  const [formData, setFormData] = useState<FormData>({
    brandName: '',
    handle: '',
    tagline: '',
    instagram: '',
    website: '',
    story: '',
    portraitUrl: '',
  })

  const [products, setProducts] = useState<Product[]>([
    { name: '', buyUrl: '', imageUrl: '' },
  ])

  const [handleTaken, setHandleTaken] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [uploadingIndex, setUploadingIndex] = useState<number | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [isDemo, setIsDemo] = useState(false)
  useEffect(() => { setIsDemo(isDemoModeClient()) }, [])

  // ── Form field update ─────────────────────────────────────────────────────

  const handleChange = useCallback((field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (field === 'handle') setHandleTaken(false)
  }, [])

  // ── Handle availability check ─────────────────────────────────────────────

  const checkHandle = useCallback(async () => {
    const handle = formData.handle.toLowerCase().trim()
    if (!handle) return
    const supabase = getSupabase()
    const { data } = await supabase
      .from('creators')
      .select('handle')
      .eq('handle', handle)
      .single()
    setHandleTaken(!!data)
  }, [formData.handle])

  // ── Portrait upload ───────────────────────────────────────────────────────

  const uploadPortrait = useCallback(async (file: File) => {
    setUploading(true)
    try {
      const supabase = getSupabase()
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('creator-photos')
        .upload(path, file)
      if (!uploadError) {
        const { data } = supabase.storage
          .from('creator-photos')
          .getPublicUrl(path)
        setFormData((prev) => ({ ...prev, portraitUrl: data.publicUrl }))
      } else {
        setError('Portrait upload failed. Please try again.')
      }
    } finally {
      setUploading(false)
    }
  }, [])

  // ── Product helpers ───────────────────────────────────────────────────────

  const addProduct = useCallback(() => {
    setProducts((prev) =>
      prev.length < 6 ? [...prev, { name: '', buyUrl: '', imageUrl: '' }] : prev
    )
  }, [])

  const updateProduct = useCallback(
    (index: number, field: keyof Product, value: string) => {
      setProducts((prev) =>
        prev.map((p, i) => (i === index ? { ...p, [field]: value } : p))
      )
    },
    []
  )

  const removeProduct = useCallback((index: number) => {
    setProducts((prev) => prev.filter((_, i) => i !== index))
  }, [])

  const uploadProductImage = useCallback(async (index: number, file: File) => {
    setUploadingIndex(index)
    try {
      const supabase = getSupabase()
      const ext = file.name.split('.').pop()
      const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
      const { error: uploadError } = await supabase.storage
        .from('product-photos')
        .upload(path, file)
      if (!uploadError) {
        const { data } = supabase.storage
          .from('product-photos')
          .getPublicUrl(path)
        setProducts((prev) =>
          prev.map((p, i) =>
            i === index ? { ...p, imageUrl: data.publicUrl } : p
          )
        )
      } else {
        setError('Image upload failed. Please try again.')
      }
    } finally {
      setUploadingIndex(null)
    }
  }, [])

  // ── Submit ────────────────────────────────────────────────────────────────

  const handleSubmit = useCallback(async () => {
    setSubmitting(true)
    setError(null)
    try {
      // Demo mode — skip all DB writes, go straight to success screen
      if (isDemoModeClient()) {
        setDone(true)
        return
      }

      const supabase = getSupabase()
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        setError('You must be signed in to submit.')
        return
      }

      // Insert creator record
      const { data: creator, error: creatorError } = await supabase
        .from('creators')
        .insert({
          user_id: user.id,
          handle: formData.handle.toLowerCase().trim(),
          brand_name: formData.brandName,
          tagline: formData.tagline || null,
          instagram: formData.instagram || null,
          website: formData.website || null,
          story: formData.story || null,
          portrait_url: formData.portraitUrl || null,
          status: 'pending',
        })
        .select()
        .single()

      if (creatorError) {
        setError(
          creatorError.message.includes('duplicate')
            ? 'That handle is already taken. Go back and choose another.'
            : 'Something went wrong. Please try again.'
        )
        return
      }

      // Insert products (only those with a name)
      const validProducts = products.filter((p) => p.name.trim())
      if (creator && validProducts.length > 0) {
        await supabase.from('products').insert(
          validProducts.map((p, i) => ({
            creator_id: creator.id,
            name: p.name,
            buy_url: p.buyUrl.trim() || null,
            image_url: p.imageUrl || null,
            sort_order: i,
            is_active: true,
          }))
        )
      }

      setDone(true)
    } finally {
      setSubmitting(false)
    }
  }, [formData, products])

  // ── Navigation guards ─────────────────────────────────────────────────────

  const goNext = useCallback(() => {
    setStep((s) => (s < 3 ? ((s + 1) as 1 | 2 | 3) : s))
  }, [])

  const goBack = useCallback(() => {
    setStep((s) => (s > 1 ? ((s - 1) as 1 | 2 | 3) : s))
  }, [])

  // ── Render ────────────────────────────────────────────────────────────────

  return (
    <div className="min-h-screen bg-[#F2EBE1] flex flex-col">
      {/* Grain overlay */}
      <div className="grain-overlay" aria-hidden="true" />

      {/* Top bar */}
      <header className="relative z-10 px-4 sm:px-6 pt-6 pb-0 flex items-center justify-between">
        <span className="font-passio italic text-2xl text-[#1A1A1A] tracking-tight">
          passio
        </span>
        {!done && (
          <span className="text-xs text-[#6B6B6B] font-sans uppercase tracking-widest">
            Creator setup
          </span>
        )}
      </header>

      {/* Content */}
      <main className="relative z-10 flex-1 flex flex-col items-center justify-center px-4 sm:px-6 py-8 md:py-12">
        <div className="w-full max-w-md">
          {done ? (
            <SuccessScreen onDashboard={() => router.push('/dashboard')} />
          ) : (
            <div className="flex flex-col gap-6">
              <Progress step={step} />

              <div className="pt-2">
                {step === 1 && (
                  <StepOne
                    formData={formData}
                    onChange={handleChange}
                    handleTaken={handleTaken}
                    onHandleBlur={checkHandle}
                    onNext={goNext}
                    demo={isDemo}
                  />
                )}
                {step === 2 && (
                  <StepTwo
                    formData={formData}
                    onChange={handleChange}
                    onPortraitUpload={uploadPortrait}
                    uploading={uploading}
                    onBack={goBack}
                    onNext={goNext}
                    demo={isDemo}
                  />
                )}
                {step === 3 && (
                  <StepThree
                    products={products}
                    onAddProduct={addProduct}
                    onUpdateProduct={updateProduct}
                    onRemoveProduct={removeProduct}
                    onProductImageUpload={uploadProductImage}
                    uploadingIndex={uploadingIndex}
                    onBack={goBack}
                    onSubmit={handleSubmit}
                    submitting={submitting}
                    demo={isDemo}
                  />
                )}
              </div>

              {error && (
                <p className="text-xs text-red-500 font-sans text-center -mt-2">
                  {error}
                </p>
              )}
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
