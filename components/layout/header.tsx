'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const NAV_ITEMS = [
    { href: '/company', label: 'Company', color: 'hover:text-violet-400' },
    { href: '/culture', label: 'Culture', color: 'hover:text-blue-400' },
    { href: '/jobs', label: 'Careers', color: 'hover:text-cyan-400' },
    { href: '/contact', label: 'Contact', color: 'hover:text-green-400' },
]

export function Header() {
    const pathname = usePathname()
    const [scrolled, setScrolled] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <header className={`fixed top-0 z-50 w-full transition-all duration-500 ${
            scrolled
                ? 'bg-zinc-950/80 backdrop-blur-xl border-b border-zinc-800/50'
                : 'bg-transparent'
        }`}>
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="group flex items-center gap-3"
                >
                    {/* Logo mark */}
                    <div className="relative w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500 to-blue-500 flex items-center justify-center overflow-hidden group-hover:scale-105 transition-transform duration-300">
                        <span className="text-white font-bold text-lg">A</span>
                        <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    {/* Logo text */}
                    <span className="text-lg font-semibold tracking-tight text-white">
                        Antigravity
                    </span>
                </Link>

                {/* Navigation */}
                <nav className="hidden md:flex items-center gap-1">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href || pathname?.startsWith(item.href + '/')
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    relative px-4 py-2 text-sm font-medium rounded-full transition-all duration-300
                                    ${isActive
                                        ? 'text-white bg-zinc-800'
                                        : `text-zinc-400 ${item.color} hover:bg-zinc-800/50`
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>

                {/* CTA Button */}
                <div className="flex items-center gap-4">
                    <Link
                        href="/jobs"
                        className="hidden sm:flex h-10 px-5 items-center gap-2 bg-white text-zinc-900 rounded-full text-sm font-medium hover:bg-zinc-100 transition-all duration-300 hover:scale-105"
                    >
                        <span>Join us</span>
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                    </Link>

                    {/* Mobile menu button */}
                    <button className="md:hidden w-10 h-10 flex items-center justify-center text-white rounded-full hover:bg-zinc-800 transition-colors">
                        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>
                </div>
            </div>
        </header>
    )
}
