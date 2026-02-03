# Changelog

이 프로젝트의 주요 변경 사항을 기록합니다.

---

## [0.2.0] - 2026-02-03

### Added
- **Resend 이메일 서비스 통합**: Nodemailer에서 Resend로 전환 (Vercel 배포 호환성 개선)
- **통합 타입 정의**: `lib/types.ts` 생성 - Job, Application, Email 관련 타입 일원화
- **Jobs 테이블 확장 마이그레이션**: location, type, responsibilities, requirements 필드 추가
- **환경 변수 템플릿**: `.env.example` 파일 생성

### Changed
- `lib/email.ts`: Nodemailer → Resend API로 전환
- `lib/email.ts`: 지연 초기화 패턴 적용 (빌드 시 오류 방지)
- API 라우트: Next.js 16 호환성 수정 (params를 Promise로 처리)

### Deprecated
- `/api/apply` 엔드포인트: `/api/applications` 사용 권장

### Fixed
- Node.js 버전 문제 해결: `.nvmrc` 파일 추가 (Node 20 지정)
- 자동 nvm 전환 스크립트: `~/.zshrc`에 추가

---

## [0.1.0] - 2026-01-30

### Added
- 초기 프로젝트 구조 설정
- Next.js 16 + TypeScript + Tailwind CSS
- Supabase 연동 (applications, notification_logs 테이블)
- 채용 사이트 기본 페이지 (/, /jobs, /company, /culture)
- 어드민 대시보드 (/admin)
- 지원자 CRUD API
- 자동 이메일 발송 (Nodemailer)
- 로컬 폴백 스토리지
