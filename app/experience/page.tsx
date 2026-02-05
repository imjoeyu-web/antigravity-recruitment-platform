import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

const SERVICES = [
    {
        title: 'Work System Design',
        description: 'We analyze how your team operates and design systems that reduce friction, improve flow, and make daily work feel lighter.',
    },
    {
        title: 'Experience Strategy',
        description: 'From onboarding to daily workflows, we craft experiences that help people do their best work with clarity and calm.',
    },
    {
        title: 'Operational Excellence',
        description: 'We streamline processes and build structures that scale gracefully, keeping complexity manageable as you grow.',
    },
]

const APPROACH = [
    { number: '01', title: 'Listen', description: 'We start by deeply understanding your current reality—the friction points, the hidden strengths, the unspoken needs.' },
    { number: '02', title: 'Design', description: 'We craft solutions that feel intuitive, building systems that work with human nature, not against it.' },
    { number: '03', title: 'Implement', description: 'We work alongside your team to bring changes to life, ensuring adoption feels natural and sustainable.' },
    { number: '04', title: 'Refine', description: 'We measure what matters and continuously improve, making sure the system evolves with your needs.' },
]

export default function ExperiencePage() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero */}
                <section className="py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 mb-8">
                                Work should feel<br />
                                <span className="text-stone-400">effortless.</span>
                            </h1>
                            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
                                We design work systems that help teams run better,
                                while creating clearer, calmer experiences for the people who use them.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Services */}
                <section className="py-32 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <h2 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-16">
                            What we do
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
                            {SERVICES.map((service, index) => (
                                <div key={index} className="space-y-4">
                                    <h3 className="text-xl font-medium text-stone-900">
                                        {service.title}
                                    </h3>
                                    <p className="text-stone-500 font-light leading-relaxed">
                                        {service.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Approach */}
                <section className="py-32 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <h2 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-16">
                            Our approach
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 md:gap-8">
                            {APPROACH.map((step) => (
                                <div key={step.number} className="space-y-4">
                                    <span className="text-sm text-stone-300 font-medium">{step.number}</span>
                                    <h3 className="text-xl font-medium text-stone-900">{step.title}</h3>
                                    <p className="text-stone-500 font-light leading-relaxed text-sm">
                                        {step.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-32 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl">
                            <h2 className="text-4xl md:text-5xl font-semibold tracking-tight text-stone-900 mb-6">
                                Ready to make work feel good?
                            </h2>
                            <p className="text-xl text-stone-500 font-light mb-10">
                                Let's talk about how we can help your team work better.
                            </p>
                            <Link
                                href="/contact"
                                className="inline-flex items-center gap-3 h-14 px-8 bg-stone-900 hover:bg-stone-800 text-white rounded-full font-medium transition-all duration-300 hover:scale-105"
                            >
                                Get in touch ✉️
                            </Link>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
