export type Niche = 'skincare' | 'food' | 'fitness' | 'fashion' | 'lifestyle'

export type Creator = {
  id: string
  handle: string
  name: string
  bio: string | null
  photo_url: string | null
  niche: Niche | null
  instagram_handle: string | null
  instagram_followers: number | null
  is_active: boolean
  created_at: string
  updated_at: string
}

export type Product = {
  id: string
  creator_id: string
  slug: string
  name: string
  description: string | null
  price_range: string | null
  photo_url: string | null
  buy_link: string | null
  is_active: boolean
  created_at: string
  updated_at: string
}
