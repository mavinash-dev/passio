import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'

export default async function AdminLoginPage({
  searchParams,
}: {
  searchParams: Promise<{ from?: string; error?: string }>
}) {
  const { from, error } = await searchParams

  async function login(formData: FormData) {
    'use server'
    const password = formData.get('password') as string
    const secret = process.env.ADMIN_SECRET

    if (password && secret && password === secret) {
      const jar = await cookies()
      jar.set('admin_session', secret, {
        httpOnly: true,
        sameSite: 'strict',
        maxAge: 60 * 60 * 24 * 7,
        path: '/',
      })
      redirect(from ?? '/admin')
    }

    redirect(`/admin/login?error=1${from ? `&from=${encodeURIComponent(from)}` : ''}`)
  }

  return (
    <main className="min-h-screen bg-[#FAFAF8] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <h1 className="text-2xl font-bold text-[#1A1A1A] mb-2">passio admin</h1>
        <p className="text-sm text-[#6B6B6B] mb-8">Enter your admin password to continue.</p>

        {error && (
          <p className="mb-4 text-sm text-red-600 bg-red-50 px-3 py-2 rounded-lg">
            Wrong password. Try again.
          </p>
        )}

        <form action={login} className="space-y-3">
          <input
            type="password"
            name="password"
            placeholder="Password"
            autoFocus
            className="w-full px-4 py-3 border border-[#E8E4DF] rounded-xl bg-white text-[#1A1A1A] placeholder-[#B0ADA8] focus:outline-none focus:border-[#1A1A1A]"
          />
          <button
            type="submit"
            className="w-full py-3 bg-[#1A1A1A] text-white font-medium rounded-xl hover:bg-[#333] transition-colors"
          >
            Sign in
          </button>
        </form>
      </div>
    </main>
  )
}
