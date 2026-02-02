import { NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'
import { saveApplication } from '@/lib/storage'

export async function POST(req: Request) {
    let body: any
    try {
        body = await req.json()
    } catch (e) {
        return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 })
    }

    const { name, email, source, ...rest } = body

    try {
        // 1. Supabase insert 시도
        if (!supabaseAdmin) throw new Error('Supabase client not initialized')
        const { data: dbData, error: dbError } = await supabaseAdmin!
            .from('applications')
            .insert([
                {
                    name: name || 'Anonymous',
                    email: email || 'No Email',
                    source: source || 'Direct',
                    payload: body, // 전체 원본 데이터 저장
                    status: 'applied'
                }
            ])
            .select()

        if (dbError) throw dbError

        console.log('✅ Supabase insert success:', dbData)

        const applicationData = dbData[0]

        // 2. Send confirmation email
        try {
            const { sendEmail, getEmailTemplate } = await import('@/lib/email')
            const jobTitle = body.jobTitle || body.job_title || 'Unknown Position'
            const template = getEmailTemplate('applied', { name, jobTitle })

            await sendEmail({
                to: email,
                subject: template.subject,
                html: template.html
            })

            // Log successful email send
            await supabaseAdmin!.from('notification_logs').insert([{
                application_id: applicationData.id,
                event_type: 'applied',
                to_email: email,
                subject: template.subject,
                payload: { name, jobTitle },
                status: 'sent'
            }])

            console.log('✅ Confirmation email sent to:', email)
        } catch (emailError: any) {
            console.error('⚠️ Email send failed:', emailError.message)

            // Log failed email attempt
            try {
                await supabaseAdmin!.from('notification_logs').insert([{
                    application_id: applicationData.id,
                    event_type: 'applied',
                    to_email: email,
                    subject: 'Application Confirmation',
                    payload: { name, jobTitle: body.jobTitle || 'Unknown' },
                    status: 'failed',
                    error: emailError.message
                }])
            } catch (logError) {
                console.error('⚠️ Failed to log email error:', logError)
            }
        }

        // 3. n8n webhook 전송 (Background)
        const n8nWebhookUrl = process.env.N8N_WEBHOOK_URL
        if (n8nWebhookUrl) {
            fetch(n8nWebhookUrl, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    event: 'new_application',
                    data: applicationData
                })
            }).catch(err => console.error('⚠️ n8n webhook error:', err))
        }

        return NextResponse.json({
            success: true,
            provider: 'supabase',
            data: applicationData
        })

    } catch (error: any) {
        console.error('❌ Supabase failed, falling back to local storage:', error.message)

        // 3. Fallback: Local JSON 저장
        try {
            const fallbackData = {
                id: `fallback_${Math.random().toString(36).substring(7)}`,
                name: name || 'Anonymous',
                email: email || 'No Email',
                jobTitle: body.jobTitle || 'Unknown',
                resume: body.resume || '#',
                coverLetter: body.coverLetter || '',
                status: 'applied' as const,
                appliedAt: new Date().toISOString(),
                payload: body // 훗날 마이그레이션을 위해 원본 보존
            }

            saveApplication(fallbackData)

            return NextResponse.json({
                success: true,
                provider: 'local_fallback',
                message: 'Data saved locally due to database connection issue.'
            })
        } catch (fallbackError) {
            console.error('😱 Critical failure: Fallback also failed:', fallbackError)
            return NextResponse.json({
                error: 'All storage methods failed',
                details: error.message
            }, { status: 500 })
        }
    }
}

export async function PATCH(req: Request) {
    try {
        const body = await req.json()
        const { id, status } = body

        if (!id || !status) {
            return NextResponse.json({ error: 'Missing id or status' }, { status: 400 })
        }

        // 1. Supabase Update
        if (supabaseAdmin) {
            const { data, error } = await supabaseAdmin!
                .from('applications')
                .update({ status })
                .eq('id', id)
                .select()

            if (data && data.length > 0) {
                const updatedApp = data[0]

                // 2. n8n Trigger for Hiring Decisions
                if (status === 'hired' || status === 'rejected') {
                    const n8nUrl = process.env.N8N_WEBHOOK_URL
                    if (n8nUrl) {
                        fetch(n8nUrl, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({
                                event: 'hiring_decision',
                                data: updatedApp
                            })
                        }).then(r => {
                            if (r.ok) {
                                // Mark as mail sent in background if n8n confirms
                                supabaseAdmin!.from('applications').update({ result_mail_sent: true }).eq('id', id)
                            }
                        }).catch(e => console.error('n8n error:', e))
                    }
                }

                return NextResponse.json(updatedApp)
            }
        }

        // 3. Fallback for Local Storage (if ID starts with fallback_)
        if (id.toString().startsWith('fallback_')) {
            const { updateApplication } = await import('@/lib/storage')
            updateApplication(id, { status: status as any })
            return NextResponse.json({ success: true, id, status, provider: 'local' })
        }

        return NextResponse.json({ error: 'Applicant not found' }, { status: 404 })
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}
