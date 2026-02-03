import Link from 'next/link'

export function Footer() {
    return (
        <footer className="bg-[#FFFDF9] border-t border-stone-100">
            <div className="container mx-auto px-6 py-16">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12">
                    {/* Brand */}
                    <div className="space-y-4">
                        <Link
                            href="/"
                            className="text-lg font-medium tracking-tight text-stone-900"
                        >
                            Golden Hours
                        </Link>
                        <p className="text-sm text-stone-500 font-light leading-relaxed max-w-xs">
                            Designing work systems that help teams run better,
                            while creating calmer experiences for people.
                        </p>
                    </div>

                    {/* Navigation */}
                    <div className="flex gap-16">
                        <div>
                            <h3 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-4">
                                Navigate
                            </h3>
                            <ul className="space-y-3 text-sm text-stone-600 font-light">
                                <li>
                                    <Link href="/experience" className="hover:text-stone-900 transition-colors">
                                        Experience
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/careers" className="hover:text-stone-900 transition-colors">
                                        Careers
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/about" className="hover:text-stone-900 transition-colors">
                                        About
                                    </Link>
                                </li>
                            </ul>
                        </div>

                        <div>
                            <h3 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-4">
                                Connect
                            </h3>
                            <ul className="space-y-3 text-sm text-stone-600 font-light">
                                <li>
                                    <Link href="/contact" className="hover:text-stone-900 transition-colors">
                                        Contact
                                    </Link>
                                </li>
                                <li>
                                    <a
                                        href="mailto:hello@goldenhours.com"
                                        className="hover:text-stone-900 transition-colors"
                                    >
                                        Email
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Bottom */}
                <div className="mt-16 pt-8 border-t border-stone-100 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-stone-400 font-light">
                        © {new Date().getFullYear()} Golden Hours
                    </p>
                    <p className="text-xs text-stone-400 font-light">
                        Making work feel good.
                    </p>
                </div>
            </div>
        </footer>
    )
}
