import { cookies } from 'next/headers'

export async function isDemoMode(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get('passio_demo')?.value === '1'
}

export function isDemoModeClient(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split(';').some(c => c.trim().startsWith('passio_demo=1'))
}
