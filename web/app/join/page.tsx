'use client'

import { useState } from 'react'
import { createBrowserClient } from '@supabase/ssr'

function getSupabase() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  )
}

export default function JoinPage() {
  const [email, setEmail] = useState('')
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setLoading(true)
    setError(null)
    const supabase = getSupabase()
    const { error } = await supabase.auth.signInWithOtp({
      email: email.trim(),
      options: {
        emailRedirectTo: `${window.location.origin}/auth/callback`,
      },
    })
    setLoading(false)
    if (error) {
      setError('Something went wrong. Please try again.')
    } else {
      setSent(true)
    }
  }

  return (
    <main
      className="min-h-screen flex flex-col items-center justify-center px-6"
      style={{ backgroundColor: '#FAFAF8' }}
    >
      <div className="flex flex-col items-center gap-8 w-full max-w-sm">
        <span className="font-passio italic text-2xl" style={{ color: '#1A1A1A' }}>
          passio
        </span>

        {sent ? (
          <div className="text-center flex flex-col gap-3">
            <p className="font-display italic text-xl" style={{ color: '#1A1A1A' }}>
              Check your inbox
            </p>
            <p className="font-sans text-sm" style={{ color: '#6B6B6B' }}>
              We sent a sign-in link to <strong>{email}</strong>.<br />
              Click it to continue.
            </p>
          </div>
        ) : (
          <>
            <p className="font-sans text-sm text-center" style={{ color: '#6B6B6B' }}>
              A home for Indian fashion brands.
            </p>

            <form onSubmit={handleSubmit} className="w-full flex flex-col gap-4">
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="your@email.com"
                required
                className="w-full bg-transparent border-b py-2 font-sans text-sm focus:outline-none transition-colors"
                style={{
                  borderColor: '#E5DDD5',
                  color: '#1A1A1A',
                }}
                onFocus={e => (e.target.style.borderColor = '#B8956A')}
                onBlur={e => (e.target.style.borderColor = '#E5DDD5')}
              />
              {error && (
                <p className="text-xs" style={{ color: '#B8956A' }}>{error}</p>
              )}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-full font-sans text-sm font-medium transition-opacity hover:opacity-80 disabled:opacity-50"
                style={{ backgroundColor: '#1A1A1A', color: '#FAFAF8' }}
              >
                {loading ? 'Sending…' : 'Continue with email'}
              </button>
            </form>

            <p className="font-sans text-xs text-center" style={{ color: '#6B6B6B' }}>
              For creators only. Buyers can browse without signing in.
            </p>
          </>
        )}
      </div>
    </main>
  )
}
