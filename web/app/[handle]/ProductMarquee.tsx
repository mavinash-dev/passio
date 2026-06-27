'use client'

import { useRef, useEffect } from 'react'

type Product = {
  id: string
  name: string
  image_url: string | null
  buy_url: string | null
}

type Props = {
  products: Product[]
  instagramHandle: string | null
}

export default function ProductMarquee({ products, instagramHandle }: Props) {
  const trackRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)
  const animFrameRef = useRef<number | null>(null)
  const posRef = useRef(0)
  const loopWidthRef = useRef(0)
  const isDragging = useRef(false)
  const dragStartX = useRef(0)
  const dragStartPos = useRef(0)
  const isPaused = useRef(false)
  const resumeTimer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const SPEED = 0.6

  useEffect(() => {
    const track = trackRef.current
    const sentinel = sentinelRef.current
    if (!track || !sentinel) return

    // Measure loop width after images have had a chance to load
    function measure() {
      if (sentinel) loopWidthRef.current = sentinel.offsetLeft
    }

    // Re-measure on image load so width is accurate
    const imgs = track.querySelectorAll('img')
    imgs.forEach((img) => img.addEventListener('load', measure))
    measure()

    function tick() {
      if (!isPaused.current) {
        posRef.current += SPEED
        const lw = loopWidthRef.current
        if (lw > 0 && posRef.current >= lw) posRef.current -= lw
        if (track) track.style.transform = `translateX(-${posRef.current}px)`
      }
      animFrameRef.current = requestAnimationFrame(tick)
    }

    animFrameRef.current = requestAnimationFrame(tick)
    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current)
      imgs.forEach((img) => img.removeEventListener('load', measure))
    }
  }, [])

  function pauseAndScheduleResume() {
    isPaused.current = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
    resumeTimer.current = setTimeout(() => {
      isPaused.current = false
    }, 100)
  }

  function clamp(val: number) {
    const lw = loopWidthRef.current
    if (val < 0) return 0
    if (lw > 0 && val >= lw) return lw - 1
    return val
  }

  function onMouseDown(e: React.MouseEvent) {
    isDragging.current = true
    dragStartX.current = e.clientX
    dragStartPos.current = posRef.current
    isPaused.current = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }

  function onMouseMove(e: React.MouseEvent) {
    if (!isDragging.current || !trackRef.current) return
    const next = clamp(dragStartPos.current + (dragStartX.current - e.clientX))
    posRef.current = next
    trackRef.current.style.transform = `translateX(-${next}px)`
  }

  function onMouseUp() {
    if (!isDragging.current) return
    isDragging.current = false
    pauseAndScheduleResume()
  }

  function onTouchStart(e: React.TouchEvent) {
    dragStartX.current = e.touches[0].clientX
    dragStartPos.current = posRef.current
    isPaused.current = true
    if (resumeTimer.current) clearTimeout(resumeTimer.current)
  }

  function onTouchMove(e: React.TouchEvent) {
    if (!trackRef.current) return
    const next = clamp(dragStartPos.current + (dragStartX.current - e.touches[0].clientX))
    posRef.current = next
    trackRef.current.style.transform = `translateX(-${next}px)`
  }

  function onTouchEnd() {
    pauseAndScheduleResume()
  }

  return (
    <div
      className="overflow-hidden pb-8 cursor-grab active:cursor-grabbing select-none"
      onMouseDown={onMouseDown}
      onMouseMove={onMouseMove}
      onMouseUp={onMouseUp}
      onMouseLeave={onMouseUp}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div
        ref={trackRef}
        className="flex gap-4 w-max will-change-transform"
      >
        {/* First set */}
        {products.map((product, i) => (
          <ProductCard
            key={`a-${i}`}
            product={product}
            instagramHandle={instagramHandle}
            posRef={posRef}
            dragStartPos={dragStartPos}
          />
        ))}

        {/* Sentinel marks the exact loop boundary */}
        <div ref={sentinelRef} className="flex-shrink-0 w-0" aria-hidden="true" />

        {/* Second set (clone) */}
        {products.map((product, i) => (
          <ProductCard
            key={`b-${i}`}
            product={product}
            instagramHandle={instagramHandle}
            posRef={posRef}
            dragStartPos={dragStartPos}
          />
        ))}
      </div>
    </div>
  )
}

function ProductCard({
  product,
  instagramHandle,
  posRef,
  dragStartPos,
}: {
  product: { id: string; name: string; image_url: string | null; buy_url: string | null }
  instagramHandle: string | null
  posRef: React.RefObject<number>
  dragStartPos: React.RefObject<number>
}) {
  const label = product.buy_url ? 'Buy →' : 'DM to order →'
  const hasDest = !!(product.buy_url || instagramHandle)

  return (
    <a
      href={`/go/${product.id}`}
      target="_blank"
      rel="noopener noreferrer"
      draggable={false}
      className="group flex-shrink-0 w-36 md:w-48"
      onClick={(e) => {
        if (Math.abs((posRef.current ?? 0) - (dragStartPos.current ?? 0)) > 5) {
          e.preventDefault()
        }
      }}
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-[#E5DDD5]">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
            draggable={false}
          />
        ) : null}
        {hasDest && (
          <div className="absolute inset-0 flex items-end p-3 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="bg-[#FAFAF8] text-[#1A1A1A] text-xs font-medium px-3 py-1.5 rounded-full">
              {label}
            </span>
          </div>
        )}
      </div>
    </a>
  )
}
