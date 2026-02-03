import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

const VALUES = [
    {
        title: 'Clarity over complexity',
        description: 'We believe the best solutions are the ones that feel obvious in hindsight. We work hard to make things simple.',
    },
    {
        title: 'People at the center',
        description: 'Every system we design serves people. We never lose sight of the human experience behind the process.',
    },
    {
        title: 'Calm as a feature',
        description: 'We design for calm. Less noise, less friction, more space for what matters.',
    },
    {
        title: 'Thoughtful progress',
        description: 'We move deliberately, not recklessly. Good work takes time, and we protect that time.',
    },
]

export default function AboutPage() {
    return (
        <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero */}
                <section className="py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 mb-8">
                                We make work<br />
                                <span className="text-stone-400">feel different.</span>
                            </h1>
                            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
                                Golden Hours is a work experience design studio.
                                We help organizations build systems that make daily work
                                clearer, calmer, and more human.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Story */}
                <section className="py-24 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            <div>
                                <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-6">
                                    Our story
                                </h2>
                            </div>
                            <div className="space-y-6">
                                <p className="text-lg text-stone-600 font-light leading-relaxed">
                                    We started Golden Hours because we believed work could feel better.
                                    Not through more tools or more processes, but through
                                    thoughtful design that respects how people actually work.
                                </p>
                                <p className="text-lg text-stone-600 font-light leading-relaxed">
                                    The name comes from that magical time when everything clicks—
                                    when the light is just right, the work flows naturally,
                                    and you're doing your best thinking. We want to help more
                                    teams experience more of those moments.
                                </p>
                                <p className="text-lg text-stone-600 font-light leading-relaxed">
                                    Today, we work with teams around the world, helping them
                                    redesign their operations, their processes, and their
                                    daily experiences—one system at a time.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Values */}
                <section className="py-24 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <h2 className="text-xs font-medium text-stone-400 uppercase tracking-wider mb-16">
                            What we believe
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
                            {VALUES.map((value, index) => (
                                <div key={index} className="space-y-4">
                                    <h3 className="text-xl font-medium text-stone-900">
                                        {value.title}
                                    </h3>
                                    <p className="text-stone-500 font-light leading-relaxed">
                                        {value.description}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* CTA */}
                <section className="py-24 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                            <div className="space-y-4">
                                <h2 className="text-2xl font-medium text-stone-900">
                                    Work with us
                                </h2>
                                <p className="text-stone-500 font-light">
                                    Let's talk about how we can help your team.
                                </p>
                                <Link
                                    href="/contact"
                                    className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-3 transition-all duration-300"
                                >
                                    Get in touch
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                            <div className="space-y-4">
                                <h2 className="text-2xl font-medium text-stone-900">
                                    Join our team
                                </h2>
                                <p className="text-stone-500 font-light">
                                    We're always looking for thoughtful people.
                                </p>
                                <Link
                                    href="/careers"
                                    className="inline-flex items-center gap-2 text-stone-900 font-medium hover:gap-3 transition-all duration-300"
                                >
                                    View open roles
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    </div>
                </section>
            </main>
            <Footer />
        </div>
    )
}
