-- jobs 테이블 생성
-- Supabase SQL Editor에서 실행하세요

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

-- applications 테이블에 job_id 컬럼 추가 (이미 있으면 무시)
DO $$
BEGIN
    IF NOT EXISTS (SELECT 1 FROM information_schema.columns
                   WHERE table_name = 'applications' AND column_name = 'job_id') THEN
        ALTER TABLE applications ADD COLUMN job_id UUID REFERENCES jobs(id) ON DELETE SET NULL;
    END IF;
END $$;
