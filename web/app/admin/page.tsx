import Link from 'next/link'
import { supabaseAdmin } from '@/lib/supabase'
import { Creator } from '@/lib/types'

export default async function AdminPage() {
  const { data: creators } = await supabaseAdmin
    .from('creators')
    .select('*')
    .order('created_at', { ascending: false })

  const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString()
  const { data: logs } = await supabaseAdmin
    .from('redirect_logs')
    .select('creator_id')
    .gte('timestamp', thirtyDaysAgo)

  const clicksMap: Record<string, number> = {}
  for (const log of logs ?? []) {
    if (log.creator_id) {
      clicksMap[log.creator_id] = (clicksMap[log.creator_id] ?? 0) + 1
    }
  }

  const allCreators = (creators ?? []) as Creator[]

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-xl font-semibold text-gray-900">
          Creator Brands
          <span className="ml-2 text-sm font-normal text-gray-400">({allCreators.length})</span>
        </h1>
        <Link
          href="/admin/creators/new"
          className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          + Add creator
        </Link>
      </div>

      {allCreators.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="mb-3">No creators yet.</p>
          <Link href="/admin/creators/new" className="text-gray-900 underline text-sm">
            Add your first creator →
          </Link>
        </div>
      ) : (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Brand</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Handle</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Niche</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Clicks (30d)</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500">Status</th>
                <th className="px-4 py-3 text-left font-medium text-gray-500"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {allCreators.map((creator) => (
                <tr key={creator.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 font-medium text-gray-900">{creator.name}</td>
                  <td className="px-4 py-3 text-gray-400 font-mono text-xs">/{creator.handle}</td>
                  <td className="px-4 py-3 text-gray-500 capitalize">{creator.niche ?? '—'}</td>
                  <td className="px-4 py-3 font-semibold text-gray-900">
                    {clicksMap[creator.id] ?? 0}
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`inline-flex px-2 py-0.5 rounded-full text-xs font-medium ${
                        creator.is_active
                          ? 'bg-green-50 text-green-700'
                          : 'bg-gray-100 text-gray-500'
                      }`}
                    >
                      {creator.is_active ? 'Active' : 'Hidden'}
                    </span>
                  </td>
                  <td className="px-4 py-3 flex gap-3">
                    <Link
                      href={`/admin/creators/${creator.id}/edit`}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      Edit
                    </Link>
                    <Link
                      href={`/admin/products/new?creator_id=${creator.id}`}
                      className="text-gray-500 hover:text-gray-900"
                    >
                      + Product
                    </Link>
                    <Link
                      href={`/${creator.handle}`}
                      className="text-gray-400 hover:text-gray-900"
                      target="_blank"
                    >
                      View ↗
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
