/**
 * 프로젝트 전역 타입 정의
 * 모든 컴포넌트와 API에서 이 타입들을 사용합니다.
 */

// ============================================
// Job 관련 타입
// ============================================

export interface Job {
    id: string
    title: string
    department: string
    location: string
    type: string // 'Full-time', 'Part-time', 'Contract' 등
    description: string
    responsibilities: string[]
    requirements: string[]
    status: JobStatus
    created_at: string
    updated_at?: string
}

export type JobStatus = 'open' | 'closed'

// Supabase에서 가져온 Job (일부 필드가 null일 수 있음)
export interface JobFromDB {
    id: string
    title: string
    department: string
    location?: string | null
    type?: string | null
    description?: string | null
    responsibilities?: string[] | null
    requirements?: string[] | null
    status: string
    created_at: string
    updated_at?: string | null
}

// Job 생성 시 필요한 필드
export interface CreateJobInput {
    title: string
    department: string
    location?: string
    type?: string
    description?: string
    responsibilities?: string[]
    requirements?: string[]
    status?: JobStatus
}

// ============================================
// Application (지원자) 관련 타입
// ============================================

export interface Application {
    id: string
    name: string
    email: string
    job_id?: string
    status: ApplicationStatus
    source?: string
    payload: ApplicationPayload
    created_at: string
    status_updated_at: string
    notified_status?: EmailEventType | null
    notified_at?: string | null
    notification_lock?: boolean
}

export type ApplicationStatus =
    | 'applied'      // 지원 완료
    | 'screening'    // 서류 검토 중
    | 'interview'    // 면접 진행
    | 'hired'        // 합격
    | 'rejected'     // 불합격

// payload에 저장되는 추가 데이터
export interface ApplicationPayload {
    jobTitle?: string
    resume?: string
    coverLetter?: string
    portfolio?: string
    score?: number          // AI Talent Insight 점수
    insights?: string[]     // AI 분석 인사이트
    [key: string]: any      // 추가 필드 허용
}

// 지원서 생성 시 필요한 필드
export interface CreateApplicationInput {
    name: string
    email: string
    job_id?: string
    jobTitle?: string
    resume?: string
    coverLetter?: string
    source?: string
}

// ============================================
// Email 관련 타입
// ============================================

export type EmailEventType =
    | 'applied'           // 지원 접수 확인
    | 'interview_invite'  // 면접 초대
    | 'rejected'          // 불합격 안내
    | 'hired'             // 합격 안내

export interface EmailTemplateData {
    name: string
    jobTitle: string
    appliedAt?: string    // 지원 일시 (선택)
}

export interface SendEmailParams {
    to: string
    subject: string
    html: string
}

// ============================================
// Notification Log 타입
// ============================================

export interface NotificationLog {
    id: string
    application_id: string
    event_type: EmailEventType
    to_email: string
    subject: string
    payload?: Record<string, any>
    status: 'sent' | 'failed'
    error?: string | null
    created_at: string
}

// ============================================
// API Response 타입
// ============================================

export interface ApiResponse<T = any> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface ApplicationUpdateResponse {
    success: boolean
    status_updated: boolean
    notification_triggered: boolean
    notification_failed: boolean
    error?: string
}

// ============================================
// 유틸리티 타입
// ============================================

// DB에서 가져온 Job을 완전한 Job 타입으로 변환
export function normalizeJob(job: JobFromDB): Job {
    return {
        id: job.id,
        title: job.title,
        department: job.department,
        location: job.location || 'Seoul, KR',
        type: job.type || 'Full-time',
        description: job.description || '',
        responsibilities: job.responsibilities || [],
        requirements: job.requirements || [],
        status: (job.status as JobStatus) || 'open',
        created_at: job.created_at,
        updated_at: job.updated_at || undefined
    }
}

// ApplicationStatus를 EmailEventType으로 변환
export function statusToEmailEvent(status: ApplicationStatus): EmailEventType | null {
    const mapping: Partial<Record<ApplicationStatus, EmailEventType>> = {
        interview: 'interview_invite',
        rejected: 'rejected',
        hired: 'hired'
    }
    return mapping[status] || null
}
