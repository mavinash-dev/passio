import { createClient } from '@supabase/supabase-js'
import ws from 'ws'

const SUPABASE_URL = 'https://apkkkcmleitkoawijgmq.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwa2trY21sZWl0a29hd2lqZ21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk0MjIwOCwiZXhwIjoyMDk0NTE4MjA4fQ.Eu6dpHOkOKW8km0ZRALBNMV3SyEyZMsbMYL2Z86DPsY'
const sb = createClient(SUPABASE_URL, SERVICE_KEY, { auth: { persistSession: false }, realtime: { transport: ws } })

// Product photos by niche — flat lays, product shots, NO people
const PRODUCT_PHOTOS = {
  fashion: [
    'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&q=80', // clothing flat lay
    'https://images.unsplash.com/photo-1434389677669-e08b4cac3105?w=800&h=1000&fit=crop&q=80', // fabric texture
    'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&q=80', // clothing on hanger
    'https://images.unsplash.com/photo-1468436139062-f60a71c5c892?w=800&h=1000&fit=crop&q=80', // fabric close up
    'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=800&h=1000&fit=crop&q=80', // clothing detail
    'https://images.unsplash.com/photo-1582552938357-32b906df40cb?w=800&h=1000&fit=crop&q=80', // saree/fabric
  ],
  skincare: [
    'https://images.unsplash.com/photo-1556228578-8c89e6adf883?w=800&h=1000&fit=crop&q=80', // skincare products
    'https://images.unsplash.com/photo-1567721913486-6585f069b367?w=800&h=1000&fit=crop&q=80', // skincare jars
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=1000&fit=crop&q=80', // cosmetics bottles
    'https://images.unsplash.com/photo-1526758097130-bab247274f58?w=800&h=1000&fit=crop&q=80', // beauty products
    'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=1000&fit=crop&q=80', // makeup/beauty
    'https://images.unsplash.com/photo-1631390945066-d5d198edd02c?w=800&h=1000&fit=crop&q=80', // skincare flat lay
  ],
  food: [
    'https://images.unsplash.com/photo-1596797038530-2c107229654b?w=800&h=1000&fit=crop&q=80', // indian spices
    'https://images.unsplash.com/photo-1606491956689-2ea866880c84?w=800&h=1000&fit=crop&q=80', // indian food
    'https://images.unsplash.com/photo-1589647363585-f4a7d3877b10?w=800&h=1000&fit=crop&q=80', // food jar
    'https://images.unsplash.com/photo-1567620832903-9fc6debc209f?w=800&h=1000&fit=crop&q=80', // food photography
    'https://images.unsplash.com/photo-1516684732162-798a0062be99?w=800&h=1000&fit=crop&q=80', // chai/tea
    'https://images.unsplash.com/photo-1534482421-64566f976cfa?w=800&h=1000&fit=crop&q=80', // sweets/mithai
  ],
  fitness: [
    'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=800&h=1000&fit=crop&q=80', // gym equipment
    'https://images.unsplash.com/photo-1505455184862-554165e5f6ba?w=800&h=1000&fit=crop&q=80', // yoga mat
    'https://images.unsplash.com/photo-1593095948071-474c5cc2989d?w=800&h=1000&fit=crop&q=80', // protein/supplements
    'https://images.unsplash.com/photo-1534258936925-c58bed479fcb?w=800&h=1000&fit=crop&q=80', // fitness gear
    'https://images.unsplash.com/photo-1540206395-68808572332f?w=800&h=1000&fit=crop&q=80', // workout equipment
    'https://images.unsplash.com/photo-1547592180-85f173990554?w=800&h=1000&fit=crop&q=80', // healthy food/nutrition
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1602526212974-c5c6b611f248?w=800&h=1000&fit=crop&q=80', // candle
    'https://images.unsplash.com/photo-1604014237800-1c9102c219da?w=800&h=1000&fit=crop&q=80', // home decor
    'https://images.unsplash.com/photo-1616047006789-b7af5afb8c20?w=800&h=1000&fit=crop&q=80', // pottery/ceramic
    'https://images.unsplash.com/photo-1544568100-847a948585b9?w=800&h=1000&fit=crop&q=80', // pet/dog
    'https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=1000&fit=crop&q=80', // plants
    'https://images.unsplash.com/photo-1543340904-0e1f3a5f8f88?w=800&h=1000&fit=crop&q=80', // stationery/journal
  ],
}

async function downloadBuffer(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return Buffer.from(await r.arrayBuffer())
}

async function uploadToStorage(buf, filename) {
  const { data, error } = await sb.storage.from('product-photos').upload(filename, buf, {
    contentType: 'image/jpeg',
    upsert: true,
  })
  if (error) throw error
  return sb.storage.from('product-photos').getPublicUrl(data.path).data.publicUrl
}

async function run() {
  // Get all products with their creator's niche
  const { data: products } = await sb
    .from('products')
    .select('id, slug, creator_id, creators(niche)')
    .is('photo_url', null)

  console.log(`Found ${products.length} products without photos\n`)

  // Track photo index per niche
  const counters = {}

  for (let i = 0; i < products.length; i++) {
    const p = products[i]
    const niche = p.creators?.niche ?? 'lifestyle'
    counters[niche] = counters[niche] ?? 0

    const pool = PRODUCT_PHOTOS[niche] ?? PRODUCT_PHOTOS.lifestyle
    const imgUrl = pool[counters[niche] % pool.length]
    counters[niche]++

    const filename = `${p.creator_id}-${p.slug}.jpg`
    process.stdout.write(`[${i + 1}/${products.length}] ${p.slug}... `)

    try {
      const buf = await downloadBuffer(imgUrl)
      const photoUrl = await uploadToStorage(buf, filename)
      await sb.from('products').update({ photo_url: photoUrl }).eq('id', p.id)
      console.log('✓')
    } catch (e) {
      console.log(`✗ ${e.message}`)
    }
  }

  console.log('\n✅ All product photos added')
}

run()
