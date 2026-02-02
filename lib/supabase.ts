import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''

if (!supabaseUrl || !supabaseServiceRoleKey) {
    console.warn('⚠️ Supabase credentials are missing in environment variables.')
}

// Admin client with service_role for bypassing RLS
// URL이 유효하지 않으면 null을 반환하여 API에서 예외 처리를 할 수 있게 합니다.
export const supabaseAdmin = (supabaseUrl && supabaseUrl.startsWith('http'))
    ? createClient(supabaseUrl, supabaseServiceRoleKey, {
        auth: {
            autoRefreshToken: false,
            persistSession: false
        }
    })
    : null
