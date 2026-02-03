# Integrate 단계 문서

> 작성일: 2026-02-03
> 목적: 기존 코드베이스 분석 및 기술적 통합 계획 수립

---

## 1. 현재 코드베이스 분석 결과

### 1-1. 구현 완료된 기능

| 기능 | 상태 | 위치 |
|------|------|------|
| 지원자 CRUD | ✅ 완성 | `/api/applications`, `/api/apply` |
| Job CRUD | ✅ 완성 | `/api/admin/jobs` |
| 자동 이메일 발송 | ✅ 완성 | `lib/email.ts` |
| Supabase 연동 | ✅ 완성 | `lib/supabase.ts` |
| 로컬 폴백 스토리지 | ✅ 완성 | `lib/storage.ts` |
| 어드민 대시보드 | ⚠️ 부분 | `/admin/page.tsx` |
| 이메일 로그 | ✅ 기본 | `notification_logs` 테이블 |

### 1-2. 발견된 문제점

| 우선순위 | 문제 | 영향 |
|----------|------|------|
| 🔴 높음 | Job 인터페이스 불일치 (`jobs.ts` vs `storage.ts`) | 타입 오류, 런타임 에러 |
| 🔴 높음 | API 엔드포인트 중복 (`/api/apply` vs `/api/applications`) | 유지보수 어려움 |
| 🟡 중간 | 로컬 스토리지 동시성 제어 없음 | 데이터 손상 가능성 |
| 🟡 중간 | 어드민 검색/필터 미구현 | UX 불편 |
| 🟢 낮음 | Send Email 버튼 미구현 | 기능 불완전 |

---

## 2. DB 스키마 분석 및 확장 계획

### 2-1. 현재 스키마

```sql
-- applications 테이블 (기존)
CREATE TABLE applications (
    id UUID PRIMARY KEY,
    created_at TIMESTAMPTZ,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    source TEXT,
    status TEXT DEFAULT 'applied',
    payload JSONB,
    status_updated_at TIMESTAMPTZ,
    notified_status TEXT,
    notified_at TIMESTAMPTZ,
    notification_lock BOOLEAN DEFAULT false
);

-- notification_logs 테이블 (기존)
CREATE TABLE notification_logs (
    id UUID PRIMARY KEY,
    application_id UUID REFERENCES applications(id),
    event_type TEXT NOT NULL,
    to_email TEXT NOT NULL,
    subject TEXT NOT NULL,
    payload JSONB,
    status TEXT NOT NULL,  -- 'sent', 'failed'
    error TEXT,
    created_at TIMESTAMPTZ
);
```

### 2-2. 확장이 필요한 테이블

```sql
-- jobs 테이블 (신규 또는 확장)
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT DEFAULT 'Seoul, KR',
    type TEXT DEFAULT 'Full-time',
    description TEXT,
    responsibilities TEXT[],  -- 배열
    requirements TEXT[],      -- 배열
    status TEXT DEFAULT 'open',  -- 'open', 'closed'
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now()
);

-- applications 테이블 확장 (job_id 외래키)
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS job_id UUID REFERENCES jobs(id);
```

### 2-3. 스키마 변경 사항 요약

| 변경 | 이유 |
|------|------|
| `jobs` 테이블 생성 | 정적 데이터 → DB 관리로 전환 |
| `applications.job_id` 추가 | Job과 지원자 연결 |
| `jobs.responsibilities` 배열 | 상세 정보 저장 |
| `jobs.requirements` 배열 | 자격 요건 저장 |

---

## 3. 이메일 서비스 비교 및 선택

### 3-1. 후보 서비스 비교

| 항목 | Nodemailer (현재) | Resend | SendGrid |
|------|------------------|--------|----------|
| **설정 난이도** | 중간 (SMTP 필요) | 쉬움 (5분) | 중간 (30-60분) |
| **Next.js 통합** | API Route | 네이티브 지원 | SDK |
| **React 템플릿** | ❌ | ✅ React Email | ❌ |
| **무료 티어** | SMTP 의존 | 3,000/월 | 100/일 (60일) |
| **가격 (5만건)** | SMTP 비용 | $70/월 | ~$20/월 |
| **배달성** | SMTP 의존 | 자동 DKIM/SPF | 고급 |

### 3-2. 권장 선택: **Nodemailer 유지** (단기) → **Resend 전환** (중기)

**단기 (현재 유지):**
- 이미 Nodemailer로 4가지 템플릿 구현 완료
- SMTP 설정만 있으면 즉시 동작
- 추가 비용 없음

**중기 (Resend 전환 권장):**
- React Email로 템플릿 관리 용이
- Next.js와 네이티브 통합
- 배달성 자동 관리

---

## 4. 통합 계획

### Phase 1: 기반 정리 (우선순위 높음)

#### 1-1. 타입 통합
```typescript
// lib/types.ts (신규 생성)
export interface Job {
    id: string
    title: string
    department: string
    location: string
    type: string
    description: string
    responsibilities: string[]
    requirements: string[]
    status: 'open' | 'closed'
    created_at: string
    updated_at?: string
}

export interface Application {
    id: string
    name: string
    email: string
    job_id?: string
    status: ApplicationStatus
    payload: Record<string, any>
    source?: string
    created_at: string
    status_updated_at: string
    notified_status?: string
    notified_at?: string
}

export type ApplicationStatus =
    | 'applied'
    | 'screening'
    | 'interview'
    | 'hired'
    | 'rejected'

export type EmailEventType =
    | 'applied'
    | 'interview_invite'
    | 'rejected'
    | 'hired'
```

#### 1-2. API 엔드포인트 통합
```
현재:
  POST /api/apply          → 웹 폼 지원
  POST /api/applications   → 상세 지원

변경:
  POST /api/applications   → 통합 엔드포인트
  DELETE /api/apply        → 제거 (리다이렉트)
```

### Phase 2: DB 마이그레이션

#### 2-1. jobs 테이블 생성
```sql
-- supabase/migrations/001_create_jobs_table.sql
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    department TEXT NOT NULL,
    location TEXT DEFAULT 'Seoul, KR',
    type TEXT DEFAULT 'Full-time',
    description TEXT,
    responsibilities TEXT[] DEFAULT '{}',
    requirements TEXT[] DEFAULT '{}',
    status TEXT DEFAULT 'open' CHECK (status IN ('open', 'closed')),
    created_at TIMESTAMPTZ DEFAULT now() NOT NULL,
    updated_at TIMESTAMPTZ DEFAULT now() NOT NULL
);

-- RLS 활성화
ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;

-- 인덱스
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs (status);
CREATE INDEX IF NOT EXISTS idx_jobs_department ON jobs (department);
```

#### 2-2. applications 테이블 수정
```sql
-- supabase/migrations/002_add_job_id_to_applications.sql
ALTER TABLE applications
ADD COLUMN IF NOT EXISTS job_id UUID REFERENCES jobs(id) ON DELETE SET NULL;

CREATE INDEX IF NOT EXISTS idx_applications_job_id ON applications (job_id);
```

### Phase 3: 이메일 로그 강화

#### 3-1. 현재 로그 테이블 활용
```sql
-- notification_logs는 이미 잘 설계되어 있음
-- 추가로 통계 뷰 생성

CREATE OR REPLACE VIEW email_stats AS
SELECT
    DATE(created_at) as date,
    event_type,
    status,
    COUNT(*) as count
FROM notification_logs
GROUP BY DATE(created_at), event_type, status
ORDER BY date DESC;
```

### Phase 4: 어드민 기능 강화

| 기능 | 구현 방법 |
|------|----------|
| 검색 | 이름/이메일 필터 쿼리 |
| Job 필터 | job_id 기반 필터링 |
| 이메일 로그 조회 | notification_logs 연동 |
| 배치 상태 변경 | 다중 선택 UI |

---

## 5. 파일 변경 계획

### 신규 생성

| 파일 | 목적 |
|------|------|
| `lib/types.ts` | 통합 타입 정의 |
| `supabase/migrations/001_create_jobs_table.sql` | Jobs 테이블 |
| `supabase/migrations/002_add_job_id.sql` | job_id 외래키 |
| `app/admin/emails/page.tsx` | 이메일 로그 페이지 |

### 수정 필요

| 파일 | 변경 내용 |
|------|----------|
| `lib/jobs.ts` | 타입을 `lib/types.ts`에서 import |
| `lib/storage.ts` | 타입 통합, 동시성 개선 |
| `lib/email.ts` | 발송 날짜를 파라미터로 받도록 |
| `app/api/apply/route.ts` | `/api/applications`로 리다이렉트 |
| `app/admin/page.tsx` | 검색/필터 기능 추가 |

### 삭제 예정

| 파일 | 이유 |
|------|------|
| `app/api/apply/route.ts` | 엔드포인트 통합 후 |

---

## 6. 작업 우선순위

### 즉시 (1주차)
1. ✅ `lib/types.ts` 생성 및 타입 통합
2. ✅ API 엔드포인트 정리
3. ✅ Supabase jobs 테이블 마이그레이션

### 단기 (2주차)
4. 어드민 검색/필터 구현
5. 이메일 로그 조회 페이지
6. Send Email 버튼 구현

### 중기 (3-4주차)
7. Resend 전환 검토
8. 배치 작업 기능
9. 통계 대시보드

---

## 7. 확인 필요 사항

다음 단계로 넘어가기 전 확인이 필요합니다:

1. **이메일 서비스**: Nodemailer 유지 vs Resend 즉시 전환?
2. **jobs 테이블**: 정적 데이터(`lib/jobs.ts`) 유지 vs DB 전환?
3. **API 통합**: `/api/apply` 즉시 제거 vs 점진적 deprecation?

---

## 참고 자료

- [Resend vs SendGrid 비교](https://nextbuild.co/blog/resend-vs-sendgrid-vs-ses-email)
- [Next.js 이메일 서비스 가이드](https://dev.to/ethanleetech/5-best-email-services-for-nextjs-1fa2)
- [Supabase 마이그레이션 문서](https://supabase.com/docs/guides/database/migrations)

---

*이 문서는 Develop 단계 진입 전 기술적 통합 계획을 정리한 것입니다.*
