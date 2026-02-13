import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const VALUES = [
    {
        title: '투명한 소통',
        subtitle: 'Radical Transparency',
        description: '모든 정보는 공유됩니다. 숨기거나 돌려 말하지 않습니다. 솔직한 피드백이 성장의 가장 빠른 길입니다.',
        color: 'violet'
    },
    {
        title: '빠른 실행',
        subtitle: 'Bias for Action',
        description: '완벽을 기다리지 않습니다. 작게 시작하고, 빠르게 배우고, 계속 개선합니다. 실패는 배움의 기회입니다.',
        color: 'blue'
    },
    {
        title: '오너십',
        subtitle: 'Extreme Ownership',
        description: '자신의 영역에 책임을 집니다. 문제가 생기면 남 탓하지 않고 해결책을 찾습니다. 우리 모두가 주인입니다.',
        color: 'cyan'
    },
    {
        title: '고객 중심',
        subtitle: 'Customer Obsession',
        description: '모든 결정의 중심에 고객이 있습니다. 우리의 성공은 고객의 문제를 얼마나 잘 해결했느냐로 측정됩니다.',
        color: 'green'
    },
]

const HOW_WE_WORK = [
    {
        title: '자율과 책임',
        description: '출퇴근 시간을 체크하지 않습니다. 어디서 일하든 상관없습니다. 대신 맡은 일에 대한 결과로 이야기합니다.',
        icon: '🎯'
    },
    {
        title: '수평적 문화',
        description: '직급이 아닌 역할로 일합니다. 누구나 의견을 낼 수 있고, 좋은 아이디어는 직급과 관계없이 채택됩니다.',
        icon: '🤝'
    },
    {
        title: '문서화 우선',
        description: '중요한 결정과 논의는 문서로 남깁니다. 동기화 회의를 최소화하고, 비동기 커뮤니케이션을 지향합니다.',
        icon: '📝'
    },
    {
        title: '지속 가능한 속도',
        description: '번아웃 없이 오래 달릴 수 있는 페이스를 유지합니다. 야근은 예외이지 일상이 아닙니다.',
        icon: '⚡'
    },
]

const BENEFITS = [
    { category: '근무 환경', items: ['유연 출퇴근 (코어타임 없음)', '원격 근무 자유', '최신 장비 지원', '업무 환경 세팅비 지원'] },
    { category: '성장 지원', items: ['무제한 도서 구매', '컨퍼런스 참가비 지원', '온라인 강의 구독', '사내 스터디 지원'] },
    { category: '건강 & 휴식', items: ['건강검진 지원', '심리 상담 프로그램', '충분한 연차 (입사 첫 해 15일)', '리프레시 휴가'] },
    { category: '보상', items: ['업계 상위 수준 연봉', '스톡옵션', '성과 보너스', '추천 채용 보너스'] },
]

export default function CulturePage() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-zinc-900">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero */}
                <section className="py-20 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <span className="inline-block text-sm font-medium text-violet-400 uppercase tracking-widest mb-4">
                                Culture
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                우리가 일하는 방식
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                Antigravity는 단순한 회사가 아닙니다.<br />
                                함께 성장하고, 서로를 존중하며, 의미 있는 일을 하는 팀입니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Culture Intro */}
                <section className="py-24 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div>
                                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
                                        "좋은 팀이 좋은 제품을 만든다"
                                    </h2>
                                    <p className="text-zinc-400 leading-relaxed">
                                        우리는 뛰어난 개인이 모인 것만으로는 충분하지 않다고 믿습니다.
                                        서로 신뢰하고, 솔직하게 소통하며, 같은 방향을 바라보는 팀이
                                        진정으로 위대한 것을 만들 수 있습니다.
                                    </p>
                                </div>
                                <div>
                                    <p className="text-zinc-400 leading-relaxed mb-4">
                                        그래서 우리는 문화에 진심입니다.
                                        어떻게 일하는지가 무엇을 만드는지만큼 중요합니다.
                                    </p>
                                    <p className="text-zinc-400 leading-relaxed">
                                        지속 가능한 방식으로, 즐겁게, 그리고 자부심을 가지고
                                        일할 수 있는 환경을 만들어갑니다.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Core Values */}
                <section className="py-24 bg-zinc-900/30 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">
                                Core Values
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                핵심 가치
                            </h2>
                            <p className="text-zinc-400">
                                우리가 의사결정을 할 때 기준이 되는 원칙들입니다
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
                            {VALUES.map((value, i) => (
                                <div
                                    key={i}
                                    className="p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                                >
                                    <div className={`inline-block px-3 py-1 rounded-full text-xs font-medium mb-4 ${
                                        value.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                                        value.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                                        value.color === 'cyan' ? 'bg-cyan-500/10 text-cyan-400' :
                                        'bg-green-500/10 text-green-400'
                                    }`}>
                                        {value.subtitle}
                                    </div>
                                    <h3 className="text-xl font-bold text-white mb-3">
                                        {value.title}
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* How We Work */}
                <section className="py-24 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-medium text-cyan-400 uppercase tracking-widest mb-4">
                                How We Work
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                일하는 방식
                            </h2>
                            <p className="text-zinc-400">
                                Antigravity에서 일한다는 것
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                            {HOW_WE_WORK.map((item, i) => (
                                <div
                                    key={i}
                                    className="flex gap-5 p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                                >
                                    <span className="text-3xl">{item.icon}</span>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white mb-2">
                                            {item.title}
                                        </h3>
                                        <p className="text-zinc-400 text-sm leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Benefits */}
                <section className="py-24 bg-zinc-900/30 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-medium text-violet-400 uppercase tracking-widest mb-4">
                                Benefits
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                                복지 및 혜택
                            </h2>
                            <p className="text-zinc-400">
                                최고의 성과를 내기 위해 필요한 것들을 지원합니다
                            </p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
                            {BENEFITS.map((benefit, i) => (
                                <div
                                    key={i}
                                    className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800"
                                >
                                    <h3 className={`text-sm font-semibold mb-4 ${
                                        i === 0 ? 'text-violet-400' :
                                        i === 1 ? 'text-blue-400' :
                                        i === 2 ? 'text-cyan-400' :
                                        'text-green-400'
                                    }`}>
                                        {benefit.category}
                                    </h3>
                                    <ul className="space-y-2">
                                        {benefit.items.map((item, j) => (
                                            <li key={j} className="text-zinc-400 text-sm flex items-start gap-2">
                                                <span className="text-zinc-600 mt-1">•</span>
                                                {item}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Team Quote */}
                <section className="py-24 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl mx-auto text-center">
                            <svg className="w-12 h-12 text-zinc-700 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z"/>
                            </svg>
                            <blockquote className="text-2xl md:text-3xl font-medium text-white mb-8 leading-relaxed">
                                "좋은 사람들과, 좋은 문제를, 좋은 방식으로 해결하는 것.<br />
                                이것이 우리가 일하는 이유입니다."
                            </blockquote>
                            <p className="text-zinc-500">
                                — Antigravity Team
                            </p>
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24">
                    <div className="container mx-auto px-6">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600 p-12 md:p-20">
                            <div className="absolute inset-0 opacity-10">
                                <div
                                    className="absolute inset-0"
                                    style={{
                                        backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
                                        backgroundSize: '32px 32px'
                                    }}
                                ></div>
                            </div>
                            <div className="relative z-10 text-center max-w-3xl mx-auto">
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    이런 문화에서 일하고 싶다면?
                                </h2>
                                <p className="text-xl text-white/80 mb-10">
                                    지금 열린 포지션을 확인하고 지원하세요.
                                </p>
                                <Link
                                    href="/jobs"
                                    className="inline-flex h-14 px-8 bg-white text-zinc-900 rounded-full font-medium text-base items-center gap-3 transition-all duration-300 hover:scale-105"
                                >
                                    <span>채용 공고 보기</span>
                                    <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                    </svg>
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
