import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Rocket } from 'lucide-react'

export function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
            <div className="container mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="p-1.5 bg-blue-600 rounded-lg text-white">
                        <Rocket size={20} />
                    </div>
                    <span>Antigravity<span className="text-blue-600">Corp</span></span>
                </Link>

                <nav className="flex items-center gap-6 text-sm font-medium">
                    <Link href="/company" className="transition-colors hover:text-blue-600">Company</Link>
                    <Link href="/jobs" className="transition-colors hover:text-blue-600">Jobs</Link>
                    <Link href="/culture" className="transition-colors hover:text-blue-600">Culture</Link>
                    <Link href="/jobs">
                        <Button variant="primary" size="sm">View Openings</Button>
                    </Link>
                </nav>
            </div>
        </header>
    )
}
