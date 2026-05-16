import { notFound } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'
import { updateCreator } from '@/app/admin/actions'
import { Creator } from '@/lib/types'

export default async function EditCreatorPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params

  const { data } = await supabaseAdmin.from('creators').select('*').eq('id', id).single()
  if (!data) notFound()

  const creator = data as Creator
  const action = updateCreator.bind(null, id)

  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Edit — {creator.name}</h1>

      <form action={action} className="space-y-4">
        <input type="hidden" name="existing_photo_url" value={creator.photo_url ?? ''} />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand name *</label>
          <input
            name="name"
            required
            defaultValue={creator.name}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Handle *</label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-400">
              passio.in/
            </span>
            <input
              name="handle"
              required
              defaultValue={creator.handle}
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            rows={3}
            defaultValue={creator.bio ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
          <select
            name="niche"
            defaultValue={creator.niche ?? ''}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          >
            <option value="">Select niche</option>
            <option value="skincare">Skincare</option>
            <option value="food">Food</option>
            <option value="fitness">Fitness</option>
            <option value="fashion">Fashion</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Instagram handle</label>
            <input
              name="instagram_handle"
              defaultValue={creator.instagram_handle ?? ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
            <input
              name="instagram_followers"
              type="number"
              defaultValue={creator.instagram_followers ?? ''}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile photo</label>
          {creator.photo_url && (
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
            defaultChecked={creator.is_active}
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
