import { NextResponse } from 'next/server'
import { sendEmail } from '@/lib/email'

export async function POST(req: Request) {
    try {
        const { name, email, message } = await req.json()

        // 필수 필드 검증
        if (!name || !email || !message) {
            return NextResponse.json(
                { error: 'Name, email, and message are required' },
                { status: 400 }
            )
        }

        // 이메일 형식 검증
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
        if (!emailRegex.test(email)) {
            return NextResponse.json(
                { error: 'Invalid email format' },
                { status: 400 }
            )
        }

        // 관리자에게 알림 이메일 발송
        const adminEmail = process.env.ADMIN_EMAIL || process.env.FROM_EMAIL || 'admin@goldenhours.com'

        await sendEmail({
            to: adminEmail,
            subject: `[Golden Hours] New inquiry from ${name}`,
            html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1c1917; margin-bottom: 24px;">New Contact Inquiry</h2>

                    <div style="background: #fafaf9; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                        <p style="margin: 0 0 12px 0;"><strong>Name:</strong> ${name}</p>
                        <p style="margin: 0 0 12px 0;"><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
                    </div>

                    <div style="background: #fafaf9; padding: 24px; border-radius: 12px;">
                        <p style="margin: 0 0 8px 0; font-weight: 600; color: #78716c;">Message:</p>
                        <p style="margin: 0; color: #44403c; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>

                    <p style="margin-top: 24px; color: #a8a29e; font-size: 14px;">
                        Reply directly to this email to respond to ${name}.
                    </p>
                </div>
            `
        })

        // 사용자에게 확인 이메일 발송
        await sendEmail({
            to: email,
            subject: `Thank you for reaching out – Golden Hours`,
            html: `
                <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
                    <h2 style="color: #1c1917; margin-bottom: 24px;">Thank you, ${name}</h2>

                    <p style="color: #57534e; line-height: 1.6; margin-bottom: 24px;">
                        We've received your message and will get back to you soon.
                    </p>

                    <div style="background: #fafaf9; padding: 24px; border-radius: 12px; margin-bottom: 24px;">
                        <p style="margin: 0 0 8px 0; font-weight: 600; color: #78716c;">Your message:</p>
                        <p style="margin: 0; color: #44403c; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                    </div>

                    <p style="color: #57534e; line-height: 1.6;">
                        Best,<br />
                        The Golden Hours Team
                    </p>
                </div>
            `
        })

        return NextResponse.json({ success: true })
    } catch (error) {
        console.error('Contact form error:', error)
        return NextResponse.json(
            { error: 'Failed to send message' },
            { status: 500 }
        )
    }
}
