'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export function Hero() {
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    return (
        <section className="relative min-h-screen flex items-center justify-center bg-zinc-950 overflow-hidden">
            {/* Animated gradient background */}
            <div className="absolute inset-0 overflow-hidden">
                {/* Main gradient orbs */}
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-violet-600/20 rounded-full blur-[150px] animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[130px] animate-pulse" style={{ animationDelay: '1s' }}></div>
                <div className="absolute top-1/2 right-1/3 w-[400px] h-[400px] bg-cyan-500/15 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }}></div>

                {/* Grid pattern overlay */}
                <div
                    className="absolute inset-0 opacity-[0.02]"
                    style={{
                        backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
                        backgroundSize: '100px 100px'
                    }}
                ></div>

                {/* Radial gradient fade */}
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950"></div>
            </div>

            <div className="container mx-auto px-6 relative z-10 pt-20">
                <div className="max-w-5xl mx-auto text-center">
                    {/* Badge */}
                    <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-800/50 border border-zinc-700/50 mb-8 transition-all duration-700 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                        <span className="text-sm text-zinc-400">We're hiring across all teams</span>
                    </div>

                    {/* Main headline */}
                    <h1 className={`text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] mb-8 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <span className="text-white">Work that</span>
                        <br />
                        <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            feels different.
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className={`text-xl md:text-2xl text-zinc-400 max-w-2xl mx-auto leading-relaxed mb-12 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        We design systems that help teams work better.
                        Clear, calm, and human-centered.
                    </p>

                    {/* CTA Buttons */}
                    <div className={`flex flex-col sm:flex-row items-center justify-center gap-4 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        <Link
                            href="/jobs"
                            className="group relative h-14 px-8 bg-white text-zinc-900 rounded-full font-medium text-base flex items-center gap-3 transition-all duration-300 hover:scale-105 hover:shadow-[0_20px_40px_-15px_rgba(255,255,255,0.2)]"
                        >
                            <span>View open roles</span>
                            <svg className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                            </svg>
                        </Link>
                        <Link
                            href="/company"
                            className="h-14 px-8 bg-transparent text-white rounded-full font-medium text-base flex items-center gap-3 transition-all duration-300 border border-zinc-700 hover:bg-zinc-800 hover:border-zinc-600"
                        >
                            <span>Learn about us</span>
                        </Link>
                    </div>

                    {/* Stats row */}
                    <div className={`mt-20 pt-12 border-t border-zinc-800 grid grid-cols-2 md:grid-cols-4 gap-8 transition-all duration-700 delay-400 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                        {[
                            { value: '50+', label: 'Team members' },
                            { value: '12', label: 'Countries' },
                            { value: '95%', label: 'Employee satisfaction' },
                            { value: '4.8', label: 'Glassdoor rating' },
                        ].map((stat, i) => (
                            <div key={i} className="text-center">
                                <div className="text-3xl md:text-4xl font-bold text-white mb-1">{stat.value}</div>
                                <div className="text-sm text-zinc-500">{stat.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Scroll indicator */}
            <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 transition-all duration-700 delay-500 ${mounted ? 'opacity-100' : 'opacity-0'}`}>
                <div className="w-6 h-10 rounded-full border-2 border-zinc-700 flex items-start justify-center p-2">
                    <div className="w-1 h-2 bg-zinc-500 rounded-full animate-bounce"></div>
                </div>
            </div>
        </section>
    )
}
