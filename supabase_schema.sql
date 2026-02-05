-- ==========================================
-- 1. applications 테이블 생성
-- ==========================================
CREATE TABLE IF NOT EXISTS applications (
    -- 고유 식별자 (UUID)
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    
    -- 생성 일시 (자동 기록)
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    
    -- 지원자 이름
    name TEXT NOT NULL,
    
    -- 지원자 이메일 (중복 허용 요구사항 반영하여 UNIQUE 제외)
    email TEXT NOT NULL,
    
    -- 유입 경로 (예: 'google', 'linkedin', 'referral' 등)
    source TEXT,
    
    -- 지원 상태 (기본값: 'applied')
    -- 'applied', 'screening', 'interview', 'hired', 'rejected' 등으로 관리 가능
    status TEXT DEFAULT 'applied' NOT NULL,
    
    -- 지원서 전체 원본 데이터 및 추가 인사이트 저장용
    -- SQL 분석과 애플리케이션 유연성을 위해 JSONB 타입 사용
    payload JSONB DEFAULT '{}'::jsonb NOT NULL,
    
    -- 알림 관련 상태
    status_updated_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    notified_status TEXT,  -- 마지막으로 발송된 결과 타입
    notified_at TIMESTAMPTZ,
    notification_lock BOOLEAN DEFAULT false
);

-- ==========================================
-- 2. jobs 테이블 생성
-- ==========================================
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    description TEXT,
    responsibilities TEXT, -- 담당 업무 (줄바꿈으로 구분된 목록)
    requirements TEXT, -- 자격 요건 (줄바꿈으로 구분된 목록)
    status TEXT DEFAULT 'open' NOT NULL, -- 'open', 'closed'
    location TEXT,
    employment_type TEXT -- 'full-time', 'part-time', 'contract', 'internship'
);

-- RLS 활성화
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status);

-- ==========================================
-- 3. notification_logs 테이블 생성
-- ==========================================
CREATE TABLE IF NOT EXISTS notification_logs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    application_id UUID REFERENCES applications(id) ON DELETE CASCADE,
    event_type TEXT NOT NULL, -- 'interview_invite', 'rejected', 'hired'
    to_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    payload JSONB DEFAULT '{}'::jsonb, -- 템플릿 변수 등
    status TEXT NOT NULL, -- 'sent', 'failed'
    error TEXT,
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_notification_logs_application_id ON notification_logs (application_id);

-- ==========================================
-- 4. 성능 향상을 위한 인덱스 추가 (선택사항)
-- ==========================================
-- 이메일 검색이 잦을 경우 대비
CREATE INDEX IF NOT EXISTS idx_applications_email ON applications (email);
-- 상태별 퍼널 분석 속도 향상 대비
CREATE INDEX IF NOT EXISTS idx_applications_status ON applications (status);

-- ==========================================
-- 5. RLS (Row Level Security) 설정
-- ==========================================
-- MVP 단계이므로 RLS를 활성화하고 모든 접근을 제한한 뒤,
-- 서버 사이드에서 service_role 키(Admin)로만 접근하도록 설정합니다.
ALTER TABLE applications ENABLE ROW LEVEL SECURITY;

-- 상세 설명:
-- 1. name, email 등 기본 필드는 인덱싱과 빠른 쿼리를 위해 text로 분리했습니다.
-- 2. payload 컬럼은 n8n 연동이나 추후 폼 필드 변경 시 유연하게 대응할 수 있도록 JSONB로 설계했습니다.
-- 3. status 컬럼은 기존에 구현한 퍼널 분석 프로젝트와 연동되는 핵심 지표입니다.
