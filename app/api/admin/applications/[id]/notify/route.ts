import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendEmail, getEmailTemplate } from '@/lib/email'

export async function POST(
    req: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    try {
        const { id } = await params
        const body = await req.json()
        const { eventType, force = false } = body // interview_invite, rejected, hired

        if (!eventType) {
            return NextResponse.json({ error: 'eventType is required' }, { status: 400 })
        }

        if (!supabaseAdmin) {
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
        }

        // 1. 지원자 정보 조회
        const { data: app, error: fetchError } = await supabaseAdmin
            .from('applications')
            .select('name, email, status, notified_status, payload')
            .eq('id', id)
            .single()

        if (fetchError || !app) {
            return NextResponse.json({ error: 'Application not found' }, { status: 404 })
        }

        // 중복 방지 로직 (force 옵션이 없을 때만 작동)
        const targetStatusMap: Record<string, string> = {
            'interview_invite': 'interview',
            'rejected': 'rejected',
            'hired': 'hired'
        }
        const targetStatus = targetStatusMap[eventType]

        if (!force && app.notified_status === targetStatus) {
            return NextResponse.json({
                error: 'Already notified for this status. Use force: true to re-send.'
            }, { status: 400 })
        }

        // 2. 메일 발송
        const jobTitle = app.payload?.jobTitle || '기타 포지션'
        const template = getEmailTemplate(eventType as any, { name: app.name, jobTitle })

        try {
            await sendEmail({
                to: app.email,
                subject: template.subject,
                html: template.html
            })

            // 발송 성공 기록 (로그는 매번 남김)
            await supabaseAdmin.from('notification_logs').insert({
                application_id: id,
                event_type: eventType,
                to_email: app.email,
                subject: template.subject,
                payload: { name: app.name, jobTitle, forced: force },
                status: 'sent'
            })

            // 지원자 테이블 업데이트
            if (targetStatus) {
                await supabaseAdmin.from('applications').update({
                    notified_status: targetStatus,
                    notified_at: new Date().toISOString()
                }).eq('id', id)
            }

            return NextResponse.json({ success: true, message: 'Notification sent successfully' })

        } catch (mailError: any) {
            console.error('Mail send error:', mailError)

            // 실패 기록
            await supabaseAdmin.from('notification_logs').insert({
                application_id: id,
                event_type: eventType,
                to_email: app.email,
                subject: template.subject,
                payload: { name: app.name, jobTitle, forced: force },
                status: 'failed',
                error: mailError.message
            })

            return NextResponse.json({ error: 'Failed to send email', details: mailError.message }, { status: 500 })
        }

    } catch (error: any) {
        console.error('Notify API error:', error)
        return NextResponse.json({ error: 'Internal server error', details: error.message }, { status: 500 })
    }
}
