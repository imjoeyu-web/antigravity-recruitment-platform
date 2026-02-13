import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const STATS = [
    { value: '2020', label: 'Founded' },
    { value: '50+', label: 'Team Members' },
    { value: '12', label: 'Countries' },
    { value: '100+', label: 'Clients' },
]

const AREAS = [
    {
        title: 'Work Systems',
        description: '팀이 효율적으로 운영될 수 있도록 워크플로우와 프로세스를 설계합니다.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
            </svg>
        ),
        color: 'violet'
    },
    {
        title: 'Team Operations',
        description: '더 나은 협업을 위한 도구와 프레임워크를 구축합니다.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        color: 'blue'
    },
    {
        title: 'Culture Design',
        description: '사람들이 최고의 성과를 낼 수 있는 환경을 만듭니다.',
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
        ),
        color: 'cyan'
    },
]

export default function CompanyPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-zinc-900">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero */}
                <section className="py-20 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <span className="inline-block text-sm font-medium text-violet-400 uppercase tracking-widest mb-4">
                                About Us
                            </span>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6">
                                Antigravity
                            </h1>
                            <p className="text-xl text-zinc-400 leading-relaxed">
                                중력을 거스르는 도전, 새로운 가능성을 여는 팀.<br />
                                우리는 팀이 더 잘 일할 수 있도록 시스템을 설계합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Stats */}
                <section className="py-16 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl">
                            {STATS.map((stat, i) => (
                                <div key={i} className="text-center">
                                    <div className="text-4xl font-bold bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent mb-2">
                                        {stat.value}
                                    </div>
                                    <div className="text-sm text-zinc-500">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Our Story */}
                <section className="py-24 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 max-w-6xl">
                            <div>
                                <span className="inline-block text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">
                                    Our Story
                                </span>
                                <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                                    왜 Antigravity인가요?
                                </h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    우리는 일이 무거운 것이 되어서는 안 된다고 믿습니다.
                                    마치 중력을 거스르듯, 복잡하고 무거운 업무 시스템을
                                    가볍고 효율적으로 만드는 것이 우리의 미션입니다.
                                </p>
                                <p className="text-zinc-400 text-lg leading-relaxed">
                                    Antigravity라는 이름은 이 철학에서 시작되었습니다.
                                    우리는 팀들이 더 가볍게, 더 빠르게, 더 즐겁게
                                    일할 수 있는 세상을 만들어갑니다.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Mission */}
                <section className="py-24 bg-zinc-900/30 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl mx-auto text-center">
                            <span className="inline-block text-sm font-medium text-cyan-400 uppercase tracking-widest mb-4">
                                Our Mission
                            </span>
                            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8 leading-tight">
                                일이 더 이상<br />
                                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                                    고통이 아닌 세상
                                </span>
                            </h2>
                            <p className="text-zinc-400 text-xl leading-relaxed max-w-2xl mx-auto">
                                올바른 시스템이 있다면, 팀은 더 적은 스트레스로 더 많은 것을 이룰 수 있습니다.
                                우리는 사람들의 시간, 에너지, 웰빙을 존중하는 업무 경험을 설계합니다.
                            </p>
                        </div>
                    </div>
                </section>

                {/* What We Do */}
                <section className="py-24 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-16">
                            <span className="inline-block text-sm font-medium text-violet-400 uppercase tracking-widest mb-4">
                                What We Do
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white">
                                우리가 하는 일
                            </h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                            {AREAS.map((area, i) => (
                                <div
                                    key={i}
                                    className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                                        area.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                                        area.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                                        'bg-cyan-500/10 text-cyan-400'
                                    }`}>
                                        {area.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
                                        {area.title}
                                    </h3>
                                    <p className="text-zinc-400 leading-relaxed">
                                        {area.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Vision */}
                <section className="py-24 border-b border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="max-w-4xl">
                            <span className="inline-block text-sm font-medium text-blue-400 uppercase tracking-widest mb-4">
                                Looking Ahead
                            </span>
                            <h2 className="text-3xl md:text-4xl font-bold text-white mb-8">
                                Strategy 2045
                            </h2>
                            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
                                지속 가능하고 인간 중심적인 업무 시스템을 구축하여
                                시간의 시험을 견딜 수 있도록 합니다.
                                2045년까지 1,000개 조직의 업무 방식 혁신을 목표로 합니다.
                            </p>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                                {[
                                    { value: '100%', label: 'Clean Energy' },
                                    { value: 'Zero', label: 'Emission' },
                                    { value: 'Global', label: 'Connectivity' },
                                    { value: 'Inclusive', label: 'Mobility' }
                                ].map((item, i) => (
                                    <div key={i} className="p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 text-center">
                                        <span className={`text-2xl font-bold block mb-2 ${
                                            i === 0 ? 'text-violet-400' :
                                            i === 1 ? 'text-blue-400' :
                                            i === 2 ? 'text-cyan-400' :
                                            'text-green-400'
                                        }`}>
                                            {item.value}
                                        </span>
                                        <span className="text-xs text-zinc-500 uppercase tracking-widest">
                                            {item.label}
                                        </span>
                                    </div>
                                ))}
                            </div>
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
                                    함께 일할 준비가 되셨나요?
                                </h2>
                                <p className="text-xl text-white/80 mb-10">
                                    우리 팀에 합류할 인재를 찾고 있습니다.
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
