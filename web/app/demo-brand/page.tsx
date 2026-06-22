import Image from 'next/image'

const BRAND = {
  name: 'Bramarambaa',
  tagline: 'Where tradition meets today',
  instagram: 'bramarambaa',
  website: 'https://bramarambaa.com',
  heroImage: 'https://bramarambaa.com/cdn/shop/files/lashes_14.png',
  portraitImage: 'https://bramarambaa.com/cdn/shop/files/IMG_4788.jpg',
  story: `Bramarambaa was born from a love of handwoven Indian textiles and the desire to make them part of everyday wear. Snigdha started with a single saree silhouette — something her grandmother would recognise but she could wear to brunch. Every piece is made in small batches, never rushed.`,
  products: [
    {
      name: 'Blue Petal Flare',
      price: '₹2,800',
      image: 'https://bramarambaa.com/cdn/shop/files/05BDAC90-412A-4DD2-A5D4-27392CACF57B.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Gingham Saree',
      price: '₹3,200',
      image: 'https://bramarambaa.com/cdn/shop/files/93A24B84-63BB-4195-B8AE-9419397E6E3A.png',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Sunflora',
      price: '₹2,400',
      image: 'https://bramarambaa.com/cdn/shop/files/16D0A42E-D0DE-44FA-9E35-1B3734C7B5A7.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Lavender Elora',
      price: '₹2,600',
      image: 'https://bramarambaa.com/cdn/shop/files/F7C67A36-9D7C-4AFD-9E27-4A823D187ED9.png',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Wine Petal Anarkali',
      price: '₹3,500',
      image: 'https://bramarambaa.com/cdn/shop/files/B964CA39-76CC-401C-81DA-6F1427CECAE7.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Pastel Bloom Set',
      price: '₹4,200',
      image: 'https://bramarambaa.com/cdn/shop/files/990EDC1D-57FC-437B-85AB-AF372F4F7EEE.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
  ],
}

export default function DemoBrandPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8]">

      {/* Nav — wordmark only */}
      <nav className="sticky top-0 z-20 bg-[#FAFAF8]/90 backdrop-blur-sm border-b border-[#E8E4DF] px-6 py-4">
        <span className="font-display italic text-xl text-[#1A1A1A]">passio</span>
      </nav>

      {/* Hero */}
      <div className="relative w-full aspect-[4/3] md:aspect-[16/7]">
        <Image
          src={BRAND.heroImage}
          alt={BRAND.name}
          fill
          className="object-cover object-top"
          priority
          sizes="100vw"
        />
      </div>

      {/* Brand header */}
      <div className="max-w-4xl mx-auto px-6 pt-10 pb-8">
        <h1 className="font-display italic text-5xl md:text-7xl text-[#1A1A1A] leading-tight">
          {BRAND.name}
        </h1>
        <p className="text-lg text-[#6B6B6B] mt-3">{BRAND.tagline}</p>
        <div className="flex items-center gap-5 mt-5">
          <a
            href={`https://instagram.com/${BRAND.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#B0A99F] hover:text-[#1A1A1A] transition-colors"
          >
            @{BRAND.instagram}
          </a>
          <span className="text-[#E8E4DF]">·</span>
          <a
            href={BRAND.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-[#B0A99F] hover:text-[#1A1A1A] transition-colors"
          >
            {BRAND.website.replace('https://', '')}
          </a>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-6 py-12 border-t border-[#E8E4DF]">
        <p className="text-xs tracking-[0.2em] uppercase text-[#B0A99F] mb-10">
          The Story
        </p>
        <div className="grid md:grid-cols-[220px_1fr] gap-8 md:gap-14 items-start">
          <div className="relative aspect-[3/4] w-48 md:w-full rounded-sm overflow-hidden">
            <Image
              src={BRAND.portraitImage}
              alt="Founder"
              fill
              className="object-cover object-top"
              sizes="(max-width: 768px) 192px, 220px"
            />
          </div>
          <p className="text-[#1A1A1A] text-lg leading-relaxed md:pt-2 font-display italic">
            &ldquo;{BRAND.story}&rdquo;
          </p>
        </div>
      </div>

      {/* Collection */}
      <div className="max-w-4xl mx-auto px-6 py-12 border-t border-[#E8E4DF]">
        <p className="text-xs tracking-[0.2em] uppercase text-[#B0A99F] mb-10">
          The Collection
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
          {BRAND.products.map((product) => (
            <a
              key={product.name}
              href={product.buyUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#F0EDE8]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 33vw"
                />
              </div>
              <div className="mt-3 flex items-start justify-between gap-2">
                <div>
                  <p className="text-sm font-medium text-[#1A1A1A] leading-snug">
                    {product.name}
                  </p>
                  <p className="text-sm text-[#6B6B6B] mt-0.5">{product.price}</p>
                </div>
                <span className="flex-shrink-0 text-xs text-[#B8956A] mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity">
                  Buy →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="py-12 text-center border-t border-[#E8E4DF]">
        <p className="text-xs text-[#B0A99F]">
          Made with{' '}
          <span className="font-display italic text-[#B8956A]">passio</span>
        </p>
      </footer>

    </div>
  )
}
