'use server'

import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'
import { revalidatePath } from 'next/cache'
import { isDemoMode } from '@/lib/demo-mode'

async function getSupabase() {
  const cookieStore = await cookies()
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() { return cookieStore.getAll() },
        setAll(c) {
          c.forEach(({ name, value, options }) => cookieStore.set(name, value, options))
        },
      },
    }
  )
}

export async function updateCreatorBasics(formData: FormData) {
  if (await isDemoMode()) return { success: true }
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('creators')
    .update({
      brand_name: (formData.get('brand_name') as string).trim(),
      tagline: (formData.get('tagline') as string)?.trim() || null,
      instagram: (formData.get('instagram') as string)?.trim() || null,
      website: (formData.get('website') as string)?.trim() || null,
    })
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateProduct(productId: string, formData: FormData) {
  if (await isDemoMode()) return { success: true }
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { data: creator } = await supabase
    .from('creators')
    .select('id')
    .eq('user_id', user.id)
    .single()
  if (!creator) return { error: 'Creator not found' }

  const { error } = await supabase
    .from('products')
    .update({
      name: (formData.get('name') as string).trim(),
      buy_url: (formData.get('buy_url') as string)?.trim() || null,
      image_url: (formData.get('image_url') as string)?.trim() || null,
    })
    .eq('id', productId)
    .eq('creator_id', creator.id)

  if (error) return { error: error.message }
  revalidatePath('/dashboard')
  return { success: true }
}

export async function updateCreatorStory(formData: FormData) {
  if (await isDemoMode()) return { success: true }
  const supabase = await getSupabase()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return { error: 'Not authenticated' }

  const { error } = await supabase
    .from('creators')
    .update({
      story: (formData.get('story') as string)?.trim() || null,
    })
    .eq('user_id', user.id)

  if (error) return { error: error.message }

  revalidatePath('/dashboard')
  return { success: true }
}
