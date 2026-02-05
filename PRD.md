# PRD: Antigravity 채용 플랫폼

> **Product Requirements Document**
> 버전: 1.0 | 작성일: 2026-02-03

---

## 1. 프로젝트 한 줄 정의

**"스타트업/중소기업을 위한 심플하고 브랜딩 중심의 채용 플랫폼"**

복잡한 ATS 없이도 채용 공고 게시부터 지원자 관리, 자동 이메일 발송까지 한 곳에서 처리할 수 있는 올인원 채용 솔루션.

---

## 2. 프로젝트 배경 및 문제 정의

### 2-1. 시장 조사 결과

| 발견 | 데이터 |
|------|--------|
| SMB 채용 담당자의 50%가 급여 기대치 충족에 어려움 | Robert Half 2025 |
| 40%+가 느린 채용 프로세스로 우수 후보자 이탈 경험 | Robert Half 2025 |
| 기존 ATS 사용자 75%가 커스터마이징 부족 불만 | Capterra Reviews |
| 한국 스타트업 채용 공고 43% 감소 (2022→2025) | KoreaTechDesk |

### 2-2. 기존 솔루션의 한계

| 서비스 | 문제점 |
|--------|--------|
| Greenhouse, Workable | 고가 ($299/월~), SMB에게 과도한 기능 |
| 사람인, 잡코리아 | 광고 중심 수익모델, 채용 브랜딩 어려움 |
| 원티드 | IT/스타트업 특화지만 채용 성공 수수료 부담 |

### 2-3. 우리의 가설

> "채용 브랜딩 페이지 + 심플한 지원자 관리 + 자동화된 커뮤니케이션"을 하나로 통합하면,
> 전담 HR 없는 스타트업도 전문적인 채용 경험을 제공할 수 있다.

---

## 3. 타겟 사용자 페르소나

### 페르소나 A: 스타트업 운영팀장 "김대표"

| 항목 | 내용 |
|------|------|
| **역할** | 시리즈 A 스타트업 COO (직원 15명) |
| **채용 현황** | 분기별 2-3명 채용, HR 전담자 없음 |
| **Pain Point** | 지원자 이메일 일일이 보내기 번거로움, 채용 현황 공유 어려움 |
| **Goal** | 최소한의 시간으로 전문적인 채용 프로세스 운영 |
| **Behavior** | Notion으로 지원자 관리 중, 이메일은 수동 발송 |

### 페르소나 B: 외부 지원자 "이개발"

| 항목 | 내용 |
|------|------|
| **역할** | 3년차 프론트엔드 개발자, 이직 준비 중 |
| **채용 현황** | 원티드, 로켓펀치에서 공고 탐색 |
| **Pain Point** | 지원 후 "블랙홀" - 결과 안내 없음, 회사 문화 파악 어려움 |
| **Goal** | 투명한 채용 프로세스, 회사 문화 미리 파악 |
| **Behavior** | 회사 채용 페이지 직접 방문, 기업 문화 중시 |

---

## 4. 핵심 기능 (우선순위 순)

### P0: Must Have (MVP)

#### 4-1. 채용 공고 조회 + 지원

**기능 설명**
- 채용 공고 목록 페이지 (`/jobs`)
- 공고 상세 페이지 (`/jobs/[id]`)
- 지원서 제출 모달 (이름, 이메일, 이력서 링크, 자기소개)

**의사결정 근거**
- 채용 플랫폼의 가장 기본적인 가치 제안
- 지원자가 회사를 선택하는 첫 번째 터치포인트

**수용 기준 (Acceptance Criteria)**
```
GIVEN 지원자가 공고 상세 페이지에 접속했을 때
WHEN "지원하기" 버튼을 클릭하고 폼을 작성하면
THEN 지원서가 DB에 저장되고 확인 이메일이 발송된다
```

---

#### 4-2. 관리자 지원자 관리

**기능 설명**
- 어드민 대시보드 (`/admin`)
- 지원자 목록 조회 (필터링: 공고별, 상태별)
- 지원자 상태 변경 (applied → screening → interview → hired/rejected)
- 지원자 상세 정보 조회

**의사결정 근거**
- 시장 조사 결과: "느린 채용 프로세스"가 주요 Pain Point
- 칸반 보드 형태로 직관적인 상태 관리 제공
- 복잡한 워크플로우 대신 단순한 5단계 퍼널 채택

**수용 기준**
```
GIVEN 관리자가 지원자 목록을 조회할 때
WHEN 상태 드롭다운을 변경하면
THEN 즉시 DB에 반영되고, 트리거 조건 충족 시 이메일이 발송된다
```

**상태 흐름도**
```
applied → screening → interview → hired
                              ↘ rejected
```

---

#### 4-3. 상태 변경 트리거 기반 이메일 자동 발송

**기능 설명**
- 지원 완료 시: 접수 확인 이메일 자동 발송
- interview 상태 변경 시: 면접 안내 이메일 발송
- hired 상태 변경 시: 합격 축하 이메일 발송
- rejected 상태 변경 시: 불합격 안내 이메일 발송

**의사결정 근거**
- 시장 조사: 지원자 75%가 "지원 후 연락 없음"에 불만
- 수동 이메일 발송은 누락 위험 + 시간 소요
- 상태 변경과 이메일을 자동 연동하여 일관된 경험 제공

**트리거 조건**
| 상태 변경 | 이메일 타입 | 중복 방지 |
|----------|------------|----------|
| → applied | 지원 접수 확인 | 최초 1회만 |
| → interview | 면접 안내 | notified_status 체크 |
| → hired | 합격 안내 | notified_status 체크 |
| → rejected | 불합격 안내 | notified_status 체크 |

**수용 기준**
```
GIVEN 관리자가 지원자 상태를 "interview"로 변경했을 때
WHEN 해당 지원자에게 면접 안내 메일이 발송되지 않은 상태라면
THEN 자동으로 면접 안내 이메일이 발송되고 notification_logs에 기록된다
```

---

#### 4-4. 이메일 발송 로그 DB 저장

**기능 설명**
- 모든 이메일 발송 시도를 `notification_logs` 테이블에 기록
- 발송 성공/실패 상태, 에러 메시지, 타임스탬프 저장
- 관리자 대시보드에서 발송 이력 조회 가능

**의사결정 근거**
- 이메일 발송 실패 시 디버깅 필요
- 채용 운영 품질 모니터링 (발송률, 실패율)
- 법적 증빙 용도 (언제 무슨 내용을 보냈는지)

**데이터 스키마**
```sql
notification_logs (
  id UUID PRIMARY KEY,
  application_id UUID REFERENCES applications(id),
  event_type TEXT,      -- 'applied', 'interview_invite', 'rejected', 'hired'
  to_email TEXT,
  subject TEXT,
  status TEXT,          -- 'sent', 'failed'
  error TEXT,           -- 실패 시 에러 메시지
  created_at TIMESTAMPTZ
)
```

**수용 기준**
```
GIVEN 이메일 발송이 시도될 때
WHEN 성공하든 실패하든
THEN notification_logs 테이블에 결과가 기록된다
```

---

### P1: Should Have (Post-MVP)

#### 4-5. 채용 브랜딩 페이지

**기능 설명**
- 회사 소개 페이지 (`/company`)
- 기업 문화 페이지 (`/culture`)
- 비전, 핵심 가치, 복리후생 정보 제공

**의사결정 근거**
- 시장 조사: 지원자 40%+가 "회사 문화 적합성" 중시
- 별도 채용 브랜딩 사이트 운영 부담 제거
- 채용 공고와 회사 정보가 한 곳에 있어 전환율 향상

---

## 5. 화면 구성

### 5-1. 사이트맵

```
/                           # 홈 (히어로 + 주요 공고)
├── /jobs                   # 전체 채용 공고 목록
│   └── /jobs/[id]          # 공고 상세 + 지원 모달
├── /company                # 회사 소개
├── /culture                # 기업 문화
└── /admin                  # 관리자 대시보드 (인증 필요)
    └── /admin/applications/[id]  # 지원자 상세
```

### 5-2. 주요 화면 와이어프레임

#### 홈 페이지 (`/`)
```
┌─────────────────────────────────────┐
│  [Logo]              [Jobs] [About] │
├─────────────────────────────────────┤
│                                     │
│   "미래 모빌리티의                   │
│    새로운 지평을 열다"               │
│                                     │
│         [채용 공고 보기]             │
│                                     │
├─────────────────────────────────────┤
│  Featured Jobs                      │
│  ┌─────┐ ┌─────┐ ┌─────┐ ┌─────┐   │
│  │Job 1│ │Job 2│ │Job 3│ │Job 4│   │
│  └─────┘ └─────┘ └─────┘ └─────┘   │
└─────────────────────────────────────┘
```

#### 어드민 대시보드 (`/admin`)
```
┌─────────────────────────────────────┐
│  [Logo]    Dashboard                │
├─────────┬───────────────────────────┤
│         │ Stats                     │
│ [지원자] │ ┌───┐ ┌───┐ ┌───┐ ┌───┐ │
│ [공고]   │ │12 │ │ 3 │ │ 2 │ │ 1 │ │
│         │ │총  │ │공고│ │면접│ │합격│ │
│         │ └───┘ └───┘ └───┘ └───┘ │
│         ├───────────────────────────┤
│         │ Applicants Table          │
│         │ ┌─────────────────────┐   │
│         │ │ Name │ Job │ Status │   │
│         │ ├─────────────────────┤   │
│         │ │ 김○○ │ FE  │ [▼]   │   │
│         │ │ 이○○ │ BE  │ [▼]   │   │
│         │ └─────────────────────┘   │
└─────────┴───────────────────────────┘
```

---

## 6. 기술 스택

### 6-1. 아키텍처 개요

```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Browser   │────▶│   Vercel    │────▶│  Supabase   │
│  (Next.js)  │     │  (Edge)     │     │  (Postgres) │
└─────────────┘     └──────┬──────┘     └─────────────┘
                           │
                           ▼
                    ┌─────────────┐
                    │   Resend    │
                    │  (Email)    │
                    └─────────────┘
```

### 6-2. 기술 선택 및 근거

| 레이어 | 기술 | 선택 근거 |
|--------|------|----------|
| **Frontend** | Next.js 16 (App Router) | RSC 지원, Vercel 최적화, SEO 친화적 |
| **UI** | Tailwind CSS 4 | 빠른 프로토타이핑, 커스터마이징 용이 |
| **Backend** | Next.js API Routes | 별도 서버 불필요, 풀스택 통합 |
| **Database** | Supabase (PostgreSQL) | 무료 티어, RLS 보안, 실시간 기능 |
| **Email** | Resend | Next.js 네이티브 통합, React Email 지원, 심플한 API |
| **Hosting** | Vercel | Next.js 최적화, Edge Functions, 자동 배포 |
| **Language** | TypeScript | 타입 안정성, 개발자 경험, 유지보수성 |

### 6-3. 이메일 서비스 비교 (의사결정 과정)

| 항목 | Nodemailer | Resend | SendGrid |
|------|------------|--------|----------|
| Vercel 호환성 | ❌ SMTP 제한 | ✅ 완벽 | ✅ 좋음 |
| 설정 난이도 | 중간 | 쉬움 (5분) | 중간 (30분) |
| React 템플릿 | ❌ | ✅ React Email | ❌ |
| 무료 티어 | SMTP 의존 | 3,000/월 | 100/일 |
| **결론** | 로컬 개발용 | **채택** | 대안 |

**Resend 채택 이유:**
1. Vercel Edge Runtime에서 SMTP 사용 불가 → Resend API 방식 필수
2. React Email로 템플릿 관리 가능 (향후 확장성)
3. 심플한 API, 빠른 설정

---

## 7. 데이터 모델

### 7-1. ERD

```
┌─────────────────┐       ┌─────────────────┐
│      jobs       │       │  applications   │
├─────────────────┤       ├─────────────────┤
│ id (PK)         │◀──┐   │ id (PK)         │
│ title           │   │   │ name            │
│ department      │   │   │ email           │
│ location        │   └───│ job_id (FK)     │
│ type            │       │ status          │
│ description     │       │ payload (JSONB) │
│ responsibilities│       │ notified_status │
│ requirements    │       │ created_at      │
│ status          │       └────────┬────────┘
│ created_at      │                │
└─────────────────┘                │
                                   │
                    ┌──────────────▼──────────────┐
                    │     notification_logs       │
                    ├─────────────────────────────┤
                    │ id (PK)                     │
                    │ application_id (FK)         │
                    │ event_type                  │
                    │ to_email                    │
                    │ subject                     │
                    │ status ('sent'/'failed')   │
                    │ error                       │
                    │ created_at                  │
                    └─────────────────────────────┘
```

### 7-2. 주요 필드 설명

| 테이블 | 필드 | 설명 |
|--------|------|------|
| applications | `payload` | JSONB로 유연한 추가 데이터 저장 (이력서 링크, 포트폴리오 등) |
| applications | `notified_status` | 마지막 발송된 이메일 타입 (중복 방지) |
| applications | `status_updated_at` | 상태 변경 시각 (SLA 모니터링용) |
| notification_logs | `event_type` | 이메일 종류 구분 (분석용) |

---

## 8. API 설계

### 8-1. 엔드포인트 목록

| Method | Endpoint | 설명 |
|--------|----------|------|
| GET | `/api/admin/jobs` | 전체 공고 조회 |
| POST | `/api/admin/jobs` | 공고 생성 |
| GET | `/api/admin/applications` | 전체 지원자 조회 |
| PATCH | `/api/admin/applications/[id]` | 지원자 상태 변경 + 이메일 트리거 |
| POST | `/api/admin/applications/[id]/notify` | 수동 이메일 재발송 |
| POST | `/api/applications` | 지원서 제출 (공개) |

### 8-2. 상태 변경 API 상세

```http
PATCH /api/admin/applications/[id]
Content-Type: application/json

{
  "status": "interview"
}
```

**Response (성공)**
```json
{
  "success": true,
  "status_updated": true,
  "notification_triggered": true,
  "notification_failed": false
}
```

**내부 로직**
1. 지원자 현재 상태 조회
2. 상태 업데이트
3. 트리거 조건 확인 (interview/hired/rejected)
4. 중복 발송 체크 (`notified_status`)
5. 이메일 발송 + 로그 기록
6. `notified_status` 업데이트

---

## 9. 비기능 요구사항

### 9-1. 성능

| 항목 | 목표 |
|------|------|
| 페이지 로드 (LCP) | < 2.5초 |
| API 응답 시간 | < 500ms |
| 이메일 발송 | < 3초 (비동기) |

### 9-2. 보안

| 항목 | 구현 방법 |
|------|----------|
| 관리자 인증 | Supabase Auth (향후) |
| API 보안 | service_role 키로 RLS 우회, 서버 사이드만 접근 |
| 환경 변수 | `.env.local`에 저장, Git 제외 |
| 이메일 | DKIM/SPF 자동 설정 (Resend) |

### 9-3. 확장성

| 시나리오 | 대응 방안 |
|----------|----------|
| 지원자 10,000명+ | Supabase 인덱스 활용, 페이지네이션 |
| 이메일 대량 발송 | Resend 배치 API, 큐 도입 검토 |
| 다국어 지원 | i18n 템플릿 분리 (향후) |

---

## 10. 참고 레퍼런스

### 10-1. 벤치마킹 서비스

| 서비스 | 참고 포인트 |
|--------|------------|
| [Lever](https://www.lever.co) | 심플한 ATS UI, 칸반 보드 지원자 관리 |
| [Ashby](https://www.ashby.com) | 스타트업 타겟, 깔끔한 채용 페이지 |
| [원티드](https://www.wanted.co.kr) | 한국 IT/스타트업 채용 UX |
| [Breezy HR](https://breezy.hr) | SMB 타겟, 드래그앤드롭 파이프라인 |
| [Workable](https://www.workable.com) | 자동화된 이메일 시퀀스 |

### 10-2. 기술 참고

| 주제 | 링크 |
|------|------|
| Resend + Next.js | [Resend Docs](https://resend.com/docs/send-with-nextjs) |
| Supabase RLS | [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security) |
| Next.js App Router | [Next.js Docs](https://nextjs.org/docs/app) |

---

## 11. 릴리즈 계획

### Phase 1: MVP (현재)
- [x] 채용 공고 조회 + 지원
- [x] 관리자 지원자 관리
- [x] 상태 변경 트리거 이메일
- [x] 이메일 로그 저장

### Phase 2: 고도화 (예정)
- [ ] 관리자 인증 (Supabase Auth)
- [ ] 이메일 로그 조회 페이지
- [ ] 지원자 검색/필터 강화
- [ ] 통계 대시보드

### Phase 3: 확장 (향후)
- [ ] 다국어 지원
- [ ] 커스텀 이메일 템플릿 편집기
- [ ] 팀 협업 기능 (코멘트, 멘션)
- [ ] ATS 연동 API

---

## 12. 성공 지표 (KPI)

| 지표 | 목표 | 측정 방법 |
|------|------|----------|
| 지원 전환율 | 공고 조회 대비 5%+ | 지원서 수 / 페이지뷰 |
| 이메일 발송 성공률 | 99%+ | notification_logs 분석 |
| 평균 채용 소요 시간 | 14일 이내 | applied → hired 기간 |
| 관리자 만족도 | NPS 50+ | 설문 조사 |

---

## 부록: 용어 정의

| 용어 | 정의 |
|------|------|
| ATS | Applicant Tracking System, 지원자 추적 시스템 |
| RLS | Row Level Security, Supabase의 행 단위 보안 |
| RSC | React Server Components |
| Edge Runtime | Vercel의 엣지 서버 실행 환경 |
| DKIM/SPF | 이메일 인증 프로토콜 |

---

*이 문서는 Antigravity 채용 플랫폼의 제품 요구사항을 정의합니다.*
*최종 수정: 2026-02-03*
