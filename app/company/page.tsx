import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CompanyHero, BrandPhilosophy, BusinessAreas } from '@/components/company/scaffolds'

export default function CompanyPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans">
            <Header />
            <main className="flex-1">
                <CompanyHero />
                <BrandPhilosophy />
                <BusinessAreas />

                {/* Strategic Vision Section */}
                <section className="py-24 bg-white">
                    <div className="container mx-auto px-4">
                        <div className="max-w-5xl mx-auto border-t border-gray-100 pt-20">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                                <div className="space-y-6">
                                    <h2 className="text-3xl font-black italic tracking-tight text-gray-900">STRATEGY 2045</h2>
                                    <p className="text-gray-600 font-light leading-relaxed">
                                        Our commitment to a carbon-neutral and tech-inclusive future.
                                        By 2045, every AntiGravity solution will operate on 100% clean energy.
                                    </p>
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="p-6 bg-gray-50 rounded-2xl">
                                        <span className="text-2xl font-bold text-blue-600 block mb-2">100%</span>
                                        <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Clean Energy</span>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl">
                                        <span className="text-2xl font-bold text-blue-600 block mb-2">Zero</span>
                                        <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Emission</span>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl">
                                        <span className="text-2xl font-bold text-blue-600 block mb-2">Global</span>
                                        <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Connectivity</span>
                                    </div>
                                    <div className="p-6 bg-gray-50 rounded-2xl">
                                        <span className="text-2xl font-bold text-blue-600 block mb-2">Inclusive</span>
                                        <span className="text-xs text-gray-500 uppercase font-bold tracking-widest">Mobility</span>
                                    </div>
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

