import { NextResponse } from 'next/server'
import { sendEmail, getEmailTemplate } from '@/lib/email'

/**
 * @deprecated 이 엔드포인트는 향후 제거될 예정입니다.
 * 대신 /api/applications (POST)를 사용하세요.
 *
 * 마이그레이션 가이드:
 * - 기존: POST /api/apply { name, email, jobTitle, job_id }
 * - 신규: POST /api/applications { name, email, jobTitle, job_id }
 */
export async function POST(req: Request) {
    // Deprecation 경고 로그
    console.warn('⚠️ [DEPRECATED] /api/apply is deprecated. Use /api/applications instead.')

    try {
        const body = await req.json()
        const { name, email, jobTitle, job_id } = body

        let synced = false

        // 1. Supabase Sync (Primary)
        try {
            const { supabaseAdmin } = await import('@/lib/supabase')
            if (supabaseAdmin) {
                const { error: dbError } = await supabaseAdmin
                    .from('applications')
                    .insert([
                        {
                            name: name || 'Anonymous',
                            email: email || 'No Email',
                            source: 'Web (Unified)',
                            job_id: job_id || null,
                            payload: { ...body },
                            status: 'applied'
                        }
                    ])

                if (!dbError) {
                    console.log('✅ Supabase sync success')
                    synced = true
                } else {
                    console.error('⚠️ Supabase insert error:', dbError.message)
                }
            } else {
                console.warn('⚠️ Supabase client not initialized (check .env.local)')
            }
        } catch (e: any) {
            console.error('⚠️ Supabase import/init error:', e.message)
        }

        // 2. Local Fallback (Always run if not synced to DB)
        if (!synced) {
            try {
                const { saveApplication } = await import('@/lib/storage')
                saveApplication({
                    id: `fallback_${Math.random().toString(36).substring(7)}`,
                    name: name || 'Anonymous',
                    email: email || 'No Email',
                    jobTitle: jobTitle || 'Unknown',
                    status: 'applied',
                    appliedAt: new Date().toISOString(),
                    job_id: job_id || null,
                    payload: { ...body }
                } as any)
                console.log('📦 Saved to local fallback')
            } catch (fallbackError: any) {
                console.error('❌ Local fallback failed:', fallbackError.message)
            }
        }

        // 3. Email Notification (Unified)
        try {
            const template = getEmailTemplate('applied', {
                name: name || '지원자',
                jobTitle: jobTitle || '포지션'
            })

            await sendEmail({
                to: email,
                subject: template.subject,
                html: template.html
            })
            console.log('📧 Unified email notification sent')
        } catch (emailError: any) {
            console.error('⚠️ Email failed:', emailError.message)
        }

        return NextResponse.json({ success: true, synced })
    } catch (error: any) {
        console.error('😱 Fatal API Error:', error)
        return NextResponse.json({ error: 'Critical failure', details: error.message }, { status: 500 })
    }
}

