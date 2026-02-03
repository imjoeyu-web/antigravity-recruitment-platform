'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const NAV_ITEMS = [
    { href: '/experience', label: 'Experience' },
    { href: '/careers', label: 'Careers' },
    { href: '/about', label: 'About' },
    { href: '/contact', label: 'Contact' },
]

export function Header() {
    const pathname = usePathname()

    return (
        <header className="fixed top-0 z-50 w-full bg-[#FFFDF9]/90 backdrop-blur-md">
            <div className="container mx-auto flex h-20 items-center justify-between px-6">
                {/* Logo */}
                <Link
                    href="/"
                    className="text-lg font-medium tracking-tight text-stone-900 hover:text-stone-600 transition-colors"
                >
                    Golden Hours
                </Link>

                {/* Navigation */}
                <nav className="flex items-center gap-8">
                    {NAV_ITEMS.map((item) => {
                        const isActive = pathname === item.href
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`
                                    text-sm font-medium transition-colors
                                    ${isActive
                                        ? 'text-stone-900'
                                        : 'text-stone-500 hover:text-stone-900'
                                    }
                                `}
                            >
                                {item.label}
                            </Link>
                        )
                    })}
                </nav>
            </div>
        </header>
    )
}
