import { createClient } from '@supabase/supabase-js'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
    const requestUrl = new URL(request.url)
    const code = requestUrl.searchParams.get('code')

    if (code) {
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

        const supabase = createClient(supabaseUrl, supabaseAnonKey)

        // OAuth 코드를 세션으로 교환
        await supabase.auth.exchangeCodeForSession(code)
    }

    // 로그인 페이지로 리디렉션 (로그인 상태 표시)
    return NextResponse.redirect(new URL('/admin/login', request.url))
}
