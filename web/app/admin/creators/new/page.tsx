import { createCreator } from '@/app/admin/actions'

export default function NewCreatorPage() {
  return (
    <div className="max-w-xl">
      <h1 className="text-xl font-semibold text-gray-900 mb-6">Add creator</h1>

      <form action={createCreator} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Brand name *</label>
          <input
            name="name"
            required
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Handle (URL slug) *</label>
          <div className="flex items-center">
            <span className="px-3 py-2 bg-gray-100 border border-r-0 border-gray-300 rounded-l-lg text-sm text-gray-400">
              passio.in/
            </span>
            <input
              name="handle"
              required
              placeholder="surawe"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-r-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
          <textarea
            name="bio"
            rows={3}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Niche</label>
          <select
            name="niche"
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
              placeholder="surawe.in"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Followers</label>
            <input
              name="instagram_followers"
              type="number"
              placeholder="82000"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:border-gray-900"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Profile photo</label>
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
            Save creator
          </button>
          <a
            href="/admin"
            className="px-6 py-2 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Cancel
          </a>
        </div>
      </form>
    </div>
  )
}
