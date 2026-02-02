import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function GET() {
    try {
        const { supabaseAdmin } = await import('@/lib/supabase')

        // 1. Supabase에서 조회 시도
        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin
                .from('applications')
                .select('id, name, email, source, status, created_at, payload')
                .order('created_at', { ascending: false })

            if (!error) {
                return NextResponse.json(data)
            }
            console.error('⚠️ Supabase fetch error, fallback to local:', error.message)
        }

        // 2. Fallback: Local Storage 조회
        const { getApplications } = await import('@/lib/storage')
        const localApps = getApplications()

        // local storage data structure를 Supabase와 맞춤 (created_at 필드 등)
        const standardizedApps = localApps.map(app => ({
            ...app,
            created_at: app.created_at || (app as any).appliedAt,
            source: app.source || 'Local Fallback'
        })).sort((a, b) =>
            new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
        )

        return NextResponse.json(standardizedApps)

    } catch (error: any) {
        console.error('Fetch error:', error)
        return NextResponse.json({ error: 'Failed to fetch applications', details: error.message }, { status: 500 })
    }
}
