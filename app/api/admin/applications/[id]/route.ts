import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { sendEmail, getEmailTemplate } from '@/lib/email'

export async function PATCH(
    req: Request,
    { params }: { params: { id: string } }
) {
    try {
        const { id } = params
        const body = await req.json()
        const { status } = body

        if (!status) {
            return NextResponse.json({ error: 'Status is required' }, { status: 400 })
        }

        console.log(`[DEBUG] Updating application ${id} to status: ${status}`)

        if (!supabaseAdmin) {
            console.error('[DEBUG] supabaseAdmin is NOT initialized. Check SUPABASE_SERVICE_ROLE_KEY.')
            return NextResponse.json({ error: 'Database connection failed' }, { status: 500 })
        }

        // 1. 기존 데이터 조회 (중복 발송 확인 및 메일 템플릿용 정보 획득)
        const { data: app, error: fetchError } = await supabaseAdmin
            .from('applications')
            .select('name, email, status, notified_status, payload')
            .eq('id', id)
            .single()

        if (fetchError || !app) {
            console.error(`[DEBUG] Fetch error or App not found in Supabase for ID: ${id}`, fetchError)
            return NextResponse.json({ error: 'Application not found in database. Is it a fallback record?', details: fetchError?.message }, { status: 404 })
        }

        console.log(`[DEBUG] Found application: ${app.name}, current notified_status: ${app.notified_status}`)

        // 2. 상태 업데이트
        const { error: updateError } = await supabaseAdmin
            .from('applications')
            .update({
                status,
                status_updated_at: new Date().toISOString()
            })
            .eq('id', id)

        if (updateError) {
            console.error('[DEBUG] DB Update Error:', updateError)
            throw updateError
        }

        // 3. 알림 발송 조건 확인 (interview, rejected, hired 중 하나이며 아직 발송되지 않았을 때)
        const triggerStatuses = ['interview', 'rejected', 'hired']
        const eventTypeMap: Record<string, any> = {
            'interview': 'interview_invite',
            'rejected': 'rejected',
            'hired': 'hired'
        }

        let notification_failed = false
        const shouldNotify = triggerStatuses.includes(status) && app.notified_status !== status

        console.log(`[DEBUG] Should notify? ${shouldNotify} (Trigger list: ${triggerStatuses.includes(status)}, Already notified: ${app.notified_status === status})`)

        if (shouldNotify) {
            const eventType = eventTypeMap[status]
            const jobTitle = app.payload?.jobTitle || '기타 포지션' // payload에서 공고명 추출 시도
            const template = getEmailTemplate(eventType, { name: app.name, jobTitle })

            try {
                console.log(`[DEBUG] Attempting to send email to ${app.email} for event: ${eventType}`)
                // 이메일 발송
                await sendEmail({
                    to: app.email,
                    subject: template.subject,
                    html: template.html
                })
                console.log('[DEBUG] Email sent successfully')

                // 발송 성공 기록
                const { error: logError } = await supabaseAdmin.from('notification_logs').insert({
                    application_id: id,
                    event_type: eventType,
                    to_email: app.email,
                    subject: template.subject,
                    payload: { name: app.name, jobTitle },
                    status: 'sent'
                })

                if (logError) console.error('[DEBUG] Failed to write SUCCESS log to DB:', logError)

                // 지원자 테이블 업데이트
                await supabaseAdmin.from('applications').update({
                    notified_status: status,
                    notified_at: new Date().toISOString()
                }).eq('id', id)

            } catch (mailError: any) {
                console.error('[DEBUG] Mail send error:', mailError)
                notification_failed = true

                // 실패 기록
                const { error: logError } = await supabaseAdmin.from('notification_logs').insert({
                    application_id: id,
                    event_type: eventType,
                    to_email: app.email,
                    subject: template.subject,
                    payload: { name: app.name, jobTitle },
                    status: 'failed',
                    error: mailError.message
                })

                if (logError) console.error('[DEBUG] Failed to write FAILURE log to DB:', logError)
            }
        }

        return NextResponse.json({
            success: true,
            status_updated: true,
            notification_triggered: shouldNotify,
            notification_failed
        })
    } catch (error: any) {
        console.error('Update error:', error)
        return NextResponse.json({ error: 'Failed to update status', details: error.message }, { status: 500 })
    }
}
