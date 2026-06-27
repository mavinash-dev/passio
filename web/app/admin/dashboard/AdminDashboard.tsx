'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type PendingCreator = {
  id: string
  handle: string
  brand_name: string
  tagline: string | null
  instagram: string | null
  website: string | null
  created_at: string
}

type BrandListItem = {
  id: string
  handle: string
  brand_name: string
  status: 'pending' | 'active' | 'rejected'
  created_at: string
}

type Tab = 'pending' | 'brands' | 'create'

export default function AdminDashboard({ initialPending }: { initialPending: PendingCreator[] }) {
  const router = useRouter()
  const [tab, setTab] = useState<Tab>('pending')
  const [pending, setPending] = useState<PendingCreator[]>(initialPending)
  const [brands, setBrands] = useState<BrandListItem[] | null>(null)
  const [brandsLoading, setBrandsLoading] = useState(false)
  const [actionLoading, setActionLoading] = useState<string | null>(null)
  const [createEmail, setCreateEmail] = useState('')
  const [createStatus, setCreateStatus] = useState<{ ok?: string; error?: string } | null>(null)
  const [creating, setCreating] = useState(false)

  async function handleSignOut() {
    await fetch('/api/admin/auth', { method: 'DELETE' })
    router.push('/admin')
  }

  async function loadBrands() {
    if (brands !== null) return
    setBrandsLoading(true)
    const res = await fetch('/api/admin/brands')
    const data = await res.json()
    setBrands(Array.isArray(data) ? data : [])
    setBrandsLoading(false)
  }

  async function updateStatus(id: string, status: 'active' | 'rejected') {
    setActionLoading(id + status)
    await fetch('/api/admin/creators', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setPending(prev => prev.filter(c => c.id !== id))
    setActionLoading(null)
    // Invalidate brand list cache so it refreshes next time
    setBrands(null)
  }

  async function handleCreateBrand(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setCreateStatus(null)
    const res = await fetch('/api/admin/brands', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: createEmail }),
    })
    const data = await res.json()
    if (res.ok) {
      setCreateStatus({ ok: `Created account for ${data.email}. They can now sign in and onboard.` })
      setCreateEmail('')
      setBrands(null) // bust cache
    } else {
      setCreateStatus({ error: data.error })
    }
    setCreating(false)
  }

  return (
    <div className="min-h-screen bg-[#FAFAF8]">
      {/* Nav */}
      <nav className="sticky top-0 z-40 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-[#E5DDD5]">
        <div className="max-w-3xl mx-auto px-6 h-14 flex items-center justify-between">
          <span className="font-display italic text-xl text-[#1A1A1A]">passio admin</span>
          <button
            onClick={handleSignOut}
            className="text-xs font-sans text-[#A89880] hover:text-[#1A1A1A] transition-colors"
          >
            Sign out
          </button>
        </div>
      </nav>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        {/* Tabs */}
        <div className="flex gap-1 bg-[#F0EDE8] p-1 rounded-xl w-fit">
          {(['pending', 'brands', 'create'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => {
                setTab(t)
                if (t === 'brands') loadBrands()
              }}
              className={`px-4 py-1.5 rounded-lg text-sm font-sans font-medium transition-colors capitalize ${
                tab === t
                  ? 'bg-white text-[#1A1A1A] shadow-sm'
                  : 'text-[#A89880] hover:text-[#1A1A1A]'
              }`}
            >
              {t === 'pending' ? `Pending${pending.length > 0 ? ` (${pending.length})` : ''}` : t === 'create' ? 'Create Brand' : 'All Brands'}
            </button>
          ))}
        </div>

        {/* Pending Tab */}
        {tab === 'pending' && (
          <section className="space-y-4">
            {pending.length === 0 ? (
              <p className="font-sans text-sm text-[#A89880] italic">No pending applications.</p>
            ) : (
              pending.map(c => (
                <div key={c.id} className="bg-white border border-[#E5DDD5] rounded-2xl p-5 space-y-3">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="font-display italic text-lg text-[#1A1A1A]">{c.brand_name}</p>
                      <p className="font-sans text-xs text-[#A89880]">@{c.handle}</p>
                    </div>
                    <span className="text-xs font-sans text-[#A89880] shrink-0">
                      {new Date(c.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short' })}
                    </span>
                  </div>
                  {c.tagline && <p className="font-sans text-sm text-[#6B6B6B]">{c.tagline}</p>}
                  <div className="flex flex-wrap gap-3 text-xs font-sans text-[#A89880]">
                    {c.instagram && (
                      <a href={`https://instagram.com/${c.instagram}`} target="_blank" rel="noopener noreferrer" className="hover:text-[#B8956A] transition-colors">
                        @{c.instagram} ↗
                      </a>
                    )}
                    {c.website && (
                      <a href={c.website} target="_blank" rel="noopener noreferrer" className="hover:text-[#B8956A] transition-colors">
                        {c.website.replace(/^https?:\/\//, '')} ↗
                      </a>
                    )}
                  </div>
                  <div className="flex gap-2 pt-1">
                    <button
                      onClick={() => updateStatus(c.id, 'active')}
                      disabled={actionLoading !== null}
                      className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-xs font-sans font-medium disabled:opacity-40"
                    >
                      {actionLoading === c.id + 'active' ? 'Approving…' : 'Approve'}
                    </button>
                    <button
                      onClick={() => updateStatus(c.id, 'rejected')}
                      disabled={actionLoading !== null}
                      className="px-4 py-2 border border-[#E5DDD5] text-[#6B6B6B] rounded-lg text-xs font-sans font-medium disabled:opacity-40 hover:border-red-300 hover:text-red-600 transition-colors"
                    >
                      {actionLoading === c.id + 'rejected' ? 'Rejecting…' : 'Reject'}
                    </button>
                  </div>
                </div>
              ))
            )}
          </section>
        )}

        {/* All Brands Tab */}
        {tab === 'brands' && (
          <section className="space-y-3">
            {brandsLoading ? (
              <p className="font-sans text-sm text-[#A89880]">Loading…</p>
            ) : brands === null ? null : brands.length === 0 ? (
              <p className="font-sans text-sm text-[#A89880] italic">No brands yet.</p>
            ) : (
              <div className="bg-white border border-[#E5DDD5] rounded-2xl overflow-hidden">
                <table className="w-full text-sm font-sans">
                  <thead>
                    <tr className="border-b border-[#E5DDD5] bg-[#F0EDE8]">
                      <th className="text-left px-4 py-3 text-xs text-[#A89880] font-medium">Brand</th>
                      <th className="text-left px-4 py-3 text-xs text-[#A89880] font-medium">Handle</th>
                      <th className="text-left px-4 py-3 text-xs text-[#A89880] font-medium">Status</th>
                      <th className="text-left px-4 py-3 text-xs text-[#A89880] font-medium">Joined</th>
                    </tr>
                  </thead>
                  <tbody>
                    {brands.map((b, i) => (
                      <tr key={b.id} className={i !== brands.length - 1 ? 'border-b border-[#F0EDE8]' : ''}>
                        <td className="px-4 py-3 text-[#1A1A1A] font-medium">{b.brand_name}</td>
                        <td className="px-4 py-3 text-[#6B6B6B]">@{b.handle}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                            b.status === 'active' ? 'bg-green-100 text-green-700' :
                            b.status === 'rejected' ? 'bg-red-100 text-red-700' :
                            'bg-amber-100 text-amber-700'
                          }`}>
                            {b.status}
                          </span>
                        </td>
                        <td className="px-4 py-3 text-[#A89880] text-xs">
                          {new Date(b.created_at).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </section>
        )}

        {/* Create Brand Tab */}
        {tab === 'create' && (
          <section className="max-w-sm space-y-4">
            <p className="font-sans text-sm text-[#6B6B6B]">
              Creates an auth account for the creator. They sign in and complete onboarding themselves.
            </p>
            <form onSubmit={handleCreateBrand} className="space-y-3">
              <input
                type="email"
                placeholder="creator@email.com"
                value={createEmail}
                onChange={e => setCreateEmail(e.target.value)}
                required
                className="w-full px-4 py-3 rounded-xl border border-[#E5DDD5] bg-white font-sans text-sm focus:outline-none focus:ring-2 focus:ring-[#B8956A]"
              />
              <button
                type="submit"
                disabled={creating}
                className="w-full py-3 bg-[#1A1A1A] text-white rounded-xl font-sans text-sm font-medium disabled:opacity-50"
              >
                {creating ? 'Creating…' : 'Create Account'}
              </button>
            </form>
            {createStatus?.ok && (
              <p className="font-sans text-sm text-green-700 bg-green-50 px-4 py-3 rounded-xl">{createStatus.ok}</p>
            )}
            {createStatus?.error && (
              <p className="font-sans text-sm text-red-700 bg-red-50 px-4 py-3 rounded-xl">{createStatus.error}</p>
            )}
          </section>
        )}
      </main>
    </div>
  )
}
