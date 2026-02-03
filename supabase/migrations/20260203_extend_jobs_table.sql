-- ==========================================
-- Jobs 테이블 확장 마이그레이션
-- 날짜: 2026-02-03
-- 목적: 채용 공고 상세 정보 필드 추가
-- ==========================================

-- 1. 기존 테이블에 새 컬럼 추가 (이미 존재하면 스킵)
-- location: 근무 위치
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS location TEXT DEFAULT 'Seoul, KR';

-- type: 고용 형태 (Full-time, Part-time, Contract 등)
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS type TEXT DEFAULT 'Full-time';

-- responsibilities: 담당 업무 (배열)
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS responsibilities TEXT[] DEFAULT '{}';

-- requirements: 자격 요건 (배열)
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS requirements TEXT[] DEFAULT '{}';

-- updated_at: 수정 일시
ALTER TABLE jobs
ADD COLUMN IF NOT EXISTS updated_at TIMESTAMPTZ DEFAULT now();

-- 2. updated_at 자동 갱신 트리거 (선택사항)
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 기존 트리거가 있으면 삭제 후 재생성
DROP TRIGGER IF EXISTS update_jobs_updated_at ON jobs;

CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- 3. RLS 활성화 (아직 안 되어 있다면)
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 4. 인덱스 추가
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs (department);

-- 5. 코멘트 추가 (문서화)
COMMENT ON TABLE jobs IS '채용 공고 테이블';
COMMENT ON COLUMN jobs.location IS '근무 위치 (예: Seoul, KR)';
COMMENT ON COLUMN jobs.type IS '고용 형태 (Full-time, Part-time, Contract)';
COMMENT ON COLUMN jobs.responsibilities IS '담당 업무 목록 (배열)';
COMMENT ON COLUMN jobs.requirements IS '자격 요건 목록 (배열)';
