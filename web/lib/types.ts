export type Creator = {
  id: string
  user_id: string
  handle: string
  brand_name: string
  tagline: string | null
  story: string | null
  portrait_url: string | null
  instagram: string | null
  website: string | null
  status: 'pending' | 'active' | 'rejected'
  created_at: string
}

export type Product = {
  id: string
  creator_id: string
  name: string
  image_url: string | null
  buy_url: string | null
  sort_order: number
  is_active: boolean
}

export type CreatorWithProducts = Creator & { products: Product[] }
