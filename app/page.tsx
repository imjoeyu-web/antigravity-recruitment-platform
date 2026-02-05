import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Hero } from '@/components/sections/hero'
import Link from 'next/link'

const FEATURED_JOBS = [
    { id: '1', title: 'Work Experience Designer', department: 'Design', location: 'Seoul / Remote', type: 'Full-time', color: 'violet' },
    { id: '2', title: 'Systems Strategist', department: 'Strategy', location: 'Seoul, KR', type: 'Full-time', color: 'blue' },
    { id: '3', title: 'Operations Analyst', department: 'Operations', location: 'Remote', type: 'Full-time', color: 'cyan' },
]

const VALUES = [
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
        ),
        title: 'Clarity over complexity',
        description: 'We believe the best solutions are the simplest ones. We cut through noise to find what matters.',
        color: 'violet'
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
        ),
        title: 'People first, always',
        description: 'Every system we design starts with understanding the humans who will use it.',
        color: 'blue'
    },
    {
        icon: (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
        ),
        title: 'Ship and iterate',
        description: 'Done is better than perfect. We move fast, learn faster, and continuously improve.',
        color: 'cyan'
    },
]

export default function Home() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-zinc-950">
            <Header />
            <main className="flex-1">
                <Hero />

                {/* Featured Roles Section */}
                <section className="py-32 bg-zinc-950 border-t border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-16">
                            <div>
                                <span className="inline-block text-sm font-medium text-violet-400 uppercase tracking-widest mb-6">
                                    Open Roles
                                </span>
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                                    Join us in building the future of work.
                                </h2>
                            </div>
                            <div className="flex items-end">
                                <p className="text-xl text-zinc-400 leading-relaxed">
                                    We're looking for people who believe work can be better.
                                    Join a team that's designing the future of how people work.
                                </p>
                            </div>
                        </div>

                        {/* Job Cards */}
                        <div className="space-y-4 max-w-4xl">
                            {FEATURED_JOBS.map((job) => (
                                <Link
                                    key={job.id}
                                    href={`/jobs/${job.id}`}
                                    className="group flex items-center justify-between p-6 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300 hover:bg-zinc-900"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                                            job.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                                            job.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                                            'bg-cyan-500/10 text-cyan-400'
                                        }`}>
                                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white group-hover:text-violet-400 transition-colors">
                                                {job.title}
                                            </h3>
                                            <p className="text-sm text-zinc-500">
                                                {job.department} · {job.location} · {job.type}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-2 text-zinc-500 group-hover:text-white transition-colors">
                                        <span className="text-sm hidden sm:block">View role</span>
                                        <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </div>
                                </Link>
                            ))}
                        </div>

                        <div className="mt-12">
                            <Link
                                href="/jobs"
                                className="inline-flex items-center gap-2 h-12 px-6 rounded-full bg-zinc-800 hover:bg-zinc-700 text-white font-medium transition-all duration-300"
                            >
                                View all open roles
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                </svg>
                            </Link>
                        </div>
                    </div>
                </section>

                {/* Values Section */}
                <section className="py-32 bg-zinc-900/50 border-t border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="text-center max-w-3xl mx-auto mb-20">
                            <span className="inline-block text-sm font-medium text-blue-400 uppercase tracking-widest mb-6">
                                Our Values
                            </span>
                            <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                                What we believe in
                            </h2>
                            <p className="text-xl text-zinc-400">
                                These principles guide everything we do, from how we build products
                                to how we treat each other.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {VALUES.map((value, i) => (
                                <div
                                    key={i}
                                    className="group p-8 rounded-2xl bg-zinc-900/50 border border-zinc-800 hover:border-zinc-700 transition-all duration-300"
                                >
                                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                                        value.color === 'violet' ? 'bg-violet-500/10 text-violet-400' :
                                        value.color === 'blue' ? 'bg-blue-500/10 text-blue-400' :
                                        'bg-cyan-500/10 text-cyan-400'
                                    }`}>
                                        {value.icon}
                                    </div>
                                    <h3 className="text-xl font-semibold text-white mb-3">
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

                {/* CTA Section */}
                <section className="py-32 bg-zinc-950 border-t border-zinc-800/50">
                    <div className="container mx-auto px-6">
                        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-violet-600 via-blue-600 to-cyan-600 p-12 md:p-20">
                            {/* Background pattern */}
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
                                <h2 className="text-4xl md:text-5xl font-bold text-white leading-tight mb-6">
                                    Ready to make an impact?
                                </h2>
                                <p className="text-xl text-white/80 mb-10">
                                    We're always looking for talented people to join our team.
                                    Check out our open positions or reach out directly.
                                </p>
                                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                                    <Link
                                        href="/jobs"
                                        className="h-14 px-8 bg-white text-zinc-900 rounded-full font-medium text-base flex items-center gap-3 transition-all duration-300 hover:scale-105"
                                    >
                                        <span>Browse open roles</span>
                                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                                        </svg>
                                    </Link>
                                    <Link
                                        href="/contact"
                                        className="h-14 px-8 bg-white/10 backdrop-blur text-white rounded-full font-medium text-base flex items-center gap-3 transition-all duration-300 hover:bg-white/20 border border-white/20"
                                    >
                                        <span>Get in touch</span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
