import Link from 'next/link'
import { Rocket } from 'lucide-react'

export function Footer() {
    return (
        <footer className="border-t bg-[#fafafa]">
            <div className="container mx-auto px-4 py-16">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-2 font-bold text-xl tracking-tight">
                            <Rocket size={20} className="text-blue-600" />
                            <span>Antigravity<span className="text-blue-600">Corp</span></span>
                        </div>
                        <p className="text-sm text-gray-500 font-light leading-relaxed">
                            Pioneering the next era of humanity through intelligent robotics and universal mobility solutions.
                        </p>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-500 font-light">
                            <li><Link href="/company" className="hover:text-blue-600 transition-colors">Our Vision</Link></li>
                            <li><Link href="/culture" className="hover:text-blue-600 transition-colors">Culture</Link></li>
                            <li><Link href="/jobs" className="hover:text-blue-600 transition-colors">Careers</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Resources</h3>
                        <ul className="space-y-3 text-sm text-gray-500 font-light">
                            <li><Link href="/contact" className="hover:text-blue-600 transition-colors">Contact</Link></li>
                            <li><Link href="/privacy" className="hover:text-blue-600 transition-colors">Privacy Policy</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="font-bold text-gray-900 mb-6 uppercase tracking-widest text-xs">Innovation</h3>
                        <ul className="space-y-3 text-sm text-gray-500 font-light">
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Mobility Hub</a></li>
                            <li><a href="#" className="hover:text-blue-600 transition-colors">Robotics Lab</a></li>
                        </ul>
                    </div>
                </div>
                <div className="mt-16 pt-8 border-t border-gray-100 text-center text-xs text-gray-400 font-light tracking-widest uppercase">
                    © {new Date().getFullYear()} Antigravity Corp. Progress for Humanity.
                </div>
            </div>
        </footer>
    )
}

