'use client'

import { useState } from 'react'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { Loader2, CheckCircle } from 'lucide-react'

export default function ContactPage() {
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle')
    const [formData, setFormData] = useState({ name: '', email: '', message: '' })

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        setStatus('submitting')

        try {
            const res = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                setStatus('success')
                setFormData({ name: '', email: '', message: '' })
            } else {
                setStatus('error')
            }
        } catch {
            setStatus('error')
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    }

    return (
        <div className="flex min-h-screen flex-col font-sans bg-[#FFFDF9]">
            <Header />
            <main className="flex-1 pt-20">
                {/* Hero */}
                <section className="py-24 md:py-32">
                    <div className="container mx-auto px-6">
                        <div className="max-w-3xl">
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold tracking-tight text-stone-900 mb-8">
                                Let's talk.
                            </h1>
                            <p className="text-xl text-stone-600 font-light leading-relaxed max-w-2xl">
                                Whether you're looking to redesign how your team works,
                                or just want to say hello—we'd love to hear from you.
                            </p>
                        </div>
                    </div>
                </section>

                {/* Contact Info */}
                <section className="py-24 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                            {/* Left - Contact Details */}
                            <div className="space-y-12">
                                <div>
                                    <h2 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-4">
                                        Email
                                    </h2>
                                    <a
                                        href="mailto:hello@goldenhours.com"
                                        className="text-2xl text-stone-900 font-light hover:text-stone-600 transition-colors"
                                    >
                                        hello@goldenhours.com
                                    </a>
                                </div>

                                <div>
                                    <h2 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-4">
                                        For careers
                                    </h2>
                                    <a
                                        href="mailto:careers@goldenhours.com"
                                        className="text-2xl text-stone-900 font-light hover:text-stone-600 transition-colors"
                                    >
                                        careers@goldenhours.com
                                    </a>
                                </div>

                                <div>
                                    <h2 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-4">
                                        Location
                                    </h2>
                                    <p className="text-lg text-stone-600 font-light leading-relaxed">
                                        Seoul, South Korea<br />
                                        Working with teams worldwide
                                    </p>
                                </div>
                            </div>

                            {/* Right - Message Form */}
                            <div className="bg-white p-8 md:p-12 rounded-2xl border border-stone-100">
                                {status === 'success' ? (
                                    <div className="text-center py-8 space-y-4">
                                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-stone-100 text-stone-600 mb-2">
                                            <CheckCircle size={32} />
                                        </div>
                                        <h3 className="text-2xl font-medium text-stone-900">Message sent</h3>
                                        <p className="text-stone-500 font-light leading-relaxed">
                                            Thank you for reaching out. We'll get back to you soon.
                                        </p>
                                        <button
                                            onClick={() => setStatus('idle')}
                                            className="mt-4 text-stone-600 hover:text-stone-900 transition-colors"
                                        >
                                            Send another message
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2 className="text-xl font-medium text-stone-900 mb-8">
                                            Send us a message
                                        </h2>
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            <div>
                                                <label className="block text-sm text-stone-600 mb-2">Name</label>
                                                <input
                                                    required
                                                    type="text"
                                                    name="name"
                                                    value={formData.name}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors"
                                                    placeholder="Your name"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-stone-600 mb-2">Email</label>
                                                <input
                                                    required
                                                    type="email"
                                                    name="email"
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors"
                                                    placeholder="your@email.com"
                                                />
                                            </div>
                                            <div>
                                                <label className="block text-sm text-stone-600 mb-2">Message</label>
                                                <textarea
                                                    required
                                                    name="message"
                                                    value={formData.message}
                                                    onChange={handleChange}
                                                    rows={5}
                                                    className="w-full px-4 py-3 bg-[#FFFDF9] border border-stone-200 rounded-lg text-stone-900 focus:outline-none focus:border-stone-400 transition-colors resize-none"
                                                    placeholder="How can we help?"
                                                />
                                            </div>

                                            {status === 'error' && (
                                                <p className="text-sm text-red-600">Something went wrong. Please try again.</p>
                                            )}

                                            <button
                                                type="submit"
                                                disabled={status === 'submitting'}
                                                className="w-full py-4 bg-stone-900 text-white rounded-full font-medium hover:bg-stone-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                            >
                                                {status === 'submitting' ? (
                                                    <>
                                                        <Loader2 className="animate-spin" size={18} />
                                                        Sending...
                                                    </>
                                                ) : 'Send message'}
                                            </button>
                                        </form>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </section>

                {/* FAQ Teaser */}
                <section className="py-32 border-t border-stone-100">
                    <div className="container mx-auto px-6">
                        <div className="max-w-2xl">
                            <h2 className="text-sm font-medium text-stone-400 uppercase tracking-widest mb-8">
                                Common questions
                            </h2>
                            <div className="space-y-8">
                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                                        What kind of companies do you work with?
                                    </h3>
                                    <p className="text-stone-500 font-light leading-relaxed">
                                        We work with teams of all sizes—from startups to established organizations.
                                        If you care about how your team works, we'd love to talk.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                                        How does an engagement typically start?
                                    </h3>
                                    <p className="text-stone-500 font-light leading-relaxed">
                                        We begin with a conversation to understand your needs.
                                        From there, we'll propose a scope that makes sense for your situation.
                                    </p>
                                </div>
                                <div>
                                    <h3 className="text-lg font-medium text-stone-900 mb-2">
                                        Do you work remotely?
                                    </h3>
                                    <p className="text-stone-500 font-light leading-relaxed">
                                        Yes. We're based in Seoul but work with teams around the world.
                                        We've designed our process to work beautifully across time zones.
                                    </p>
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
