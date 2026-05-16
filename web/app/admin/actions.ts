'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { supabaseAdmin } from '@/lib/supabase'

function toSlug(str: string): string {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()
}

async function uploadPhoto(file: File | null, bucket: string): Promise<string | null> {
  if (!file || file.size === 0) return null
  const ext = file.name.split('.').pop() ?? 'jpg'
  const path = `${Date.now()}.${ext}`
  const { data, error } = await supabaseAdmin.storage
    .from(bucket)
    .upload(path, file, { contentType: file.type, upsert: false })
  if (error) throw error
  const { data: urlData } = supabaseAdmin.storage.from(bucket).getPublicUrl(data.path)
  return urlData.publicUrl
}

export async function createCreator(formData: FormData) {
  const file = formData.get('photo') as File | null
  const photoUrl = await uploadPhoto(file, 'creator-photos')
  const handle = (formData.get('handle') as string).trim()

  const { error } = await supabaseAdmin.from('creators').insert({
    handle,
    name: (formData.get('name') as string).trim(),
    bio: (formData.get('bio') as string)?.trim() || null,
    photo_url: photoUrl,
    niche: (formData.get('niche') as string) || null,
    instagram_handle: (formData.get('instagram_handle') as string)?.trim() || null,
    instagram_followers: formData.get('instagram_followers')
      ? parseInt(formData.get('instagram_followers') as string, 10)
      : null,
    is_active: formData.get('is_active') === 'true',
  })

  if (error) throw error
  revalidatePath('/')
  revalidatePath(`/${handle}`)
  redirect('/admin')
}

export async function updateCreator(id: string, formData: FormData) {
  const file = formData.get('photo') as File | null
  const photoUrl =
    file && file.size > 0
      ? await uploadPhoto(file, 'creator-photos')
      : ((formData.get('existing_photo_url') as string) || null)

  const handle = (formData.get('handle') as string).trim()

  const { error } = await supabaseAdmin
    .from('creators')
    .update({
      handle,
      name: (formData.get('name') as string).trim(),
      bio: (formData.get('bio') as string)?.trim() || null,
      photo_url: photoUrl,
      niche: (formData.get('niche') as string) || null,
      instagram_handle: (formData.get('instagram_handle') as string)?.trim() || null,
      instagram_followers: formData.get('instagram_followers')
        ? parseInt(formData.get('instagram_followers') as string, 10)
        : null,
      is_active: formData.get('is_active') === 'true',
    })
    .eq('id', id)

  if (error) throw error
  revalidatePath('/')
  revalidatePath(`/${handle}`)
  redirect('/admin')
}

export async function createProduct(formData: FormData) {
  const file = formData.get('photo') as File | null
  const photoUrl = await uploadPhoto(file, 'product-photos')
  const creatorId = formData.get('creator_id') as string
  const name = (formData.get('name') as string).trim()
  const slug = (formData.get('slug') as string)?.trim() || toSlug(name)

  const { error } = await supabaseAdmin.from('products').insert({
    creator_id: creatorId,
    slug,
    name,
    description: (formData.get('description') as string)?.trim() || null,
    price_range: (formData.get('price_range') as string)?.trim() || null,
    photo_url: photoUrl,
    buy_link: (formData.get('buy_link') as string)?.trim() || null,
    is_active: formData.get('is_active') === 'true',
  })

  if (error) throw error

  const { data: creator } = await supabaseAdmin
    .from('creators')
    .select('handle')
    .eq('id', creatorId)
    .single()

  if (creator) {
    revalidatePath(`/${creator.handle}`)
    revalidatePath(`/${creator.handle}/${slug}`)
  }
  redirect('/admin')
}

export async function updateProduct(id: string, formData: FormData) {
  const file = formData.get('photo') as File | null
  const photoUrl =
    file && file.size > 0
      ? await uploadPhoto(file, 'product-photos')
      : ((formData.get('existing_photo_url') as string) || null)

  const creatorId = formData.get('creator_id') as string
  const name = (formData.get('name') as string).trim()
  const slug = (formData.get('slug') as string)?.trim() || toSlug(name)

  const { error } = await supabaseAdmin
    .from('products')
    .update({
      creator_id: creatorId,
      slug,
      name,
      description: (formData.get('description') as string)?.trim() || null,
      price_range: (formData.get('price_range') as string)?.trim() || null,
      photo_url: photoUrl,
      buy_link: (formData.get('buy_link') as string)?.trim() || null,
      is_active: formData.get('is_active') === 'true',
    })
    .eq('id', id)

  if (error) throw error

  const { data: creator } = await supabaseAdmin
    .from('creators')
    .select('handle')
    .eq('id', creatorId)
    .single()

  if (creator) {
    revalidatePath(`/${creator.handle}`)
    revalidatePath(`/${creator.handle}/${slug}`)
  }
  redirect('/admin')
}
