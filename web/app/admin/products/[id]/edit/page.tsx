import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { updateProduct } from '@/app/admin/actions'
import { Creator, Product } from '@/lib/types'

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data: productData } = await supabaseAdmin
    .from('products')
    .select('*')
    .eq('id', id)
    .single()

  if (!productData) notFound()

  const { data: creatorsData } = await supabaseAdmin
    .from('creators')
    .select('id, name, handle')
    .order('name')

  const product = productData as Product
  const creators = (creatorsData ?? []) as Pick<Creator, 'id' | 'name' | 'handle'>[]
  const action = updateProduct.bind(null, id)

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit — {product.name}</h1>

      <form action={action} className="space-y-4">
        <input type="hidden" name="existing_photo_url" value={product.photo_url ?? ''} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Creator *</label>
          <select
            name="creator_id"
            required
            defaultValue={product.creator_id}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          >
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
            defaultValue={product.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">URL slug</label>
          <input
            name="slug"
            defaultValue={product.slug}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            name="description"
            rows={3}
            defaultValue={product.description ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Price range</label>
          <input
            name="price_range"
            defaultValue={product.price_range ?? ''}
            placeholder="₹999"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Buy link *</label>
          <input
            name="buy_link"
            type="url"
            defaultValue={product.buy_link ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Product photo</label>
          {product.photo_url && (
            <p className="text-xs text-gray-400 mb-2">Current photo set. Upload to replace.</p>
          )}
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
            defaultChecked={product.is_active}
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
            Save changes
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
