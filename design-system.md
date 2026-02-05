# Golden Hours Design System

> 레퍼런스: [Make It Golden](https://www.makeitgolden.co.uk/)
> 컨셉: 미니멀 + 고급스러움 + 파스텔 3D 구름 오브젝트
> 목적: 바로 적용 가능한 디자인 규칙

---

## 🎨 Quick Reference (바로 복사해서 쓰기)

### 배경색

| 용도 | HEX | Tailwind | 설명 |
|------|-----|----------|------|
| **메인 배경** | `#FFFDF9` | `bg-[#FFFDF9]` | 따뜻한 크림 화이트 |
| **카드 배경** | `#FFFFFF` | `bg-white` | 순수 화이트 |
| **섹션 구분** | `#FAFAF9` | `bg-stone-50` | 미세한 구분용 |
| **Hover 상태** | `#F5F5F4` | `bg-stone-100` | 버튼/카드 hover |

### 3D 구름 배경 그라데이션 (Hero용)

```tsx
{/* 파스텔 톤 글로우 - 3D 구름과 어울리는 배경 */}
<div className="absolute inset-0 overflow-hidden">
  {/* 메인 글로우 - 피치/살구색 */}
  <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#FFE4D6]/40 rounded-full blur-[120px]" />
  {/* 서브 글로우 - 라벤더 */}
  <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-[#E8E0F0]/30 rounded-full blur-[100px]" />
  {/* 악센트 글로우 - 민트 */}
  <div className="absolute top-1/2 right-1/3 w-[300px] h-[300px] bg-[#D4EAE4]/25 rounded-full blur-[80px]" />
</div>
```

### 파스텔 팔레트 (3D 오브젝트용)

| 이름 | HEX | 용도 |
|------|-----|------|
| Peach Cream | `#FFE4D6` | 주 글로우, 따뜻함 |
| Soft Lavender | `#E8E0F0` | 보조 글로우, 깊이감 |
| Mint Mist | `#D4EAE4` | 포인트 글로우, 청량함 |
| Butter Yellow | `#FFF8E1` | 하이라이트 |
| Cloud White | `#F8F9FA` | 구름 기본색 |

---

## 📝 메인 폰트 스타일

### 폰트 패밀리
```css
font-family: 'Inter', system-ui, -apple-system, sans-serif;
```

### 타이포그래피 계층

| 용도 | 크기 | 굵기 | Tailwind 클래스 |
|------|------|------|-----------------|
| **Hero 타이틀** | 96-128px | 600 | `text-8xl lg:text-9xl font-semibold tracking-tighter` |
| **섹션 타이틀** | 48-60px | 300 | `text-4xl md:text-5xl font-light tracking-tight` |
| **카드 타이틀** | 20-24px | 500 | `text-xl font-medium` |
| **본문** | 18-20px | 300 | `text-lg md:text-xl font-light leading-relaxed` |
| **라벨** | 12-14px | 500 | `text-sm font-medium uppercase tracking-widest` |
| **버튼** | 16px | 500 | `text-base font-medium` |

### 색상

| 용도 | HEX | Tailwind |
|------|-----|----------|
| 제목 | `#1C1917` | `text-stone-900` |
| 본문 | `#78716C` | `text-stone-500` |
| 라벨/캡션 | `#A8A29E` | `text-stone-400` |
| 링크 hover | `#57534E` | `text-stone-600` |

---

## 📐 요소 간 여백 간격

### 섹션 패딩
```tsx
// 기본 섹션
<section className="py-32">  {/* 128px 상하 */}

// Hero 섹션
<section className="min-h-[90vh] py-24">  {/* 화면 90% + 96px 상하 */}
```

### 컨테이너
```tsx
<div className="container mx-auto px-6">  {/* 좌우 24px 패딩 */}
  <div className="max-w-4xl">  {/* 읽기 편한 최대 너비 896px */}
```

### 수직 간격 시스템

| 용도 | 값 | Tailwind |
|------|-----|----------|
| 섹션 간 | 128px | `py-32` |
| 콘텐츠 그룹 간 | 64-80px | `mb-16` ~ `mb-20` |
| 제목-본문 간 | 24-32px | `mb-6` ~ `mb-8` |
| 리스트 아이템 간 | 16-24px | `gap-4` ~ `gap-6` |
| 텍스트 줄 간 | 1.75배 | `leading-relaxed` |

### 그리드 시스템
```tsx
// 2컬럼 레이아웃
<div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

// 3컬럼 카드
<div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">

// 4컬럼 프로세스
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
```

---

## 🔘 버튼 디자인 규칙

### Primary CTA (주요 행동)
```tsx
<Link
  href="/contact"
  className="
    h-14 px-8
    bg-stone-900 hover:bg-stone-800
    text-white
    rounded-full
    font-medium text-base
    flex items-center gap-3
    transition-all duration-300
    hover:scale-105
  "
>
  Let's chat ✉️
</Link>
```

| 속성 | 값 |
|------|-----|
| 높이 | 56px (`h-14`) |
| 좌우 패딩 | 32px (`px-8`) |
| 배경색 | `#1C1917` → hover `#292524` |
| 텍스트 | 흰색, 16px, medium |
| 모서리 | 완전 둥근 pill (`rounded-full`) |
| 애니메이션 | hover 시 1.05배 확대 |

### Secondary CTA (보조 행동)
```tsx
<Link
  href="/experience"
  className="
    h-14 px-8
    bg-white hover:bg-stone-50
    text-stone-700
    rounded-full
    font-medium text-base
    flex items-center gap-3
    border border-stone-200 hover:border-stone-300
    transition-all duration-300
  "
>
  How we work 🤝
</Link>
```

### Tertiary CTA (텍스트 링크)
```tsx
<Link
  href="/careers"
  className="
    h-12 px-6
    bg-stone-100 hover:bg-stone-200
    text-stone-700
    rounded-full
    font-medium
    transition-all duration-300
  "
>
  View all roles ✨
</Link>
```

### 버튼 문구 + 이모지 규칙

| 목적 | 문구 | 이모지 |
|------|------|--------|
| 문의하기 | Let's chat | ✉️ |
| 채용 보기 | View open roles | ✨ |
| 더 보기 | How we work | 🤝 |
| 자세히 | More about us | 🤝 |
| 지원하기 | Apply now | 🚀 |

---

## 1. 톤 & 무드

### 핵심 키워드
- **따뜻함** (Warm) - 차갑지 않은, 사람 냄새 나는
- **명확함** (Clear) - 군더더기 없는, 읽기 쉬운
- **차분함** (Calm) - 과하지 않은, 여유로운
- **몽환적** (Dreamy) - 파스텔 3D 구름과 어울리는

### 컬러 팔레트

```
Primary (따뜻한 뉴트럴)
├── Background: #FFFDF9 (크림 화이트)
├── Text Primary: #1C1917 (stone-900)
├── Text Secondary: #57534E (stone-600)
└── Text Muted: #78716C (stone-500)

Pastel Glow (3D 구름 배경용)
├── Peach: #FFE4D6 - 메인 글로우
├── Lavender: #E8E0F0 - 서브 글로우
├── Mint: #D4EAE4 - 포인트 글로우
└── Butter: #FFF8E1 - 하이라이트

Functional
├── CTA: #1C1917 (stone-900) - 버튼
├── CTA Hover: #292524 (stone-800)
└── Border: #E7E5E4 (stone-200)
```

### 배경 처리
- 단색 배경 대신 **부드러운 그라데이션 블러** 사용
- `blur-[80px]` ~ `blur-[120px]` 큰 블러로 은은한 빛 느낌
- 3D 구름 오브젝트와 조화를 이루는 파스텔 글로우

---

## 2. 레이아웃 리듬

### 섹션 구성 원칙

```
[Hero]          - 90vh, 중앙 정렬, 여유로운 호흡
    ↓ 스크롤
[Value Prop]    - 핵심 가치 3-4개, 카드 또는 리스트
    ↓ 스크롤
[How We Work]   - 프로세스/방법론, 단계별 시각화
    ↓ 스크롤
[CTA]           - 명확한 다음 행동 유도
    ↓ 스크롤
[Footer]        - 최소한의 정보
```

### 여백 시스템

| 용도 | 값 | 설명 |
|------|-----|------|
| 섹션 간 | `py-24` ~ `py-32` | 충분한 호흡 |
| 컨테이너 | `max-w-4xl` | 읽기 편한 너비 |
| 요소 간 | `space-y-6` ~ `space-y-8` | 여유로운 간격 |
| 텍스트 블록 | `leading-relaxed` | 넉넉한 행간 |

### 정렬
- **중앙 정렬 기본** - Hero, CTA 섹션
- **좌측 정렬** - 본문 콘텐츠, 리스트
- 좌우 분할(2컬럼)은 최소화 - 복잡함 회피

---

## 3. 타이포그래피

### 폰트 계층

```
H1 (Hero Title)
├── Size: text-5xl → text-7xl → text-8xl (반응형)
├── Weight: font-semibold (600)
├── Tracking: tracking-tight
└── Color: stone-900

H2 (Section Title)
├── Size: text-3xl → text-4xl
├── Weight: font-medium (500)
├── Tracking: tracking-tight
└── Color: stone-900

Tagline / Subtitle
├── Size: text-xl → text-2xl
├── Weight: font-light (300)
├── Tracking: tracking-wide
└── Color: stone-600

Body
├── Size: text-lg → text-xl
├── Weight: font-light (300)
├── Line Height: leading-relaxed
└── Color: stone-500

Label / Caption
├── Size: text-sm
├── Weight: font-medium (500)
├── Tracking: tracking-wide, uppercase
└── Color: stone-400
```

### 타이포 원칙
1. **무거운 폰트 최소화** - `font-bold` 거의 사용 안 함
2. **가벼운 본문** - `font-light`로 읽기 편하게
3. **대비로 계층** - 크기와 색상으로 구분, 굵기 차이는 작게
4. **여백으로 강조** - 볼드 대신 주변 여백으로 시선 유도

---

## 4. CTA 디자인

### 버튼 스타일

```tsx
// Primary CTA
<Button className="
  h-14 px-10
  bg-stone-900 hover:bg-stone-800
  text-white
  rounded-full
  font-medium text-base
  gap-3
  transition-all duration-300
">
  Explore careers <ArrowRight size={18} />
</Button>

// Secondary CTA (Ghost)
<Button variant="ghost" className="
  text-stone-600 hover:text-stone-900
  font-medium
  gap-2
  underline-offset-4 hover:underline
">
  Learn more <ArrowRight size={16} />
</Button>
```

### CTA 원칙
1. **친근한 문구** - "Get started" 보다 "Let's chat", "Explore"
2. **아이콘 동반** - 화살표, 이모지 등으로 친근함 추가
3. **과하지 않게** - 한 섹션에 CTA 1개, 최대 2개
4. **마이크로 인터랙션** - hover 시 화살표 이동 등 subtle한 효과

### CTA 문구 예시

| 목적 | 문구 |
|------|------|
| 채용 페이지 이동 | "Explore careers" |
| 문의하기 | "Let's talk" |
| 자세히 보기 | "Learn more" |
| 서비스 소개 | "See how it works" |

---

## 5. 컴포넌트 스타일

### 카드

```tsx
<div className="
  bg-white/60
  backdrop-blur-sm
  border border-stone-100
  rounded-2xl
  p-8
  hover:shadow-lg hover:shadow-stone-100/50
  transition-all duration-300
">
  {/* 콘텐츠 */}
</div>
```

### 구분선

```tsx
// 섹션 구분 - 사용 최소화, 여백으로 대체
<div className="w-16 h-px bg-stone-200 mx-auto" />
```

### 아이콘
- **Lucide React** 사용
- `strokeWidth={1.5}` - 얇은 선으로 가벼움
- 크기: 16-20px (본문), 24-32px (강조)

---

## 6. 페이지별 적용

### Home (`/`)
```
[Hero]
├── GOLDEN HOURS (H1, 중앙)
├── Tagline (Subtitle)
├── Description (Body)
└── CTA → /careers

[Value Section] (선택)
├── 3-4개 핵심 가치
└── 아이콘 + 짧은 설명

[Footer]
```

### Experience (`/experience`)
```
[Hero]
├── What we design (H1)
└── 설명 문단

[Services/Approach]
├── 우리가 하는 일 카드 3-4개
└── 각각 제목 + 설명

[CTA]
└── Contact로 유도
```

### Careers (`/careers`)
```
[Hero]
├── Join us (H1)
└── 팀 문화 한 줄

[Job List]
├── 공고 카드 리스트
└── 각각 제목, 부서, 위치

[CTA]
└── 일반 문의 링크
```

---

## 7. 금지 사항

| 하지 말 것 | 이유 |
|-----------|------|
| 진한 그라데이션 | 과하고 촌스러움 |
| 그림자 남용 | 무거워 보임 |
| 볼드 텍스트 남발 | 시끄러움 |
| 애니메이션 과다 | 정신 산만 |
| 다크 모드 | 브랜드 톤과 불일치 |
| 네온/비비드 컬러 | 차분함 훼손 |

---

## 8. 다음 단계

### Phase 1 (현재)
- [x] Hero 섹션 톤 적용
- [ ] Header/Footer 리디자인
- [ ] 페이지 라우트 재구성 (/careers, /experience, /about)

### Phase 2
- [ ] 컴포넌트 라이브러리 정비
- [ ] 반응형 세부 조정
- [ ] 마이크로 인터랙션

### Phase 3
- [ ] 애니메이션 (Framer Motion)
- [ ] 페이지 트랜지션
- [ ] 스크롤 기반 효과

---

*이 문서는 Golden Hours 브랜드 사이트의 디자인 기준입니다.*
