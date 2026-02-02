import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: parseInt(process.env.EMAIL_PORT || '587'),
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
})

interface SendEmailParams {
    to: string
    subject: string
    html: string
}

export async function sendEmail({ to, subject, html }: SendEmailParams) {
    if (!process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
        throw new Error('Email credentials are missing in environment variables.')
    }

    const info = await transporter.sendMail({
        from: `"Antigravity HR" <${process.env.EMAIL_USER}>`,
        to,
        subject,
        html,
    })

    return info
}

// templates.ts
export const getEmailTemplate = (type: 'applied' | 'interview_invite' | 'rejected' | 'hired', data: { name: string, jobTitle: string }) => {
    const { name, jobTitle } = data
    const companyName = "Antigravity Mobility & Robotics"

    const baseStyle = `
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #333;
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        border: 1px solid #e0e0e0;
        border-radius: 10px;
    `

    const templates = {
        applied: {
            subject: `[${companyName}] 지원이 성공적으로 접수되었습니다.`,
            html: `
                <div style="${baseStyle}">
                    <h2 style="color: #0070f3;">안녕하세요, ${name}님!</h2>
                    <p>Antigravity의 <strong>${jobTitle}</strong> 직무에 지원해 주셔서 진심으로 감사드립니다.</p>
                    <p>${name}님의 소중한 지원서가 성공적으로 접수되었습니다. 저희 채용팀에서 꼼꼼히 검토한 후, 전형 결과는 영업일 기준 7일 이내에 안내드릴 예정입니다.</p>
                    <div style="background: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <strong>[지원 정보]</strong><br/>
                        지원 직무: ${jobTitle}<br/>
                        접수 일시: ${new Date().toLocaleString()}
                    </div>
                    <p>궁금하신 점이 있다면 언제든 이 메일로 문의해 주세요.</p>
                    <br/>
                    <p>감사합니다.<br/>${companyName} 채용팀 드림</p>
                </div>
            `
        },
        interview_invite: {
            subject: `[${companyName}] ${jobTitle} 직무 면접 제안드립니다.`,
            html: `
                <div style="${baseStyle}">
                    <h2 style="color: #0070f3;">안녕하세요, ${name}님!</h2>
                    <p>Antigravity의 <strong>${jobTitle}</strong> 직무에 지원해 주셔서 감사합니다.</p>
                    <p>${name}님의 화려한 경력과 역량이 저희 Antigravity가 추구하는 미래 모빌리티 혁신에 큰 도움이 될 것으로 기대됩니다.</p>
                    <p>다음 단계인 직무 면접 진행을 위해 일정을 조율하고자 합니다.</p>
                    <div style="background: #f0f7ff; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <strong>[다음 단계 안내]</strong><br/>
                        곧 담당자가 유선 또는 메일로 연락하여 면접 일정을 안내드릴 예정입니다.
                    </div>
                    <p>궁금하신 점이 있다면 언제든 이 메일로 답장 부탁드립니다.</p>
                    <br/>
                    <p>감사합니다.<br/>${companyName} 채용팀 드림</p>
                </div>
            `
        },
        rejected: {
            subject: `[${companyName}] ${jobTitle} 직무 지원 결과 안내드립니다.`,
            html: `
                <div style="${baseStyle}">
                    <h2>안녕하세요, ${name}님.</h2>
                    <p>Antigravity의 <strong>${jobTitle}</strong> 직무에 관심을 가지고 지원해 주셔서 진심으로 감사드립니다.</p>
                    <p>제한된 인원을 선발해야 하는 과정에서, 아쉽게도 이번에는 ${name}님과 다음 단계를 함께하지 못하게 되었습니다.</p>
                    <p>${name}님의 우수한 역량에도 불구하고, 현재 저희 팀의 필요 요건과 더 구합하는 분을 모시게 된 점 양해 부탁드립니다.</p>
                    <p>비록 이번에는 인연이 닿지 않았으나, 향후 더 좋은 기회로 다시 뵙기를 진심으로 기원합니다.</p>
                    <br/>
                    <p>감사합니다.<br/>${companyName} 채용팀 드림</p>
                </div>
            `
        },
        hired: {
            subject: `[${companyName}] ${jobTitle} 직무 최종 합격을 축하드립니다!`,
            html: `
                <div style="${baseStyle}">
                    <h2 style="color: #28a745;">축하합니다, ${name}님!</h2>
                    <p>Antigravity의 <strong>${jobTitle}</strong> 직무에 최종 합격하셨음을 기쁜 마음으로 안내드립니다.</p>
                    <p>${name}님과 함께 미래 모빌리티의 새로운 지평을 열어가게 되어 매우 영광입니다.</p>
                    <p>입사 일정 및 구체적인 처우 협의를 위해 조만간 인사팀에서 별도로 연락드릴 예정입니다.</p>
                    <div style="background: #f3faf4; padding: 15px; border-radius: 5px; margin: 20px 0;">
                        <strong>[입사 준비 안내]</strong><br/>
                        1. 채용 검진 안내 (별도 메일 발송)<br/>
                        2. 필요 서류 준비 안내
                    </div>
                    <p>Antigravity의 새로운 여정에 합류하신 것을 다시 한번 환영합니다!</p>
                    <br/>
                    <p>감사합니다.<br/>${companyName} 채용팀 드림</p>
                </div>
            `
        }
    }

    return templates[type]
}
