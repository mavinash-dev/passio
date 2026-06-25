import Image from 'next/image'

const BRAND = {
  name: 'Bramarambaa',
  tagline: 'Where tradition meets today',
  instagram: 'bramarambaa',
  website: 'https://bramarambaa.com',
  portraitImage: 'https://bramarambaa.com/cdn/shop/files/IMG_4788.jpg',
  story: `Bramarambaa was born from a love of handwoven Indian textiles and the desire to make them part of everyday wear. Snigdha started with a single saree silhouette — something her grandmother would recognise but she could wear to brunch. Every piece is made in small batches, never rushed.`,
  products: [
    {
      name: 'Blue Petal Flare',
      image: 'https://bramarambaa.com/cdn/shop/files/05BDAC90-412A-4DD2-A5D4-27392CACF57B.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Gingham Saree',
      image: 'https://bramarambaa.com/cdn/shop/files/93A24B84-63BB-4195-B8AE-9419397E6E3A.png',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Sunflora',
      image: 'https://bramarambaa.com/cdn/shop/files/16D0A42E-D0DE-44FA-9E35-1B3734C7B5A7.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Lavender Elora',
      image: 'https://bramarambaa.com/cdn/shop/files/F7C67A36-9D7C-4AFD-9E27-4A823D187ED9.png',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Wine Petal Anarkali',
      image: 'https://bramarambaa.com/cdn/shop/files/B964CA39-76CC-401C-81DA-6F1427CECAE7.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
    {
      name: 'Pastel Bloom Set',
      image: 'https://bramarambaa.com/cdn/shop/files/990EDC1D-57FC-437B-85AB-AF372F4F7EEE.jpg',
      buyUrl: 'https://bramarambaa.com',
    },
  ],
}

export default function DemoBrandPage() {
  return (
    <div className="min-h-screen bg-[#FAFAF8] relative">

      {/* Grain texture overlay */}
      <div className="grain-overlay" aria-hidden="true" />


      {/* All content sits above the background layers */}
      <div className="relative z-10">

      {/* Nav */}
      <nav className="sticky top-0 z-20 bg-[#FAFAF8]/90 backdrop-blur-sm px-6 py-4">
        <span className="font-passio italic text-xl text-[#1A1A1A]">passio</span>
      </nav>

      {/* Brand header */}
      <div className="max-w-4xl mx-auto px-6 pt-12 pb-6">
        <h1 className="font-display italic text-5xl md:text-7xl text-[#6B4226] leading-tight">
          {BRAND.name}
        </h1>
        <p className="text-[#6B6B6B] text-lg mt-3">{BRAND.tagline}</p>
        <div className="flex items-center gap-5 mt-5">
          <a
            href={`https://instagram.com/${BRAND.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#B8956A] transition-colors"
          >
            {/* Instagram icon */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
              <circle cx="12" cy="12" r="4"/>
              <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
            </svg>
            {BRAND.instagram}
          </a>
          <span className="text-[#E5DDD5]">·</span>
          <a
            href={BRAND.website}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-sm font-semibold text-[#1A1A1A] hover:text-[#B8956A] transition-colors"
          >
            {/* Globe icon */}
            <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="2" y1="12" x2="22" y2="12"/>
              <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
            </svg>
            {BRAND.website.replace('https://', '')}
          </a>
        </div>
      </div>

      {/* Story */}
      <div className="max-w-4xl mx-auto px-6 py-12 border-t border-[#E5DDD5]">
        <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium mb-10">
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
          <p className="font-display italic font-semibold text-[#1A1A1A] text-2xl leading-loose md:pt-4">
            &ldquo;{BRAND.story}&rdquo;
          </p>
        </div>
      </div>

      {/* Full-width auto-scroll marquee — images only */}
      <div className="border-t border-[#E5DDD5]">
        <div className="px-6 pt-8 pb-4 max-w-4xl mx-auto">
          <p className="text-xs tracking-[0.2em] uppercase text-[#1A1A1A] font-medium">The Collection</p>
        </div>
        <div className="marquee-track overflow-hidden pb-8">
          <div className="animate-marquee flex gap-4 w-max">
            {[...BRAND.products, ...BRAND.products].map((product, i) => (
              <a
                key={i}
                href={product.buyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex-shrink-0 w-36 md:w-48"
              >
                <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#E5DDD5]">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="192px"
                  />
                  <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <span className="bg-[#FAFAF8] text-[#1A1A1A] text-xs font-medium px-3 py-1.5 rounded-full">
                      Buy →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>


      </div> {/* /z-10 content wrapper */}
    </div>
  )
}
