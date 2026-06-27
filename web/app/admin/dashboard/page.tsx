import { supabaseAdmin } from '@/lib/supabase'
import AdminDashboard from './AdminDashboard'

export default async function AdminDashboardPage() {
  // Auth is enforced by middleware — no need to re-check here

  // Only fetch pending creators upfront — everything else is on-demand
  const { data: pending } = await supabaseAdmin
    .from('creators')
    .select('id, handle, brand_name, tagline, instagram, website, created_at')
    .eq('status', 'pending')
    .order('created_at', { ascending: true })

  return <AdminDashboard initialPending={pending ?? []} />
}
