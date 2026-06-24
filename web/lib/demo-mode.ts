import { cookies } from 'next/headers'

export async function isDemoMode(): Promise<boolean> {
  const cookieStore = await cookies()
  return cookieStore.get('passio_demo')?.value === '1'
}
