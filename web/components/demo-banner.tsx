'use client'

import { useEffect, useState } from 'react'

export function DemoBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setShow(document.cookie.split(';').some(c => c.trim().startsWith('passio_demo=1')))
  }, [])

  if (!show) return null

  return (
    <div className="fixed bottom-4 left-4 z-[200] flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-full px-3 py-1.5 shadow-sm">
      <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse flex-shrink-0" />
      <span className="text-xs font-sans text-amber-800 font-medium">Demo mode</span>
      <a
        href="/demo/exit"
        className="text-xs font-sans text-amber-600 hover:text-amber-900 underline underline-offset-2 transition-colors"
      >
        Exit
      </a>
    </div>
  )
}
