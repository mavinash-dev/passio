import Link from 'next/link'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-5xl mx-auto flex items-center gap-6 text-sm">
          <Link href="/admin" className="font-semibold text-gray-900">
            passio admin
          </Link>
          <Link href="/admin/creators/new" className="text-gray-500 hover:text-gray-900">
            + Add creator
          </Link>
          <Link href="/admin/products/new" className="text-gray-500 hover:text-gray-900">
            + Add product
          </Link>
          <Link href="/" className="text-gray-400 hover:text-gray-900 ml-auto">
            View site →
          </Link>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto px-4 py-8">{children}</main>
    </div>
  )
}
