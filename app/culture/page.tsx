import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CultureHero } from '@/components/culture/culture-hero'
import { VisionSection } from '@/components/culture/vision-section'
import { CoreValues } from '@/components/culture/core-values'
import { RecruitProcess } from '@/components/culture/recruit-process'
import { Welfare } from '@/components/culture/welfare'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default function CulturePage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1 bg-white">
                <CultureHero />
                <VisionSection />
                <CoreValues />
                <RecruitProcess />
                <Welfare />

                <section className="py-24 bg-[#0a0a0a] text-white text-center">
                    <div className="container mx-auto px-4">
                        <h2 className="text-4xl md:text-5xl font-extrabold mb-8 tracking-tighter">Ready to join the mission?</h2>
                        <Link href="/jobs">
                            <Button size="lg" className="bg-white text-black hover:bg-gray-100 border-none text-lg px-10 h-16 rounded-full font-bold">
                                View Open Positions
                            </Button>
                        </Link>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}

