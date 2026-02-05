import { NextResponse } from 'next/server'

export async function GET(request: Request) {
    try {
        const { supabaseAdmin } = await import('@/lib/supabase')

        if (!supabaseAdmin) {
            return NextResponse.json(
                { error: 'Database connection not available' },
                { status: 503 }
            )
        }

        // URL 파라미터로 필터링 옵션 받기
        const { searchParams } = new URL(request.url)
        const status = searchParams.get('status') // 'sent' | 'failed' | null
        const eventType = searchParams.get('event_type') // 'applied', 'interview_invite', etc.
        const limit = parseInt(searchParams.get('limit') || '50')

        // 쿼리 빌드
        let query = supabaseAdmin
            .from('notification_logs')
            .select(`
                id,
                application_id,
                event_type,
                to_email,
                subject,
                status,
                error,
                created_at,
                applications (
                    name,
                    email
                )
            `)
            .order('created_at', { ascending: false })
            .limit(limit)

        // 필터 적용
        if (status) {
            query = query.eq('status', status)
        }
        if (eventType) {
            query = query.eq('event_type', eventType)
        }

        const { data, error } = await query

        if (error) {
            console.error('Failed to fetch notification logs:', error)
            return NextResponse.json(
                { error: 'Failed to fetch notification logs', details: error.message },
                { status: 500 }
            )
        }

        // 통계 계산
        const { data: statsData } = await supabaseAdmin
            .from('notification_logs')
            .select('status')

        const stats = {
            total: statsData?.length || 0,
            sent: statsData?.filter(s => s.status === 'sent').length || 0,
            failed: statsData?.filter(s => s.status === 'failed').length || 0
        }

        return NextResponse.json({ logs: data, stats })

    } catch (error: any) {
        console.error('Notification logs fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch notification logs', details: error.message },
            { status: 500 }
        )
    }
}
