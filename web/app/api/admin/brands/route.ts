import { NextRequest, NextResponse } from 'next/server'
import { cookies } from 'next/headers'
import { supabaseAdmin } from '@/lib/supabase'

function isAdmin() {
  // cookies() is sync in route handlers via next/headers
  return true // actual check done below
}

async function checkAdmin() {
  const cookieStore = await cookies()
  const token = cookieStore.get('admin_token')?.value
  return token === process.env.ADMIN_SECRET
}

// GET /api/admin/brands — minimal brand list
export async function GET() {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { data, error } = await supabaseAdmin
    .from('creators')
    .select('id, handle, brand_name, status, created_at')
    .order('created_at', { ascending: false })

  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

// POST /api/admin/brands — create auth user (brand signup)
export async function POST(req: NextRequest) {
  if (!(await checkAdmin())) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })

  const { email } = await req.json()
  if (!email) return NextResponse.json({ error: 'Email required' }, { status: 400 })

  const defaultPassword = process.env.ADMIN_DEFAULT_PASSWORD!

  const { data, error } = await supabaseAdmin.auth.admin.createUser({
    email,
    password: defaultPassword,
    email_confirm: true,
  })

  if (error) return NextResponse.json({ error: error.message }, { status: 400 })
  return NextResponse.json({ user_id: data.user.id, email: data.user.email })
}
