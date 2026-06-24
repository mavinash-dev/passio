export function isDemoModeClient(): boolean {
  if (typeof document === 'undefined') return false
  return document.cookie.split(';').some(c => c.trim().startsWith('passio_demo=1'))
}
