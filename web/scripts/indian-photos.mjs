import { createClient } from '@supabase/supabase-js'
import ws from 'ws'

const SUPABASE_URL = 'https://apkkkcmleitkoawijgmq.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwa2trY21sZWl0a29hd2lqZ21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk0MjIwOCwiZXhwIjoyMDk0NTE4MjA4fQ.Eu6dpHOkOKW8km0ZRALBNMV3SyEyZMsbMYL2Z86DPsY'
const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false }, realtime: { transport: ws } })

const sleep = (ms) => new Promise(r => setTimeout(r, ms))

// Unique Indian images from Wikimedia Commons
// We download each ONCE and reuse the Supabase URL across creators
const INDIAN_IMAGES = {
  // Fashion — Indian textiles and clothing
  'fashion-1': 'https://upload.wikimedia.org/wikipedia/commons/1/1a/Bengal_saris_on_display.jpg',
  'fashion-2': 'https://upload.wikimedia.org/wikipedia/commons/1/19/Bengali_Sari.jpg',
  'fashion-3': 'https://upload.wikimedia.org/wikipedia/commons/e/e1/Bandhej.JPG',
  'fashion-4': 'https://upload.wikimedia.org/wikipedia/commons/3/35/Bomkai3.jpg',
  'fashion-5': 'https://upload.wikimedia.org/wikipedia/commons/2/2a/A_silk_saree_loom_in_Kumbakonam%2C_Tamil_Nadu.jpg',
  'fashion-6': 'https://upload.wikimedia.org/wikipedia/commons/c/c5/Blue_khadi_kurta.jpg',
  'fashion-7': 'https://upload.wikimedia.org/wikipedia/commons/2/21/Cotton-kurta-pant-and-dupatta-set-made-in-khari-print.jpg',
  'fashion-8': 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Kurta_-_Mens.jpg',
  // Skincare — Ayurvedic and herbal
  'skincare-1': 'https://upload.wikimedia.org/wikipedia/commons/4/42/An_Ayurvedic_Pharmacy%2C_Rishikesh_%281%29.jpg',
  'skincare-2': 'https://upload.wikimedia.org/wikipedia/commons/5/5b/Curcuma_longa_roots.jpg',
  // Food — Indian cuisine
  'food-1': 'https://upload.wikimedia.org/wikipedia/commons/e/ea/Indian_Spices.jpg',
  'food-2': 'https://upload.wikimedia.org/wikipedia/commons/d/d1/Dosa_Classic.jpg',
  'food-3': 'https://upload.wikimedia.org/wikipedia/commons/6/62/Darjeeling%2C_India%2C_Darjeeling_tea_in_variety%2C_Black_tea.jpg',
  'food-4': 'https://upload.wikimedia.org/wikipedia/commons/e/e0/Chicken_Tikka_Masala.jpg',
  'food-5': 'https://upload.wikimedia.org/wikipedia/commons/4/46/Kheer.jpg',
  'food-6': 'https://upload.wikimedia.org/wikipedia/commons/0/02/Holi_Special_Chilled_Thandai-Kolkata-West_Bengal.jpg',
  'food-7': 'https://upload.wikimedia.org/wikipedia/commons/d/da/3_types_of_lentil.jpg',
  'food-8': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Filter_Kaapi_at_Sarvana_Bhavan_Restaurant%2C_Chennai%2C_Tamil_Nadu.jpg',
  'food-9': 'https://upload.wikimedia.org/wikipedia/commons/4/41/Butter_Chicken_%26_Butter_Naan_-_Home_-_Chandigarh_-_India_-_0006.jpg',
  'food-10': 'https://upload.wikimedia.org/wikipedia/commons/0/00/Aloo_Tikki_Fried_%282%29.JPG',
  // Fitness — Yoga
  'fitness-1': 'https://upload.wikimedia.org/wikipedia/commons/7/7b/Ardha-Chandrasana_Yoga-Asana_Nina-Mel.jpg',
  // Lifestyle — Diyas, Mehendi, Indian crafts
  'lifestyle-1': 'https://upload.wikimedia.org/wikipedia/commons/0/04/Diya_set_in_a_rangoli.jpg',
  'lifestyle-2': 'https://upload.wikimedia.org/wikipedia/commons/8/8b/A_Deeya_Diya_oil_lamp_with_a_swastika_sign%2C_Hinduism_Varanasi_India.jpg',
  'lifestyle-3': 'https://upload.wikimedia.org/wikipedia/commons/6/6c/Mehndi_02.JPG',
  'lifestyle-4': 'https://upload.wikimedia.org/wikipedia/commons/3/3f/Mehndi_front.JPG',
  'lifestyle-5': 'https://upload.wikimedia.org/wikipedia/commons/0/00/Henna_tattoo_%28Mehndi%29_at_a_wedding_in_India_01.jpg',
}

// Which keys to use per niche (creators cycle through these)
const NICHE_KEYS = {
  fashion:   ['fashion-1','fashion-2','fashion-3','fashion-4','fashion-5','fashion-6','fashion-7','fashion-8'],
  skincare:  ['skincare-1','skincare-2','skincare-1','skincare-2','skincare-1'],
  food:      ['food-1','food-2','food-3','food-4','food-5','food-6','food-7','food-8','food-9','food-10'],
  fitness:   ['fitness-1','skincare-1','food-1','fitness-1'],
  lifestyle: ['lifestyle-1','lifestyle-2','lifestyle-3','lifestyle-4','lifestyle-5','lifestyle-1'],
}

async function downloadBuffer(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Passio/1.0 (educational project; contact: avinash.reachme@gmail.com)' } })
  if (!r.ok) throw new Error(`${r.status}`)
  return Buffer.from(await r.arrayBuffer())
}

async function run() {
  // Step 1: Download each unique image ONCE and upload to Supabase
  console.log('Step 1: Downloading unique Indian images...\n')
  const supabaseUrls = {}

  for (const [key, wikimediaUrl] of Object.entries(INDIAN_IMAGES)) {
    process.stdout.write(`  ${key}... `)
    try {
      await sleep(1500) // polite delay for Wikimedia
      const buf = await downloadBuffer(wikimediaUrl)
      const ext = wikimediaUrl.toLowerCase().includes('.png') ? 'png' : 'jpg'
      const filename = `indian/${key}.${ext}`
      const ctype = ext === 'png' ? 'image/png' : 'image/jpeg'
      const { data, error } = await sb.storage.from('creator-photos').upload(filename, buf, { contentType: ctype, upsert: true })
      if (error) throw error
      supabaseUrls[key] = sb.storage.from('creator-photos').getPublicUrl(data.path).data.publicUrl
      console.log('✓')
    } catch (e) {
      console.log(`✗ ${e.message} — will retry later`)
    }
  }

  console.log(`\nCached ${Object.keys(supabaseUrls).length}/${Object.keys(INDIAN_IMAGES).length} images\n`)

  // Fill any missing with a fallback from what we have
  const fallback = Object.values(supabaseUrls)[0]
  for (const key of Object.keys(INDIAN_IMAGES)) {
    if (!supabaseUrls[key]) supabaseUrls[key] = fallback
  }

  // Step 2: Assign to creators (no more Wikimedia calls — just DB updates)
  console.log('Step 2: Assigning to creators...')
  const { data: creators } = await sb.from('creators').select('id, handle, niche')
  const counters = {}

  for (const c of creators) {
    const niche = c.niche ?? 'lifestyle'
    counters[niche] = counters[niche] ?? 0
    const keys = NICHE_KEYS[niche] ?? NICHE_KEYS.lifestyle
    const key = keys[counters[niche] % keys.length]
    counters[niche]++
    const photoUrl = supabaseUrls[key]
    if (!photoUrl) continue
    await sb.from('creators').update({ photo_url: photoUrl }).eq('id', c.id)
    console.log(`  ✓ ${c.handle}`)
  }

  // Step 3: Assign to products (offset so different from creator)
  console.log('\nStep 3: Assigning to products...')
  const { data: products } = await sb.from('products').select('id, slug, creator_id, creators(niche)')
  const pCounters = {}

  for (const p of products) {
    const niche = p.creators?.niche ?? 'lifestyle'
    pCounters[niche] = pCounters[niche] ?? 3 // offset start
    const keys = NICHE_KEYS[niche] ?? NICHE_KEYS.lifestyle
    const key = keys[pCounters[niche] % keys.length]
    pCounters[niche]++
    const photoUrl = supabaseUrls[key]
    if (!photoUrl) continue
    await sb.from('products').update({ photo_url: photoUrl }).eq('id', p.id)
    console.log(`  ✓ ${p.slug}`)
  }

  console.log('\n✅ Done — Indian photos applied across all creators and products')
}

run()
