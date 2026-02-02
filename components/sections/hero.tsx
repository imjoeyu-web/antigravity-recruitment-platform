import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight, Box, Cpu } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center bg-[#0a0a0a] overflow-hidden">
            {/* Dark futuristic background */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-blue-600/10 rounded-full blur-[120px]"></div>
                <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-indigo-600/10 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-1000">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-800 bg-white/5 backdrop-blur-md text-blue-400 text-xs font-bold uppercase tracking-widest">
                        <Cpu size={14} /> Future Mobility & Robotics
                    </div>

                    <h1 className="text-5xl lg:text-8xl font-black tracking-tighter text-white leading-[1.05]">
                        EXPANDING <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-indigo-400">HUMAN REACH.</span>
                    </h1>

                    <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-light leading-relaxed">
                        We build intelligent robots and universal mobility solutions to redefine
                        how humanity interacts with the physical world.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
                        <Link href="/jobs">
                            <Button size="lg" className="h-14 px-8 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold text-lg gap-2">
                                Join the Mission <ArrowRight size={20} />
                            </Button>
                        </Link>
                        <Link href="/company">
                            <Button variant="outline" size="lg" className="h-14 px-8 border-gray-700 text-gray-300 hover:bg-white/5 rounded-full font-bold text-lg">
                                Explore Vision
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Subtle scroll indicator */}
            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-30 animate-bounce">
                <span className="text-[10px] text-white uppercase tracking-[0.2em]">Scroll</span>
                <div className="w-px h-12 bg-gradient-to-b from-white to-transparent"></div>
            </div>
        </section>
    )
}

