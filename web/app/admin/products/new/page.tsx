import { supabaseAdmin } from '@/lib/supabase'
import { Creator } from '@/lib/types'
import { createProduct } from '@/app/admin/actions'

export default async function NewProductPage({
  searchParams,
}: {
  searchParams: Promise<{ creator_id?: string }>
}) {
  const { creator_id } = await searchParams

  const { data } = await supabaseAdmin
    .from('creators')
    .select('id, name, handle')
    .eq('is_active', true)
    .order('name')

  const creators = (data ?? []) as Pick<Creator, 'id' | 'name' | 'handle'>[]

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Add product</h1>

      <form action={createProduct} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Creator *</label>
          <select
            name="creator_id"
            required
            defaultValue={creator_id ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          >
            <option value="">Select creator</option>
            {creators.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.handle})
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product name *</label>
          <input
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL slug</label>
          <input
            name="slug"
            placeholder="auto-generated from name if left empty"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm text-gray-500 focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price range</label>
          <input
            name="price_range"
            placeholder="₹999"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buy link *</label>
          <input
            name="buy_link"
            type="url"
            placeholder="https://wa.me/917013403450 (optional)"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product photo</label>
          <input
            name="photo"
            type="file"
            accept="image/*"
            className="w-full text-sm text-gray-600 file:mr-3 file:py-1.5 file:px-3 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-gray-100 file:text-gray-700"
          />
        </div>

        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            name="is_active"
            value="true"
            id="is_active"
            defaultChecked
            className="rounded"
          />
          <label htmlFor="is_active" className="text-sm text-gray-700">
            Active (visible on site)
          </label>
        </div>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
          >
            Save product
          </button>
          <a
            href="/admin"
            className="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
