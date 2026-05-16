import { createClient } from '@supabase/supabase-js'

const SUPABASE_URL = 'https://apkkkcmleitkoawijgmq.supabase.co'
const SERVICE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwa2trY21sZWl0a29hd2lqZ21xIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3ODk0MjIwOCwiZXhwIjoyMDk0NTE4MjA4fQ.Eu6dpHOkOKW8km0ZRALBNMV3SyEyZMsbMYL2Z86DPsY'

import ws from 'ws'
const sb = createClient(SUPABASE_URL, SERVICE_KEY, {
  auth: { persistSession: false },
  realtime: { transport: ws },
})

// Brand imagery by niche — Unsplash photos (clothing, products, food, etc.)
const NICHE_PHOTOS = {
  fashion: [
    'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1445205170230-053b83016050?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1520006403909-838d6b92c22e?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1496747611176-843222e1e57c?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1554568218-0f1715e72254?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&h=1000&fit=crop&q=80',
  ],
  skincare: [
    'https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1611930022073-b7a4ba5fcccd?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1570194065650-d99fb4bedf0a?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1596755389278-c4e5e3d4a9f9?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1608248543803-ba4f8c70ae0b?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1599305090598-fe179d501227?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1576426863848-c21f53c60b19?w=800&h=1000&fit=crop&q=80',
  ],
  food: [
    'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1455619452474-a2e2d44a1eda?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1476718406336-4b9a06d040ad?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1542826438-bd32f3bcce0e?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1559847844-5315695dadae?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1573246123716-6b1782bfc499?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1606787366850-de6330128bfc?w=800&h=1000&fit=crop&q=80',
  ],
  fitness: [
    'https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1549060279-7e168fcee0c2?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1574680096145-d05b474e2155?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1583454110551-21f2fa2afe64?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1571731956672-f2b94d7dd0cb?w=800&h=1000&fit=crop&q=80',
  ],
  lifestyle: [
    'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484101403633-562f891dc89a?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1513694203232-719a280e0f10?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1545127398-14699f62f6ef?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1512314889357-e157c22f938d?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1502945015378-0d284ca2a99c?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=1000&fit=crop&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd3?w=800&h=1000&fit=crop&q=80',
  ],
}

// Track how many times each niche photo pool has been used
const nicheCounters = {}
function getPhotoForNiche(niche) {
  nicheCounters[niche] = nicheCounters[niche] ?? 0
  const pool = NICHE_PHOTOS[niche] ?? NICHE_PHOTOS.lifestyle
  const url = pool[nicheCounters[niche] % pool.length]
  nicheCounters[niche]++
  return url
}

// Product photos — picsum seeded (consistent, real photos)
function productPhoto(seed) {
  return `https://picsum.photos/seed/${seed}/800/1000`
}

const CREATORS = [
  // FASHION
  { handle: 'ananya-threads',   name: 'Ananya Threads',   niche: 'fashion',   instagram: 'ananyathreads',   followers: 124000, bio: 'Ethnic fusion wear for the modern Indian woman. Handcrafted in Delhi, shipped across India.' },
  { handle: 'priya-couture',    name: 'Priya Couture',    niche: 'fashion',   instagram: 'priyacouture',    followers: 89000,  bio: 'Hand-embroidered sarees and lehengas. Every piece takes 3 weeks to make — because some things can\'t be rushed.' },
  { handle: 'mishti-designs',   name: 'Mishti Designs',   niche: 'fashion',   instagram: 'mishtidesigns',   followers: 210000, bio: 'Bridal wear from Kolkata. Zardozi, kantha, and baluchari — crafted by artisans who learned from their grandmothers.' },
  { handle: 'kavya-khadi',      name: 'Kavya Khadi',      niche: 'fashion',   instagram: 'kavyakhadi',      followers: 56000,  bio: 'Sustainable khadi fashion. Slow made, long lasting. We plant a tree for every order.' },
  { handle: 'riya-stitched',    name: 'Riya Stitched',    niche: 'fashion',   instagram: 'riyastitched',    followers: 78000,  bio: 'Custom fit western wear for Indian body types. Because standard sizes were never made for us.' },
  { handle: 'tara-textiles',    name: 'Tara Textiles',    niche: 'fashion',   instagram: 'taratextiles',    followers: 143000, bio: 'Hand block printed kurtas from Jaipur. Each print is carved by hand by artisans in Sanganer.' },
  { handle: 'nandini-wears',    name: 'Nandini Wears',    niche: 'fashion',   instagram: 'nandiniwears',    followers: 167000, bio: 'India\'s first plus-size-first fashion label. We design for curves, not as an afterthought.' },
  { handle: 'diya-drapes',      name: 'Diya Drapes',      niche: 'fashion',   instagram: 'diyadrapes',      followers: 92000,  bio: 'Contemporary sarees for women who live life at full speed. Pre-stitched, wrinkle-resistant, always stunning.' },
  { handle: 'miras-wardrobe',   name: 'Mira\'s Wardrobe', niche: 'fashion',   instagram: 'miraswardrobe',   followers: 45000,  bio: 'Boardroom-to-brunch workwear. Smart, sharp, and made for Indian summers.' },
  { handle: 'sia-silks',        name: 'Sia Silks',        niche: 'fashion',   instagram: 'siasilks',        followers: 198000, bio: 'Pure Kanjivaram silks sourced directly from weavers in Tamil Nadu. No middlemen. Real prices.' },
  { handle: 'aarna-ethnic',     name: 'Aarna Ethnic',     niche: 'fashion',   instagram: 'aarnaethnic',     followers: 312000, bio: 'Indo-western fusion wear. Where your dupatta meets your denim — effortlessly.' },
  { handle: 'zara-collective',  name: 'Zara Collective',  niche: 'fashion',   instagram: 'zaracollective',  followers: 67000,  bio: 'Indian streetwear. Bold prints, relaxed fits, made in Mumbai.' },

  // SKINCARE
  { handle: 'glow-by-neha',     name: 'Glow by Neha',     niche: 'skincare',  instagram: 'glowbyneha',      followers: 445000, bio: 'Natural skincare formulated for Indian skin. No parabens, no sulphates, no BS. Just results.' },
  { handle: 'skin-sutras',      name: 'Skin Sutras',      niche: 'skincare',  instagram: 'skinsutras',      followers: 234000, bio: 'Ayurveda meets science. Ancient ingredients, modern formulations, real results.' },
  { handle: 'pure-aura',        name: 'Pure Aura',        niche: 'skincare',  instagram: 'pureaura',        followers: 178000, bio: 'Organic face care that works. 100% natural, zero synthetic fragrance, crafted in small batches.' },
  { handle: 'turmeric-tales',   name: 'Turmeric Tales',   niche: 'skincare',  instagram: 'turmerictal',     followers: 289000, bio: 'Haldi is not just for dal. We\'ve built an entire skincare line around India\'s original superfood.' },
  { handle: 'kumkumadi-lab',    name: 'Kumkumadi Lab',    niche: 'skincare',  instagram: 'kumkumadilab',    followers: 156000, bio: 'Traditional kumkumadi oil, modernised. The same 800-year-old recipe, in packaging that belongs in your bathroom.' },
  { handle: 'meeras-botanicals',name: 'Meera\'s Botanicals',niche:'skincare', instagram: 'meerasbotanicals', followers: 98000, bio: 'Herbal skincare from my grandmother\'s garden to your face. Every ingredient has a story.' },
  { handle: 'rose-and-saffron', name: 'Rose & Saffron',   niche: 'skincare',  instagram: 'roseandsaffron',  followers: 367000, bio: 'Luxury natural skincare. Saffron from Kashmir, roses from Kannauj. Grown in India, made for India.' },
  { handle: 'the-aloe-club',    name: 'The Aloe Club',    niche: 'skincare',  instagram: 'thealoeclub',     followers: 112000, bio: '99% pure aloe vera products. No filler, no water, no tricks. Just the plant.' },
  { handle: 'sundhari-skincare',name: 'Sundhari Skincare', niche: 'skincare',  instagram: 'sundhari',        followers: 223000, bio: 'South Indian beauty rituals in a bottle. Coconut, neem, turmeric — the classics, perfected.' },
  { handle: 'urban-glow',       name: 'Urban Glow',       niche: 'skincare',  instagram: 'urbanglowskin',   followers: 189000, bio: 'SPF for Indian skin tones. We built this because every sunscreen left us looking grey.' },

  // FOOD
  { handle: 'ammas-kitchen',    name: 'Amma\'s Kitchen',  niche: 'food',      instagram: 'ammaskitchen',    followers: 278000, bio: 'Authentic South Indian recipes. My amma\'s recipes, jarred and shipped. The closest thing to home.' },
  { handle: 'desi-ghee-co',     name: 'Desi Ghee Co',     niche: 'food',      instagram: 'desighee',        followers: 134000, bio: 'Artisanal A2 ghee, slow cooked in small batches. The way your nani made it.' },
  { handle: 'mithai-modern',    name: 'Mithai Modern',    niche: 'food',      instagram: 'mithaimodern',    followers: 456000, bio: 'Indian sweets, reimagined. Classic mithai with unexpected flavours. Rose laddoo. Tahini barfi. Matcha peda.' },
  { handle: 'spice-trail',      name: 'Spice Trail',      niche: 'food',      instagram: 'spicetrail',      followers: 89000,  bio: 'Single-origin artisan masalas. We work directly with spice farmers across India. No fillers, no additives.' },
  { handle: 'chai-chronicles',  name: 'Chai Chronicles',  niche: 'food',      instagram: 'chaichronicles',  followers: 312000, bio: 'Specialty chai blends from Darjeeling to Coorg. Every blend tells the story of where it came from.' },
  { handle: 'the-chikki-shop',  name: 'The Chikki Shop',  niche: 'food',      instagram: 'thechikkishop',   followers: 67000,  bio: 'Traditional chikki from Lonavala. 6 generations of the same family, the same recipe.' },
  { handle: 'dhokla-dreams',    name: 'Dhokla Dreams',    niche: 'food',      instagram: 'dhokla.dreams',   followers: 145000, bio: 'Ready-to-steam Gujarati snacks. Dhokla, khaman, handvo — fresh, authentic, delivered.' },
  { handle: 'coconut-coast',    name: 'Coconut Coast',    niche: 'food',      instagram: 'coconutcoast',    followers: 198000, bio: 'Kerala in a jar. Coconut oil, coconut vinegar, coconut sugar — the whole tree, bottled.' },
  { handle: 'masala-magic',     name: 'Masala Magic',     niche: 'food',      instagram: 'masalamagic',     followers: 234000, bio: 'Handcrafted curry pastes. Made fresh, frozen fast. Restaurant quality in 15 minutes.' },
  { handle: 'sweet-bengal',     name: 'Sweet Bengal',     niche: 'food',      instagram: 'sweetbengal',     followers: 178000, bio: 'Authentic Bengali mishti. Rosogolla, sandesh, mishti doi — straight from Kolkata to your door.' },

  // FITNESS
  { handle: 'desi-gains',       name: 'Desi Gains',       niche: 'fitness',   instagram: 'desigains',       followers: 523000, bio: 'Protein supplements made for Indian bodies and Indian palates. Masala chai protein. Mango lassi BCAA. This is us.' },
  { handle: 'yoga-by-priya',    name: 'Yoga by Priya',    niche: 'fitness',   instagram: 'yogabypriya',     followers: 189000, bio: 'Yoga accessories for serious practitioners. Eco cork mats, cotton straps, bolsters — made right here in India.' },
  { handle: 'strong-desi',      name: 'Strong Desi',      niche: 'fitness',   instagram: 'strongdesi',      followers: 267000, bio: 'High protein Indian snacks. Moong dal protein bars. Chana chaat trail mix. Fitness food that actually tastes like home.' },
  { handle: 'flex-and-fit',     name: 'Flex & Fit',       niche: 'fitness',   instagram: 'flexandfit',      followers: 312000, bio: 'Indian gym wear. Designed for desi summers, not British winters. Squat-proof, sweat-wicking, affordable.' },
  { handle: 'breathe-wellness', name: 'Breathe Wellness', niche: 'fitness',   instagram: 'breathewellness', followers: 145000, bio: 'Meditation and mindfulness products. Singing bowls, incense, prayer beads — tools for your practice.' },
  { handle: 'iron-girl-india',  name: 'Iron Girl India',  niche: 'fitness',   instagram: 'irongirlind',     followers: 234000, bio: 'Women\'s strength training gear. Indian women are lifting. Finally, gear that knows that.' },
  { handle: 'run-bhumi',        name: 'Run Bhumi',        niche: 'fitness',   instagram: 'runbhumi',        followers: 98000,  bio: 'Running gear for Indian roads. Cushioned, trail-ready, made for our chaotic beautiful terrain.' },
  { handle: 'active-india',     name: 'Active India',     niche: 'fitness',   instagram: 'activeindia',     followers: 167000, bio: 'Sports nutrition, Indian way. Pre-workout chai shots. Recovery haldi milk mix. Performance meets tradition.' },

  // LIFESTYLE
  { handle: 'terracotta-home',  name: 'Terracotta Home',  niche: 'lifestyle', instagram: 'terracottahome',  followers: 234000, bio: 'Handcrafted pottery from Rajasthan. Each piece thrown by hand, finished with natural glazes. Nothing is identical.' },
  { handle: 'jaipur-journals',  name: 'Jaipur Journals',  niche: 'lifestyle', instagram: 'jaipurjournals',  followers: 89000,  bio: 'Leather stationery handmade in Jaipur. Journals, portfolios, travel cases. Your words deserve a beautiful home.' },
  { handle: 'balcony-garden',   name: 'Balcony Garden',   niche: 'lifestyle', instagram: 'balconygarden',   followers: 312000, bio: 'Urban gardening kits for Indian apartments. Grow your own sabzi on your 10th floor balcony.' },
  { handle: 'desi-deco',        name: 'Desi Deco',        niche: 'lifestyle', instagram: 'desideco',        followers: 178000, bio: 'Indian home decor that doesn\'t try to be European. Brass, copper, cane — the materials that built our homes.' },
  { handle: 'candle-collective', name: 'Candle Collective',niche: 'lifestyle', instagram: 'candlecollectiv', followers: 145000, bio: 'Soy wax candles in Indian fragrances. Mogra. Sandalwood. Monsoon petrichor. Light a room, light a memory.' },
  { handle: 'the-paper-house',  name: 'The Paper House',  niche: 'lifestyle', instagram: 'thepaperhouse',   followers: 67000,  bio: 'Handmade paper and stationery from Pondicherry. Recycled cotton, banana fibre, and love.' },
  { handle: 'bamboo-being',     name: 'Bamboo Being',     niche: 'lifestyle', instagram: 'bamboobeing',     followers: 198000, bio: 'Sustainable bamboo products for everyday life. Toothbrushes, cutlery, storage — zero plastic, all function.' },
  { handle: 'festival-lights',  name: 'Festival Lights',  niche: 'lifestyle', instagram: 'festivallights',  followers: 423000, bio: 'Handcrafted diyas and festival decor. We work with 200 potters across UP to bring you the real thing.' },
  { handle: 'mehendi-magic',    name: 'Mehendi Magic',    niche: 'lifestyle', instagram: 'mehendimagic',    followers: 289000, bio: 'Natural henna kits and tools. Cone henna, jagua gel, stencils — everything for your mehendi moment.' },
  { handle: 'pet-india',        name: 'Pet India',        niche: 'lifestyle', instagram: 'petindia',        followers: 156000, bio: 'Indian-made pet accessories. Because our dogs deserve handcrafted leather collars and not imported plastic.' },
]

// Sample products per niche
const PRODUCTS_BY_NICHE = {
  fashion: [
    { name: 'Signature Kurta Set', desc: 'Our bestselling three-piece set. Kurta, palazzo, and dupatta in premium cotton. Every colour sold out in 48 hours on launch day.', price: '₹2,499' },
    { name: 'Embroidered Anarkali', desc: 'Floor-length Anarkali with hand-embroidered neckline. Takes 12 hours of craft. Looks like it belongs in a museum.', price: '₹4,999' },
    { name: 'Summer Co-ord Set', desc: 'Matching top and skirt in airy linen. Wear the pieces separately, or together. Made for the season you\'re actually in.', price: '₹1,899' },
  ],
  skincare: [
    { name: 'Daily Glow Serum', desc: 'Our hero product. 5ml of this every morning changed skincare routines across 40,000 customers.', price: '₹899' },
    { name: 'Nourishing Face Mask', desc: 'A 20-minute ritual. Clay, neem, and sandalwood that pulls out everything your face has been holding onto.', price: '₹599' },
    { name: 'Hydrating Toner', desc: 'Rose water and hyaluronic acid. The toner that made non-toner people into toner people.', price: '₹449' },
  ],
  food: [
    { name: 'Original Recipe Jar', desc: 'The one that started it all. Our signature product, made from the same recipe we\'ve been using for years.', price: '₹349' },
    { name: 'Festive Gift Box', desc: 'A curated selection of our bestsellers, packaged for gifting. Because good food is the best gift.', price: '₹999' },
    { name: 'Trial Pack', desc: 'Not sure where to start? This is. Five different products in one box. Pick your favourites.', price: '₹499' },
  ],
  fitness: [
    { name: 'Starter Kit', desc: 'Everything you need to begin. We\'ve been there — this is what we wish someone had given us on day one.', price: '₹1,299' },
    { name: 'Monthly Supply Pack', desc: 'A full month\'s supply. Saves you 20% over buying individually. Subscribe and save even more.', price: '₹2,499' },
    { name: 'Performance Bundle', desc: 'Pre, intra, post. Three products that work together so you don\'t have to think about it.', price: '₹3,499' },
  ],
  lifestyle: [
    { name: 'Signature Piece', desc: 'The product that made people find us. Handmade, unique, and impractically beautiful in the best way.', price: '₹799' },
    { name: 'Home Set', desc: 'A curated set for one room. Or one corner. Or one shelf. Make it yours.', price: '₹1,599' },
    { name: 'Gift Edition', desc: 'Our most giftable product. We obsessed over the packaging so you don\'t have to.', price: '₹1,199' },
  ],
}

async function downloadBuffer(url) {
  const r = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } })
  if (!r.ok) throw new Error(`${r.status} ${url}`)
  return Buffer.from(await r.arrayBuffer())
}

async function uploadToStorage(buf, bucket, path, type) {
  const { data, error } = await sb.storage.from(bucket).upload(path, buf, {
    contentType: type,
    upsert: true,
  })
  if (error) throw error
  return sb.storage.from(bucket).getPublicUrl(data.path).data.publicUrl
}

async function run() {
  // 1. Delete all existing data (logs → products → creators)
  console.log('🗑  Deleting existing data...')
  await sb.from('redirect_logs').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  await sb.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  const { error: delErr } = await sb.from('creators').delete().neq('id', '00000000-0000-0000-0000-000000000000')
  if (delErr) { console.error(delErr); process.exit(1) }
  console.log('✓ Cleared\n')

  for (let i = 0; i < CREATORS.length; i++) {
    const c = CREATORS[i]
    const portraitUrl = getPhotoForNiche(c.niche)
    console.log(`[${i + 1}/50] ${c.name}`)

    try {
      // Upload creator portrait
      const imgBuf = await downloadBuffer(portraitUrl)
      const photoUrl = await uploadToStorage(imgBuf, 'creator-photos', `${c.handle}.jpg`, 'image/jpeg')

      // Insert creator
      const { data: creator, error: cErr } = await sb.from('creators').insert({
        handle: c.handle,
        name: c.name,
        bio: c.bio,
        niche: c.niche,
        instagram_handle: c.instagram,
        instagram_followers: c.followers,
        photo_url: photoUrl,
        is_active: true,
      }).select('id').single()

      if (cErr) { console.error('  Creator error:', cErr.message); continue }

      // Insert products (no photos for speed — use null)
      const products = PRODUCTS_BY_NICHE[c.niche] ?? []
      for (const p of products) {
        const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '')
        await sb.from('products').insert({
          creator_id: creator.id,
          slug,
          name: p.name,
          description: p.desc,
          price_range: p.price,
          buy_link: `https://instagram.com/${c.instagram}`,
          is_active: true,
        })
      }

      console.log(`  ✓ ${products.length} products`)
    } catch (e) {
      console.error(`  ✗ ${e.message}`)
    }
  }

  console.log('\n✅ Done — 50 creators seeded')
}

run()
