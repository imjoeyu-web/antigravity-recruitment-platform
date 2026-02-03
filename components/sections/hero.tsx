import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export function Hero() {
    return (
        <section className="relative min-h-[90vh] flex items-center justify-center bg-[#FFFDF9] overflow-hidden">
            {/* Warm, soft background gradient */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-amber-100/40 rounded-full blur-[120px]"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-50/50 rounded-full blur-[100px]"></div>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-3xl mx-auto text-center space-y-8">
                    {/* Brand name */}
                    <h1 className="text-5xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-stone-900">
                        GOLDEN HOURS
                    </h1>

                    {/* Tagline */}
                    <p className="text-xl md:text-2xl text-stone-600 font-light tracking-wide">
                        Optimize operations. Elevate experience.
                    </p>

                    {/* Description */}
                    <p className="text-lg md:text-xl text-stone-500 max-w-2xl mx-auto leading-relaxed font-light">
                        We design work systems that help teams run better,
                        <br className="hidden md:block" />
                        while creating clearer, calmer experiences for people.
                    </p>

                    {/* CTA */}
                    <div className="pt-8">
                        <Link href="/careers">
                            <Button
                                size="lg"
                                className="h-14 px-10 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-medium text-base gap-3 transition-all duration-300 hover:gap-4"
                            >
                                Explore careers
                                <ArrowRight size={18} />
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Subtle scroll indicator */}
            <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
                <div className="w-px h-16 bg-gradient-to-b from-stone-400 to-transparent"></div>
            </div>
        </section>
    )
}
